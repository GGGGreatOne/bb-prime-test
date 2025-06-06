'use client'
import LogoSVG from '@/svgs/bb_prime_logo.svg'
import XLogo from '@/svgs/x_logo.svg'
// import InsLogo from '@/svgs/ins_logo.svg'
// import YoutobeLogo from '@/svgs/youtube.svg'
import LinkLogo from '@/svgs/linkedin.svg'
import Discord from '@/svgs/discord.svg'
import { useSize } from '@/hooks/useSize'
import { useMemo } from 'react'

export default function Footer() {
	const { maxSM } = useSize()
	const years = useMemo(() => {
		return new Date().getUTCFullYear()
	}, [])
	return (
		<div className='flex justify-center bg-[#fff]'>
			<div className='mx-[64px] w-[100%] border-t border-[rgba(146,146,146,0.3)] p-[32px_0] max-xl:mx-[16px]'>
				<div>
					<LogoSVG className='max-sm:h-[26px] max-sm:w-[136px]' />
				</div>
				<div className='mt-[24px] flex items-center justify-between max-sm:block'>
					{!maxSM && <span>© {years} BounceBit. All rights reserved.</span>}
					<div className='flex gap-[28px]'>
						<a href='https://x.com/bounce_bit' target='_blank' rel='noreferrer'>
							<XLogo className='max-sm:h-[20px] max-sm:w-[20px]' />
						</a>
						<a href='https://www.linkedin.com/company/bouncebit' target='_blank' rel='noreferrer'>
							<LinkLogo className='max-sm:h-[20px] max-sm:w-[20px]' />
						</a>
						{/*<YoutobeLogo className='max-sm:h-[20px] max-sm:w-[20px]' />*/}
						{/*<a href='https://www.linkedin.com/company/bouncebit' target='_blank' rel='noreferrer'>*/}
						{/*	<LinkLogo className='max-sm:h-[20px] max-sm:w-[20px]' />*/}
						{/*</a>*/}
						<a href='https://discord.gg/bouncebit' target='_blank' rel='noreferrer'>
							<Discord className='max-sm:h-[20px] max-sm:w-[20px]' />
						</a>
					</div>
					{maxSM && <p className='mt-4'>© {years} BounceBit. All rights reserved.</p>}
				</div>
			</div>
		</div>
	)
}
