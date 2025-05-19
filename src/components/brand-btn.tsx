import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { CSSProperties, PropsWithChildren } from 'react'
import Loader from './loader/loader'

interface Props {
	className?: string
	style?: CSSProperties
	disabled?: boolean
	loading?: boolean
}

export default function BrandBtn({ className, children, ...rest }: Props & PropsWithChildren & any) {
	return (
		<button
			{...rest}
			className={cn(
				'rounded-md border border-black/20 bg-brand px-3 py-1.5 text-sm text-primary shadow-button hover:bg-[#FFBA1A] hover:shadow-none active:shadow-inner disabled:cursor-not-allowed disabled:border-none disabled:bg-subtle-bg disabled:text-black/30 disabled:shadow-none dark:text-primary',
				className
			)}>
			{children}
		</button>
	)
}

export function SubmitBtn({ className, children, loading, disabled, ...rest }: Props & PropsWithChildren & any) {
	return (
		<button
			disabled={loading || disabled}
			{...rest}
			className={clsx(
				'w-full rounded-xl border border-black/20 bg-brand px-4 py-3.5 text-center text-base shadow-button hover:bg-[#FFBA1A] hover:shadow-none active:shadow-inner disabled:cursor-not-allowed disabled:border-none disabled:bg-subtle-bg disabled:text-black/30 disabled:shadow-none dark:text-primary',
				loading && 'flex h-[52px] items-center justify-center',
				className
			)}>
			{loading ? <Loader lg /> : children}
		</button>
	)
}

export function WhiteBtn({ className, children, ...rest }: Props & PropsWithChildren & any) {
	return (
		<button
			{...rest}
			className={cn(
				'flex items-center justify-center rounded-md border border-black/20 bg-body px-3 py-1.5 text-center text-sm shadow-button hover:shadow-none active:shadow-inner disabled:cursor-not-allowed disabled:border-none disabled:bg-subtle-bg disabled:text-black/30 disabled:shadow-none',
				className
			)}>
			{children}
		</button>
	)
}

export function WhiteSubmitBtn({ className, children, ...rest }: Props & PropsWithChildren & any) {
	return (
		<button
			{...rest}
			className={clsx(
				'flex w-full items-center justify-center rounded-xl border border-black/20 bg-body px-4 py-3.5 text-center text-base shadow-button hover:shadow-none active:shadow-inner disabled:cursor-not-allowed disabled:border-none disabled:bg-subtle-bg disabled:text-black/30 disabled:shadow-none',
				className
			)}>
			{children}
		</button>
	)
}
