'use client'

import { useAccount, useChainId } from 'wagmi'
import { useMemo } from 'react'
import { config } from '@/layout/wagmi'
import { useAppKitAccount } from '@reown/appkit/react'
import { isAddress } from 'viem'

/**
 * @returns The active Web3 React context
 */
export function useActiveWeb3React() {
	return useEvmWallet()
}

/**
 * Hook to access the current EVM wallet state
 * @returns {Object} An object containing:
 * - account: The connected wallet address
 * - chainId: The current chain ID
 * - isSupportChain: Boolean indicating if the current chain is supported
 */
export function useEvmWallet() {
	const chainId = useChainId()
	const supportedChainIds = config.chains.map(item => item.id)
	const { chain } = useAccount()
	const { address: _address } = useAppKitAccount()
	const isSupportChain = useMemo(
		() => (chain?.id ? Number(chain?.id) === Number(chainId) && supportedChainIds.includes(Number(chainId)) : false),
		[chain, chainId, supportedChainIds]
	)

	const address = ((typeof window === 'object' && window._FAKE_ADDRESS) || _address) as string | undefined

	return useMemo(() => {
		if (!_address || !isAddress(_address)) {
			return {
				address: undefined,
				chainId: 1,
				isSupportChain: true
			}
		}
		return {
			address: address,
			chainId: chainId,
			isSupportChain
		}
	}, [_address, address, chainId, isSupportChain])
}

export function useConnectedAddress() {
	const { address, caipAddress } = useAppKitAccount()

	return {
		address,
		isSolana: !!caipAddress?.includes('solana') && !!address,
		isEvm: !!caipAddress?.includes('eip155') && !!address
	}
}
