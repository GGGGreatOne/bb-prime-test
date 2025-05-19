'use client'
import LogoSVG from '@/svgs/bb_prime_logo.svg'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSize } from '@/hooks/useSize'
import { CountDownBtn } from '@/layout/CountDownBtn'
// import LightSVG from '@/svgs/theme/light.svg'
// import DarkSVG from '@/svgs/theme/dark.svg'
// import { useTheme } from 'next-themes'
// import { useEffect, useState } from 'react'
// import { ThemeMode, useAppKitTheme } from '@reown/appkit/react'

// const links = [
// 	{ name: 'Products', link: '/products', out: false },
// 	{ name: 'Blogs', link: '/blogs', out: false },
// 	{ name: 'Contact', link: '/', out: false }
// ]

export default function Header() {
	// useGetAllBalance()

	// const [signBtnText, setSignBtnText] = useState<'Sign in' | 'Coming Soon'>('Sign in')
	// const [registerText, setRegisterText] = useState<'Register' | 'Coming Soon'>('Register')
	const pathname = usePathname()
	// const { resolvedTheme, setTheme } = useTheme()
	// const { setThemeMode } = useAppKitTheme()

	// useEffect(() => {
	// 	if (!resolvedTheme) return
	// 	setThemeMode(resolvedTheme as ThemeMode)
	// }, [resolvedTheme, setThemeMode])

	const { maxSM } = useSize()

	if (!maxSM)
		return (
			<header className='relative max-sm:hidden'>
				<div className='fixed top-0 z-30 flex w-full items-center justify-between p-[24px_64px] backdrop-blur-sm'>
					<Link href='/'>
						<LogoSVG className='h-[32px] w-[154px] text-black dark:text-white' />
					</Link>

					<div className='text-[rgba(0,0,0,0.6)]right-6 flex items-center gap-2'>
						{/*<nav className='gap=[4px] mx-auto mr-[16px] flex items-center text-[16px] font-normal'>*/}
						{/*	{links.map(item => {*/}
						{/*		return item.out ? (*/}
						{/*			<a target='_blank' href={item.link} key={item.name} className={clsx('flex cursor-pointer items-center px-2.5 py-1')} rel='noreferrer'>*/}
						{/*				{item.name}*/}
						{/*			</a>*/}
						{/*		) : (*/}
						{/*			<Link href={item.link} key={item.name} className='flex items-center p-[6px_16px] font-djrLight'>*/}
						{/*				{item.name}*/}
						{/*			</Link>*/}
						{/*		)*/}
						{/*	})}*/}
						{/*</nav>*/}
						{/*<PrimeBtn*/}
						{/*	onMouseEnter={() => setSignBtnText('Coming Soon')}*/}
						{/*	onMouseOut={() => setSignBtnText('Sign in')}*/}
						{/*	className='min-w-[125px] border-[1px] border-[#887B5A] bg-[#fff] text-[#887B5A]'>*/}
						{/*	{signBtnText}*/}
						{/*</PrimeBtn>*/}
						<div className='flex items-center gap-4'>
							<Link href='/tasks'>
								<div
									className={clsx(
										'px-4 py-1.5 font-inter text-[18px] text-[rgba(0,0,0,0.8)]',
										pathname === '/tasks' ? 'border-b border-[rgba(0,0,0,0.8)]' : ''
									)}>
									Complete Tasks
								</div>
							</Link>
							<CountDownBtn />
						</div>

						{/*{init &&*/}
						{/*	(resolvedTheme === 'light' ? (*/}
						{/*		<div*/}
						{/*			onClick={() => {*/}
						{/*				setTheme('dark')*/}
						{/*			}}*/}
						{/*			className='cursor-pointer rounded-full bg-body p-1.5'>*/}
						{/*			<LightSVG />*/}
						{/*		</div>*/}
						{/*	) : resolvedTheme === 'dark' ? (*/}
						{/*		<div*/}
						{/*			onClick={() => {*/}
						{/*				setTheme('light')*/}
						{/*			}}*/}
						{/*			className='cursor-pointer rounded-full bg-body p-1.5'>*/}
						{/*			<DarkSVG />*/}
						{/*		</div>*/}
						{/*	) : null)}*/}
					</div>
				</div>
			</header>
		)
}
