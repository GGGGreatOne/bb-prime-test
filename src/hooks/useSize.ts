'use client'

import { debounce } from 'ts-debounce'
import { createStore, useStore } from 'zustand'

export const sizeStore = createStore(() => ({
	maxXL: false,
	maxLG: false,
	maxMD: false,
	maxSM: false,
	maxXS: false
}))

const update = debounce(() => {
	if (typeof window !== undefined)
		sizeStore.setState({
			maxXL: window.innerWidth < 1280,
			maxLG: window.innerWidth < 1024,
			maxMD: window.innerWidth < 768,
			maxSM: window.innerWidth < 640,
			maxXS: window.innerWidth < 360
		})
}, 100)

if (typeof window !== 'undefined') {
	window.addEventListener('resize', () => update())
	update()
}

export function useSize() {
	const sizes = useStore(sizeStore)

	return sizes
}
