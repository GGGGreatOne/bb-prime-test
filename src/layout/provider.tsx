import { createAppKit } from '@reown/appkit/react'
import { BaseWalletAdapter, SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { AppKitNetwork, bounceBit } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { projectId, wagmiAdapter } from './wagmi.reown'
import { WagmiProvider, type Config } from 'wagmi'
import { ENV, IS_SOLANA_DEVNET } from '@/const'
import { bbTestnet } from './wagmi'

const solanaWeb3JsAdapter = new SolanaAdapter({
	wallets: [
		new PhantomWalletAdapter(
			IS_SOLANA_DEVNET
				? {
						network: 'devnet'
					}
				: {}
		) as unknown as BaseWalletAdapter<string>,
		new SolflareWalletAdapter() as unknown as BaseWalletAdapter<string>
	]
})

const metadata = {
	name: 'BounceBit',
	description: 'BounceBit - Unlock Institutional Yield with CeDeFi Solutions',
	url: 'https://portal.bouncebit.io', // origin must match your domain & subdomain
	icons: ['https://oss.bouncebit.io/images/d621feb54fbb4ac946e6bf3032b4ce0f-1739872077.png']
}

// const networks = ENV === 'mainnet' ? [solana, mainnet, bsc, bounceBit] : [solana, solanaDevnet, mainnet, bsc, bounceBit, bbTestnet]
const networks = ENV === 'mainnet' ? [bounceBit] : [bounceBit, bbTestnet]
createAppKit({
	adapters: [wagmiAdapter, solanaWeb3JsAdapter],
	networks: networks as unknown as [AppKitNetwork, ...AppKitNetwork[]],
	metadata: metadata,
	projectId,
	themeMode: 'dark',
	features: {
		email: false,
		socials: false,
		analytics: true // Optional - defaults to your Cloud configuration
	}
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())
	// const devEndpoint = 'https://devnet.helius-rpc.com/?api-key=9fc1bee2-a8b0-4ed5-93f6-a0dfc850013c'
	return (
		<WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={undefined}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	)
}
