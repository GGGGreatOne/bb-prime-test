import BlogIcon from '@/svgs/blog_icon.svg'
import { ReactNode } from 'react'

type BlogsProps = { date: string; title: string; content: string; bg: ReactNode }

const BlogList: BlogsProps[] = [
	{
		date: 'Jan22, 2025',
		title: 'Introducing credits for usage-based billing',
		content:
			'With the rise of usage-based billing for AI services, the strategic importance of credits is growing. That’s why we’ve recently added a new credits feature to Stripe Billing.',
		bg: (
			<div
				style={{ background: 'url(/assets/blog.png) lightgray 50% / cover no-repeat' }}
				className='h-[342px] w-[570px] rounded-[24px] max-sm:h-[197px] max-sm:w-[100%]'
			/>
		)
	},
	{
		date: 'Jan22, 2025',
		title: 'Introducing credits for usage-based billing',
		content:
			'With the rise of usage-based billing for AI services, the strategic importance of credits is growing. That’s why we’ve recently added a new credits feature to Stripe Billing.',
		bg: (
			<div
				style={{ background: 'url(/assets/blog2.png) lightgray 50% / cover no-repeat' }}
				className='h-[342px] w-[570px] rounded-[24px] max-sm:h-[197px] max-sm:w-[100%]'
			/>
		)
	},
	{
		date: 'Jan22, 2025',
		title: 'Introducing credits for usage-based billing',
		content:
			'With the rise of usage-based billing for AI services, the strategic importance of credits is growing. That’s why we’ve recently added a new credits feature to Stripe Billing.',
		bg: (
			<div
				style={{ background: 'url(/assets/blog3.png) lightgray 50% / cover no-repeat' }}
				className='relative h-[342px] w-[570px] rounded-[24px] max-sm:h-[197px] max-sm:w-[100%]'>
				<BlogIcon className='absolute left-[32px] top-[148px] max-sm:hidden' />
				<p className='absolute left-[32px] top-[204px] text-[40px] font-bold leading-[120%] text-[#fff] max-sm:hidden'>
					Introducing credits for usage-based billing
				</p>
			</div>
		)
	},
	{
		date: 'Jan22, 2025',
		title: 'Introducing credits for usage-based billing',
		content:
			'With the rise of usage-based billing for AI services, the strategic importance of credits is growing. That’s why we’ve recently added a new credits feature to Stripe Billing.',
		bg: (
			<div
				style={{ background: 'url(/assets/blog4.png) lightgray 50% / cover no-repeat' }}
				className='h-[342px] w-[570px] rounded-[24px] max-sm:h-[197px] max-sm:w-[100%]'
			/>
		)
	}
]

const BlogCard = ({ title, date, content, bg }: BlogsProps) => {
	return (
		<div className='flex justify-between py-[80px] max-sm:flex-col max-sm:py-[24px]'>
			<div>
				<p className='pb-[12px] text-[16px] font-medium text-[rgba(136,123,90,1)] max-sm:pb-[8px] max-sm:text-[14px]'>{date}</p>
				<p className='max-w-[678px] pb-[20px] text-[40px] font-bold leading-[120%] max-sm:text-[24px]'>{title}</p>
				<p className='max-w-[678px] pb-[32px] text-[18px] max-sm:pb-[24px] max-sm:text-[16px]'>{content}</p>
				<p className='text-[16px] font-medium text-[rgba(136,123,90,1)] max-sm:mb-[32px] max-sm:text-[14px]'>Read more {'>'}</p>
			</div>
			{bg}
		</div>
	)
}

export default function Blogs() {
	return (
		<div className='min-h-[calc(100vh-150px)] bg-[#fff] font-inter font-normal leading-[130%]'>
			<div className='m-[0_auto] max-w-[1312px] pt-[82px] max-xl:m-[0_16px] max-sm:pt-[56px]'>
				<div className='border-b-color-[#E0E0E0] border-b-[1px]'>
					<p className='mb-[16px] pt-[120px] text-[52px] font-bold leading-[120%] max-sm:pt-[64px] max-sm:text-[28px]'>Blog</p>
					<p className='mb-[64px] text-[20px] leading-[140%] max-sm:mb-[24px] max-sm:text-[16px]'>
						Institutional-grade solutions for unlocking the full potential of BUIDL, BENJI, and USYC.
					</p>
				</div>
				<div className='mt-[40px] max-sm:mt-[24px]'>
					{BlogList.map((b, i) => {
						return <BlogCard key={i} date={b.date} title={b.title} content={b.content} bg={b.bg} />
					})}
				</div>
			</div>
		</div>
	)
}
