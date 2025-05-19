'use client'
import FaviconSVG from '@/svgs/bb_prime_logo.svg'
import MenuIcon from '@/svgs/menu_icon.svg'
import CloseIcon from '@/svgs/close_icon.svg'
import { useSize } from '@/hooks/useSize'
import { useState } from 'react'
import { SwipeableDrawer } from '@material-ui/core'
import Link from 'next/link'
import PrimeBtn from '@/components/button'
import { CountDownBtn } from '@/layout/CountDownBtn'

const links = [
	{ name: 'Home', link: '/', out: false },
	{ name: 'Complete Tasks', link: '/tasks', out: false }
	// { name: 'Products', link: '/products', out: false },
	// { name: 'Blogs', link: '/blogs', out: false },
	// { name: 'Contact', link: '/', out: false }
]

export default function MobileHeader() {
	const { maxSM } = useSize()
	const [signBtnText, setSignBtnText] = useState<'Sign in' | 'Coming Soon'>('Sign in')
	const [registerText, setRegisterText] = useState<'Register' | 'Coming Soon'>('Register')
	const [open, setOpen] = useState<boolean>(false)
	if (maxSM)
		return (
			<header className='fixed left-0 top-0 z-30 hidden h-[56px] w-full items-center justify-between bg-[#fff] px-4 max-sm:flex'>
				<Link href='/'>
					<FaviconSVG className='h-[20px] w-[105px]' />
				</Link>
				<MenuIcon onClick={() => setOpen(true)} />
				<SwipeableDrawer open={open} onClose={() => setOpen(false)} anchor='top' onOpen={() => setOpen(true)}>
					<div className='p-[14px_16px_40px]'>
						<div className='mb-[54px] flex w-full items-center justify-between'>
							<Link href='/' onClick={() => setOpen(false)}>
								<FaviconSVG className='h-[20px] w-[105px]' />
							</Link>
							<CloseIcon onClick={() => setOpen(false)} />
						</div>
						<div className='mb-[40px] flex flex-col gap-[16px] text-[14px] font-medium'>
							{links.map((link, i) => {
								return (
									<Link href={link.link} key={link.name} className='flex items-center font-inter' onClick={() => setOpen(false)}>
										{link.name}
									</Link>
								)
							})}
						</div>
						<CountDownBtn />
						{/* <div>
							<PrimeBtn
								onFocus={() => setSignBtnText('Coming Soon')}
								onBlur={() => setSignBtnText('Sign in')}
								className='mb-[8px] w-[100%] border-[1px] border-[#887B5A] bg-[#fff] text-[#887B5A]'>
								{signBtnText}
							</PrimeBtn>
							<PrimeBtn onFocus={() => setRegisterText('Coming Soon')} onBlur={() => setRegisterText('Register')} className='w-[100%]'>
								{registerText}
							</PrimeBtn>
						</div> */}
					</div>
				</SwipeableDrawer>
			</header>
		)
}
