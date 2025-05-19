/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'

const defaultTokenUrl = '/assets/coin/default.svg'

export default function TokenImg({ src: _src, className, style }: { src?: string | null; className?: string; style?: React.CSSProperties }) {
	const [src, setSrc] = useState(_src)

	useEffect(() => {
		setSrc(_src)
	}, [_src])

	if (src) return <img src={src} onError={() => setSrc('')} className={className} style={style} alt='' />
	else return <img src={defaultTokenUrl} className={className} style={style} alt='' />
}
