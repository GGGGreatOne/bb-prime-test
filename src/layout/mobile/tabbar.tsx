import CedefiActiveSVG from '@/svgs/tabbar/tab-cedefi-active.svg'
import CedefiSVG from '@/svgs/tabbar/tab-cedefi.svg'
import ConvertActiveSVG from '@/svgs/tabbar/tab-convert-active.svg'
import ConvertSVG from '@/svgs/tabbar/tab-convert.svg'
import DappActiveSVG from '@/svgs/tabbar/tab-dapp-active.svg'
import DappSVG from '@/svgs/tabbar/tab-dapp.svg'
import ClubSVG from '@/svgs/tabbar/tab-club.svg'
import ClubActiveSVG from '@/svgs/tabbar/tab-club-active.svg'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
	{ name: 'CeDeFi', href: '/cedefi', out: false, icon: <CedefiSVG />, active: <CedefiActiveSVG /> },
	{ name: 'Convert', href: '/convert', out: false, icon: <ConvertSVG />, active: <ConvertActiveSVG /> },
	{ name: 'dApp', href: '/dapp', out: false, icon: <DappSVG />, active: <DappActiveSVG /> },
	{ name: 'Club', href: 'https://club.bouncebit.io/', out: true, icon: <ClubSVG />, active: <ClubActiveSVG /> }
]

export default function MobileTabbar() {
	const pathname = usePathname()
	const tab = tabs.find(item => pathname.startsWith(item.href)) || tabs[0]

	return (
		<div className='fixed bottom-0 left-0 right-0 z-30 bg-body sm:hidden' style={{ boxShadow: '0px -3px 48px 0px rgba(0, 0, 0, 0.10)' }}>
			<nav className='grid grid-cols-4 text-sm text-secondary'>
				{tabs.map(item => {
					const active = item.name === tab.name

					return item.out ? (
						<a target='_blank' href={item.href} key={item.name} className={clsx('flex cursor-pointer flex-col items-center py-[15px]')} rel='noreferrer'>
							{item.icon}
						</a>
					) : (
						<Link href={item.href} key={item.name} className={clsx('flex cursor-pointer flex-col items-center py-[15px]', active && 'text-primary')}>
							{active ? item.active : item.icon}
							{/* <div className={clsx('mt-1', active && 'text-primary')}>{item.name}</div> */}
						</Link>
					)
				})}
			</nav>
		</div>
	)
}
