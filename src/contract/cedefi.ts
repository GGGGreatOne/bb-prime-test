import { Contract } from 'ethers'
import rewardsJson from './json/cedefi-rewards.json'
import { ENV } from '@/const'
import { provider_bb, provider_eth } from '.'
import cedefiAbi from './json/cedefi.json'
import ethenaJson from './json/ethena-usde.json'
import senaJsonAbi from './json/ethena-sena.json'

export const cedefi_rewards_contract = new Contract(
	ENV === 'mainnet' ? rewardsJson.address : '0x683F93EF28a16E66a05006D1Fb8766D744209017',
	rewardsJson.abi,
	provider_bb
)

export function getCedefiTarget(chain: 'bsc' | 'eth' | 'bb', coin: string) {
	if (chain === 'bsc' && coin === 'BBTC') {
		return '0x55a55e8b08b091bD0529bf1af05b69fF5291867D'
	} else if (chain === 'bsc' && coin === 'BBUSD') {
		return '0xdAfd8591402c5E57DCa4B1b9e481c08548a2442E'
	} else if (chain === 'eth' && coin === 'BBTC') {
		return '0x1ddD6E5eA766511CC0f348DC8d17578a821B680F'
	} else if (chain === 'eth' && coin === 'BBUSD') {
		return '0xa2B283e4dbdFEA5461C36a59E3B94b3ef2883085'
	} else if (chain === 'bb' && coin === 'BBTC') {
		return '0xd4def93a10ada7e14cAdc6920b6CDE01148D1813'
	} else if (chain === 'bb' && coin === 'BBUSD') {
		return ENV === 'mainnet' ? '0x426CD147ff93f31BB18F1Acd19DAb9c32d934131' : '0x7482b1229a5bCcf9AB143628CD4Ad40b9CeA8428'
	} else if (chain === 'bb' && coin === 'stBBTC') {
		return '0x7F26aB9263E33de947654F44C5AB439090cfAaf7'
	}

	throw 'Unknow target'
}

export const bb_bbusd_cedefi_contract = new Contract(getCedefiTarget('bb', 'BBUSD'), cedefiAbi, provider_bb)

export const ethena_usde_contract = new Contract(
	ENV === 'mainnet' ? ethenaJson.address : '0x546D9320Bf7bc3Ec865Afe628648B8103b2aBC5A',
	ethenaJson.abi,
	provider_eth
)

export const ethena_sena_contract = new Contract('0x58d38973bF39Fa157c0a69e2b1CDb8DA59E500Ce', senaJsonAbi, provider_eth)
