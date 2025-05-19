import PrimeBtn from '@/components/button'
import { Dialog } from '@material-ui/core'
import Link from 'next/link'

export const MintSuccessDialog = ({
	share,
	open,
	setOpen,
	tokenId,
	tx
}: {
	share: () => void
	open: boolean
	setOpen: (open: boolean) => void
	tokenId?: number
	tx?: string
}) => {
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
			<div className='bg-[#1C3F3A] p-16 text-center font-inter text-[#fff]'>
				<p className='whitespace-nowrap pb-4 text-[40px] font-bold leading-[120%]'>✅ Claimed Successfully</p>
				<p className='pb-12 font-djr text-[20px] font-medium'>You now own a piece of history.</p>
				<div className='text-start text-[18px]'>
					<ul>
						<li className='pb-4'>NFT Details:</li>
						<li className='pb-4'>Name: black rocks #{tokenId}/1,000</li>
						<li className='pb-4'>Collection: BounceBit Prime x BlackRock</li>
						<li>
							<Link href={`https://bbscan.io/tx/${tx}`} target='_blank'>
								Chain: BounceBit | <span className='underline'>View Transaction</span>
							</Link>
						</li>
					</ul>
				</div>

				<PrimeBtn
					className='mt-10 w-full bg-[#fff] text-primary'
					onClick={() => {
						share()
						setOpen(false)
					}}>
					Share on X
				</PrimeBtn>
			</div>
		</Dialog>
	)
}
