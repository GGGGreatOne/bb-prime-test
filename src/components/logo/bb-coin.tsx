import clsx from 'clsx'

interface Props {
	coin: 'bbtc' | 'bbusd' | 'stbbtc' | string
	chain: 'bsc' | 'eth' | 'bb' | string
	className?: string
	style?: React.CSSProperties
	ignoreChain?: boolean
}

export default function BBCoin({ coin, chain, className, style, ignoreChain }: Props) {
	coin = coin?.toLowerCase()
	chain = chain?.toLowerCase()

	let coinLogo = '/assets/coin/bbtc.png'
	let chainLogo = '/assets/ethereum.png'

	switch (coin) {
		case 'bbusd':
		case 'fdusd':
		case 'usdt':
			coinLogo = '/assets/coin/bbusd.png'
			break
		case 'stbbtc':
			coinLogo = '/assets/coin/stbbtc.png'
			break
		case 'bb':
			coinLogo = '/assets/coin/bb.svg'
			break
		case 'wbb':
			coinLogo = '/assets/coin/wbb.svg'
			break
		case 'stbb':
			coinLogo = '/assets/coin/stbb.png'
	}

	switch (chain) {
		case 'bsc':
			chainLogo = '/assets/bsc.svg'
			break
		case 'bb':
			chainLogo = '/assets/bouncebit.svg'
			break
	}

	return (
		<div className={clsx('relative shrink-0', className || 'h-5 w-5')} style={style}>
			<img src={coinLogo} className='h-full w-full rounded-full' />
			{!ignoreChain && <img src={chainLogo} className='absolute -bottom-1 -right-1 h-3 w-3' />}
		</div>
	)
}
