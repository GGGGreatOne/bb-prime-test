import { JsonRpcSigner } from 'ethers'
import { BrowserProvider } from 'ethers'
import { Account, Chain, Client, Transport } from 'viem'

export function clientToSigner(client: Client<Transport, Chain, Account>) {
	const { account, chain, transport } = client
	const network = {
		chainId: chain.id,
		name: chain.name,
		ensAddress: chain.contracts?.ensRegistry?.address
	}
	const provider = new BrowserProvider(transport, network)
	const signer = new JsonRpcSigner(provider, account.address)
	return signer
}
