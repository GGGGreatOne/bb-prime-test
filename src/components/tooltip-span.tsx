'use client'

import clsx from 'clsx'
import { CSSProperties, PropsWithChildren, ReactElement, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
	value: string | ReactElement
	className?: string
	style?: CSSProperties
	normalWord?: boolean
	ellipsis?: boolean
	width?: number
}

export default function TooltipSpan({ className, style, ellipsis, value, children, normalWord = false, width }: PropsWithChildren<Props>) {
	const [open, setOpen] = useState(false)

	return (
		<span onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className={clsx('relative shrink-0', className)} style={style}>
			{ellipsis ? <span className='inline-block w-full overflow-hidden text-ellipsis'>{children}</span> : children}

			{open && (
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className='absolute inset-x-0 top-0 flex origin-bottom justify-center'>
					<div className='absolute bottom-full flex flex-col items-center'>
						<div
							className={clsx(
								'relative z-10 block w-max max-w-[200px] whitespace-normal rounded-md bg-black px-3 py-1 text-xs text-white shadow-sm',
								!normalWord && 'break-all'
							)}
							style={width ? { maxWidth: width, width } : undefined}>
							{value}
						</div>
						<div className='relative bottom-2 inline-block h-3 w-3 rotate-45 bg-black'></div>
					</div>
				</motion.div>
			)}
		</span>
	)
}
