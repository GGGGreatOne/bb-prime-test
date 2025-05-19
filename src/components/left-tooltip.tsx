'use client'

import clsx from 'clsx'
import { CSSProperties, PropsWithChildren, useState } from 'react'
import { motion } from 'framer-motion'
import { left } from '@/lib/dayjs'

interface Props {
	time: number | bigint
	className?: string
	style?: CSSProperties
	normalWord?: boolean
	ellipsis?: boolean
	width?: number
}

export default function LeftTooltip({ className, style, ellipsis, time, children, normalWord = false, width }: PropsWithChildren<Props>) {
	const [open, setOpen] = useState(false)

	return (
		<span
			onMouseEnter={() => {
				setOpen(true)
			}}
			onMouseLeave={() => setOpen(false)}
			className={clsx('relative', className)}
			style={style}>
			{ellipsis ? <span className='inline-block w-full overflow-hidden text-ellipsis'>{children}</span> : children}

			{open && (
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className='absolute inset-x-0 top-1 flex origin-bottom justify-center'>
					<div className='absolute bottom-full flex flex-col items-center'>
						<div
							className={clsx(
								'relative z-10 block w-max max-w-[200px] whitespace-normal rounded-md bg-primary px-3 py-1 text-xs text-white shadow-sm',
								!normalWord && 'break-all'
							)}
							style={width ? { maxWidth: width, width } : undefined}>
							in {left(Number(time), true)}
						</div>
						<div className='relative bottom-2 inline-block h-3 w-3 rotate-45 bg-primary'></div>
					</div>
				</motion.div>
			)}
		</span>
	)
}
