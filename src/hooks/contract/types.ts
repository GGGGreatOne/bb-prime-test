import { Address } from 'viem'

export type ContractAddressesType<K extends number = number> = Record<K, Address>

export type ContractAddressesMapType<T extends string = string, K extends number = number> = Record<T, ContractAddressesType<K>>
