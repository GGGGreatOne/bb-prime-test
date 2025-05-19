import { createStore, useStore } from 'zustand'

export interface UserInfo {
	Account: string
	DiscordId: string
	DiscordName: string
	IsDiscordJoinGuild: boolean
	IsXFollow: boolean
	IsXRetweet: boolean
	XId: string
	XName: string
}

export const UserInfoStore = createStore<{
	userInfo: null | UserInfo
}>(() => ({
	userInfo: null
}))

export function useUserInfo() {
	const { userInfo } = useStore(UserInfoStore)
	return userInfo
}

export function setJWTToken(userInfo: UserInfo) {
	UserInfoStore.setState({ userInfo: userInfo })
}
