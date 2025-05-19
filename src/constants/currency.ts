import invariant from 'tiny-invariant'
import { Address, zeroAddress } from 'viem'
import { validateAndParseEVMAddress } from './utils'

export class Currency {
	public readonly chainId: number
	public readonly address: Address
	public readonly decimals: number
	public readonly symbol: string
	public readonly name?: string
	public readonly logo?: string

	private static readonly defaultETHER: Currency = new Currency(1, zeroAddress, 18, '', '')

	constructor(chainId: number, address: Address, decimals: number, symbol: string, name?: string, logo?: string) {
		invariant(decimals >= 0 && decimals <= 255, 'DECIMALS ERROR')

		this.chainId = chainId
		this.address = validateAndParseEVMAddress(address)
		this.decimals = decimals
		this.symbol = symbol
		this.name = name
		this.logo = logo
	}

	public equals(other: any): boolean {
		if (this === other) return true
		return other instanceof Currency && this.chainId === other.chainId && this.address === other.address
	}

	public static getNativeCurrency(chainId?: number, decimals?: number, symbol?: string, name?: string, logo?: string) {
		if (!chainId) return this.defaultETHER
		return new Currency(chainId, zeroAddress, decimals ?? 18, symbol || '', name, logo)
	}

	public get isNative(): boolean {
		return this.address === zeroAddress
	}

	public sortsBefore(other: Currency): boolean {
		invariant(this.chainId === other.chainId, 'CHAIN_IDS')
		invariant(this.address !== other.address, 'ADDRESSES')
		return this.address.toLowerCase() < other.address.toLowerCase()
	}
}
