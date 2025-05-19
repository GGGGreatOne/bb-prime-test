export const stBBTC_target = '0x7F150c293c97172C75983BD8ac084c187107eA19'
export const stBB_target = '0x22aAC17E571D6651880d057e310703fF4C7c3483'

export const stake_bb_abi = [
	{
		inputs: [],
		name: 'deposit',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	}
]
export const stake_bbtc_abi = [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'deposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			}
		],
		name: 'requestWithdrawal',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'requestIds',
				type: 'uint256[]'
			}
		],
		name: 'batchClaimWithdrawal',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getUnstakePeriod',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'AllowanceBelowZero',
		type: 'error'
	},
	{
		inputs: [],
		name: 'AllowanceExceeded',
		type: 'error'
	},
	{
		inputs: [],
		name: 'BalanceExceeded',
		type: 'error'
	},
	{
		inputs: [],
		name: 'EnforcedPause',
		type: 'error'
	},
	{
		inputs: [],
		name: 'ExceedsMaxRequestSize',
		type: 'error'
	},
	{
		inputs: [],
		name: 'ExpectedPause',
		type: 'error'
	},
	{
		inputs: [],
		name: 'FailedToExec',
		type: 'error'
	},
	{
		inputs: [],
		name: 'InvalidInitialization',
		type: 'error'
	},
	{
		inputs: [],
		name: 'NotInitializing',
		type: 'error'
	},
	{
		inputs: [],
		name: 'NotOwnerOrClaimed',
		type: 'error'
	},
	{
		inputs: [],
		name: 'Overflow',
		type: 'error'
	},
	{
		inputs: [],
		name: 'ReentrancyGuardReentrantCall',
		type: 'error'
	},
	{
		inputs: [],
		name: 'TransferToSelf',
		type: 'error'
	},
	{
		inputs: [],
		name: 'WithdrawalPeriodNotPassed',
		type: 'error'
	},
	{
		inputs: [],
		name: 'ZeroAddress',
		type: 'error'
	},
	{
		inputs: [],
		name: 'ZeroAmount',
		type: 'error'
	}
]
