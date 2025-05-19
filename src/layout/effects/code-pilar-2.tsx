import { useEffect, useState } from 'react'
import { code2 } from './codes'

const asciiSize = 126 - 32
let _code = code2

export default function CodePilar2() {
	const [code, setCode] = useState(code2)

	useEffect(() => {
		const timer = setInterval(() => {
			let newCode = ''
			for (let i = 0; i < code2.length; i++) {
				const willChange = Math.random() > 0.95
				const willRestore = Math.random() > 0.6

				if (!/\s/.test(_code[i]) && willChange) {
					const n = Math.floor(Math.random() * asciiSize) + 32
					newCode += String.fromCharCode(n)
				} else if (willRestore) {
					newCode += code2[i]
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
	}, [])

	return (
		<pre className='absolute right-[-50px] top-[140px] z-[-1] -scale-x-100 font-roboto text-[6px] text-secondary max-sm:hidden'>
			{code}
			<div className='absolute bottom-0 left-0 z-[1] h-[500px] w-full bg-gradient-to-t from-[#181818]'></div>
		</pre>
	)
}
