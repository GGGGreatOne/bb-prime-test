import { Contract } from 'ethers'
import cedefiV2Abi from './json/cedefi-v2.json'
import { provider_base, provider_bb, provider_bsc, provider_eth } from '.'
import { allChainNames } from './chain'

// ETH - Holesky
const eth_cedefi_v2_contract = new Contract(
	ENV === 'mainnet' ? '0xB16DF6f4a58eCB26fAb8E09a5195c062a08E21BC' : '0x3367311a7FDE95F03111B07b7794710697019f44',
	cedefiV2Abi,
	provider_eth
)

export const ETH_NATIVE_AUTO_TARGET = ENV === 'mainnet' ? '0xA23b2010c27a18D24D430A232480eF053Ca39a7A' : ''
export const ETH_NATIVE_FIXED_TARGET = ENV === 'mainnet' ? '0xF8523041a7aDEDe5B340a60C6A6ba6e461A68DD1' : ''

export const ETH_USDT_AUTO_TARGET = ENV === 'mainnet' ? '0xA23b2010c27a18D24D430A232480eF053Ca39a7A' : '0xBE550C0e1946213E2a2e2d706389E21eda26Af0f'
export const ETH_USDT_FIXED_TARGET = ENV === 'mainnet' ? '0xF8523041a7aDEDe5B340a60C6A6ba6e461A68DD1' : '0x0Fe8Ee4247F2f9eb19c616CB51f50e71650d883F'
export const ETH_USDT_MANUAL_TARGET = ENV === 'mainnet' ? '' : '0xE7249f525cBFe03418d80B049112462e264dc9a2'

export const ETH_BBTC_AUTO_TARGET = ENV === 'mainnet' ? '' : '0x02C3E7Bb6d9eFfF8a42a62abFe36FCe804E2D10b'
export const ETH_BBTC_FIXED_TARGET = ENV === 'mainnet' ? '' : '0xEC52b0c61EA6c7c635bF9aDB2AA9A97630E11b3F'
export const ETH_BBTC_MANUAL_TARGET = ENV === 'mainnet' ? '' : '0xc652947eea33478aDE1c86c114E3DC031d9deC4C'

// SOLANA
export const cedefi_programId = new PublicKey('6qN1ruT39A19Uby9K7EZtgf9fHunqS53ovkskBkgV7t2')

// BSC
const bsc_cedefi_v2_contract = new Contract(ENV === 'mainnet' ? '0x777bA19C9480C158941419c5d046832A120d42C8' : '', cedefiV2Abi, provider_bsc)

export const BSC_NATIVE_AUTO_TARGET = ENV === 'mainnet' ? '0xCcAC8ab61c5023bCe53dA3aB1B21DEB411373467' : ''

export const BSC_SOL_AUTO_TARGET = ENV === 'mainnet' ? '0x9fAd8535C4424aF6C6b617CDD3D5e2dba913A1dF' : ''

export const BSC_BTCB_AUTO_TARGET = ENV === 'mainnet' ? '0xA91f756d5E01d8E8A6B6e2D1e73341FBEc1f3355' : ''
export const BSC_BTCB_FIXED_TARGET = ENV === 'mainnet' ? '0xFd1eae362FA03Df1404035ec9045b1067426F74a' : ''

export const BSC_USDT_AUTO_TARGET = ENV === 'mainnet' ? '0x06242A3Da54ae32028f1ACF9CF25638b7be8d79b' : ''
export const BSC_USDT_FIXED_TARGET = ENV === 'mainnet' ? '0xF9bbe09e764484159554a90462A1C5879C34863C' : ''

// BB
const bb_cedefi_v2_contract = new Contract(ENV === 'mainnet' ? '0xc4F65Bbdd0B9eCFeaA253a65DC0601C97061a02C' : '', cedefiV2Abi, provider_bb)

export const BB_BBTC_AUTO_TARGET = ENV === 'mainnet' ? '0xC0b49bC4971211Ef2B76B42a6D279C5999CbB969' : ''
export const BB_BBTC_FIXED_TARGET = ENV === 'mainnet' ? '0xaEa284E9A905F984D44c184E8206884Ae0A95c4b' : ''

export const BB_BBUSD_AUTO_TARGET = ENV === 'mainnet' ? '0x868f51E67d9A118bd063357B191C554834A8Aa7d' : ''
export const BB_BBUSD_FIXED_TARGET = ENV === 'mainnet' ? '0xB0d12B46eeA3cE5F9f8108C59a92B550E1B7c684' : ''

// BASE
const base_cedefi_v2_contract = new Contract(ENV === 'mainnet' ? '0x403F10C86b4D6f33B0D5163073784f6d9e757475' : '', cedefiV2Abi, provider_base)

export function getCedefiContract(chain: allChainNames) {
	if (chain === 'sol') throw 'Unknown Contract'
	if (chain === 'bsc') {
		return bsc_cedefi_v2_contract
	} else if (chain === 'eth') {
		return eth_cedefi_v2_contract
	} else if (chain === 'bb') {
		return bb_cedefi_v2_contract
	} else if (chain === 'base') {
		return base_cedefi_v2_contract
	}

	throw 'Unknown cedefi'
}

import cedefiV2RewardsAbi from './json/cedefi-v2-rewards.json'
import { ENV } from '@/const'

export const cedefi_v2_rewards_contract = new Contract(
	ENV === 'mainnet' ? '0x796B73072257ab522a83a7c27E0b23E3C509927c' : '0x7370CD7A2C2E31db56d677275965064893e05618',
	cedefiV2RewardsAbi,
	ENV === 'mainnet' ? provider_bb : provider_eth
)

import usdyAbi from './json/cedefi-usdy.json'
import { PublicKey } from '@solana/web3.js'
import usccAbi from './json/cedefi-uscc.json'
import usycAbi from './json/cedefi-usyc.json'

export const cedefi_usdy = new Contract('0xc0906Ea18fB306b5d87019F48089249bD0AD133A', usdyAbi, provider_eth)
export const cedefi_uscc = new Contract('0xbF86F3825d7d902267f31211949B7F4D0AD5105f', usccAbi, provider_eth)
export const cedefi_usyc = new Contract('0x2D4d60192c271D896c89294bd40AC6dDA82c7cB4', usycAbi, provider_eth)

export const getRwaContract = (name: 'usdy' | 'uscc' | 'usyc') => {
	const _name = name.toLowerCase()
	switch (_name) {
		case 'usdy':
			return cedefi_usdy
		case 'uscc':
			return cedefi_uscc
		case 'cedefi_usyc':
			return cedefi_usyc
		default:
			throw 'error contract'
	}
}
