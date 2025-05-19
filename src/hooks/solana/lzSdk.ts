import { fetchAddressLookupTable, setComputeUnitLimit, setComputeUnitPrice } from '@metaplex-foundation/mpl-toolbox'
import {
	AddressLookupTableInput,
	Instruction,
	KeypairSigner,
	PublicKey,
	TransactionBuilder,
	Umi,
	publicKey,
	transactionBuilder
} from '@metaplex-foundation/umi'
import { toWeb3JsInstruction, toWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters'
import { AddressLookupTableAccount, Connection, TransactionMessage, VersionedTransaction } from '@solana/web3.js'
import { backOff } from 'exponential-backoff'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import getFee from './getFee'

const LOOKUP_TABLE_ADDRESS: Partial<Record<EndpointId, PublicKey>> = {
	[EndpointId.SOLANA_V2_MAINNET]: publicKey('AokBxha6VMLLgf97B5VYHEtqztamWmYERBmmFvjuTzJB'),
	[EndpointId.SOLANA_V2_TESTNET]: publicKey('9thqPdbR27A1yLWw2spwJLySemiGMXxPnEvfmXVk4KuK')
}

export const getLayerZeroScanLink = (hash: string, isTestnet = false) =>
	isTestnet ? `https://testnet.layerzeroscan.com/tx/${hash}` : `https://layerzeroscan.com/tx/${hash}`

export const getExplorerTxLink = (hash: string, isTestnet = false) => `https://solscan.io/tx/${hash}?cluster=${isTestnet ? 'devnet' : 'mainnet-beta'}`

export const getAddressLookupTable = async (connection: Connection, umi: Umi, fromEid: EndpointId) => {
	// Lookup Table Address and Priority Fee Calculation
	const lookupTableAddress = LOOKUP_TABLE_ADDRESS[fromEid]
	if (!lookupTableAddress) throw new Error('lookupTableAddress not found')
	const addressLookupTableInput: AddressLookupTableInput = await fetchAddressLookupTable(umi, lookupTableAddress)
	if (!addressLookupTableInput) {
		throw new Error(`No address lookup table found for ${lookupTableAddress}`)
	}
	const { value: lookupTableAccount } = await connection.getAddressLookupTable(toWeb3JsPublicKey(lookupTableAddress))
	if (!lookupTableAccount) {
		throw new Error(`No address lookup table account found for ${lookupTableAddress}`)
	}
	return {
		lookupTableAddress,
		addressLookupTableInput,
		lookupTableAccount
	}
}

export enum TransactionType {
	CreateToken = 'CreateToken',
	CreateMultisig = 'CreateMultisig',
	InitOft = 'InitOft',
	SetAuthority = 'SetAuthority',
	InitConfig = 'InitConfig',
	SendOFT = 'SendOFT'
}

const TransactionCuEstimates: Record<TransactionType, number> = {
	// for the sample values, they are: devnet, mainnet
	[TransactionType.CreateToken]: 125_000, // actual sample: (59073, 123539), 55785 (more volatile as it has CPI to Metaplex)
	[TransactionType.CreateMultisig]: 5_000, // actual sample: 3,230
	[TransactionType.InitOft]: 70_000, // actual sample: 59207, 65198 (note: this is the only transaction that createOFTAdapter does)
	[TransactionType.SetAuthority]: 8_000, // actual sample: 6424, 6472
	[TransactionType.InitConfig]: 42_000, // actual sample: 33157, 40657
	[TransactionType.SendOFT]: 300_000 // actual sample: 217,784
}

async function getSimulatedComputeUnits(
	connection: Connection,
	instructions: Instruction[],
	walletPubkey: PublicKey,
	addressLookupTables: AddressLookupTableAccount[]
) {
	const { blockhash } = await connection.getLatestBlockhash()
	const messageV0 = new TransactionMessage({
		payerKey: toWeb3JsPublicKey(walletPubkey),
		recentBlockhash: blockhash,
		instructions: instructions.map(ix => toWeb3JsInstruction(ix))
	}).compileToV0Message(addressLookupTables)

	const simulation = await connection.simulateTransaction(new VersionedTransaction(messageV0))
	console.log('🚀 ~ simulation:', simulation)
	if (simulation.value.err) {
		throw new Error(`Transaction simulation failed: ${JSON.stringify(simulation.value.err)}`)
	}

	const units = simulation.value.unitsConsumed || null
	if (!units) {
		throw new Error('Simulation did not return compute units consumed')
	}

	return units
}

export const getComputeUnitPriceAndLimit = async (
	connection: Connection,
	ixs: Instruction[],
	wallet: KeypairSigner,
	lookupTableAccount: AddressLookupTableAccount,
	transactionType: TransactionType
) => {
	const { averageFeeExcludingZeros } = await getFee(connection)
	const priorityFee = Math.round(averageFeeExcludingZeros)
	const computeUnitPrice = BigInt(priorityFee)

	let computeUnits

	try {
		computeUnits = await backOff(() => getSimulatedComputeUnits(connection, ixs, wallet.publicKey, [lookupTableAccount]), {
			maxDelay: 10000,
			numOfAttempts: 3
		})
	} catch (e) {
		console.error(`Error retrieving simulations compute units from RPC:`, e)
		const continueByUsingHardcodedEstimate =
			'Failed to call simulateTransaction on the RPC. This can happen when the network is congested. Would you like to use hardcoded estimates (TransactionCuEstimates) ? This may result in slightly overpaying for the transaction.'
		if (!continueByUsingHardcodedEstimate) {
			throw new Error('Failed to call simulateTransaction on the RPC and user chose to not continue with hardcoded estimate.')
		}
		console.log(`Falling back to hardcoded estimate for ${transactionType}: ${TransactionCuEstimates[transactionType]} CUs`)
		computeUnits = TransactionCuEstimates[transactionType]
	}

	if (!computeUnits) {
		throw new Error('Unable to compute units')
	}

	return {
		computeUnitPrice,
		computeUnits
	}
}

export const addComputeUnitInstructions = async (
	connection: Connection,
	umi: Umi,
	eid: EndpointId,
	txBuilder: TransactionBuilder,
	umiWalletSigner: KeypairSigner,
	computeUnitPriceScaleFactor: number,
	transactionType: TransactionType
) => {
	const computeUnitLimitScaleFactor = 1.2 // hardcoded to 1.1 as the estimations are not perfect and can fall slightly short of the actual CU usage on-chain
	const { addressLookupTableInput, lookupTableAccount } = await getAddressLookupTable(connection, umi, eid)
	const { computeUnitPrice, computeUnits } = await getComputeUnitPriceAndLimit(
		connection,
		txBuilder.getInstructions(),
		umiWalletSigner,
		lookupTableAccount,
		transactionType
	)
	// Since transaction builders are immutable, we must be careful to always assign the result of the add and prepend
	// methods to a new variable.
	const newTxBuilder = transactionBuilder()
		.add(
			setComputeUnitPrice(umi, {
				microLamports: computeUnitPrice * BigInt(Math.floor(computeUnitPriceScaleFactor))
			})
		)
		.add(setComputeUnitLimit(umi, { units: computeUnits * computeUnitLimitScaleFactor }))
		.setAddressLookupTables([addressLookupTableInput])
		.add(txBuilder)
	return newTxBuilder
}
