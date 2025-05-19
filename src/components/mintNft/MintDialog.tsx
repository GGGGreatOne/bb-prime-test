import ContractDialog from '@/components/contract-dialog'
import { useCallback, useEffect, useState } from 'react'
import { NFTApi } from '@/lib/axios'
import nfTAbi from '@/contract/json/BouncebitPrimeNFT.json'
import { PRIME_NFT } from '@/contract/primeNFT'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useConnectedAddress } from '@/hooks/useWallet'
import { useJWTToken } from '@/hooks/useJWTToken'
import { Hash } from '@/app/nftmint/page'

export const MintDialog = ({
	tx,
	state,
	setOpen,
	setTx,
	setState
}: {
	state: 'pending' | 'done' | 'error'
	tx: Hash | undefined
	setOpen: (o: boolean) => void
	setTx: (t: Hash) => void
	setState: (s: 'pending' | 'done' | 'error') => void
}) => {
	const { address } = useConnectedAddress()
	const token = useJWTToken()

	const [errMsg, setErrMsg] = useState('')
	const [txLink, setTxLink] = useState('')

	const { writeContractAsync } = useWriteContract()
	const mint = useCallback(async () => {
		if (!address) return
		setState('pending')
		const res = await NFTApi({
			url: '/extra/prime/signature/mint',
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		//code 400: Unfinished tasks
		try {
			if (res.data.code === 200) {
				const signature = res.data.data.signature
				const mintRes = await writeContractAsync({
					abi: nfTAbi,
					address: PRIME_NFT,
					functionName: 'mint',
					args: [signature]
				})
				setTx(mintRes)
			} else {
				throw new Error('Unfinished tasks')
			}
		} catch (e) {
			setState('error')
			setErrMsg(e?.toString() ?? '')
		}
	}, [token, address, writeContractAsync, setState, setTx])

	const transactionRes = useWaitForTransactionReceipt({ hash: tx })

	useEffect(() => {
		if (transactionRes.fetchStatus === 'idle') {
			if (transactionRes.isSuccess) {
				setTxLink(`https://bbscan.io/tx/${tx}`)
				setState('done')
			}
			if (transactionRes.isError) {
				setErrMsg(transactionRes?.failureReason?.message ?? '')
				setState('error')
			}
		}
	}, [transactionRes, tx, setState])

	useEffect(() => {
		mint().then()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return <ContractDialog title={'Mint NFT'} setOpen={setOpen} state={state} errMsg={errMsg} link={txLink} />
}
