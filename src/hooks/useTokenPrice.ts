import { createStore, useStore } from 'zustand'
import { getTokenPrice } from '@/lib/requests'
import { equalCase } from '@/lib/utils'

type Price = {
	price: number
	symbol: string
	token: string
}

export const priceStore = createStore<{
	prices: null | Price[]
}>(() => ({
	prices: []
}))

if (typeof window !== 'undefined') {
	const request = () => {
		let circleWay = false

		getTokenPrice()
			.then(res => {
				const result = res.data.result

				if (Array.isArray(result) && result.length > 0) {
					priceStore.setState({ prices: result })
				}
			})
			.catch(() => {
				circleWay = true
				setTimeout(request, 3000)
			})
			.finally(() => {
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				!circleWay && setTimeout(request, 60 * 1000)
			})
	}
	// request()
}

export function tokenPrice(name: string, prices: null | Price[]) {
	if (!prices) return 0

	const find = prices?.find(item => equalCase(item.symbol, name))

	if (find) return find.price

	if (equalCase(name, 'BB') || equalCase(name, 'stBB')) {
		return prices?.find(item => equalCase(item.symbol, 'WBB'))?.price || 0
	} else if (name.endsWith('BTC') || name === 'BTCB') {
		return prices?.find(item => equalCase(item.symbol, 'BTC'))?.price || 0
	} else if (name.endsWith('USD') || name === 'USDT' || name === 'USDC') {
		return 0.999
	}

	return 0
}

export function useTokenPrice() {
	const { prices } = useStore(priceStore)

	return { getPrice: (name: string) => tokenPrice(name, prices) }
}
