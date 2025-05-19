import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'selector',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/layout/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			fontFamily: {
				mono: ['Bai Jamjuree', 'monospace'],
				roboto: ['Roboto Mono', 'monospace'],
				inter: ['Inter', 'Inter Public'],
				djr: ['Forma DJR Micro'],
				djrLight: ['Forma DJR Micro Light']
			},
			colors: {
				primary: '#202020',
				bg: '#EBEBEB',
				secondary: '#646464',
				subtle: '#FEFDFB',
				'subtle-bg': '#F1F1F1',
				brand: '#FFC53D',
				accent: '#915930',
				body: '#FCFCFC',
				action: '#202020',
				loading: '#eee',
				success: '#18794E',
				error: '#C62A2F',
				'error-bg': '#FFEFEF'
			},

			boxShadow: {
				button: '0px -3px 0px 0px rgba(0, 0, 0, 0.10) inset',
				default: '0px 1px 2px 0px rgba(34, 33, 8, 0.04)',
				'#1': '0px 0px 0px 1px rgba(34, 33, 8, 0.08), 0px 1px 2px 0px rgba(34, 33, 8, 0.04), 0px 16px 32px -12px rgba(34, 33, 8, 0.25)'
			},
			screens: {
				'max-xl': { max: '1280px' },
				'max-lg': { max: '1024px' },
				'max-md': { max: '768px' },
				'max-sm': { max: '640px' },
				'max-xs': { max: '360px' }
			}
		}
	}
}
export default config
