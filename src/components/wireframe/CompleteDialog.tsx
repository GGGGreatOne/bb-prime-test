import { Dialog } from '@material-ui/core'
import PrimeBtn from '@/components/button'

export const CompleteDialog = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
	return (
		<Dialog
			PaperProps={{
				sx: { borderRadius: '24px' }
			}}
			open={open}
			onClose={() => setOpen(false)}>
			<div className='p-16 text-center max-xl:p-6'>
				<p className='pb-4 text-[40px] font-bold leading-[120%]'>✅ You’re on the list!</p>
				<p className='pb-12 text-[20px] font-medium'>Your wallet has been successfully whitelisted.</p>
				<div className='text-start text-[18px] text-[rgba(0,0,0,0.8)]'>
					<ul className='list-disc'>
						<li className='pb-4'>The NFT drop goes live in [XX hours/minutes] — don’t miss it.</li>
						<li className='pb-4'>Please make sure your wallet has enough gas on the BounceBit chain to complete the mint when the drop opens.</li>
						<li>Only 1,000 NFTs will ever exist.</li>
					</ul>
				</div>
				<PrimeBtn className='mt-10 w-full bg-[#1C3F3A]' onClick={() => setOpen(false)}>
					Got it
				</PrimeBtn>
			</div>
		</Dialog>
	)
}
