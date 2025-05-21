// import { BASE_RPC, BB_RPC, BSC_RPC, ETH_RPC } from '@/contract'
import { BB_RPC } from '@/contract'
import { getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2'
import { http, createConfig } from 'wagmi'
// import { mainnet, sepolia, bsc, base } from 'wagmi/chains'
import { ENV } from '@/const'
import { walletConnect } from 'wagmi/connectors'

const bb = {
	id: 6001,
	name: 'BounceBit Mainnet',
	network: 'bb',
	nativeCurrency: {
		decimals: 18,
		name: 'BB',
		symbol: 'BB'
	},
	rpcUrls: {
		default: { http: ['https://fullnode-mainnet.bouncebitapi.com'] },
		public: { http: ['https://fullnode-mainnet.bouncebitapi.com'] }
	},
	blockExplorers: {
		etherscan: { name: 'BBScan', url: 'https://bbscan.io/' },
		default: { name: 'BBScan', url: 'https://bbscan.io/' }
	}
}
export const bbTestnet = {
	id: 6000,
	name: 'BounceBit Testnet',
	network: 'bb',
	nativeCurrency: {
		decimals: 18,
		name: 'BB',
		symbol: 'BB'
	},
	rpcUrls: {
		default: { http: ['https://fullnode-testnet.bouncebitapi.com'] },
		public: { http: ['https://fullnode-testnet.bouncebitapi.com'] }
	},
	blockExplorers: {
		etherscan: { name: 'BBScan', url: 'https://testnet.bbscan.io/' },
		default: { name: 'BBScan', url: 'https://testnet.bbscan.io/' }
	}
}

const binanceConnector = getWagmiConnectorV2()

// const chains = ENV === 'mainnet' ? [mainnet, bsc, bb, base] : [mainnet, bsc, bb, base, bbTestnet, sepolia]
const chains = ENV === 'mainnet' ? [bb] : [bb, bbTestnet]

export const configParams: any = {
	chains: chains,
	connectors: [walletConnect({ projectId: '63982669715ffad2503de874184bcd1e' }), binanceConnector()],
	transports: {
		// [mainnet.id]: http(ETH_RPC),
		// [bsc.id]: http(BSC_RPC),
		[bb.id]: http(BB_RPC)
		// [sepolia.id]: http('https://sepolia.infura.io/v3/e162b48c42c74e698a84bf8524b31d40'),
		// [bbTestnet.id]: http(),
		// [base.id]: http(BASE_RPC)
	},
	ssr: true
}

export const config = createConfig(configParams)

// try {
// 	if (typeof window != undefined) {
// 		const wagmiStoreStr = window.localStorage.getItem('wagmi.store')
// 		if (wagmiStoreStr) {
// 			try {
// 				const store = JSON.parse(wagmiStoreStr)

// 				const id = store.state.connections.value[0] && store.state.connections.value[0][1].connector.id
// 				if (id === 'walletConnect') {
// 					configParams.connectors.push(walletConnect({ projectId: 'd5c60d9c3c07bc864e9f891660630ecb' }))
// 				} else if (id === 'BinanceW3WSDK') {
// 					const binanceConnector = getWagmiConnectorV2()
// 					configParams.connectors.push(binanceConnector())
// 				}
// 			} catch (e) {
// 				console.error(e)
// 			}
// 		}
// 	}
// } catch (e) {}

declare module 'wagmi' {
	interface Register {
		config: typeof config
	}
}
