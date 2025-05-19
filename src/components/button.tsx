import { CSSProperties, PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
	style?: CSSProperties
	disabled?: boolean
	loading?: boolean
}

export default function PrimeBtn({ className, children, ...rest }: Props & PropsWithChildren & any) {
	return (
		<button
			{...rest}
			className={cn(
				'rounded-[100px] bg-[#887B5A] p-[12px_16px] font-inter text-[16px] font-normal leading-[130%] text-[#ffffff] max-sm:text-[14px]',
				className
			)}>
			{children}
		</button>
	)
}
