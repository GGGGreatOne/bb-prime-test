import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { useRequest } from 'ahooks'
import BigNumber from 'bignumber.js'
import { useConnectedAddress } from '../useWallet'
import { useSolanaConnection } from './useSolanaConnection'

export function useSolBalance(account?: string) {
	const { isSolana } = useConnectedAddress()
	const { connection } = useSolanaConnection()
	const { data } = useRequest(
		async () => {
			try {
				if (!account || !connection || !isSolana) return
				const publicKey = new PublicKey(account)
				const balance = await connection.getBalance(publicKey)
				const balanceInSol = BigNumber(balance).div(LAMPORTS_PER_SOL)
				return balanceInSol
			} catch (err) {
				console.error('🚀 ~ const{data}=useRequest ~ err:', err)
				return
			}
		},
		{
			ready: !!account,
			refreshDeps: [account, isSolana],
			pollingInterval: 6_000
		}
	)
	return data
}
