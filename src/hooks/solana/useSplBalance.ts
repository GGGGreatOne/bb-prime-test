import { PublicKey } from '@solana/web3.js'
import { useRequest } from 'ahooks'
import { useSolanaConnection } from './useSolanaConnection'

export default function useSPLTokenBalance(tokenAccountAddress: PublicKey | undefined) {
	const { connection } = useSolanaConnection()
	const { data } = useRequest(
		async () => {
			try {
				if (!tokenAccountAddress || !connection) return
				const tokenPublicKey = new PublicKey(tokenAccountAddress)
				const balance = await connection.getTokenAccountBalance(tokenPublicKey)
				return {
					amount: balance.value.amount || '0',
					uiAmount: balance.value.uiAmount || 0
				}
			} catch (err) {
				console.error('🚀 ~ const{data}=useRequest ~ err:', err)
				return
			}
		},
		{
			ready: !!connection && !!tokenAccountAddress && !!connection,
			refreshDeps: [tokenAccountAddress],
			pollingInterval: 6_000
		}
	)
	return data
}
