import { createStore, useStore } from 'zustand'
import { UserInfo } from '@/hooks/useUserInfo'

export const UserTaskInfoStore = createStore<{
	userTaskInfo: UserInfo | undefined
}>(() => ({
	userTaskInfo: undefined
}))

export function useUserTaskInfo() {
	const { userTaskInfo } = useStore(UserTaskInfoStore)
	return userTaskInfo
}

export function setUserTaskInfo(userTaskInfo: UserInfo | undefined) {
	UserTaskInfoStore.setState({ userTaskInfo: userTaskInfo })
}
