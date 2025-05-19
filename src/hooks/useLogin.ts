import { useCallback } from 'react'
import { Address } from 'viem'
import { NFTApi } from '@/lib/axios'
import { LoginResp } from '@/app/tasks/type'
import { setJWTToken } from '@/hooks/useJWTToken'
import { useSignMessage } from 'wagmi'
import { useConnectedAddress } from '@/hooks/useWallet'
import { setLocalUserInfo } from '@/hooks/useLocalUserInfo'

export const useLogin = () => {
	const { address } = useConnectedAddress()
	const { signMessageAsync } = useSignMessage()
	const login = useCallback(async () => {
		try {
			const signer = await signMessageAsync({ account: address as Address, message: 'Login BounceBit' })
			const rep = await NFTApi<LoginResp>({
				url: '/extra/user/sign',
				method: 'post',
				data: JSON.stringify({
					account: address as Address,
					message: 'Login BounceBit',
					signature: signer
				})
			})
			if (rep.data.code === 200) {
				setJWTToken(rep.data.data.jwt)
				setLocalUserInfo({
					wallet: address,
					token: rep.data.data.jwt
				})
			}
			console.log(rep)
		} catch (e) {
			console.error(e)
		}
	}, [address, signMessageAsync])

	return { login: login }
}
