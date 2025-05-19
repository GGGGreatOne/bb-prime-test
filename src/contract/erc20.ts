import { ENV, LZ_BB_MINT_ADDRESS } from '@/const'
import { Contract } from 'ethers'
import { provider_base, provider_bb, provider_bsc, provider_eth } from '.'
import { equalCase } from '@/lib/utils'
import { Currency } from '@/constants'
import { zeroAddress } from 'viem'
import { allChainNames } from './chain'

export type chainNameType = 'eth' | 'bsc' | 'bb' | 'sol'

export type Token = {
	name?: string
	isNative?: boolean
	symbol: string
	logo: string
	contract: string
	decimals: number
	chain: allChainNames
}

export const erc20_abi = [
	'function balanceOf(address owner) view returns (uint256)',
	'function approve(address _spender, uint256 _value) public returns (bool success)',
	'function allowance(address _owner, address _spender) public view returns (uint256 remaining)',

	// stBB, stBBTC
	'function getOwnerWithdrawalRequestIds(address account) public view returns (uint256 number)',
	'function MAX_REQUEST_SIZE() public view returns (uint256 number)',
	'function earned(address account) public view returns (uint256 earned)',
	'function lockOf(address account) public view returns (uint256 locked)',
	'function getOwnerPendingWithdrawalRequestInfo(address owner) public view returns (uint256[] pendingRequestIds, uint256 totalPendingAmount)',
	'function getOwnerClaimableWithdrawalRequestInfo(address owner) public view returns (uint256[] claimableRequestIds, uint256 totalClaimableAmount)',
	'function getReward()',
	'function totalSupply() view returns (uint256)',
	'function getUnstakePeriod() view returns (uint256)',
	'function getPooledNativeByShares(uint256 _sharesAmount) view returns (uint256)',

	// May be unuseable
	'function getWithdrawalRequest(uint256 requestId) public view returns (uint256 queued, uint128 amount, uint40 claimTimestamp, bool claimed)'
]

export const erc20_stBBTC_locked_abi = [
	{
		inputs: [
			{
				internalType: 'address',
				name: 'account',
				type: 'address'
			}
		],
		name: 'lockOf',
		outputs: [
			{
				internalType: 'uint256',
				name: 'locked',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
] as const

// Basic tokens
export const WBTC = ENV === 'mainnet' ? '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599' : '0xF24FdD4d6e0EdB48BB6279F491C860934B883a32'
export const WBTC_Token: Token = {
	symbol: 'WBTC',
	logo: '/images/token/wbtc.png',
	contract: WBTC,
	decimals: 8,
	chain: 'eth'
}

export const USDT = ENV === 'mainnet' ? '0xdAC17F958D2ee523a2206206994597C13D831ec7' : '0x8d2e1646fd92fe72cb40e5de0ceb92002d5dcf5f'
export const USDT_Token: Token = {
	symbol: 'USDT',
	logo: '/images/token/usdt.png',
	contract: USDT,
	decimals: 6,
	chain: 'eth'
}

export const BTCB = ENV === 'mainnet' ? '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c' : '0x144bbB5aA7a212de1874dB6c45102b208114C6c3'
export const BTCB_Token: Token = {
	symbol: 'BTCB',
	logo: '/images/token/btcb.png',
	contract: BTCB,
	decimals: 18,
	chain: 'bsc'
}

export const BSC_USD = '0x55d398326f99059fF775485246999027B3197955'
export const BSC_USD_Token: Token = {
	symbol: 'USDT',
	logo: '/images/token/usdt.png',
	contract: BSC_USD,
	decimals: 18,
	chain: 'bsc'
}

export const FDUSD = '0xc5f0f7b66764f6ec8c8dff7ba683102295e16409'
export const FDUSD_Token: Token = {
	symbol: 'FDUSD',
	logo: '/images/token/fdusd.png',
	contract: FDUSD,
	decimals: 18,
	chain: 'bsc'
}

export const USDY = ENV === 'mainnet' ? '0x96F6eF951840721AdBF46Ac996b59E0235CB985C' : ''
export const USDY_Token: Token = {
	symbol: 'USDY',
	logo: '/images/token/usdt.png',
	contract: USDY,
	decimals: 18,
	chain: 'eth'
}
export const USCC = '0x14d60E7FDC0D71d8611742720E4C50E7a974020c'
export const USCC_Token: Token = {
	symbol: 'USCC',
	logo: '/images/token/uscc.png',
	contract: USCC,
	decimals: 6,
	chain: 'eth'
}
export const USYC = '0x136471a34f6ef19fE571EFFC1CA711fdb8E49f2b'
export const USYC_Token: Token = {
	symbol: 'USYC',
	logo: '/images/token/usyc.png',
	contract: USYC,
	decimals: 6,
	chain: 'eth'
}

export const wbtc_contract = new Contract(WBTC, erc20_abi, provider_eth)
export const usdt_contract = new Contract(USDT, erc20_abi, provider_eth)
export const usdy_contract = new Contract(USDY, erc20_abi, provider_eth)
// export const uscc_contract = new Contract(USCC, erc20_abi, provider_eth)
export const btcb_contract = new Contract(BTCB, erc20_abi, provider_bsc)
export const fdusd_contract = new Contract(FDUSD, erc20_abi, provider_bsc)
export const usd_bsc_contract = new Contract(BSC_USD, erc20_abi, provider_bsc)

export function getErc20Contract(target: string, chain: allChainNames) {
	return new Contract(target, erc20_abi, chain === 'bsc' ? provider_bsc : chain === 'bb' ? provider_bb : chain === 'base' ? provider_base : provider_eth)
}

export const BB_Token: Token = {
	isNative: true,
	symbol: 'BB',
	logo: '/images/token/bb.png',
	contract: '0x0000000000000000000000000000000000000000',
	decimals: 18,
	chain: 'bb'
}

export const BB_Bridge_Token = new Currency(ENV === 'mainnet' ? 6001 : 6000, zeroAddress, 18, 'BB', 'BB', '/images/token/bb.png')

export const BBTC = '0xF5e11df1ebCf78b6b6D26E04FF19cD786a1e81dC'
export const BBUSD = '0x77776b40C3d75cb07ce54dEA4b2Fd1D07F865222'
export const BB_ETH_ADDRESS = ENV === 'mainnet' ? '0xd459ECeddafcc1d876a3be7290A2E16e801073a3' : '0xF0A7B0aa0E65E3d66Da08F6950BCe2Bee494195a'
export const BB_BSC_ADDRESS = ENV === 'mainnet' ? zeroAddress : '0x230441a95415a28c9caa91d5f74c2e0a3441d45d'

// BB
export const BBTC_BB_Token: Token = {
	symbol: 'BBTC',
	logo: '/images/token/bbtc.png',
	contract: ENV === 'mainnet' ? BBTC : '0xd1A524072c63Ba474386bC54d4abbaafBbfc557b',
	decimals: 18,
	chain: 'bb'
}
export const BBUSD_BB_Token: Token = {
	symbol: 'BBUSD',
	logo: '/images/token/bbusd.png',
	contract: ENV === 'mainnet' ? BBUSD : '0x0541887fF1383a931F8a96EcC09D1f1A7773f942',
	decimals: 18,
	chain: 'bb'
}
export const BB_BBTC_Token = BBTC_BB_Token
export const BB_BBUSD_Token = BBUSD_BB_Token
export const bb_bbtc_contract = new Contract(BBTC_BB_Token.contract, erc20_abi, provider_bb)
export const bb_bbusd_contract = new Contract(BBUSD_BB_Token.contract, erc20_abi, provider_bb)
export const eth_bb_contract = new Contract('0xd459ECeddafcc1d876a3be7290A2E16e801073a3', erc20_abi, provider_eth)
// BSC
export const BNB_Token: Token = {
	isNative: true,
	symbol: 'BNB',
	logo: '/images/token/bnb.png',
	contract: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18,
	chain: 'bsc'
}

export const BBTC_BSC_Token: Token = {
	symbol: 'BBTC',
	logo: '/images/token/bbtc.png',
	contract: BBTC,
	decimals: 18,
	chain: 'bsc'
}
export const BBUSD_BSC_Token: Token = {
	symbol: 'BBUSD',
	logo: '/images/token/bbusd.png',
	contract: BBUSD,
	decimals: 18,
	chain: 'bsc'
}

export const BB_BSC_Token = new Currency(ENV === 'mainnet' ? 56 : 97, BB_BSC_ADDRESS, 18, 'BB', 'BB', '/images/token/bb.png')
export const BSC_BBTC_Token = BBTC_BSC_Token
export const BSC_BBUSD_Token = BBUSD_BSC_Token
export const bsc_bbtc_contract = new Contract(BBTC, erc20_abi, provider_bsc)
export const bsc_bbusd_contract = new Contract(BBUSD, erc20_abi, provider_bsc)

export const SOL = '0x570a5d26f7765ecb712c0924e4de545b89fd43df'
export const BSC_SOL_Token: Token = {
	symbol: 'SOL',
	logo: '/images/token/sol.png',
	contract: SOL,
	decimals: 18,
	chain: 'bsc'
}

export const bsc_sol_contract = new Contract(SOL, erc20_abi, provider_bsc)

// ETH
export const AUCTION_ETH = ENV === 'mainnet' ? '0xA9B1Eb5908CfC3cdf91F9B8B3a74108598009096' : '0x8582f438402f33d5e7e4D97bFC5d45623f14b55F'
export const BOUNCE_TOKEN: Token = {
	symbol: 'AUCTION',
	logo: '/assets/coin/auction.png',
	contract: AUCTION_ETH,
	decimals: 18,
	chain: 'eth'
}
export const BOUNCE_CURRENCY = new Currency(ENV === 'mainnet' ? 1 : 11155111, AUCTION_ETH, 18, 'AUCTION')
export const BB_ETH_Token: Token = {
	symbol: 'BB',
	logo: '/images/token/bb.png',
	contract: '0xd459ECeddafcc1d876a3be7290A2E16e801073a3',
	decimals: 18,
	chain: 'eth'
}
export const ETH_CURRENCY = new Currency(ENV === 'mainnet' ? 1 : 11155111, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', 18, 'ETH')
export const ETH_Token: Token = {
	isNative: true,
	symbol: 'ETH',
	logo: '/images/token/eth.png',
	contract: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18,
	chain: 'eth'
}
export const BBTC_ETH_Token: Token = {
	symbol: 'BBTC',
	logo: '/images/token/bbtc.png',
	contract: ENV === 'mainnet' ? BBTC : '0xf84e8a0c702Bc48672D52dc965D724A90F173fe9',
	decimals: 18,
	chain: 'eth'
}
export const BBUSD_ETH_Token: Token = {
	symbol: 'BBUSD',
	logo: '/images/token/bbusd.png',
	contract: ENV === 'mainnet' ? BBUSD : '0xc55757B0c44854572DE82dC52D6a7Aa01cAde8Fd',
	decimals: 18,
	chain: 'eth'
}
export const USDC_ETH_Token: Token = {
	symbol: 'USDC',
	logo: '/images/token/usdc.png',
	contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
	decimals: 6,
	chain: 'eth'
}
export const BB_ETH_TOKEN = new Currency(ENV === 'mainnet' ? 1 : 11155111, BB_ETH_ADDRESS, 18, 'BB', 'BB', '/images/token/bb.png')
export const ETH_BBTC_Token = BBTC_ETH_Token
export const ETH_BBUSD_Token = BBUSD_ETH_Token
export const eth_bbtc_contract = new Contract(BBTC_ETH_Token.contract, erc20_abi, provider_eth)
export const eth_bbusd_contract = new Contract(BBUSD_ETH_Token.contract, erc20_abi, provider_eth)

export const sENA_ETH_Token: Token = {
	symbol: 'sENA',
	logo: '/images/token/sena.png',
	contract: '0x8bE3460A480c80728a8C4D7a5D5303c85ba7B3b9',
	decimals: 18,
	chain: 'eth'
}

export const USDE_ETH_Token: Token = {
	symbol: 'USDE',
	logo: '/images/token/usde.png',
	contract: '0x4c9EDD5852cd905f086C759E8383e09bff1E68B3',
	decimals: 18,
	chain: 'eth'
}

// BB staked
export const stBB = '0x22aAC17E571D6651880d057e310703fF4C7c3483'
export const stBB_Token: Token = {
	symbol: 'stBB',
	logo: '/images/token/stbb.png',
	contract: stBB,
	decimals: 18,
	chain: 'bb'
}
export const stBBTC = '0x7F150c293c97172C75983BD8ac084c187107eA19'
export const stBBTC_Token: Token = {
	symbol: 'stBBTC',
	logo: '/images/token/stbbtc.png',
	contract: stBBTC,
	decimals: 18,
	chain: 'bb'
}
export const stbbtc_contract = new Contract(stBBTC, erc20_abi, provider_bb)
export const stbb_contract = new Contract(stBB, erc20_abi, provider_bb)

// Other tokens
export const AUCTION = ENV === 'mainnet' ? '0xa9b1eb5908cfc3cdf91f9b8b3a74108598009096' : '0x11daCde843e735BAD4CE928A25d8F262BADC4993'
export const AUCTION_SOL = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
export const DAII = ENV === 'mainnet' ? '0x1981e32c2154936741ab6541a737b87c68f13ce1' : '0xF4Bd201f0923284938A198e4cBe2247A58006CAb'
export const MUBI = ENV === 'mainnet' ? '0x38e382f74dfb84608f3c1f10187f6bef5951de93' : '0x56Ac28C625a4AbD89c2D86f09A839652d03854d5'

export const AUCTION_Token: Token = {
	symbol: 'AUCTION',
	logo: '/assets/coin/auction.png',
	contract: AUCTION,
	decimals: 18,
	chain: 'bb'
}

// base
export const ETH_BASE_Token: Token = {
	isNative: true,
	symbol: 'ETH',
	logo: '/images/token/eth.png',
	contract: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18,
	chain: 'base'
}
const baseUsdcAddress = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913'
export const USDC_BASE_Token: Token = {
	symbol: 'USDC',
	logo: '/images/token/usdt.png',
	contract: baseUsdcAddress,
	decimals: 6,
	chain: 'base'
}

// SOL
export const AUCTION_SOL_TOKEN: Token = {
	symbol: 'AUCTION',
	logo: '/assets/coin/auction.png',
	contract: AUCTION_SOL,
	decimals: 18,
	chain: 'sol'
}

export const BB_SOL_TOKEN: Token = {
	symbol: 'BB',
	logo: '/assets/coin/bb.png',
	contract: LZ_BB_MINT_ADDRESS,
	decimals: 18,
	chain: 'sol'
}

export function getTokenByName(chain: allChainNames, tokenName: string, address?: string): Token {
	if (address && equalCase(address, stBBTC)) return stBBTC_Token

	chain = chain.toLowerCase() as allChainNames

	switch (chain) {
		case 'eth':
			switch (tokenName) {
				case 'bbtc':
				case 'btc':
					return BBTC_ETH_Token
				case 'usdt':
					return USDT_Token
				case 'eth':
					return ETH_Token
				case 'usdc':
					return USDC_ETH_Token
				case 'uscc':
					return USCC_Token
				case 'usyc':
					return USYC_Token
			}

		case 'bsc':
			switch (tokenName) {
				case 'btc':
				case 'btcb':
					return BTCB_Token
				case 'sol':
					return BSC_SOL_Token
				case 'usdt':
					return BSC_USD_Token
				case 'bnb':
					return BNB_Token
			}

		case 'bb':
			switch (tokenName) {
				case 'btc':
				case 'bbtc':
					return BBTC_BB_Token
				case 'usdt':
					return BBUSD_BB_Token
				case 'usdy':
					return USDY_Token
			}

		case 'base':
			switch (tokenName) {
				case 'eth':
					return ETH_BASE_Token
				case 'usdc':
					return USDC_BASE_Token
			}
	}

	console.error('Unkown token')
	return BBTC_ETH_Token
}
