import DialogContainer from '@/components/dialog-container'
import WaleltImg from '@/components/wallet-img'
import { addEventListener } from '@/lib/window-event'
import CloseSVG from '@/svgs/close-sm.svg'
import { useEffect, useState } from 'react'
import { Connector, useAccount, useConnect } from 'wagmi'

export const wallets = [
	{ key: 'metamask', name: 'Metamask', id: 'metaMaskSDK' },
	{ key: 'wallet-connect', name: 'Wallet Connect', id: 'walletConnect' },
	{ key: 'binance', name: 'Binance Web3 Wallet', id: 'BinanceW3WSDK', otherId: 'wallet.binance.com' },
	{ key: 'okx', name: 'OKX Wallet', id: 'com.okex.wallet' },
	{ key: 'rabby', name: 'Rabby Wallet', id: 'io.rabby' },
	{ key: 'bitget', name: 'Bitget Wallet', id: 'com.bitget.web3' },
	{ key: 'trust', name: 'Trust Wallet', id: 'com.trustwallet.app' }
]

let _address = ''

let timer: any
let connectors: readonly Connector[] = []

export default function ConnectWallet() {
	const { connectors: _connectors, connectAsync } = useConnect()
	const { address } = useAccount()
	connectors = _connectors
	_address = address!

	const [open, setOpen] = useState(false)

	useEffect(() => {
		const handler = () => {
			setOpen(true)
		}

		return addEventListener('connect-wallet', handler)
	}, [])

	return open ? (
		<DialogContainer setOpen={setOpen}>
			<div className='flex items-center justify-between'>
				<h2 className='font-mono text-2xl font-semibold uppercase'>Choose Wallet</h2>

				<button
					className='rounded-full border p-2 hover:border-subtle-bg hover:bg-subtle-bg'
					onClick={() => {
						setOpen(false)
						clearInterval(timer)
					}}>
					<CloseSVG />
				</button>
			</div>

			<ul className='mt-4'>
				{wallets.map(item => (
					<li
						key={item.id}
						onClick={async () => {
							const connector = connectors.find(item2 => item2.id === item.id || item2.id === item.otherId)

							// if (item.key === 'binance' && !connector) {
							// 	dispatchEvent('wallet-add-binance')

							// 	timer = setInterval(async () => {
							// 		const connector = connectors.find(item2 => item2.id === 'BinanceW3WSDK')

							// 		if (connector) {
							// 			clearInterval(timer)
							// 			await connector.connect()

							// 			setOpen(false)

							// 			setTimeout(() => {
							// 				if (!_address) location.reload()
							// 			}, 3000)
							// 		}
							// 	}, 500)
							// } else if (item.key === 'wallet-connect' && !connector) {
							// 	dispatchEvent('wallet-add-wc')
							// 	timer = setInterval(async () => {
							// 		const connector = connectors.find(item2 => item2.id === 'walletConnect')

							// 		if (connector) {
							// 			clearInterval(timer)
							// 			await connector.connect()

							// 			setOpen(false)

							// 			setTimeout(() => {
							// 				if (!_address) location.reload()
							// 			}, 3000)
							// 		}
							// 	}, 500)
							// } else
							if (connector) {
								await connectAsync({ connector })
								setOpen(false)

								setTimeout(() => {
									if (!_address) location.reload()
								}, 5000)
							} else {
								console.log('no connector')
							}
						}}
						className='-mx-8 flex cursor-pointer items-center border-2 border-transparent px-8 py-4 hover:bg-subtle-bg max-sm:-mx-6'>
						<WaleltImg wallet={item.key as any} className='mr-3 h-8 w-8' key={item.key} />

						<span>{item.name}</span>
					</li>
				))}
			</ul>
		</DialogContainer>
	) : null
}
