import { UserInfo } from '@/hooks/useUserInfo'

export interface LoginResp {
	code: number
	msg: string
	data: {
		isFirst: boolean
		jwt: string
	}
}

export interface UserInfoResponse {
	code: number
	msg: string
	data: UserInfo
}
