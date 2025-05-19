import axios, { scoreApi } from './axios'

export async function getTokenPrice() {
	return await axios<TYPE_RpcData>({
		url: '/token/price',
		method: 'get'
	})
}

export async function getPortfolio(address: string) {
	return await axios<any>({
		url: '/user/tokenPortfolio',
		method: 'get',
		params: { address }
	})
}

export async function getAddressScore(address: string) {
	return await scoreApi<any>({
		url: '/user/score',
		method: 'get',
		params: { address }
	})
}
