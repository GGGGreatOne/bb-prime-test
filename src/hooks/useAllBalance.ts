import { ENV } from '@/const'
import { getChainId } from '@/contract'
import {
	BB_Token,
	BBTC_BB_Token,
	BBTC_BSC_Token,
	BBTC_ETH_Token,
	BBUSD_BB_Token,
	BBUSD_BSC_Token,
	BBUSD_ETH_Token,
	BNB_Token,
	BSC_SOL_Token,
	BSC_USD_Token,
	BTCB_Token,
	erc20_stBBTC_locked_abi,
	ETH_BASE_Token,
	ETH_Token,
	// erc20_abi,
	FDUSD_Token,
	stBB_Token,
	stBBTC,
	stBBTC_Token,
	Token,
	USCC_Token,
	USDC_ETH_Token,
	USDC_BASE_Token,
	USDT_Token,
	USDY_Token,
	USYC_Token,
	WBTC_Token
} from '@/contract/erc20'
import { getPortfolio } from '@/lib/requests'
import { addEventListener } from '@/lib/window-event'
import { Address } from 'viem'
import { useReadContract } from 'wagmi'
import { createStore, useStore } from 'zustand'
import { useActiveWeb3React } from './useWallet'
import { useCurrencyBalances } from './contract'
import { Currency } from '@/constants'
import { useEffect } from 'react'

const reserveKeys: {
	key: string
	token: Token
}[] = [
	{ key: 'WBTC', token: WBTC_Token },
	{ key: 'BTCB', token: BTCB_Token },
	{ key: 'ethUSDT', token: USDT_Token },
	{ key: 'FDUSD', token: FDUSD_Token },
	{ key: 'bscUSDT', token: BSC_USD_Token },
	{ key: 'bscSOL', token: BSC_SOL_Token },
	{ key: 'USDY', token: USDY_Token },
	{ key: 'USCC', token: USCC_Token },
	{ key: 'USYC', token: USYC_Token },
	{ key: 'BB', token: BB_Token },
	{ key: 'ETH', token: ETH_Token },
	{ key: 'BNB', token: BNB_Token },
	{ key: 'ethBBTC', token: BBTC_ETH_Token },
	{ key: 'ethBBUSD', token: BBUSD_ETH_Token },
	{ key: 'ethUSDC', token: USDC_ETH_Token },
	{ key: 'bscBBTC', token: BBTC_BSC_Token },
	{ key: 'bscBBUSD', token: BBUSD_BSC_Token },
	{ key: 'bbBBTC', token: BBTC_BB_Token },
	{ key: 'bbBBUSD', token: BBUSD_BB_Token },
	{ key: 'stBB', token: stBB_Token },
	{ key: 'stBBTC', token: stBBTC_Token },
	{ key: 'stBBTC_locked', token: stBBTC_Token },
	{ key: 'baseETH', token: ETH_BASE_Token },
	{ key: 'baseUSDC', token: USDC_BASE_Token }
]

export const addressStore = createStore<{ address: string }>(() => ({
	address: ''
}))

export const allBalanceStore = createStore<{ allBalance: Record<string, string | undefined>; address: string }>(() => ({
	allBalance: {},
	address: ''
}))

export function useAllBalance() {
	const store = useStore(allBalanceStore)

	return store
}

const devTokens: Token[] = [USDT_Token, BBTC_ETH_Token]

const mainnetTokens: Token[] = reserveKeys.filter(v => v.key !== 'stBBTC_locked').map(v => v.token)

export function useGetAllBalance() {
	const { address } = useActiveWeb3React()

	const tokens: Currency[] =
		ENV === 'mainnet'
			? mainnetTokens.map(v =>
					v.isNative
						? Currency.getNativeCurrency(getChainId(v.chain))
						: new Currency(getChainId(v.chain), v.contract as Address, v.decimals, v.symbol, v.name, v.logo)
				)
			: devTokens.map(v => new Currency(getChainId(v.chain), v.contract as Address, v.decimals, v.symbol, v.name, v.logo))

	const tokensBalance = useCurrencyBalances(address || '', tokens)

	const { data: stBBTC_lockedRes, refetch: refetch_stBBTC_lockedRes } = useReadContract({
		address: stBBTC,
		chainId: getChainId('bb'),
		abi: erc20_stBBTC_locked_abi,
		functionName: 'lockOf',
		args: [address as Address],
		query: {
			enabled: !!address,
			refetchInterval: 10_000
		}
	})

	useEffect(() => {
		if (!address) {
			allBalanceStore.setState({
				address: address,
				allBalance: {}
			})
			return
		}

		getPortfolio(address).then(res => {
			const result = res.data.result?.data

			if (Array.isArray(result)) {
				const balanceMap: any = {}
				const currentAll = allBalanceStore.getState().allBalance

				result.forEach(item => {
					if (!reserveKeys.map(v => v.token.symbol).includes(item.symbol)) balanceMap[item.symbol] = item.amount
				})

				allBalanceStore.setState(({ address }) => ({ allBalance: { ...currentAll, ...balanceMap }, address }))
			}
		})

		const getTokenBalance = (token: Token) => {
			const chainId = getChainId(token.chain)
			const _tokenBalance = tokensBalance.balances.find(
				v =>
					(v?.currency.address.toLowerCase() === token.contract.toLowerCase() && v?.currency.chainId === chainId) ||
					(v?.currency.isNative && token.isNative && v.currency.chainId === chainId)
			)

			if (_tokenBalance) {
				return _tokenBalance.raw.toString()
			}
			return '0'
		}

		const updateBalance = (storeArr: { key: string; token: Token; value?: string }[]) => {
			const currentAll = allBalanceStore.getState().allBalance
			storeArr.forEach(({ key, token, value }) => {
				const newValue = value ? value : token ? getTokenBalance(token) : '0'
				if (newValue !== currentAll[key] && newValue) {
					allBalanceStore.setState(({ allBalance, address }) => ({
						allBalance: { ...allBalance, [key]: newValue },
						address
					}))
				}
			})
		}

		const handler = () => {
			if (ENV === 'mainnet') {
				// Basic tokens
				const storeArr: { key: string; token: Token; value?: string }[] = reserveKeys.map(v => {
					return { key: v.key, token: v.token, value: v.key === 'stBBTC_locked' ? String(stBBTC_lockedRes || '0') : undefined }
				})

				updateBalance(storeArr)
			} else {
				const storeArr: { key: string; token: Token; value?: string }[] = [
					{ key: 'USDT', token: USDT_Token },
					{ key: 'ethBBTC', token: BBTC_ETH_Token }
				]
				updateBalance(storeArr)
			}
		}

		handler()
	}, [address, stBBTC_lockedRes, tokensBalance.balances])

	useEffect(() => {
		const handler = () => {
			refetch_stBBTC_lockedRes()
			tokensBalance.refetchBalances()
		}
		addEventListener('refresh-all-balance', handler)
	}, [refetch_stBBTC_lockedRes, tokensBalance])
}
