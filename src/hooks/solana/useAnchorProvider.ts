'use client'
import { AnchorProvider, Provider, getProvider, setProvider } from '@coral-xyz/anchor'
import { useMemo } from 'react'
import { useSolanaConnection } from './useSolanaConnection'
import { useSolanaWallet } from './useSolanaWallet'

const useAnchorProvider = (withWallet = true) => {
	const { connection } = useSolanaConnection()
	const { walletProvider } = useSolanaWallet()

	return useMemo(() => {
		let provider: Provider

		try {
			if (!connection) return undefined
			if (!withWallet) {
				provider = getProvider()
			} else {
				provider = new AnchorProvider(connection, walletProvider as any, {})
				setProvider(provider)
			}
		} catch {
			if (!connection) return undefined
			provider = new AnchorProvider(connection, walletProvider as any, {})
			setProvider(provider)
		}

		return provider
	}, [connection, walletProvider, withWallet])
}

export default useAnchorProvider
