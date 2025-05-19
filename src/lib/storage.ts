type Key = 'wallet' | 'token' | 'chain' | 'convert-tab' | 'dapp-tab' | 'token-list'

export const setStorage = (key: Key, value: string) => {
	window.localStorage.setItem(key, value)
}

export const getStorage = (key: Key) => {
	if (typeof window !== 'undefined') return window.localStorage.getItem(key)
}

export const removeStorage = (key: Key) => {
	if (typeof window !== 'undefined') return window.localStorage.removeItem(key)
}
