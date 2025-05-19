import { useEffect } from 'react'
import { LOCAL_USER_INFO, setLocalUserInfo } from '@/hooks/useLocalUserInfo'

export const LocalUserInfoProvider = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		const userinfo = JSON.parse(localStorage.getItem(LOCAL_USER_INFO) ?? '{}')
		setLocalUserInfo({
			wallet: userinfo?.wallet,
			token: userinfo?.token
		})
	}, [])
	return <>{children}</>
}
