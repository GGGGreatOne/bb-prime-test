import { Dialog } from '@material-ui/core'
import PrimeBtn from '@/components/button'
import { useCountDown } from 'ahooks'
import { MINT_START_TS } from '@/const'
import { useRouter } from 'next/navigation'

export const CompleteDialog = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
	const [countdown, formattedRes] = useCountDown({
		targetDate: MINT_START_TS
	})
	const { days, hours, minutes } = formattedRes
	const router = useRouter()
	return (
		<Dialog
			PaperProps={{
				sx: { borderRadius: '24px' }
			}}
			sx={{
				'& .MuiBackdrop-root': {
					background: '#C4C4C4',
					opacity: '0.5!important'
				}
			}}
			open={open}
			onClose={() => setOpen(false)}>
			<div className='p-16 text-center max-xl:px-4 max-xl:py-8'>
				<p className='pb-4 text-[40px] font-bold leading-[120%] max-xl:text-[28px]'>✅ You’re on the list!</p>
				<p className='pb-12 text-[20px] font-medium max-xl:pb-6 max-xl:text-[16px]'>Your wallet has been successfully whitelisted.</p>
				<div className='text-start text-[18px] text-[rgba(0,0,0,0.8)] max-xl:text-[16px]'>
					<ul className='list-disc max-xl:ml-5'>
						<li className='pb-4'>
							The NFT drop goes live in {days} days {hours} hours {minutes} minutes — don’t miss it.
						</li>
						<li className='pb-4'>Please make sure your wallet has enough gas on the BounceBit chain to complete the mint when the drop opens.</li>
						<li>Only 1,000 NFTs will ever exist.</li>
					</ul>
				</div>
				<PrimeBtn
					className='mt-10 w-full bg-[#1C3F3A] max-xl:mt-6'
					onClick={() => {
						if (countdown === 0) router.push('/nftmint')
						setOpen(false)
					}}>
					Got it
				</PrimeBtn>
			</div>
		</Dialog>
	)
}
