interface Props {
	wallet: 'metamask' | 'wallet-connect' | 'binance' | 'okx' | 'bitget' | 'trust' | string
	className: string
	src?: string
}

export default function WaleltImg({ wallet, className, src }: Props) {
	// eslint-disable-next-line @next/next/no-img-element
	return <img src={src || `/images/wallet/${wallet}.png`} className={className} alt='' />
}
