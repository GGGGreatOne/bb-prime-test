import { Offerings } from '@/components/Offerings'
import { FQA } from '@/components/FQA'

export default function Products() {
	return (
		<div className='min-h-[calc(100vh-150px)] bg-[#fff] pt-[82px] font-inter font-normal leading-[130%] max-sm:pt-[56px]'>
			<div className='relative flex flex-col overflow-hidden bg-[#F7F7F7] p-[182px_0] text-center max-sm:p-[125px_0_112px]'>
				<div className='flex justify-center text-[72px] font-bold leading-[120%] max-sm:m-[0_auto] max-sm:max-w-[257px] max-sm:text-[36px]'>
					<p className='max-w-[960px] max-sm:w-[257px] max-sm:text-[36px]'>Optimize RWA Liquidity with Confidence</p>
				</div>
				<p className='mt-[8px] font-djrLight text-[20px] font-medium leading-[140%] max-sm:m-[24px_auto] max-sm:w-[296px] max-sm:text-[16px]'>
					Institutional-grade solutions for unlocking the full potential of BUIDL, BENJI, and USYC.
				</p>
				<div className='absolute right-[-56px] top-[-70px] h-[296px] w-[296px] rounded-[0px_0px_0px_117px] bg-[#E0E9E9] max-xl:h-[180px] max-xl:w-[180px] max-xl:rounded-[0_0_0_74px]' />
				<div
					className='absolute bottom-[-70px] left-[-56px] h-[296px] w-[296px] rounded-[0px_139px_0px_0px_] max-xl:h-[180px] max-xl:w-[180px] max-xl:rounded-[0_84px_0_0]'
					style={{
						background:
							'linear-gradient(0deg, rgba(28, 63, 58, 0.33) 0%, rgba(28, 63, 58, 0.33) 100%), url(/assets/products_bg1.png) lightgray 50% / cover no-repeat'
					}}
				/>
			</div>
			<Offerings footer={true} />
			<div className='flex flex-col p-[40px_0] text-center max-sm:p-[0_16px_64px]'>
				<p className='mb-[20px] text-[52px] font-bold leading-[120%] max-sm:mb-[8px] max-sm:text-[28px]'>FAQ</p>
				<p className='mb-[80px] text-[18px] text-[rgba(0,0,0,0.8)] max-sm:mb-[32px]'>Subheading</p>
				<FQA />
			</div>
		</div>
	)
}
