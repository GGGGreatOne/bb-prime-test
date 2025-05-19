'use client'

import { motion } from 'framer-motion'
import { PropsWithChildren, useEffect } from 'react'

interface Props {
	setOpen?: any
}

export default function DialogContainer({ children, setOpen }: Props & PropsWithChildren) {
	useEffect(() => {
		document.documentElement.classList.add('overflow-hidden')

		return () => {
			document.documentElement.classList.remove('overflow-hidden')
		}
	}, [])

	return (
		<motion.div
			onClick={() => {
				if (typeof setOpen === 'function') setOpen(false)
			}}
			initial={{ backgroundColor: 'rgb(0 0 0 / 0)' }}
			animate={{ backgroundColor: 'rgb(0 0 0 / 0.4)' }}
			transition={{ duration: 0.25, ease: 'circOut' }}
			className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/80'>
			<motion.div
				onClick={e => e.stopPropagation()}
				initial={{ scale: 0.9 }}
				animate={{ scale: 1 }}
				className='relative w-[468px] rounded-[16px] bg-body p-8 max-sm:w-[343px] max-sm:p-6'>
				{children}
			</motion.div>
		</motion.div>
	)
}
