import { BASE_ID, BB_ID, BSC_ID, ETH_ID } from '@/contract'
import { Token } from '@/contract/erc20'
import { PublicKey } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Connector } from 'wagmi'

BigNumber.config({ EXPONENTIAL_AT: 1e9 })

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function shortAddress(address: string, headLength = 6, endLength = 4) {
	if (typeof address !== 'string') return
	if (address.length <= headLength + endLength) {
		return address
	}
	return `${address.slice(0, headLength)}...${address.slice(-endLength)}`
}

export function formatBalance(balance: number | string | bigint | BigNumber | any, decimasls?: number) {
	if (typeof balance === 'number' || typeof balance === 'string' || typeof balance === 'bigint' || BigNumber.isBigNumber(balance)) {
		const bn = new BigNumber(String(balance))
		if (decimasls) return bn.shiftedBy(-decimasls).toFormat()
		else return bn.toFormat()
	}
	return '0'
}

export function smartBalance(amount: BigNumber | string | number | bigint, decimals: number, toFixNumber = 5) {
	if (!amount) return '0'

	if (!BigNumber.isBigNumber(amount)) amount = BigNumber(String(amount))

	if (decimals) amount = amount.shiftedBy(-decimals)

	if (toFixNumber === 2 && amount.isGreaterThan(0) && amount.isLessThan(0.01)) return '<0.01'
	if (toFixNumber === 5 && amount.isGreaterThan(0) && amount.isLessThan(1 / 10 ** toFixNumber)) return '<0.00001'
	if (toFixNumber === 5) {
		if (amount.isGreaterThan(10000)) return BigNumber(+amount.toFixed(0, 1)).toFormat()
		else if (amount.isGreaterThan(1000)) return BigNumber(+amount.toFixed(2, 1)).toFormat()
		else if (amount.isGreaterThan(100)) return BigNumber(+amount.toFixed(4, 1)).toFormat()
	}
	if (toFixNumber === 2) {
		if (amount.isGreaterThan(10000)) return BigNumber(+amount.toFixed(0, 1)).toFormat()
	}

	return BigNumber(+amount.toFixed(toFixNumber, 1)).toFormat()
}

export function figureUnitAndFixed(value: number | string | any, decimalPlaces: number = 2) {
	if ((typeof value !== 'number' && typeof value !== 'string') || !value) return 0
	value = Number(value)
	const sign = value >= 0 ? '' : '-'
	value = Math.abs(value)

	if (value >= 10 ** 9) return `${sign}${Number(Number((value / 10 ** 9).toFixed(decimalPlaces)))}B`
	if (value >= 10 ** 6) return `${sign}${Number(Number((value / 10 ** 6).toFixed(decimalPlaces)))}M`
	if (value >= 10 ** 3) return `${sign}${Number(Number((value / 10 ** 3).toFixed(decimalPlaces)))}K`
	return `${sign}${Number(value.toFixed(decimalPlaces))}`
}

export function thousandsSeparator(n: string | number | any, sign: string = ',') {
	if (typeof n === 'string' || typeof n === 'number') {
		n = String(n)
		const reg = /\B(?=(\d{3})+($|\.))/g

		if (n.includes('.')) {
			const nArr = n.split('.')
			nArr[0] = nArr[0].replace(reg, `$&${sign}`)

			return nArr.join('.')
		}

		return n.replace(reg, `$&${sign}`)
	} else return 0
}

export function formatPrice(value: string | number, decimalPlaces: number = 2) {
	if (+value < 0 || value === '' || value === undefined) return 0
	return thousandsSeparator(toFixed(value, decimalPlaces))
}

export function toFixed(value: string | number, decimalPlaces: number = 2) {
	if (typeof value !== 'number' && typeof value !== 'string') {
		return 0
	}
	return Number(Number(value).toFixed(decimalPlaces))
}

export function equalCase(a: string, b: string) {
	return !!a && !!b && a.toLowerCase() === b.toLowerCase()
}

export async function checkChain(connector: Connector, token: Token, switchChainAsync: any) {
	const chainId = await connector!.getChainId()

	if (token.chain === 'eth') {
		if (chainId != ETH_ID)
			await switchChainAsync({ chainId: ETH_ID }).catch((e: any) => {
				console.error('[switch chain error]', e)
			})
	} else if (token.chain === 'bsc') {
		if (chainId != BSC_ID)
			await switchChainAsync({ chainId: BSC_ID }).catch((e: any) => {
				console.error('[switch chain error]', e)
			})
	} else if (token.chain === 'bb') {
		if (chainId != BB_ID)
			await switchChainAsync({ chainId: BB_ID }).catch((e: any) => {
				console.error('[switch chain error]', e)
			})
	} else if (token.chain === 'base') {
		if (chainId != BASE_ID)
			await switchChainAsync({ chainId: BASE_ID }).catch((e: any) => {
				console.error('[switch chain error]', e)
			})
	}

	await new Promise(resolve1 => setTimeout(resolve1, 500))

	const chainId2 = await connector!.getChainId()
	if (
		(token.chain === 'base' && chainId2 != BASE_ID) ||
		(token.chain === 'eth' && chainId2 != ETH_ID) ||
		(token.chain == 'bsc' && chainId2 !== BSC_ID) ||
		(token.chain === 'bb' && chainId2 != BB_ID)
	) {
		return true
	}

	return false
}

export function getErrorCode(error: any) {
	if (error?.info?.error?.data) return error.info.error.data

	const msg: string = error?.info?.error?.message
	console.log('msg', msg)
	if (/execution reverted:/.test(msg!)) {
		return msg.slice(msg.indexOf('0x'))
	}
}

export function isValidSolanaAddress(address: string) {
	try {
		new PublicKey(address)
		return true
	} catch {
		console.error('This address is invalid')
		return false
	}
}
