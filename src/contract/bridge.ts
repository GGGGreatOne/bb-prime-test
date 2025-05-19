import bridgeAbi from './json/bridge-abi.json'
import { Contract } from 'ethers'
import { provider_eth, provider_bb, provider_bsc } from '.'
import { allChainNames } from './chain'

export const eth_bridge_contract_address = '0x04B9b6a1C41D1A7c98e5D2523460c39F4757e9A8'
export const eth_bridge_bbtc_pool = 1
export const eth_bridge_bbusd_pool = 2
export const eth_app_id = 2

export const bsc_bridge_contract_address = '0x1B60db9374EE8B9a7706B1D746259D8AFfbf4Cb9'
export const bsc_bridge_bbtc_pool = 1
export const bsc_bridge_bbusd_pool = 2
export const bsc_app_id = 3

export const bb_bridge_contract_address = '0xfbC7f3607cff8355dc5B0D3bF4f9614376389321'
export const bb_bridge_bbtc_pool = 1
export const bb_bridge_bbusd_pool = 2
export const bb_app_id = 34

// layerzero oft contract

export function bridgeChainHash(app_id: number, hash: string) {
	app_id = +app_id

	switch (app_id) {
		case eth_app_id:
			return `https://etherscan.io/tx/${hash}`
		case bsc_app_id:
			return `https://bscscan.com/tx/${hash}`
		case bb_app_id:
			return `https://bbscan.io/tx/${hash}`
	}

	throw 'bridgeChainHash'
}
export function bridgeChain(app_id: number) {
	app_id = +app_id

	switch (app_id) {
		case eth_app_id:
			return 'eth'
		case bsc_app_id:
			return 'bsc'
		case bb_app_id:
			return 'bb'
	}
	throw 'bridgeChain'
}
export function bridgeChainName(app_id: number) {
	app_id = +app_id

	switch (app_id) {
		case eth_app_id:
			return 'Ethereum'
		case bsc_app_id:
			return 'BNB Chain'
		case bb_app_id:
			return 'BounceBit'
	}
	throw 'bridgeChain'
}

export const max_limit_map = {
	eth_bb_bbtc: '50000000000000000000',
	eth_bb_bbusd: '2000000000000000000000000',
	bsc_bb_bbtc: '50000000000000000000',
	bsc_bb_bbusd: '2000000000000000000000000',
	bb_eth_bbtc: '50000000000000000000',
	bb_eth_bbusd: '2000000000000000000000000',
	bb_bsc_bbtc: '50000000000000000000',
	bb_bsc_bbusd: '2000000000000000000000000'
}

export const eth_bridge_contract = new Contract(eth_bridge_contract_address, bridgeAbi, provider_eth)
export const bsc_bridge_contract = new Contract(bsc_bridge_contract_address, bridgeAbi, provider_bsc)
export const bb_bridge_contract = new Contract(bb_bridge_contract_address, bridgeAbi, provider_bb)

export function getBridgeContract(chain: allChainNames) {
	if (chain === 'eth') return eth_bridge_contract
	else if (chain === 'bsc') return bsc_bridge_contract
	else if (chain === 'bb') return bb_bridge_contract
	else throw 'Unknown bridge'
}
