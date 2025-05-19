import { ENV, SOLANA_CHAINID } from '@/const'
import { ethers } from 'ethers'
import { allChainNames } from './chain'

export const ETH_ID = ENV === 'mainnet' ? 1 : 17000
export const BSC_ID = ENV === 'mainnet' ? 56 : 97
export const BB_ID = ENV === 'mainnet' ? 6001 : 6000
export const BASE_ID = 8453
export const SOL_ID = SOLANA_CHAINID

export function getChainId(chain: allChainNames) {
	if (chain === 'eth') return ETH_ID
	else if (chain === 'bsc') return ENV === 'mainnet' ? BSC_ID : ETH_ID
	else if (chain === 'bb') return BB_ID
	else if (chain === 'base') return BASE_ID
	else if (chain === 'sol') return SOL_ID
	else throw 'Unknown chain'
}

export function getChainGasSymbol(chain: allChainNames) {
	if (chain === 'eth') return 'ETH'
	else if (chain === 'bsc') return 'BNB'
	else if (chain === 'bb') return 'BB'
	else if (chain === 'base') return 'ETH'
	else if (chain === 'sol') return 'SOL'
	else throw 'Unknown chain'
}

export function getChainName(chain: allChainNames) {
	if (chain === 'eth') return 'Ethereum'
	else if (chain === 'bsc') return 'BNB Chain'
	else if (chain === 'bb') return 'BounceBit'
	else if (chain === 'base') return 'Base'
	else if (chain === 'sol') return 'Solana'
	else throw 'Unknown chain'
}

export function chainHash(chain: string | number | allChainNames, hash: string) {
	if (chain === 'eth') chain = ETH_ID
	else if (chain === 'bsc') chain = BSC_ID
	else if (chain === 'bb') chain = BB_ID
	else if (chain === 'base') chain = BASE_ID
	else if (chain === 'sol') chain = SOL_ID
	if (chain == '11155111') return `https://sepolia.etherscan.io/tx/${hash}`
	else if (chain == '17000') return `https://holesky.etherscan.io/tx/${hash}`
	else if (chain == '1') return `https://etherscan.io/tx/${hash}`
	else if (chain == '56') return `https://bscscan.com/tx/${hash}`
	else if (chain == '6001') return `https://bbscan.io/tx/${hash}`
	else if (chain == '6000') return `https://testnet.bbscan.io/tx/${hash}`
	else if (chain == '8453') return `https://basescan.org/tx/${hash}`
	else if (chain == '12345') return `https://solscan.io/tx/${hash}`
	else if (chain == '123456') return `https://solscan.io/tx/${hash}?cluster=devnet`
	throw 'Unknow chain hash'
}

export function convertChain(str: string): allChainNames {
	str = str.toLowerCase()
	if (str.startsWith('eth')) return 'eth'
	else if (str.startsWith('bnb') || str === 'bsc') return 'bsc'
	else if (str.includes('base')) return 'base'
	return 'bb'
}

export function convertChainId(chain: string | number): allChainNames {
	chain = chain.toString()
	if (chain == '11155111' || chain == '17000') return 'eth'
	else if (chain == '1') return 'eth'
	else if (chain == '56') return 'bsc'
	else if (chain == '6001') return 'bb'
	else if (chain == '6000') return 'bb'
	else if (chain == '8453') return 'base'
	else if (chain == '12345' || chain == '123456') return 'sol'
	throw 'Unknown chain id'
}

export const ETH_RPC = ENV === 'mainnet' ? 'https://api-portal.bouncebit.io/proxy/eth' : 'https://eth-sepolia.public.blastapi.io'
export const BSC_RPC = ENV === 'mainnet' ? 'https://api-portal.bouncebit.io/proxy/bsc' : 'https://bsc-testnet.blockpi.network/v1/rpc/public'
export const BB_RPC = ENV === 'mainnet' ? 'https://fullnode-mainnet.bouncebitapi.com' : 'https://fullnode-testnet.bouncebitapi.com/'
export const BASE_RPC = 'https://api-portal.bouncebit.io/proxy/base'

export const provider_eth = new ethers.JsonRpcProvider(ETH_RPC, undefined, { pollingInterval: 3000, staticNetwork: true })
export const provider_bsc = new ethers.JsonRpcProvider(BSC_RPC, undefined, { pollingInterval: 2000, staticNetwork: true })
export const provider_bb = new ethers.JsonRpcProvider(BB_RPC, undefined, {
	pollingInterval: 3000,
	staticNetwork: true,
	batchMaxCount: 1
})
export const provider_base = new ethers.JsonRpcProvider(BASE_RPC, undefined, { pollingInterval: 3000, staticNetwork: true })

export function getProvider(chain: allChainNames) {
	switch (chain) {
		case 'eth':
			return provider_eth
		case 'bsc':
			return provider_bsc
		case 'bb':
			return provider_bb
		case 'base':
			return provider_base
		default:
			return provider_bb
	}
}
