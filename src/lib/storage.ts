import { LOCAL_USER_INFO } from '@/hooks/useLocalUserInfo'

type Key = 'wallet' | 'token' | 'chain' | 'convert-tab' | 'dapp-tab' | 'token-list' | 'LOCAL_USER_INFO'

export const setStorage = (key: Key, value: string) => {
	window.localStorage.setItem(key, value)
}

export const getStorage = (key: Key) => {
	if (typeof window !== 'undefined') return window.localStorage.getItem(key)
}

export const removeStorage = (key: Key) => {
	if (typeof window !== 'undefined') return window.localStorage.removeItem(key)
}
