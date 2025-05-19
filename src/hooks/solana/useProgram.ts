'use client'

import { Idl, Program } from '@coral-xyz/anchor'
import useAnchorProvider from './useAnchorProvider'
import IDL from '@/idl/cedefi_v_2.json'
import type { CedefiV2 } from '@/idl/cedefi_v_2'
import { useMemo } from 'react'

export function useProgram<T extends Idl>(IDL: T) {
	const anchorProvider = useAnchorProvider()

	const program = useMemo(() => {
		if (!anchorProvider) return undefined
		return new Program(IDL, anchorProvider)
	}, [IDL, anchorProvider])

	return program
}

export function useCedeFiProgram() {
	return useProgram(IDL as CedefiV2)
}
