import clsx from 'clsx'
import LeftSVG from '@/svgs/chevron-left.svg'
import RightSVG from '@/svgs/chevron-right.svg'
import { cn } from '@/lib/utils'

interface Props {
	loading: boolean
	setLoading: any
	pageNum: number
	setPageNum: any
	size: number
}

export default function Pagination({ loading, setLoading, setPageNum, pageNum, size }: Props) {
	const MAX_VISIBLE_PAGES = 5
	const ELLIPSIS = '...'

	const getPageNumbers = () => {
		if (size <= MAX_VISIBLE_PAGES) {
			return Array.from({ length: size }, (_, i) => i + 1)
		}

		const pages = []
		const leftBound = Math.max(2, pageNum - 1)
		const rightBound = Math.min(size - 1, pageNum + 1)

		pages.push(1)

		if (leftBound > 2) {
			pages.push(ELLIPSIS)
		}

		for (let i = leftBound; i <= rightBound; i++) {
			pages.push(i)
		}

		if (rightBound < size - 1) {
			pages.push(ELLIPSIS)
		}

		pages.push(size)

		return pages
	}

	return (
		<ul className={clsx('mt-4 flex select-none items-center justify-center gap-1', loading && 'cursor-not-allowed')}>
			<div
				onClick={() => {
					if (loading || pageNum <= 1) return
					setLoading(true)
					setTimeout(() => setLoading(false), 300)
					setPageNum((s: number) => Math.max(s - 1, 1))
				}}
				className={cn('flex h-8 w-8 cursor-pointer items-center justify-center rounded-full', pageNum <= 1 && 'cursor-not-allowed')}>
				<LeftSVG />
			</div>

			{getPageNumbers().map((page, i) => {
				if (page === ELLIPSIS) {
					return (
						<li key={i} className='flex h-8 w-8 items-center justify-center'>
							{ELLIPSIS}
						</li>
					)
				}

				const active = page === pageNum
				return (
					<li
						key={i}
						onClick={() => {
							if (loading || pageNum === page) return
							setLoading(true)
							setTimeout(() => setLoading(false), 300)
							setPageNum(page)
						}}
						className={clsx('flex h-8 w-8 cursor-pointer items-center justify-center rounded-full', active && 'bg-primary text-subtle')}>
						{page}
					</li>
				)
			})}

			<div
				onClick={() => {
					if (loading || pageNum >= size) return
					setLoading(true)
					setTimeout(() => setLoading(false), 300)
					setPageNum((s: number) => Math.min(s + 1, size))
				}}
				className={cn('flex h-8 w-8 cursor-pointer items-center justify-center rounded-full', pageNum >= size && 'cursor-not-allowed')}>
				<RightSVG className='w-8' />
			</div>
		</ul>
	)
}
