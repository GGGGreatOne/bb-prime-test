import { clientToSigner } from '@/lib/wagmi'
import { useMemo } from 'react'
import { Config, useConnectorClient } from 'wagmi'

export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
	const { data: client } = useConnectorClient<Config>({ chainId })
	return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}
