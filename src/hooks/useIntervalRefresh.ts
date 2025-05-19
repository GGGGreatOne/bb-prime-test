import { useEffect, useRef } from 'react'

/**
 * Hook for interval-based refreshing.
 * @param callback - Function to be called on each interval tick.
 * @param delay - Interval delay in milliseconds. If null, the interval is paused.
 */
function useIntervalRefresh(callback: () => void, delay: number | null) {
	const savedCallback = useRef<() => void>()

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		if (delay === null) return

		const tick = () => {
			if (savedCallback.current) {
				savedCallback.current()
			}
		}

		const id = setInterval(tick, delay)

		return () => clearInterval(id)
	}, [delay])
}

export default useIntervalRefresh
