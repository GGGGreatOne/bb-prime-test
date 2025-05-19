import { IS_SOLANA_DEVNET, SOLANA_DEVNET_ENDPOINT } from '@/const'
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react'
import { Connection } from '@solana/web3.js'
import { useMemo } from 'react'

export function useSolanaConnection() {
	const { connection } = useAppKitConnection()

	return useMemo(
		() => ({
			connection: IS_SOLANA_DEVNET ? new Connection(SOLANA_DEVNET_ENDPOINT) : connection
		}),
		[connection]
	)
}
