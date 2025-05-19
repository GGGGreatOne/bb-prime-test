'use client'
import { useState } from 'react'

import ArrowUp from '@/svgs/arrow_up.svg'
import ArrowDown from '@/svgs/arrow_down.svg'
import clsx from 'clsx'

type FQACardProps = {
	title: string
	content: string
}

const FQACardList: FQACardProps[] = [
	{
		title: 'What tokens are supported?',
		content: 'We currently support BUIDL, BENJI, and USYC for both staking and basis trading strategies.'
	},
	{
		title: 'What are the lock-in period options?',
		content: 'Lock-in periods vary based on your chosen strategy, with higher APY for extended commitments.'
	},
	{
		title: 'How secure are my assets?',
		content: 'Your assets remain secured with institutional-grade custody partners such as CEFFU, Fireblocks, and Copper.'
	}
]

const FQACard = (props: FQACardProps) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div
			className={clsx(
				'cursor-pointer rounded-[8px] border-[1px] border-[rgba(217,217,217,1)] p-[20px_16px] hover:bg-[#F7F7F7]',
				isOpen ? 'bg-[#fff]' : 'bg-[#F7F7F7]'
			)}
			onClick={() => setIsOpen(!isOpen)}>
			<p className='flex items-center justify-between font-djr font-medium'>
				{props.title}
				{isOpen ? <ArrowUp /> : <ArrowDown />}
			</p>
			{isOpen && <p className='mt-[16px] text-start text-[rgba(30,30,30,1)]'>{props.content}</p>}
		</div>
	)
}

export const FQA = () => {
	return (
		<div className='m-[0_auto] flex w-[100%] max-w-[810px] flex-col gap-[24px]'>
			{FQACardList.map((c, i) => {
				return <FQACard title={c.title} content={c.content} key={i} />
			})}
		</div>
	)
}
