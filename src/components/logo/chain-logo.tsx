import clsx from 'clsx'
import { CSSProperties } from 'react'

interface Props {
	className?: string
	style?: CSSProperties
	chain: string | 'eth' | 'bsc' | 'bb'
	size?: number
}

export default function ChainLogo({ className, style, chain, size = 16 }: Props) {
	chain = chain.toLowerCase()
	if (chain === 'Ethereum') chain = 'eth'
	if (chain === 'BounceBit') chain = 'bb'
	if (chain === 'Solana') chain = 'sol'

	return <img src={`/images/chain/${chain}.png`} className={clsx('rounded-full', className)} style={{ ...style, width: size, height: size }} />
}
