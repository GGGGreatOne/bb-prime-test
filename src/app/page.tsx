import Chart1 from '@/svgs/chart1.svg'
import Chart2 from '@/svgs/chart2.svg'
import Chart3 from '@/svgs/chart3.svg'
import Chart4 from '@/svgs/chart4.svg'
import Chart5 from '@/svgs/chart5.svg'
import CardIcon1 from '@/svgs/card_icon1.svg'
import CardIcon2 from '@/svgs/card_icon2.svg'
import CardIcon3 from '@/svgs/card_icon3.svg'
import PartnersIcon1 from '@/svgs/partner1.svg'
import PartnersIcon2 from '@/svgs/partner2.svg'
import PartnersIcon3 from '@/svgs/partner3.svg'
import Partners1 from '@/svgs/partners1.svg'
import Partners2 from '@/svgs/partners2.svg'
import Partners3 from '@/svgs/partners3.svg'
import Partners4 from '@/svgs/partners4.svg'
import Partners5 from '@/svgs/partners5.svg'
import Partners6 from '@/svgs/partners6.svg'
import Partners7 from '@/svgs/partners7.svg'
import Partners8 from '@/svgs/partners8.svg'
import { ReactNode } from 'react'
import clsx from 'clsx'
import { Offerings } from '@/components/Offerings'

type SolutionsProps = {
	index: string
	content: string
	hasBorder: boolean
}

const Solutions: SolutionsProps[] = [
	{
		index: '1',
		content: 'Deploy RWAs into institutional-grade yield strategies with full regulatory compliance',
		hasBorder: true
	},
	{
		index: '2',
		content: 'Access deep liquidity and institutional-grade credit markets with on-chain transparency',
		hasBorder: true
	},
	{
		index: '3',
		content: 'Built on leading custody & exchange partnerships for secure capital deployment',
		hasBorder: false
	}
]

const SolutionsCard = (params: SolutionsProps) => {
	return (
		<div className={clsx('flex items-center gap-[24px]', params.hasBorder ? 'max-xl:border-b-[1px] max-xl:border-[#fff] max-xl:pb-[20px]' : '')}>
			<div className='ml-[18px] text-[86px] font-bold leading-[120%] text-[#fff] max-xl:text-[52px]'>{params.index}</div>
			<div className='max-w-[284px] text-[18px] leading-[130%] text-[rgba(255,255,255,0.8)] max-xl:text-[16px]'>{params.content}</div>
			{params.hasBorder && <div className='h-[100%] w-[1px] bg-[#fff]' />}
		</div>
	)
}

type RWACardProps = {
	icon: ReactNode
	title: string
	content: string[]
	yellowCard: boolean
}

const RWACardList: RWACardProps[] = [
	{
		icon: <CardIcon1 />,
		title: 'Institutional Yield Optimization',
		content: [
			'Maximize returns with delta-neutral strategies layered on top the 4% T-bill yield.',
			'Achieve returns with zero counterparty risk on exchanges.'
		],
		yellowCard: false
	},
	{
		icon: <CardIcon2 />,
		title: 'Enhanced Capital Security & Efficiency',
		content: [
			'Transform $15B of on-chain RWA into active liquidity opportunities.',
			'Security with regulated custody & compliance while accessing unparalleled credit opportunities.'
		],
		yellowCard: false
	},
	{
		icon: <CardIcon3 />,
		title: 'Simplified RWA Collateralization',
		content: ['Streamline direct collateralization for trading credit on exchanges.', 'Eliminate stablecoin complexity and counterparty risk.'],
		yellowCard: true
	}
]

const RWACard = (params: RWACardProps) => {
	return (
		<div
			className={clsx(
				'max-w-[421px] rounded-[0px_64px_0px_0px] border-[1px] border-[#E0E0E0] p-[32px_24px] max-xl:m-[0_auto] max-xl:p-[40px_16px]',
				!params.yellowCard ? [''] : ['bg-[#D7CCAD]']
			)}>
			<div className='mb-[25px] flex'>
				{params.icon}
				<div className='ml-[8px] text-start text-[24px] font-medium max-xl:text-[20px]'>{params.title}</div>
			</div>
			<div className='flex flex-col gap-[12px]'>
				{params.content.map((item, index) => {
					return (
						<div className='flex' key={index}>
							<div className={clsx('mt-[6px] h-[9px] w-[9px] min-w-[9px] rounded-[100%]', !params.yellowCard ? 'bg-[#C9BB96]' : 'bg-[rgba(99,80,31,1)]')} />
							<span className='ml-[11px] text-start opacity-[0.7]'>{item}</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}

type Partners = { content: ReactNode; borderRight: boolean; borderBottom: boolean; width: string; position?: string[] }

const PartnersList: Partners[] = [
	{
		content: <Partners1 />,
		borderRight: true,
		borderBottom: true,
		width: 'w-[220px]',
		position: ['top-0 right-0', 'bottom-0 left-0']
	},
	{
		content: <Partners2 />,
		borderRight: true,
		borderBottom: true,
		width: 'w-[240px]',
		position: ['top-0 right-0', 'bottom-0 left-[20px]']
	},
	{
		content: <Partners3 />,
		borderRight: true,
		borderBottom: true,
		width: 'w-[240px]',
		position: ['top-0 right-0', 'bottom-0 left-[20px]']
	},
	{
		content: <Partners4 />,
		borderRight: false,
		borderBottom: true,
		width: 'w-[220px]',
		position: ['', 'bottom-0 left-[20px]']
	},
	{
		content: <Partners5 />,
		borderRight: true,
		borderBottom: false,
		width: 'w-[220px]',
		position: ['top-[20px] right-0', '']
	},
	{
		content: <Partners6 />,
		borderRight: true,
		borderBottom: false,
		width: 'w-[240px]',
		position: ['top-[20px] right-0', '']
	},
	{
		content: <Partners7 />,
		borderRight: true,
		borderBottom: false,
		width: 'w-[240px]',
		position: ['top-[20px] right-0', '']
	},
	{
		content: <Partners8 />,
		borderRight: false,
		borderBottom: false,
		width: 'w-[220px]'
	}
]

export default function Home() {
	return (
		<main className='bg-[#fff] font-inter'>
			<div className='flex justify-center p-[164px_0_0] max-xl:p-[88px_16px_0]'>
				<div className='flex w-[100%] max-w-[1312px] justify-between max-xl:flex-col max-xl:gap-[50px]'>
					<div className='max-xl:m-[0_auto]'>
						<p className='text-[72px] font-bold leading-[120%] max-xl:text-[36px]'>BounceBit Prime</p>
						<p className='my-[8px] font-djr text-[30px] font-bold leading-[140%] text-[#887B5A] max-xl:text-[22px]'>Secure. Compliant. Capital-Efficient. </p>
						<p className='max-w-[499px] font-djr text-[20px] max-xl:text-[16px]'>
							Institutional-Grade Yield Solutions for Real World Assets.&nbsp;Unlock on-chain yield with secure custody, deep liquidity, and frictionless
							capital deployment.
						</p>
						<p className='m-[40px_0_100px] font-djrLight text-[14px] leading-[140%] max-sm:m-[24px_0_12px]' style={{ color: 'rgba(0, 0, 0, 0.80)' }}>
							Powered by BounceBit
						</p>
						{/*<PrimeBtn className='w-[125px] font-djr'>Get Started</PrimeBtn>*/}
						<div className='mt-[33px] flex items-center gap-[40px] max-sm:mt-[40px] max-sm:gap-[24px]'>
							<PartnersIcon1 className='max-sm:w-[72px]' />
							<PartnersIcon3 className='max-sm:w-[72px]' />
							<PartnersIcon2 className='max-sm:w-[72px]' />
						</div>
					</div>
					<div className='mr-[56px] grid grid-cols-[296px_296px] max-xl:m-[0_auto] max-xl:grid-cols-[152px_152px]'>
						<div className='relative'>
							<img src='/assets/landing_page_bg1.png' alt='BBPrime1' />
							<div className='absolute bottom-[-34px] left-[-128px] max-xl:bottom-[-24px] max-xl:left-[-20px]'>
								<Chart1 className='max-xl:h-[89px] max-xl:w-[132px]' />
							</div>
						</div>
						<div className='relative rounded-[118px_0px_0px_0px] bg-[#E0E9E9] max-xl:rounded-[90px_0px_0px_0px]'>
							<div className='absolute left-[15px] top-[30px] max-xl:top-[14px]'>
								<Chart2 className='max-xl:h-[140px] max-xl:w-[140px]' />
							</div>
							<div className='absolute right-[-92px] top-[72px] max-xl:right-[-30px] max-xl:top-[34px]'>
								<Chart5 className='max-xl:h-[44px] max-xl:w-[78px]' />
							</div>
						</div>
						<div className='rounded-[0px_0px_118px_0px] bg-[#1C3F3A] p-[50px_0px_0px_35px] text-[#E0E9E9] max-xl:rounded-[0px_0px_90px_0px] max-xl:p-[28px_0_0_7px]'>
							<p className='text-[42px] font-bold leading-[120%] max-xl:text-[24px]'>$10m</p>
							<p className='pb-[30px] max-xl:mt-[9px] max-xl:pb-0 max-xl:text-[12px]'>Assets Under Management</p>
							<Chart3 className='max-xl:h-[52px] max-xl:w-[109px]' />
						</div>
						<div className='max-xl:overflow-hidden max-xl:rounded-[0px_0px_90px_0px]'>
							<img src='/assets/landing_page_bg2.png' alt='BBPrime2' />
						</div>
					</div>
				</div>
			</div>
			<div
				className='mt-[80px] flex h-[649px] flex-col p-[100px_0] max-xl:h-[auto] max-xl:p-[64px_16px]'
				style={{
					background:
						'linear-gradient(0deg, rgba(32, 45, 39, 0.84) 0%, rgba(32, 45, 39, 0.84) 100%), url(/assets/landing_page_bg3.png) lightgray 50% / cover no-repeat'
				}}>
				<div className='flex justify-center'>
					<p className='max-w-[800px] text-center text-[39px] font-bold leading-[120%] text-[#fff] max-xl:text-[28px]'>
						BounceBit Prime bridges traditional Western assets with Eastern credit market, delivering secure, compliant, and high-yield investment solutions.
					</p>
				</div>
				<div className='mt-[64px] flex justify-center gap-[24px] max-xl:flex-col max-xl:gap-[20px]'>
					{Solutions.map(s => {
						return <SolutionsCard index={s.index} content={s.content} hasBorder={s.hasBorder} key={s.index} />
					})}
				</div>
			</div>
			<div className='bg-[#F7F7F7] p-[100px_0] text-center max-xl:p-[64px_16px]'>
				<div className='mb-[80px] max-xl:mb-[32px]'>
					<div className='flex justify-center'>
						<p className='mb-[8px] max-w-[850px] text-center text-[52px] font-bold leading-[120%] max-xl:text-[28px]'>
							Turn RWAs into Institutional-Grade Yield & Liquidity
						</p>
					</div>
					<p className='text-[39px] font-bold leading-[120%] text-[rgba(160,138,80,1)] max-xl:text-[28px]'>Compliant. Transparent. High-Performance.</p>
				</div>
				<div className='m-[0_auto] flex max-w-[1312px] gap-[24px] max-xl:flex-col'>
					{RWACardList.map((s, i) => {
						return <RWACard icon={s.icon} title={s.title} content={s.content} yellowCard={s.yellowCard} key={i} />
					})}
				</div>
			</div>
			<Offerings footer={false} />
			{/*<div className='p-[100px_0] text-center'>*/}
			{/*	<p className='text-[14px] font-medium leading-[140%] text-[#1C3F3A]'>WHO ‘S OUR BACKUP</p>*/}
			{/*	<p className='text-[48px] font-bold leading-[120%]'>Our Partners</p>*/}
			{/*	<div className='flex justify-center'>*/}
			{/*		<p className='max-w-[850px] text-[18px] font-normal leading-[130%] text-[rgba(0,0,0,0.7)]'>*/}
			{/*			Our network of trusted partners—from global exchanges and custodians to leading security auditors—ensuring a seamless and secure experience for*/}
			{/*			institutional investors.*/}
			{/*		</p>*/}
			{/*	</div>*/}
			{/*	<div className='mt-[40px] flex justify-center'>*/}
			{/*		<div className='grid grid-cols-[220px_1fr_1fr_1fr]'>*/}
			{/*			{PartnersList.map((partners, i) => {*/}
			{/*				return (*/}
			{/*					<div className={clsx('relative flex h-[220px] items-center', [partners.width, i === 0 ? 'justify-start' : 'justify-center'])} key={i}>*/}
			{/*						<div className='flex'>{partners.content}</div>*/}
			{/*						{partners.borderRight && (*/}
			{/*							<div*/}
			{/*								className={clsx(*/}
			{/*									'absolute right-[0px] top-[0px] h-[200px] w-[1px] bg-[rgba(146,146,146,0.4)]',*/}
			{/*									partners?.position ? partners.position[0] : []*/}
			{/*								)}*/}
			{/*							/>*/}
			{/*						)}*/}
			{/*						{partners.borderBottom && (*/}
			{/*							<div*/}
			{/*								className={clsx('absolute bottom-0 left-0 h-[1px] w-[200px] bg-[rgba(146,146,146,0.4)]', partners?.position ? partners.position[1] : [])}*/}
			{/*							/>*/}
			{/*						)}*/}
			{/*					</div>*/}
			{/*				)*/}
			{/*			})}*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}
			<div className='flex justify-center p-[80px_0_64px] max-xl:p-[40px_16px]'>
				<div className='max-w-[1312px] overflow-hidden rounded-[0px_0px_100px_0px] bg-[#D7CCAD] p-[64px_0px_0px_64px] max-xl:p-[32px_16px_0]'>
					<div className='relative'>
						<p className='relative z-[4] mb-[16px] max-w-[689px] text-[48px] font-bold leading-[120%] max-xl:text-[28px]'>
							Join the Leading Institutions in RWA Yield Strategies
						</p>
					</div>
					<div className='flex gap-[80px] max-xl:flex-col max-xl:gap-0'>
						<div>
							<p className='mb-[38px] max-w-[536px] text-[20px] font-normal leading-[140%] text-[rgba(0,0,0,0.80)] opacity-[0.6] max-xl:text-[16px]'>
								Discover how institutional investors are earning secure, on-chain yield with BounceBit Prime.
							</p>
							{/*<PrimeBtn className='w-[125px]'>Register</PrimeBtn>*/}
						</div>
						<div className='relative mr-[166px] max-xl:ml-[14px] max-xl:mr-0'>
							<div className='relative flex'>
								<Chart4 className='relative z-[3] max-xl:h-[220px] max-xl:w-[234px]' />
								<div className='absolute right-[-194px] top-[-190px] z-[1] h-[206px] w-[206px] rounded-[0_148px_0_0] bg-[#E0E9E9] max-xl:left-[230px] max-xl:right-[] max-xl:top-[-50px] max-xl:h-[103px] max-xl:w-[103px] max-xl:rounded-[0_74px_0_0]' />
								<div
									className='absolute right-[-80px] top-[-80px] z-[2] h-[296px] w-[296px] rounded-[148px_0_0_0] max-xl:left-[120px] max-xl:top-[10px] max-xl:h-[148px] max-xl:w-[148px] max-xl:rounded-[74px_0_0_0]'
									style={{
										background:
											'linear-gradient(0deg, rgba(28, 63, 58, 0.41) 0%, rgba(28, 63, 58, 0.41) 100%), url(/assets/landing_page_bg3.png) lightgray 0px -8.127px / 100% 149.982% no-repeat'
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
