import { Verify } from '@/components/wireframe/Verify'
import { Drop } from '@/components/Drop'

export default function Wireframe() {
	return (
		<div className='min-h-[calc(100vh-150px)] bg-[#fff] pt-[82px] font-inter font-normal leading-[130%] max-xl:px-4 max-sm:pt-[56px]'>
			<div className='m-[0_auto] flex max-w-[1312px] flex-col justify-center'>
				<div className='my-[64px] text-center font-inter text-[52px] font-bold leading-[120%] max-xl:text-[36px]'>
					<p>
						Claim Your Spot<span className='italic max-xl:hidden'>: black rocks</span>
					</p>
					<p className='font-djr text-[30px] font-medium max-xl:hidden'>— the NFT collection where BounceBit meets BlackRock</p>
				</div>
				<div
					style={{
						background: 'linear-gradient(0deg, rgba(32, 45, 39, 0.84) 0%, rgba(32, 45, 39, 0.84) 100%), url(/assets/nft_bg.png) lightgray 50% / cover no-repeat'
					}}
					className='mb-16 w-full rounded-[88px_0_0_0] px-4 py-[100px] max-xl:py-12'>
					<div className='m-[0_auto] max-w-[1152px]'>
						<div className='border-b border-[rgba(255,255,255,0.3)] pb-[24px] text-[40px] font-bold leading-[120%] text-[#fff] max-xl:hidden'>
							Complete the tasks below to unlock your whitelist spot for the exclusive NFT free mint
						</div>
						<div className='hidden border-b border-[rgba(255,255,255,0.3)] pb-[24px] pl-2 text-[28px] font-bold leading-[120%] text-[#fff] max-xl:block'>
							Complete the tasks below for the exclusive NFT free mint
						</div>
						<Verify />
					</div>
				</div>
				<div
					style={{
						background:
							'linear-gradient(0deg, rgba(215, 204, 173, 0.75) 0%, rgba(215, 204, 173, 0.75) 100%), url(/assets/nft_bg1.png) lightgray 50% / cover no-repeat'
					}}
					className='mb-16 w-full rounded-[0_0_88px_0] pt-[88px] max-xl:mb-[25px] max-xl:px-4 max-xl:pt-0'>
					<Drop />
				</div>
			</div>
		</div>
	)
}
