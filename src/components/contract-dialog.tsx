'use client'

import { motion } from 'framer-motion'
import { PropsWithChildren, useEffect } from 'react'
import CloseSVG from '@/svgs/close-sm.svg'
import { Token } from '@/contract/erc20'
import TokenLogo from './logo/token-logo'
import { formatPrice, smartBalance } from '@/lib/utils'
import { SubmitBtn, WhiteSubmitBtn } from './brand-btn'
import LoaderSVG from '@/svgs/loader.svg'
import FailSVG from '@/svgs/fail.svg'
import SuccessSVG from '@/svgs/success.svg'
import LinkSVG from '@/svgs/square-arrow-top-right.svg'
import { useTokenPrice } from '@/hooks/useTokenPrice'
import ArrowSVG from '@/svgs/arrow-right.svg'
import { Currency } from '@/constants'

interface Props {
	setOpen: any
	title: string
	token?: Token | Currency
	tokenChain?: any
	amount?: string
	anotherToken?: Token
	anotherAmount?: string
	desc?: string

	state: 'pending' | 'done' | 'error' | 'normal'
	beginParams?: {
		text?: string
		click: () => void
		loading?: boolean
	}
	errMsg?: string

	link?: string
}

export default function ContractDialog({
	setOpen,
	title,
	desc,
	token,
	amount,
	anotherAmount,
	anotherToken,
	state,
	errMsg,
	link,
	beginParams,
	tokenChain
}: Props & PropsWithChildren) {
	const { getPrice } = useTokenPrice()
	const price = getPrice(token?.symbol || '')
	const anotherPrice = anotherToken ? getPrice(anotherToken.symbol) : 0

	useEffect(() => {
		document.documentElement.classList.add('overflow-hidden')

		return () => {
			document.documentElement.classList.remove('overflow-hidden')
		}
	}, [])

	return (
		<motion.div
			initial={{ backgroundColor: 'rgb(0 0 0 / 0)' }}
			animate={{ backgroundColor: 'rgb(0 0 0 / 0.4)' }}
			transition={{ duration: 0.25, ease: 'circOut' }}
			className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/80'>
			{state === 'error' && (
				<motion.div
					onClick={e => e.stopPropagation()}
					style={{
						backgroundImage: 'linear-gradient(180deg, rgba(198, 42, 47, 0.10) 0, rgba(198, 42, 47, 0) 104px)'
					}}
					initial={{
						scale: 0.9
					}}
					animate={{ scale: 1 }}
					className='relative w-[468px] rounded-[16px] bg-body p-8 pt-[84px] max-sm:w-[343px]'>
					<FailSVG className='mx-auto h-[80px] w-[80px]' />

					<h2 className='mt-8 text-center font-mono text-2xl font-semibold uppercase text-error'>Transaction Failed</h2>
					{errMsg && <p className='break-words text-center text-sm text-secondary'>{errMsg + (errMsg.endsWith('.') ? '' : '.')}</p>}

					{link && (
						<div className='mt-4 text-center text-sm text-secondary'>
							<a href={link} target='_blank' rel='noopener noreferrer' className='inline-flex items-center'>
								View Transaction <LinkSVG className='ml-1 h-4 w-4 text-secondary' />
							</a>
						</div>
					)}

					<SubmitBtn onClick={() => setOpen(false)} className='mt-8'>
						Confirm
					</SubmitBtn>
				</motion.div>
			)}
			{state === 'done' && (
				<motion.div
					onClick={e => e.stopPropagation()}
					style={{
						backgroundImage: 'linear-gradient(180deg, rgba(174, 184, 0, 0.10) 0, rgba(174, 184, 0, 0) 104px)'
					}}
					initial={{
						scale: 0.9
					}}
					animate={{ scale: 1 }}
					className='relative w-[468px] rounded-[16px] bg-body p-8 pt-[84px] max-sm:w-[343px]'>
					<SuccessSVG className='mx-auto h-[80px] w-[80px]' />

					<h2 className='mt-8 text-center font-mono text-2xl font-semibold uppercase text-success'>Transaction Success</h2>

					<div className='mt-2 text-center text-sm text-secondary'>
						<a href={link} target='_blank' rel='noopener noreferrer' className='inline-flex items-center'>
							View Transaction <LinkSVG className='ml-1 h-4 w-4 text-secondary' />
						</a>
					</div>

					<SubmitBtn onClick={() => setOpen(false)} className='mt-8'>
						Confirm
					</SubmitBtn>
				</motion.div>
			)}

			{(state === 'pending' || state === 'normal') && (
				<motion.div
					onClick={e => e.stopPropagation()}
					style={{
						backgroundImage: 'linear-gradient(180deg, rgba(174, 184, 0, 0.10) 0, rgba(174, 184, 0, 0) 104px)'
					}}
					initial={{
						scale: 0.9
					}}
					animate={{ scale: 1 }}
					className='relative w-[468px] rounded-[16px] bg-body p-8 max-sm:w-[343px]'>
					<div className='flex items-center justify-between'>
						<h2 className='font-mono text-[24px] font-semibold uppercase'>
							{title} {state === 'pending' ? 'Pending..' : ''}
						</h2>

						<button
							className='rounded-full border p-2 hover:border-subtle-bg hover:bg-subtle-bg'
							onClick={() => {
								setOpen(false)
							}}>
							<CloseSVG />
						</button>
					</div>
					<div className='mt-1 text-sm text-secondary'>{desc || 'Confirm this transaction in your wallet'}</div>

					{(token || anotherToken) && (
						<div className='mt-8 flex items-center justify-center gap-1 whitespace-nowrap rounded-xl border p-4 max-sm:flex-col max-sm:items-start'>
							{token && amount && (
								<div className='flex w-[144px] flex-col items-center justify-center text-center max-sm:w-auto max-sm:flex-row max-sm:gap-3 max-sm:text-left'>
									<figure className='rounded-lg border p-2 shadow-default'>
										<TokenLogo token={token.symbol} size={20} chain={tokenChain && (token instanceof Currency ? token.chainId : token.chain)} />
									</figure>
									<div>
										<div className='mt-3 font-mono text-xl font-semibold max-sm:mt-0'>
											{smartBalance(amount, token.decimals)} {token.symbol}
										</div>
										{(price && <div className='text-sm text-secondary'>~${formatPrice(price * (+amount / 10 ** token.decimals))}</div>) || null}
									</div>
								</div>
							)}
							{anotherToken && (
								<>
									<ArrowSVG className='mx-6 h-5 w-5 max-sm:mx-0 max-sm:rotate-90' />
									<div className='flex w-[144px] flex-col items-center justify-center text-center max-sm:w-auto max-sm:flex-row max-sm:gap-3 max-sm:text-left'>
										<figure className='rounded-lg border p-2 shadow-default'>
											<TokenLogo token={anotherToken.symbol} size={20} chain={tokenChain && anotherToken.chain} />
										</figure>

										<div>
											<div className='mt-3 font-mono text-xl font-semibold max-sm:mt-0'>
												{smartBalance(anotherAmount || 0, anotherToken.decimals)} {anotherToken.symbol}
											</div>
											{anotherPrice && (
												<div className='text-sm text-secondary'>~${formatPrice(anotherPrice * (+anotherAmount! / 10 ** anotherToken.decimals))}</div>
											)}
										</div>
									</div>
								</>
							)}
						</div>
					)}
					{state === 'pending' && (
						<WhiteSubmitBtn className='mt-8'>
							<LoaderSVG className='mr-1 h-4 w-4 animate-spin' />
							Waiting
						</WhiteSubmitBtn>
					)}

					{state === 'normal' && (
						<SubmitBtn onClick={beginParams?.click} loading={beginParams?.loading} className='mt-8'>
							{beginParams?.text || 'Begin'}
						</SubmitBtn>
					)}
				</motion.div>
			)}
		</motion.div>
	)
}
