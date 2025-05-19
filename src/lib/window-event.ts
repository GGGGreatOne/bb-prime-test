type EventName =
	| 'connect-wallet'
	| 'refresh-all-balance'
	| 'wallet-add-binance'
	| 'wallet-add-wc'
	| 'refresh-wrapper-pending'
	| 'refresh-stake-total'
	| 'refresh-stake-pending'
	| 'refresh-trade'
	| 'refresh-swap'
	| 'refresh-ethena'
	| 'refresh-my-strategy'
	| 'refresh-rewards'
	| 'refresh-premium'
	| 'refresh-cedefi-position'

export function addEventListener(eventName: EventName, handler: () => void) {
	window.addEventListener(eventName, handler)

	return () => window.removeEventListener(eventName, handler)
}

export function dispatchEvent(eventName: EventName) {
	window.dispatchEvent(new Event(eventName))
}
