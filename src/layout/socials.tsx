import TwitterSVG from '@/svgs/social/twitter.svg'
import LightTwitterSVG from '@/svgs/social/light-twitter.svg'
import DiscordSVG from '@/svgs/social/discord.svg'
import MediumSVG from '@/svgs/social/medium.svg'
import DocSVG from '@/svgs/social/doc.svg'
import TGSvg from '@/svgs/social/tg.svg'
import LightTGSvg from '@/svgs/social/light-tg.svg'
import { useTheme } from 'next-themes'

export default function Socials() {
	const { resolvedTheme } = useTheme()
	return (
		<ul className='flex items-center gap-6'>
			<li>
				<a className='block p-1.5' href='https://twitter.com/bounce_bit' target='_blank' rel='noopener noreferrer'>
					{resolvedTheme === 'light' ? <LightTwitterSVG className='h-3 w-3' /> : <TwitterSVG className='h-3 w-3' />}
				</a>
			</li>
			<li>
				<a className='block p-1.5' href='https://t.me/bouncebit_io' target='_blank' rel='noopener noreferrer'>
					{resolvedTheme === 'light' ? <LightTGSvg className='h-5 w-5' /> : <TGSvg className='h-5 w-5' />}
				</a>
			</li>
			<li>
				<a className='block p-1.5' href='https://discord.gg/bouncebit' target='_blank' rel='noopener noreferrer'>
					<DiscordSVG className='h-5 w-5' />
				</a>
			</li>
			<li>
				<a className='block p-1.5' href='https://medium.com/@bouncebit' target='_blank' rel='noopener noreferrer'>
					<MediumSVG className='h-5 w-5' />
				</a>
			</li>
			<li>
				<a className='block p-1.5' href='https://docs.bouncebit.io' target='_blank' rel='noopener noreferrer'>
					<DocSVG className='h-5 w-5' />
				</a>
			</li>
		</ul>
	)
}
