'use client'
import PrimeBtn from '@/components/button'
import { Drop } from '@/components/Drop'
import { useConnectedAddress } from '@/hooks/useWallet'
import { useCallback, useEffect, useState } from 'react'
import { MintDialog } from '@/components/mintNft/MintDialog'
import clsx from 'clsx'
import { useAccountEffect, useReadContract } from 'wagmi'
import nfTAbi from '@/contract/json/BouncebitPrimeNFT.json'
import { PRIME_NFT } from '@/contract/primeNFT'
import BigNumber from 'bignumber.js'
import { useRequest } from 'ahooks'
import { NFTApi } from '@/lib/axios'
import { TokenUrlResp } from '@/app/nftmint/type'
import { Operational } from '@/components/mintNft/Operational'
import ArrowRight from '@/svgs/arrow_right_white.svg'
import { MintSuccessDialog } from '@/components/mintNft/MintSuccessDialog'
import { setLocalUserInfo, useLocalUserInfo } from '@/hooks/useLocalUserInfo'

export type Hash = `0x${string}`
export default function NftMint() {
	const { address } = useConnectedAddress()

	const { token, wallet: localWallet } = useLocalUserInfo()

	const [open, setOpen] = useState(false)
	const [openClaimed, setOpenClaimed] = useState(false)
	const [minted, setMinted] = useState(false)
	const [userTokenId, setUserTokenId] = useState<number | undefined>(undefined)
	const [tx, setTx] = useState<Hash | undefined>(undefined)
	const [state, setState] = useState<'pending' | 'done' | 'error'>('pending')
	const userTokenIdRes = useReadContract({
		abi: nfTAbi,
		address: PRIME_NFT,
		functionName: 'tokenIdByMinter',
		args: [address]
	})

	const { data: metadata, loading } = useRequest(
		async () => {
			const res = await NFTApi<TokenUrlResp>({
				url: `/extra/prime/${userTokenId}.json`,
				method: 'get',
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			return {
				tokenUrl: res.data.image,
				attributes: res.data.attributes[0].value
			}
		},
		{
			ready: !!userTokenId && minted,
			refreshDeps: [address, userTokenId]
		}
	)

	useEffect(() => {
		if (address) {
			if (userTokenIdRes.fetchStatus === 'idle') {
				const id = new BigNumber(userTokenIdRes.data as string).toNumber()
				setUserTokenId(id)
				setMinted(id > 0)
			}
		}
	}, [userTokenIdRes, address])

	useEffect(() => {
		if (address && address !== localWallet) {
			setLocalUserInfo({
				wallet: '',
				token: ''
			})
		}
	}, [address, localWallet])

	useAccountEffect({
		onDisconnect() {
			setLocalUserInfo({
				wallet: '',
				token: ''
			})
		}
	})

	const shareOn = useCallback(() => {
		const href = window.location.href
		const text = href + '\n I just claimed my ‘black rocks’ NFT — 1 of only 1,000 ever minted on @BounceBit. A new era of institutional-grade RWAs begins'
		const hashtags = 'BounceBitPrime#BB'
		const intentUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text ?? '') + '&hashtags=' + encodeURIComponent(hashtags)
		window.open(intentUrl, '_blank', 'width=600,height=600')
	}, [])

	useEffect(() => {
		if (tx && state === 'done' && userTokenId) setOpenClaimed(true)
	}, [tx, state, userTokenId])

	return (
		<div className='min-h-[calc(100vh-150px)] bg-[#fff] pt-[140px] font-inter font-normal leading-[130%] max-xl:px-4 max-sm:pt-[56px]'>
			{open && <MintDialog tx={tx} state={state} setTx={s => setTx(s)} setState={s => setState(s)} setOpen={o => setOpen(o)} />}
			{openClaimed && (
				<MintSuccessDialog
					attributes={metadata?.attributes}
					tx={tx}
					share={shareOn}
					open={openClaimed}
					tokenId={userTokenId}
					setOpen={o => setOpenClaimed(o)}
				/>
			)}
			<div className='m-[0_auto] flex max-w-[1312px] flex-col justify-center'>
				<div className='mb-[60px] flex justify-between max-xl:mb-12 max-xl:flex-col'>
					<div className='relative flex flex-col justify-between overflow-hidden text-center'>
						<div>
							<p className='pt-[140px] text-[72px] font-bold leading-[120%] max-xl:pt-8 max-xl:text-[36px]'>BounceBit Prime × BlackRock BUIDL</p>
							<p className='m-[0_auto] max-w-[452px] pb-6 pt-6 text-[18px] max-xl:pb-10 max-xl:text-[16px] max-xl:font-medium'>
								Marking a shift in capital markets infrastructure — limited to 1,000 NFTs.
							</p>
						</div>
						<div className='max-xl:hidden'>
							<Operational minted={minted} token={token} address={address} userTokenId={userTokenId} setOpen={o => setOpen(o)} />
						</div>
					</div>
					<div className='relative'>
						<div className='relative z-[3] m-[0_auto] w-[480px] rounded-[200px_0_0_0] bg-[#1C3F3A] p-6 max-xl:w-full max-xl:rounded-[140px_0_0_0] max-xl:p-4'>
							{!loading && minted && metadata?.tokenUrl && userTokenId && userTokenId > 0 && (
								<>
									<img className='rounded-[176px_0_0_0] max-xl:rounded-[124px_0_0_0]' src={metadata?.tokenUrl} alt='NFT1' />
									<div className='p-[0_0_16px] text-right'>
										<p
											className={clsx(
												'inline-block bg-gradient-to-r from-[rgba(255,255,255,1)] to-[rgba(255,255,255,0.05)] bg-clip-text text-[60px] font-medium leading-[136%] text-transparent max-xl:text-[45px]',
												!minted && 'pb-[80px]'
											)}>
											{metadata?.attributes}
										</p>
									</div>
								</>
							)}
							{(loading || (!minted && (!metadata?.tokenUrl || !userTokenId || userTokenId === 0))) && (
								<>
									<div className='p-[0_0_16px] text-right'>
										<img className='rounded-[176px_0_0_0] max-xl:rounded-[124px_0_0_0]' src='/assets/default_nft.gif' alt='NFT2' />
										<p
											className={clsx(
												'inline-block bg-gradient-to-r from-[rgba(255,255,255,1)] to-[rgba(255,255,255,0.05)] bg-clip-text pt-4 text-[60px] font-medium leading-[136%] text-transparent max-xl:text-[45px]',
												!minted && 'pb-[80px]'
											)}>
											black rocks
										</p>
									</div>
								</>
							)}

							{minted && (
								<>
									<div className='mb-4 text-right'>
										<PrimeBtn className='p-[6px 12px] text-[24px] leading-[130%] max-xl:text-[16px]'>#{userTokenId}/1,000</PrimeBtn>
									</div>
									<div
										onClick={shareOn}
										className='flex cursor-pointer items-center justify-end gap-4 font-inter text-[20px] font-medium text-[#fff] max-xl:text-[14px]'>
										<span>share on twitter</span>
										<ArrowRight />
									</div>
								</>
							)}
						</div>
					</div>
					<div className='hidden max-xl:block'>
						<Operational minted={minted} token={token} address={address} userTokenId={userTokenId} setOpen={o => setOpen(o)} />
					</div>
				</div>

				<div
					style={{
						background: 'linear-gradient(133deg, #D7CCAD -4.18%, #50655A 110.09%)'
					}}
					className='relative mb-[88px] h-[497px] w-full overflow-hidden rounded-[0_0_100px_0] max-xl:hidden'>
					<Drop whiteText={true} />
					<div className='absolute left-[-21px] top-[175px] h-[194px] w-[194px] rounded-[0_0_0_148px] bg-[rgba(28,63,58,0.6)]' />
					<div className='absolute bottom-[-70px] left-[86px] z-[2] h-[236px] w-[236px] rounded-[0_0_148px_0] bg-[#887B5A]' />
					<div className='absolute right-[129px] top-[122px] z-[2] h-[236px] w-[236px] rounded-[148px_0_0_0] bg-[#887B5A]' />
					<div className='absolute right-[-32px] top-[-10px] z-[1] h-[206px] w-[206px] rounded-[0_148px_0_0] bg-[#E0E9E9]' />
				</div>
				<div
					style={{
						background:
							'linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.30) 100%), linear-gradient(0deg, rgba(215, 204, 173, 0.75) 0%, rgba(215, 204, 173, 0.75) 100%), url(/assets/nft_bg1.png) lightgray 50% / cover no-repeat'
					}}
					className='hidden w-full rounded-[0_0_88px_0] pt-[88px] max-xl:mb-[25px] max-xl:block max-xl:px-4 max-xl:pt-0'>
					<Drop />
				</div>
			</div>
		</div>
	)
}
