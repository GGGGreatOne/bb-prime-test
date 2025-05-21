import { useEffect } from 'react'
import { LOCAL_USER_INFO, setLocalUserInfo } from '@/hooks/useLocalUserInfo'
import { getStorage } from '@/lib/storage'

export const LocalStorageProvider = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		setLocalUserInfo({
			wallet: JSON.parse(getStorage(LOCAL_USER_INFO) ?? '{}').wallet,
			token: JSON.parse(getStorage(LOCAL_USER_INFO) ?? '{}').token
		})
	}, [])
	return <>{children}</>
}
