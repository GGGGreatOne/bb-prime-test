'use client'
import { useEffect } from 'react'
import { useBlockNumber } from 'wagmi'
import { useAllTransactionsByChainId, useUpdateRecentTransaction } from './hooks'
import { TransactionDetails } from './types'
import { useGetTransactionReceiptCallback } from '../contract/useAsyncContractCallback'
import { useEvmWallet } from '../useWallet'

export function shouldCheck(lastBlockNumber: number, tx: TransactionDetails): boolean {
	if (tx.receipt) return false
	if (!tx.lastCheckedBlockNumber) return true
	const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
	if (blocksSinceCheck < 1) return false
	const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
	if (minutesPending > 60) {
		return blocksSinceCheck > 9
	} else if (minutesPending > 5) {
		return blocksSinceCheck > 2
	} else {
		return true
	}
}

export default function Updater(): null {
	const { chainId } = useEvmWallet()
	const { data: lastBlockNumber } = useBlockNumber({
		watch: true
	})

	const transactions = useAllTransactionsByChainId(chainId)
	const getTransactionReceipt = useGetTransactionReceiptCallback()
	const updateTransaction = useUpdateRecentTransaction()

	useEffect(() => {
		if (!chainId || !lastBlockNumber) return

		Object.keys(transactions ?? {})
			.filter(hash => shouldCheck(Number(lastBlockNumber), transactions![hash]!))
			.forEach(async hash => {
				try {
					const receipt = await getTransactionReceipt(hash as `0x${string}`)
					const _tx = transactions![hash]!
					if (receipt) {
						updateTransaction({
							..._tx,
							receipt: {
								from: receipt.from,
								to: receipt.to,
								status: receipt.status
							},
							lastCheckedBlockNumber: Number(lastBlockNumber),
							confirmedTime: new Date().getTime()
						})
					} else {
						updateTransaction({ ...transactions![hash]!, lastCheckedBlockNumber: Number(lastBlockNumber) })
					}
				} catch (error) {
					console.error(`failed to check transaction hash: ${hash}`, error)
				}
			})
	}, [chainId, transactions, lastBlockNumber, getTransactionReceipt, updateTransaction])

	return null
}
