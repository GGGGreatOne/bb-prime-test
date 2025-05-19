'use client'

import { PropsWithChildren } from 'react'
import Header from './header'
// import Background from './background'
import ConnectWallet from './connect-wallet'
// import { getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2'
// import { addEventListener } from '@/lib/window-event'
// import { walletConnect } from 'wagmi/connectors'
import MobileHeader from './mobile/header'
import MobileTabbar from './mobile/tabbar'
import Effects from './effects'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { Web3Provider } from './provider'
import Footer from '@/layout/footer'
import { LocalUserInfoProvider } from '@/layout/localUserInfoProvider'
// import Updater from '../hooks/transactions/updater'

export default function Layout({ children }: PropsWithChildren<object>) {
	// const [init, setInit] = useState(false)
	// useEffect(() => {
	// 	setInit(true)
	// }, [])
	// const { resolvedTheme } = useTheme()
	// const [customConfig, setConfig] = useState(config)
	// const pathname = usePathname()

	// useEffect(() => {
	// 	const addBinance = () => {
	// 		const binanceConnector = getWagmiConnectorV2()
	// 		configParams.connectors.push(binanceConnector())
	// 		setConfig(createConfig(configParams))
	// 	}
	// 	addEventListener('wallet-add-binance', addBinance)
	// 	const addWC = () => {
	// 		configParams.connectors.push(walletConnect({ projectId: 'd5c60d9c3c07bc864e9f891660630ecb' }))
	// 		setConfig(createConfig(configParams))
	// 	}
	// 	addEventListener('wallet-add-wc', addWC)
	// }, [])

	return (
		<>
			<Web3Provider>
				<LocalUserInfoProvider>
					<div className='relative flex min-h-screen flex-col overflow-hidden font-medium max-sm:block'>
						{/* <Background /> */}
						<Header />
						<MobileHeader />
						{/* <Updater /> */}
						{children}
						<Footer />
					</div>

					{/*<MobileTabbar />*/}

					<ConnectWallet />
				</LocalUserInfoProvider>
			</Web3Provider>
		</>
	)
}
