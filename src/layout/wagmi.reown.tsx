import { ENV } from '@/const'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { bounceBit, bsc, mainnet } from '@reown/appkit/networks'
import { cookieStorage, createStorage } from 'wagmi'
import { bbTestnet } from './wagmi'

export const projectId = 'd5c60d9c3c07bc864e9f891660630ecb'

if (!projectId) {
	throw new Error('Project ID is not defined')
}
const networks = ENV === 'mainnet' ? [mainnet, bounceBit, bsc] : [mainnet, bounceBit, bbTestnet, bsc]

export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage
	}),
	ssr: true,
	projectId,
	networks
})
