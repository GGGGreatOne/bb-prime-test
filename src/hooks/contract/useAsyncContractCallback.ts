import { useConfig } from 'wagmi'
import { Config, estimateGas, getTransactionReceipt, simulateContract, SimulateContractParameters, waitForTransactionReceipt } from '@wagmi/core'
import { useCallback } from 'react'
import { encodeFunctionData } from 'viem'
import GetEstGasLimitResult from './useEstGasLimit'

export function useSimulateContractCallback() {
	const wagmiConfig = useConfig() as Config

	return useCallback(
		async (parameters: SimulateContractParameters) => {
			const ret = await simulateContract(wagmiConfig, parameters)

			if (parameters.chainId === 6001) {
				const _gas = await estimateGas(wagmiConfig, {
					to: parameters.address,
					account: parameters.account ?? undefined,
					chainId: parameters.chainId,
					value: parameters.value,
					nonce: parameters.nonce,
					data: encodeFunctionData({
						abi: parameters.abi,
						functionName: parameters.functionName,
						args: parameters.args
					})
				})
				ret.request.gas = GetEstGasLimitResult(_gas)
			}
			console.log('[Simulate passed]')
			return ret
		},
		[wagmiConfig]
	)
}

export function useWaitForTransactionReceiptCallback() {
	const wagmiConfig = useConfig() as Config

	return useCallback(
		async (hash: `0x${string}`) => {
			try {
				const receipt = await waitForTransactionReceipt(wagmiConfig, { hash, pollingInterval: 5_000, retryCount: 100 })
				return receipt
			} catch (error) {
				console.log('🚀 ~ error:', error)
				throw error
			}
		},
		[wagmiConfig]
	)
}

export function useGetTransactionReceiptCallback() {
	const wagmiConfig = useConfig() as Config

	return useCallback(
		async (hash: `0x${string}`) => {
			try {
				const receipt = await getTransactionReceipt(wagmiConfig, { hash })
				return receipt
			} catch (error) {
				console.log('🚀 ~ error:', error)
				throw error
			}
		},
		[wagmiConfig]
	)
}
