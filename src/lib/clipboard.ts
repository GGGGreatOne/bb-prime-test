import copy from 'copy-to-clipboard'

export async function writeText(text: string) {
	try {
		await navigator.clipboard.writeText(text)
	} catch {
		copy(text)
	}
}

export async function readText() {
	try {
		await navigator.clipboard.readText()
	} catch {}
}
