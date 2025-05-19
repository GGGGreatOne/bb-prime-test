import { cn } from '@/lib/utils'

interface Props {
	width?: number
	height?: number
	className?: string
	style?: React.CSSProperties
}

export function TextLoading({ width = 16, height = 12, className, style }: Props) {
	return <span className={cn('inline-block animate-pulse rounded bg-loading', className)} style={{ ...style, width, height }} />
}
