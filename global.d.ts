declare module '*.svg' {
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
	export default ReactComponent
}

declare type NullableNumber = string | number | null
declare type NullableObject = Record<string, any> | null
declare type NullableArray = Record<string, any>[] | null
declare type Nullable<T> = T | null

declare interface TYPE_RpcData {
	code?: number
	id: number
	jsonrpc: string
	result: any
}

declare interface Window {
	_FAKE_ADDRESS: address
}
