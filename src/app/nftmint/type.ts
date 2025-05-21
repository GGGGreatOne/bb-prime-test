export interface TokenUrlResp {
	attributes: Attributes[]
	content_url: string
	description: string
	image: string
	name: string
}

type Attributes = {
	value: string
}
