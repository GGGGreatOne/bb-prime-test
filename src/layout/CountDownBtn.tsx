'use client'
import PrimeBtn from '@/components/button'
import { useCountDown } from 'ahooks'
import { MINT_START_TS } from '@/const'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const CountDownBtn = () => {
	const [isClient, setIsClient] = useState<boolean>(false)
	const [countdown, formattedRes] = useCountDown({
		targetDate: MINT_START_TS
	})
	const { days, hours, minutes } = formattedRes
	const router = useRouter()
	useEffect(() => {
		setIsClient(true)
	}, [])
	return (
		<>
			{isClient && (
				<PrimeBtn
					onClick={() => {
						if (countdown === 0) router.push('/nftmint')
					}}
					className='min-w-[125px] font-medium max-xl:w-[100%]'>
					{/*{registerText}*/}
					{countdown === 0 ? 'Mint' : `Mint in ${days}d:${hours}h:${minutes}m`}
				</PrimeBtn>
			)}
		</>
	)
}
