import { createStore, useStore } from 'zustand'

export const LOCAL_USER_INFO = 'LOCAL_USER_INFO'

export type LocalUserInfo = {
	wallet: string | undefined
	token: string | null
}

export const localUserInfoStore = createStore<{
	userInfo: LocalUserInfo
}>(() => ({
	userInfo: {
		wallet: JSON.parse(localStorage.getItem(LOCAL_USER_INFO) ?? '{}').wallet,
		token: JSON.parse(localStorage.getItem(LOCAL_USER_INFO) ?? '{}').token
	}
}))

export function useLocalUserInfo() {
	const { userInfo } = useStore(localUserInfoStore)
	return userInfo
}

export function setLocalUserInfo(userInfo: LocalUserInfo) {
	localUserInfoStore.setState({ userInfo: userInfo })
	localStorage.setItem(LOCAL_USER_INFO, JSON.stringify(userInfo))
}
