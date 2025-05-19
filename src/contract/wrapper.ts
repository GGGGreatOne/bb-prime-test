import { ENV } from '@/const'
import wrapperAbi from './json/wrapper-abi.json'
import { BSC_USD, BTCB, chainNameType, FDUSD, USDT, WBTC } from './erc20'
import { provider_bsc, provider_eth } from '.'
import { Contract } from 'ethers'
import { allChainNames } from './chain'

export const targetMap: Record<string, string> = {
	[WBTC]: ENV === 'mainnet' ? '0x8c083FAB24a620B6a5Fb178ADbF7a5185E484F0a' : '0xb32CE4E1f99314f531c20A43c49E44D0AaB9eFf0',
	WBTC: ENV === 'mainnet' ? '0x8c083FAB24a620B6a5Fb178ADbF7a5185E484F0a' : '0xb32CE4E1f99314f531c20A43c49E44D0AaB9eFf0',
	[USDT]: ENV === 'mainnet' ? '0x8a4C7Ca32bd1daFF850D059b24b1bDF3E2Fe107d' : '0xf491F6d9827B9779A13054F07669D9b104291299',
	USDT: ENV === 'mainnet' ? '0x8a4C7Ca32bd1daFF850D059b24b1bDF3E2Fe107d' : '0xf491F6d9827B9779A13054F07669D9b104291299',

	[BTCB]: '0xEcbb4f39a8abF74ca7D3B9e57fb49C74491A5259',
	BTCB: '0xEcbb4f39a8abF74ca7D3B9e57fb49C74491A5259',
	[FDUSD]: '0xBc92C75f536aC9e454013E16d2439F9089fB85ad', // deprecated
	FDUSD: '0xBc92C75f536aC9e454013E16d2439F9089fB85ad', // deprecated

	USDT_BSC: '0x9Cd35Dd9A1de01FCF189a9E0993aC3a07779f14b',
	[BSC_USD]: '0x9Cd35Dd9A1de01FCF189a9E0993aC3a07779f14b'
}

export const bsc_btc_wrapper = new Contract(targetMap.BTCB, wrapperAbi, provider_bsc)
export const bsc_usd_wrapper = new Contract(targetMap.FDUSD, wrapperAbi, provider_bsc)
export const bsc_usdt_wrapper = new Contract(targetMap.USDT_BSC, wrapperAbi, provider_bsc)
export const eth_btc_wrapper = new Contract(targetMap.WBTC, wrapperAbi, provider_eth)
export const eth_usd_wrapper = new Contract(targetMap.USDT, wrapperAbi, provider_eth)

export function getWrapperContract(chain: allChainNames, symbol: string) {
	if (chain === 'eth') {
		if (symbol === 'BBTC' || symbol === 'WBTC') {
			return new Contract(targetMap.WBTC, wrapperAbi, provider_eth)
		} else if (symbol === 'USDT' || symbol === 'BBUSD') {
			return new Contract(targetMap.USDT, wrapperAbi, provider_eth)
		}
	} else if (chain === 'bsc') {
		if (symbol === 'BBTC' || symbol === 'BTCB') {
			return new Contract(targetMap.BTCB, wrapperAbi, provider_bsc)
		} else if (symbol === 'BBUSD' || symbol === 'USDT') {
			return new Contract(targetMap.USDT_BSC, wrapperAbi, provider_bsc)
		} else if (symbol === 'FDUSD') {
			return new Contract(targetMap.FDUSD, wrapperAbi, provider_bsc)
		}
	}

	throw 'Unkown token'
}
