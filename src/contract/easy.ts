import { ENV } from '@/const'
import { Contract } from 'ethers'
import { provider_bsc, provider_eth } from '.'
import { abi } from './json/easy-btc.json'
import { abi as rewardsAbi } from './json/easy-btc-rewards.json'
import { allChainNames } from './chain'

const EASY_TARGET_BTC_BSC = ENV === 'mainnet' ? '0x38D239a8D33BF7424A1Df6d39cb8523cCc25DE0e' : '0x74DE7F7ecc6e7dA8AE9e4cE98304EbB92cbE647f'
const EASY_TARGET_USD_ETH = ENV === 'mainnet' ? '0xFe32277D00e57D864B8BC687d0a442D663Aa1dF6' : '0x035D73d9a563334bf35E08BFB49eA39ED4316467'
const EASY_TARGET_USD_BSC = ENV === 'mainnet' ? '0xF3FB36F32Dad91627f688e7332472d69F6C985c6' : ''

export const easy_btc_bsc_contract = new Contract(EASY_TARGET_BTC_BSC, abi, ENV === 'mainnet' ? provider_bsc : provider_eth)
export const easy_usd_eth_contract = new Contract(EASY_TARGET_USD_ETH, abi, provider_eth)
export const easy_usd_bsc_contract = new Contract(EASY_TARGET_USD_BSC, abi, provider_bsc)

const EASY_TARGET_REWARDS_BTC_BSC = ENV === 'mainnet' ? '0x719105570227C98e575421ef0A05086499D13e0D' : '0x528a0B220e5f02bb184EFC667E8f33B3EB6ADF25'
const EASY_TARGET_REWARDS_USD_ETH = ENV === 'mainnet' ? '0xb8e87340b15BaB856bC848903A0f18E64cEd5D2a' : '0xE4E796B3aD01f68Edc9c656785636d0D2f7C35Bf'
const EASY_TARGET_REWARDS_USD_BSC = ENV === 'mainnet' ? '0xF49Ae33513b0d79C8a0c35F5e76708eCdb665CC4' : ''

export const easy_btc_rewards_bsc_contract = new Contract(EASY_TARGET_REWARDS_BTC_BSC, rewardsAbi, ENV === 'mainnet' ? provider_bsc : provider_eth)
export const easy_usd_rewards_eth_contract = new Contract(EASY_TARGET_REWARDS_USD_ETH, rewardsAbi, provider_eth)
export const easy_usd_rewards_bsc_contract = new Contract(EASY_TARGET_REWARDS_USD_BSC, rewardsAbi, provider_bsc)

export function getEasyRewardsContract(token: 'usdt' | 'btcb' | 'bb', chain: allChainNames) {
	token = token.toLowerCase() as 'usdt' | 'btcb' | 'bb'

	if (token === 'btcb') {
		return new Contract(EASY_TARGET_REWARDS_BTC_BSC, rewardsAbi, ENV === 'mainnet' ? provider_bsc : provider_eth)
	} else if (token === 'usdt' && chain === 'eth') {
		return new Contract(EASY_TARGET_REWARDS_USD_ETH, rewardsAbi, provider_eth)
	} else if (token === 'usdt' && chain === 'bsc') {
		return new Contract(EASY_TARGET_REWARDS_USD_BSC, rewardsAbi, provider_bsc)
	} else {
		throw new Error('None Target')
	}
}
