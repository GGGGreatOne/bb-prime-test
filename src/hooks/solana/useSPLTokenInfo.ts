import { PublicKey } from '@solana/web3.js'
import { useRequest } from 'ahooks'
import { Metaplex } from '@metaplex-foundation/js'
import { useSolanaConnection } from './useSolanaConnection'

export function useSPLTokenInfo(mintAddress: string) {
	const { connection } = useSolanaConnection()
	const { data } = useRequest(
		async () => {
			try {
				const mintPublicKey = new PublicKey(mintAddress)
				const metaplex = Metaplex.make(connection!)
				const tokenMetadata = await metaplex.nfts().findByMint({ mintAddress: mintPublicKey })

				return {
					name: tokenMetadata.name,
					symbol: tokenMetadata.symbol,
					uri: tokenMetadata.uri,
					decimals: tokenMetadata.mint.decimals,
					supply: tokenMetadata.mint.supply.basisPoints?.toString(),
					image: tokenMetadata.json?.image,
					description: tokenMetadata.json?.description
				}
			} catch (error) {
				console.error(error)
				return undefined
			}
		},
		{
			refreshDeps: [mintAddress],
			ready: !!connection,
			cacheKey: 'spl-token',
			cacheTime: Infinity,
			staleTime: Infinity
		}
	)

	return data
}
