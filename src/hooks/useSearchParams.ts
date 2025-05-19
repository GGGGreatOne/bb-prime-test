import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams as useSearchParams_nextjs } from 'next/navigation'

export default function useSearchParams() {
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams_nextjs()

	const setSearchParams = (params: Record<string, string>) => {
		const url = new URLSearchParams(Array.from(Object.entries(params)))

		router.replace(`${pathname}?${url.toString()}`, { scroll: false })
	}

	return [searchParams, setSearchParams] as [ReadonlyURLSearchParams, (params: Record<string, string>) => void]
}
