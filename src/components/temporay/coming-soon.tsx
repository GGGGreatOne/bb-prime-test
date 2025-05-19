import { useEffect, useState } from 'react'
import { house } from './code'
import { useTheme } from 'next-themes'

let _code = house
const randomSymbols = ['₿', '$', '#', '%', 'Ξ', '¢', '€', '¥', 'r', 'w', 'a']

export default function ComingSoon() {
	const [code, setCode] = useState(house)
	const { resolvedTheme } = useTheme()

	useEffect(() => {
		if (resolvedTheme == 'dark') {
			const timer = setInterval(() => {
				let newCode = ''
				for (let i = 0; i < house.length; i++) {
					const willChange = Math.random() > 0.95
					const willRestore = Math.random() > 0.6

					if (!/\s/.test(_code[i]) && willChange) {
						const n = Math.floor(Math.random() * randomSymbols.length)
						newCode += randomSymbols[n] || '*'
					} else if (willRestore) {
						newCode += house[i]
					} else {
						newCode += _code[i]
					}
				}

				_code = newCode
				setCode(newCode)
			}, 400)

			return () => {
				clearInterval(timer)
			}
		} else {
			setCode(house)
		}
	}, [resolvedTheme])

	return (
		<div className='mt-20 flex-col items-center'>
			<pre className='font-roboto text-[6px] text-secondary max-sm:text-[3.4px]'>{code}</pre>
			<div className='mt-10 text-center text-[64px] font-semibold max-sm:text-xl'>
				<span className='font-mono uppercase text-black/30'>Coming soon</span> 🤫
			</div>
		</div>
	)
}
