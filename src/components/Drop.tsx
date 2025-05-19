import clsx from 'clsx'

export const Drop = ({ whiteText }: { whiteText?: boolean }) => {
	return (
		<div
			className={clsx(
				'relative z-[4] mb-[88px] flex flex-col items-center justify-center rounded-[100px_0_0_0] py-16 text-center text-[18px] max-xl:mb-0',
				whiteText ? 'text-[#fff]' : ''
			)}>
			<p className='mb-6 text-[40px] font-bold leading-[120%] max-xl:text-[28px]'>About The Drop</p>
			<p className='mb-6 max-sm:text-[16px]'>A symbol of legacy, access, and vision.</p>
			<p className='mb-6 max-w-[746px] max-sm:text-[16px]'>
				This NFT marks BounceBit Prime’s entry into structured RWA yield — where tokenized Treasuries meet institutional-grade trading
			</p>
			<p className='mb-6 max-w-[746px] max-sm:text-[16px]'>
				“black rocks” ushers in a new era of capital efficiency, with BlackRock’s BUIDL fund utilized as on-chain collateral.
			</p>
			<p className='mb-6 max-sm:text-[16px]'>Only 1,000 will ever exist — entrusted to the few who lead, not follow.</p>
			<p className='mb-6 max-sm:text-[16px]'>Minted exclusively on the BounceBit chain. Free of cost. Eternal in value</p>
			<p className='max-sm:text-[16px]'>Own a piece of history.</p>
		</div>
	)
}
