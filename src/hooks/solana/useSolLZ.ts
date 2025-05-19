import { useCallback, useMemo } from 'react'
import { oft } from '@layerzerolabs/oft-v2-solana-sdk'
import { EndpointId } from '@layerzerolabs/lz-definitions'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { findAssociatedTokenPda, mplToolbox } from '@metaplex-foundation/mpl-toolbox'
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token'
import { createSignerFromKeypair, publicKey as umiPublicKey, signerIdentity, transactionBuilder } from '@metaplex-foundation/umi'
import { addressToBytes32 } from '@layerzerolabs/lz-v2-utilities'
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes'
import { useQuery } from '@tanstack/react-query'
import { addComputeUnitInstructions, TransactionType } from './lzSdk'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { toWeb3JsLegacyTransaction, fromWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters'
import { useSolanaConnection } from './useSolanaConnection'
import { useSolanaWallet } from './useSolanaWallet'
import { useConnectedAddress } from '../useWallet'
import { ENV, LZ_ESCROW, LZ_BB_MINT_ADDRESS, LZ_PROGRAM_ID } from '@/const'

// interface Args {
// 	amount: bigint
// 	to: string
// 	fromEid: EndpointId
// 	toEid: EndpointId
// 	programId: string
// 	mint: string
// 	escrow: string
// 	tokenProgram: string
// 	// computeUnitPriceScaleFactor: number
// }
export const useDeriveConnectionForSecretKey = () => {
	const { connection } = useSolanaConnection()
	const privateKey = ''

	const umi = createUmi(connection?.rpcEndpoint || 'https://devnet.helius-rpc.com/?api-key=9fc1bee2-a8b0-4ed5-93f6-a0dfc850013c').use(mplToolbox())
	const umiWalletKeyPair = umi.eddsa.createKeypairFromSecretKey(bs58.decode(privateKey))
	const umiWalletSigner = createSignerFromKeypair(umi, umiWalletKeyPair)
	umi.use(signerIdentity(umiWalletSigner))
	return useMemo(
		() => ({
			connection,
			umi,
			umiWalletKeyPair,
			umiWalletSigner
		}),
		[connection, umi, umiWalletKeyPair, umiWalletSigner]
	)
}

export const useDeriveConnection = () => {
	const { connection } = useSolanaConnection()
	const { walletProvider } = useSolanaWallet()

	const umi = useMemo(() => {
		if (!connection || !walletProvider?.publicKey) return null

		const umi = createUmi(connection.rpcEndpoint).use(mplToolbox())
		umi.use(signerIdentity(walletProvider as any))

		return umi
	}, [connection, walletProvider])

	return {
		umi,
		connection
	}
}

const {
	fromEid,
	toEid,
	mint: mintStr,
	programId: programIdStr,
	escrow: escrowStr
} = {
	fromEid: ENV === 'mainnet' ? EndpointId.SOLANA_MAINNET : EndpointId.SOLANA_V2_TESTNET, // 40168
	toEid: ENV === 'mainnet' ? EndpointId.BOUNCEBIT_V2_MAINNET : EndpointId.SEPOLIA_V2_TESTNET, //40161
	mint: LZ_BB_MINT_ADDRESS,
	programId: LZ_PROGRAM_ID,
	escrow: LZ_ESCROW
}

export default function useSolLZ() {
	const { walletProvider } = useSolanaWallet()
	const { umi, connection } = useDeriveConnection()
	const { data: _nativeFee, refetch: refetchNativeFee } = useSolanaLzFeeMock()

	const sendCallback = useCallback(
		async (amount: bigint, to: string) => {
			if (!walletProvider.publicKey || !connection || !umi) {
				return
			}

			const oftProgramId = umiPublicKey(programIdStr)
			const mint = umiPublicKey(mintStr)
			const umiEscrowPublicKey = umiPublicKey(addressToBytes32(escrowStr))
			const tokenProgramId = fromWeb3JsPublicKey(TOKEN_PROGRAM_ID)

			const tokenAccount = findAssociatedTokenPda(umi, {
				mint: umiPublicKey(mintStr),
				owner: fromWeb3JsPublicKey(walletProvider.publicKey),
				tokenProgramId
			})

			if (!tokenAccount) {
				throw new Error(`No token account found for mint ${mintStr} and owner ${walletProvider.publicKey} in program ${tokenProgramId}`)
			}

			console.log('begin sendCallback')

			// const tokenAccountData = await fetchToken(umi, tokenAccount)
			// const balanceResult = await connection.getTokenAccountBalance(new PublicKey(tokenAccount[0]))
			// const balance = +balanceResult.value.amount
			// console.log('🚀 ~ returnuseCallback ~ balance:', balance)

			// if (amount == BigInt(0) || amount > balance) {
			// 	throw new Error(`Attempting to send ${amount}, but ${walletProvider.publicKey} only has balance of ${balance}`)
			// }

			const recipientAddressBytes32 = addressToBytes32(to)

			try {
				if (!_nativeFee || _nativeFee === 0n) {
					throw new Error('nativeFee === 0')
				}

				const { data: nativeFee } = await refetchNativeFee()

				if (!nativeFee || nativeFee === 0n) {
					throw new Error('nativeFee === 0')
				}

				const payer = {
					...walletProvider,
					publicKey: fromWeb3JsPublicKey(walletProvider.publicKey)
				}

				// Error: Invariant failed: treasury not set
				const ix = await oft.send(
					umi.rpc,
					{
						payer: payer as any,
						tokenMint: mint,
						tokenEscrow: umiEscrowPublicKey,
						tokenSource: tokenAccount[0]
					},
					{
						to: Buffer.from(recipientAddressBytes32),
						dstEid: toEid,
						amountLd: BigInt(amount),
						minAmountLd: (BigInt(amount) * BigInt(9)) / BigInt(10),
						options: Buffer.from(''),
						composeMsg: undefined,
						nativeFee
					},
					{
						oft: oftProgramId,
						token: tokenProgramId
					}
				)
				const { blockhash } = await connection.getLatestBlockhash('confirmed')

				let txBuilder = transactionBuilder().add([ix])
				txBuilder = await addComputeUnitInstructions(connection, umi, fromEid, txBuilder, payer as any, 4, TransactionType.SendOFT)
				txBuilder = txBuilder.setBlockhash(blockhash)
				txBuilder = txBuilder.useLegacyVersion()

				const transaction = txBuilder.build(umi)
				const serializedTransaction = toWeb3JsLegacyTransaction(transaction)
				serializedTransaction.feePayer = walletProvider.publicKey

				const signature = await walletProvider.signAndSendTransaction(serializedTransaction)

				return signature
			} catch (error) {
				console.error('🚀 Transaction error:', error)
			}
		},
		[walletProvider, connection, umi, _nativeFee, refetchNativeFee]
	)

	return {
		sendCallback,
		_nativeFee
	}
}

export function useSolanaLzFeeMock() {
	const { umi } = useDeriveConnection()
	const { isSolana } = useConnectedAddress()

	return useQuery({
		queryKey: ['useSolanaLzFeeMock', !!umi],
		queryFn: async () => {
			try {
				if (!umi || !isSolana) return 0n

				const umiEscrowPublicKey = umiPublicKey(escrowStr)
				const mint = umiPublicKey(mintStr)

				const mockPayer = '2ppMEU2sxgfUQkTLPcdtG7R5czrdGZYg88yo5F1CatK8'
				const mockTo = '0xAAd7604a8208c890479dfc956b1c23D0358Ecd6f'

				const { nativeFee: _nativeFee } = await oft.quote(
					umi.rpc,
					{
						payer: umiPublicKey(mockPayer),
						tokenMint: mint,
						tokenEscrow: umiEscrowPublicKey
					},
					{
						payInLzToken: false,
						to: Buffer.from(addressToBytes32(mockTo)),
						dstEid: toEid,
						amountLd: 200000000n,
						minAmountLd: 1n,
						options: Buffer.from(''),
						composeMsg: undefined
					},
					{
						oft: umiPublicKey(programIdStr)
					}
				)
				return _nativeFee
			} catch (error) {
				console.error('🚀 useSolanaLzFeeMock error:', error)
			}
			return 0n
		},
		refetchInterval: 10_000
	})
}
