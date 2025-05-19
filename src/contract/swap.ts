import { Contract } from 'ethers'
import swapAbi from './json/swap-abi.json'
import permit2Abi from './json/permit2.json'
import { provider_bb } from '.'

export const SWAP_APPROVE_TARGET = '0x89a053bca16b3fa7494a203a9fd420db8dcadf6f'
export const SWAP_EXCUTE_TARGET = '0xc2984d09711db7731f6b081e616bdf5de7ba0783'

export const swap_contract = new Contract(SWAP_EXCUTE_TARGET, swapAbi, provider_bb)

export const premit2_contract = new Contract(SWAP_APPROVE_TARGET, permit2Abi, provider_bb)

export const WBB_ADDRESS = '0xF4c20e5004C6FDCDdA920bDD491ba8C98a9c5863'

export const wbb_contract = new Contract(
	WBB_ADDRESS,
	[
		{
			constant: false,
			inputs: [
				{
					name: 'wad',
					type: 'uint256'
				}
			],
			name: 'withdraw',
			outputs: [],
			payable: false,
			stateMutability: 'nonpayable',
			type: 'function'
		},
		{
			constant: false,
			inputs: [],
			name: 'deposit',
			outputs: [],
			payable: true,
			stateMutability: 'payable',
			type: 'function'
		}
	],
	provider_bb
)
