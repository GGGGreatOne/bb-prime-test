import { PublicKey } from '@solana/web3.js'
import { useRequest } from 'ahooks'
import { useConnectedAddress } from '../useWallet'
import { useSolanaConnection } from './useSolanaConnection'

export default function useTokenAccount(tokenAddress: string, owner?: string) {
	const { isSolana } = useConnectedAddress()
	const { connection } = useSolanaConnection()
	const { data } = useRequest(
		async () => {
			try {
				if (!owner || !tokenAddress || !connection || !isSolana) return
				const account = new PublicKey(owner)
				const mint = new PublicKey(tokenAddress)
				const tokenAccount = await connection.getTokenAccountsByOwner(account, {
					mint: mint
				})
				return tokenAccount.value[0]?.pubkey
			} catch (err) {
				console.error('🚀 ~ const{data}=useRequest ~ err:', err)
				return
			}
		},
		{
			ready: !!tokenAddress && !!owner && !!connection,
			refreshDeps: [owner, tokenAddress, isSolana, connection]
		}
	)
	return data
}
