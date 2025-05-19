import { createStore, useStore } from 'zustand'

export const JWTTokenStore = createStore<{
	jwtToken: null | string
}>(() => ({
	jwtToken: null
}))

export function useJWTToken() {
	const { jwtToken } = useStore(JWTTokenStore)
	return jwtToken
}

export function setJWTToken(jwt: string | null) {
	JWTTokenStore.setState({ jwtToken: jwt })
}
