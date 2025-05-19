import { Address, erc20Abi, maxUint256 } from 'viem'
import { useEvmWallet } from '../useWallet'
import { useCallback, useMemo } from 'react'
import { useTokenAllowance } from './useTokenAllowance'
import { useWriteContract } from 'wagmi'
import { useWaitForTransactionReceiptCallback } from './useAsyncContractCallback'
import { Currency, CurrencyAmount } from '@/constants'

type ApprovalState = 'UNKNOWN' | 'NOT_APPROVED' | 'PENDING' | 'APPROVED'

export function useApproveCallback(amountToApprove?: CurrencyAmount<Currency>, spender?: Address, useExact?: boolean) {
	const { address: account } = useEvmWallet()
	// const simulateContractCallback = useSimulateContractCallback()
	const isNative = useMemo(() => !!amountToApprove?.currency?.isNative, [amountToApprove?.currency?.isNative])
	// const addRecentTransaction = useAddRecentTransaction()
	const { writeContractAsync } = useWriteContract()
	const waitForTransactionReceiptCallback = useWaitForTransactionReceiptCallback()

	const currentAllowance = useTokenAllowance(amountToApprove?.currency, account as Address, spender)

	// const { pending } = useTransactionState(`approve_${amountToApprove?.currency.address}`)

	const approvalState: ApprovalState = useMemo(() => {
		if (isNative) return 'APPROVED'
		if (!currentAllowance.data || !amountToApprove) return 'UNKNOWN'
		// if (pending) return 'PENDING'
		if (currentAllowance.data.lessThan(amountToApprove)) return 'NOT_APPROVED'
		return 'APPROVED'
	}, [isNative, currentAllowance.data, amountToApprove])

	const approve = useCallback(async () => {
		if (!writeContractAsync || !amountToApprove || !spender || !account || isNative) throw new Error('Invalid params')
		if (approvalState !== 'NOT_APPROVED') throw new Error('Already approved')
		try {
			// TOTD usdt is bug
			// const result = await simulateContractCallback({
			// 	address: amountToApprove.currency.address,
			// 	abi: erc20Abi,
			// 	functionName: 'approve',
			// 	args: [spender, useExact ? amountToApprove.toBigint() : maxUint256],
			// 	account
			// })

			const hash = await writeContractAsync({
				address: amountToApprove.currency.address,
				abi: erc20Abi,
				functionName: 'approve',
				chainId: amountToApprove.currency.chainId,
				args: [spender, useExact ? amountToApprove.toBigint() : maxUint256],
				account: account as Address
			})

			const _result = await waitForTransactionReceiptCallback(hash)

			if (_result.status !== 'success') {
				throw 'Transaction failed'
			}
			// addRecentTransaction(`Approve ${amountToApprove.currency.symbol}`, hash, `approve_${amountToApprove.currency.address}`)

			return hash
		} catch (error) {
			console.error('aaaaa' + error)
			throw error
		}
	}, [writeContractAsync, amountToApprove, spender, account, isNative, approvalState, useExact, waitForTransactionReceiptCallback])

	return { approvalState, approve }
}
