import { createStore, useStore } from 'zustand'
import { getStorage, setStorage } from '@/lib/storage'

export const LOCAL_USER_INFO = 'LOCAL_USER_INFO'

export type LocalUserInfo = {
	wallet: string | undefined
	token: string | null
}

export const localUserInfoStore = createStore<{
	userInfo: LocalUserInfo
}>(() => ({
	userInfo: {
		wallet: JSON.parse(getStorage(LOCAL_USER_INFO) ?? '{}').wallet,
		token: JSON.parse(getStorage(LOCAL_USER_INFO) ?? '{}').token
	}
}))

export function useLocalUserInfo() {
	const { userInfo } = useStore(localUserInfoStore)
	return userInfo
}

export function setLocalUserInfo(userInfo: LocalUserInfo) {
	localUserInfoStore.setState({ userInfo: userInfo })
	setStorage(LOCAL_USER_INFO, JSON.stringify(userInfo))
}
