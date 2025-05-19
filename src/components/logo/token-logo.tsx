import clsx from 'clsx'

interface Props {
	src?: string
	className?: string
	token: 'usdt' | 'btcb' | 'USDT' | 'BTCB' | 'BB' | 'BNB' | 'ETH' | 'SOL' | string
	chain?: boolean | number | string | 'eth' | 'bsc' | 'bb'
	size?: number
	chainSize?: number
}

export default function TokenLogo({ className, token, chain, size = 16, chainSize = 12, src }: Props) {
	token = token.toLowerCase()

	let _chain = 'eth'
	if (token === 'btcb' || token == 'fdusd') _chain = 'bsc'
	else if (chain == '1') _chain = 'eth'
	else if (chain == '11155111') _chain = 'eth'
	else if (chain == '56') _chain = 'bsc'
	else if (chain == '6001') _chain = 'bb'
	else if (chain == '6000') _chain = 'bb'
	else if (token === 'sol') _chain = 'sol'
	else if (typeof chain === 'string') _chain = chain

	return (
		<figure style={{ width: size, height: size }} className={clsx('relative', className)}>
			<img
				src={src || `/images/token/${token}.png`}
				className='shrink-0 rounded-full'
				alt=''
				style={{ width: size, height: size, boxShadow: '0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)' }}
			/>
			{chain && (
				<img
					alt=''
					src={`/images/chain/${_chain}.png`}
					className='absolute rounded-full'
					style={{ width: chainSize, height: chainSize, right: '-20%', bottom: '-20%' }}
				/>
			)}
		</figure>
	)
}
