import clsx from 'clsx'
import PrimeBtn from '@/components/button'

type OfferCardProps = {
	title: string
	describe: string[]
	deepColor: boolean
	data: { title: string; value: string }[]
	positionBottom?: boolean
	onClick?: () => void
	apy?: string
}

const OfferList: OfferCardProps[] = [
	{
		title: 'Lock and Earn',
		describe: [
			'Stake RWAs to support BounceBit’s security network and earn predictable returns.',
			'Fully self-custodied – maintain full control of your assets.'
		],
		data: [{ title: 'TVL', value: '1,000,000' }],
		deepColor: false,
		apy: '12%'
	},
	{
		title: 'Basis Yield Strategy',
		describe: [
			'Subscribe RWAs to delta-neutral yield strategies for optimized, low-risk returns.',
			'Earn stacked returns: Basis trading yield + $BB incentives.',
			'Secure, on-chain yield with regulated custody.'
		],
		deepColor: true,
		data: [
			{ title: 'AUM', value: '1,000,000' },
			{ title: 'Total Payouts', value: '1,000,000' }
		],
		apy: '22%'
	},
	{
		title: 'Tokenized Market ',
		describe: ['Trade tokenized assets, including traditional stocks and indices, directly on-chain.', 'Seamless liquidity integration with major exchanges.'],
		deepColor: false,
		data: [
			{ title: 'Volume', value: '1,000,000' },
			{ title: 'Assets', value: '1,000,000' }
		],
		positionBottom: true
	}
]

const OfferCard = (params: OfferCardProps) => {
	return (
		<div
			className={clsx(
				'flex min-h-[285px] max-w-[421px] flex-col gap-[24px] rounded-[24px] p-[40px_32px] max-xl:m-[0_auto] max-xl:min-h-0 max-xl:p-[24px]',
				!params.deepColor ? ['bg-[#F7F7F7] text-[#000]'] : ['bg-[#1C3F3A] text-[#fff] shadow-[0px_0px_24px_10px] shadow-[rgba(76,76,76,0.4)] max-xl:shadow']
			)}>
			<p className='text-[24px] font-medium leading-[130%] max-xl:text-[20px]'>{params.title}</p>
			{/*{params?.apy && (*/}
			{/*	<p>*/}
			{/*		<span className='text-[52px] font-bold leading-[120%] max-xl:text-[28px]'>{params.apy}</span> apy*/}
			{/*	</p>*/}
			{/*)}*/}
			<div className={clsx('flex flex-col gap-[12px]', params?.positionBottom ? 'mb-[139px] max-xl:mb-[8px]' : 'max-xl:mb-[8px]')}>
				{params.describe.map((item, index) => {
					return (
						<div className='flex' key={index}>
							<div className={clsx('mt-[6px] h-[9px] w-[9px] min-w-[9px] rounded-[100%]', !params.deepColor ? 'bg-[#C9BB96]' : 'bg-[#fff]')} />
							<span className='ml-[11px] text-start font-normal'>{item}</span>
						</div>
					)
				})}
			</div>
			{/*<div className={clsx('flex gap-[10px]', params.data.length === 1 ? 'rounded-[12px] bg-[#fff]' : '')}>*/}
			{/*	{params.data.map((item, index) => {*/}
			{/*		return (*/}
			{/*			<div*/}
			{/*				className={clsx(*/}
			{/*					'w-[50%] rounded-[12px] p-[12px_24px] text-start max-xl:p-[12px_16px]',*/}
			{/*					params.data.length > 1 && params.deepColor ? 'bg-[#425B57]' : 'bg-[#fff]'*/}
			{/*				)}*/}
			{/*				key={index}>*/}
			{/*				<p*/}
			{/*					className={clsx(*/}
			{/*						'mb-[8px] text-[18px] font-normal leading-[130%] max-xl:text-[16px]',*/}
			{/*						params.deepColor ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(0,0,0,0.7)]'*/}
			{/*					)}>*/}
			{/*					{item.title}*/}
			{/*				</p>*/}
			{/*				<p className='text-[24px] font-medium leading-[120%] max-xl:text-[20px]'>{item.value}</p>*/}
			{/*			</div>*/}
			{/*		)*/}
			{/*	})}*/}
			{/*</div>*/}
			{/*<PrimeBtn className={clsx('w-[100%]', params.deepColor ? 'bg-[#fff] text-[#000]' : '')}>Request Access</PrimeBtn>*/}
		</div>
	)
}

export const Offerings = ({ footer }: { footer: boolean }) => {
	return (
		<div className='p-[100px_0] text-center max-xl:p-[64px_16px_24px]'>
			<p className='mb-[20px] text-[52px] font-bold leading-[120%] max-xl:mb-[8px] max-xl:text-[28px]'>Core Offerings</p>
			<p className='mb-[80px] text-[18px] font-normal leading-[130%] text-[rgba(0,0,0,0.7)] max-xl:mb-[32px] max-xl:text-[16px]'>
				No stablecoins, no wrapping—just direct and optimized yield on your RWAs.
			</p>
			<div className='m-[0_auto] flex max-w-[1312px] gap-[24px] max-xl:flex-col'>
				{OfferList.map((o, i) => {
					return (
						<OfferCard
							title={o.title}
							data={o.data}
							describe={o.describe}
							deepColor={o.deepColor}
							apy={o?.apy}
							onClick={o?.onClick}
							positionBottom={o?.positionBottom}
							key={i}
						/>
					)
				})}
			</div>
			{footer && (
				<p className='mt-[64px] text-[16px] font-medium leading-[130%]'>
					Assets are secured through industry-leading custody partners, including CEFFU and Fireblocks.
				</p>
			)}
		</div>
	)
}
