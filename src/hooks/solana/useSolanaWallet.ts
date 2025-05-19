import { Provider } from '@reown/appkit-adapter-solana/react'
import { useAppKitProvider } from '@reown/appkit/react'

export function useSolanaWallet() {
	const { walletProvider } = useAppKitProvider<Provider>('solana')

	return { walletProvider: walletProvider }
}
