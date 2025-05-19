import PrimeBtn from '@/components/button'
import { useLogin } from '@/hooks/useLogin'
import { useAppKit } from '@reown/appkit/react'

export const Operational = ({
	address,
	token,
	userTokenId,
	minted,
	setOpen
}: {
	address: string | undefined
	token: string | null
	userTokenId: number | undefined
	minted: boolean
	setOpen: (o: boolean) => void
}) => {
	const { open: ConnectWallet } = useAppKit()
	const { login } = useLogin()
	return (
		<div className='flex flex-col justify-between'>
			<div className='flex flex-col items-center pb-20 max-xl:pb-10 max-xl:pt-10'>
				{!address && !token && (
					<PrimeBtn onClick={() => ConnectWallet()} className='w-[480px] bg-[#1C3F3A] max-xl:w-full'>
						Connect Wallet{' '}
					</PrimeBtn>
				)}
				{address && !token && !minted && (
					<PrimeBtn onClick={() => login()} className='w-[480px] bg-[#1C3F3A] max-xl:w-full'>
						Sign message
					</PrimeBtn>
				)}
				{address && token && userTokenId === 0 && (
					<PrimeBtn onClick={() => setOpen(true)} className='w-[480px] bg-[#1C3F3A] max-xl:w-full'>
						Mint
					</PrimeBtn>
				)}
				{address && minted && <PrimeBtn className='w-[480px] max-xl:w-full'>Claimed</PrimeBtn>}
				<p className='py-2'>1 mint per wallet</p>
			</div>
			<div className='flex justify-center gap-[48px]'>
				<span>Cost:&nbsp;Free + Gas</span>
				<span>Chain:&nbsp;BounceBit</span>
			</div>
		</div>
	)
}
