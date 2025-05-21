import PrimeBtn from '@/components/button'
import { useLogin } from '@/hooks/useLogin'
import { useAppKit } from '@reown/appkit/react'
import { useEffect, useMemo, useState } from 'react'
import { useCountDown, useRequest } from 'ahooks'
import { MINT_START_TS } from '@/const'
import { NFTApi } from '@/lib/axios'
import { UserInfoResponse } from '@/app/tasks/type'
import { setUserTaskInfo, useUserTaskInfo } from '@/hooks/useUserTaskInfo'

export const Operational = ({
	address,
	token,
	userTokenId,
	minted,
	setOpen
}: {
	address: string | undefined
	token: string | null
	userTokenId: number | undefined
	minted: boolean
	setOpen: (o: boolean) => void
}) => {
	const { open: ConnectWallet } = useAppKit()
	const { login } = useLogin()

	const [countdown, formattedRes] = useCountDown({
		targetDate: MINT_START_TS
	})
	const { days, hours, minutes } = formattedRes
	const [isClient, setIsClient] = useState<boolean>(false)
	const userInfo = useUserTaskInfo()
	useRequest(
		async () => {
			const rep = await NFTApi<UserInfoResponse>({
				url: '/extra/user/info',
				method: 'get',
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setUserTaskInfo(rep.data.data)
		},
		{
			ready: !!token,
			refreshDeps: [token],
			pollingInterval: 10000
		}
	)

	const eligibility = useMemo(() => {
		return !!(userInfo?.IsXFollow && userInfo?.IsXRetweet && userInfo?.IsDiscordJoinGuild)
	}, [userInfo])
	useEffect(() => {
		setIsClient(true)
	}, [])
	return (
		<div className='flex flex-col justify-between'>
			<div className='flex flex-col items-center pb-20 max-xl:pb-10 max-xl:pt-10'>
				{isClient && (
					<>
						{countdown === 0 && (
							<>
								{!address && !token && (
									<PrimeBtn onClick={() => ConnectWallet()} className='w-[480px] bg-[#1C3F3A] max-xl:w-full'>
										Connect Wallet{' '}
									</PrimeBtn>
								)}
								{address && !token && !minted && (
									<PrimeBtn onClick={() => login()} className='w-[480px] bg-[#1C3F3A] max-xl:w-full'>
										Sign message
									</PrimeBtn>
								)}
								{address && token && userTokenId === 0 && eligibility && (
									<PrimeBtn onClick={() => setOpen(true)} className='w-[480px] bg-[#1C3F3A] max-xl:w-full'>
										Claim
									</PrimeBtn>
								)}
								{address && token && userTokenId === 0 && !eligibility && <PrimeBtn className='w-[480px] bg-[#1C3F3A] max-xl:w-full'>Not Eligible</PrimeBtn>}
								{address && minted && <PrimeBtn className='w-[480px] max-xl:w-full'>Claimed</PrimeBtn>}
							</>
						)}
						{countdown > 0 && (
							<PrimeBtn className='w-[480px] bg-[#1C3F3A] max-xl:w-full'>
								Live in {days}d:{hours}h:{minutes}m{' '}
							</PrimeBtn>
						)}
					</>
				)}
				<p className='py-2'>1 mint per wallet</p>
			</div>
			<div className='flex justify-center gap-[48px]'>
				<span>Cost:&nbsp;Free + Gas</span>
				<span>Chain:&nbsp;BounceBit</span>
			</div>
		</div>
	)
}
