import { createStore, useStore } from 'zustand'
import { setStorage } from '@/lib/storage'

export const LOCAL_USER_INFO = 'LOCAL_USER_INFO'

export type LocalUserInfo = {
	wallet: string | undefined
	token: string | null
}

export const localUserInfoStore = createStore<{
	userInfo: LocalUserInfo
}>(() => ({
	userInfo: {
		wallet: undefined,
		token: null
	}
}))

export function useLocalUserInfo() {
	const { userInfo } = useStore(localUserInfoStore)
	return userInfo
}

export function setLocalUserInfo(userInfo: LocalUserInfo) {
	localUserInfoStore.setState({ userInfo: userInfo })
}
