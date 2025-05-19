import clsx from 'clsx'

interface Props {
	coin: 'btcb' | 'usdt' | 'fdusd' | 'wbtc' | '' | string
	className?: string
	style?: React.CSSProperties
	noChain?: boolean
}

export default function CoinIcon({ coin, className, style, noChain }: Props) {
	coin = coin?.toLowerCase() as any

	switch (coin) {
		case 'btcb':
			return (
				<div className={clsx('relative h-4 w-4 shrink-0', className)} style={style}>
					<img src='/assets/coin/btcb.png' className='h-full w-full rounded-full' />
					{!noChain && <img src='/assets/bsc.svg' className='absolute -bottom-1 -right-1 h-3 w-3' />}
				</div>
			)
		case 'usdt':
			return (
				<div className={clsx('relative h-4 w-4 shrink-0', className)} style={style}>
					<img src='/assets/coin/usdt.png' className='h-full w-full rounded-full' />
					{!noChain && <img src='/assets/ethereum.png' className='absolute -bottom-1 -right-1 h-3 w-3' />}
				</div>
			)
		case 'fdusd':
			return (
				<div className={clsx('relative h-4 w-4 shrink-0', className)} style={style}>
					<img src='/assets/coin/fdusd.png' className='h-full w-full rounded-full' />
					{!noChain && <img src='/assets/bsc.svg' className='absolute -bottom-1 -right-1 h-3 w-3' />}
				</div>
			)
		case 'wbtc':
			return (
				<div className={clsx('relative h-4 w-4 shrink-0', className)} style={style}>
					<img src='/assets/coin/btc.png' className='h-full w-full rounded-full' />
					{!noChain && <img src='/assets/ethereum.png' className='absolute -bottom-1 -right-1 h-3 w-3' />}
				</div>
			)
		case 'auction':
			return (
				<div className={clsx('relative h-4 w-4 shrink-0', className)} style={style}>
					<img src='/assets/coin/auction.png' className='h-full w-full rounded-full' />
					{!noChain && <img src='/assets/ethereum.png' className='absolute -bottom-1 -right-1 h-3 w-3' />}
				</div>
			)
		case 'daii':
			return (
				<div className={clsx('relative h-4 w-4 shrink-0', className)} style={style}>
					<img src='/assets/coin/daii.png' className='h-full w-full rounded-full' />
					{!noChain && <img src='/assets/ethereum.png' className='absolute -bottom-1 -right-1 h-3 w-3' />}
				</div>
			)
		case 'mubi':
			return (
				<div className={clsx('relative h-4 w-4 shrink-0', className)} style={style}>
					<img src='/assets/coin/mubi.png' className='h-full w-full rounded-full' />
					{!noChain && <img src='/assets/ethereum.png' className='absolute -bottom-1 -right-1 h-3 w-3' />}
				</div>
			)
	}

	return (
		<div className={clsx('relative h-4 w-4 shrink-0', className)} style={style}>
			<img src='/assets/coin/btc.png' className='h-full w-full rounded-full' />
			<img src='/assets/ethereum.png' className='absolute -bottom-1 -right-1 h-3 w-3' />
		</div>
	)
}
