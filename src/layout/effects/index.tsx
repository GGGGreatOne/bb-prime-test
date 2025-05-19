// Only dark

'use client'
import CodePilar1 from './code-pilar-1'
import CodePilar2 from './code-pilar-2'
import Particles from './particles'
import { useSize } from '@/hooks/useSize'

export default function Effects() {
	const { maxSM } = useSize()

	if (!maxSM)
		return (
			<div className='fixed inset-0 z-[-1]'>
				<CodePilar1 />
				<CodePilar2 />

				<Particles className='size-full' quantity={20} ease={50} color={'#B1B1B1'} size={6} refresh />
			</div>
		)

	return null
}
