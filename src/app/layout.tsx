import Layout from '@/layout'
import type { Metadata } from 'next'
import '@/styles/globals.scss'
import Head from '@/layout/head'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
	icons: [
		{ url: '/images/meta/favicon.png' },
		{ url: '/images/meta/favicon128x128.png', sizes: '128x128' },
		{ url: '/images/meta/favicon64x64.png', sizes: '64x64' },
		{ url: '/images/meta/favicon32x32.png', sizes: '32x32' }
	],
	title: 'BounceBit - Unlock Institutional Yield with CeDeFi Solutions',
	description:
		'BounceBit CeDeFi is an innovative financial platform designed for Bitcoin, Ethereum, BNB, Solana and stablecoins. Unlock institutional-level yields with multiple strategies, one-click deposits, and auto-compounding for optimized growth.',
	keywords:
		'CeDeFi platform, Crypto Institutional yield,Bitcoin auto-compounding,Bitcoin yield,Ethereum yield,BNB yield,Stablecoin yield,DeFi for Institutions,Crypto Investment.',
	openGraph: {
		type: 'website',
		url: 'https://portal.bouncebit.io',
		title: 'BounceBit - Unlock Institutional Yield with CeDeFi Solutions',
		siteName: 'BounceBit',
		locale: 'en',
		images: [
			{
				url: 'https://oss.bouncebit.io/images/eeedaaee99e36485b2b322ffd0861415-1736934185.png',
				width: 1200,
				height: 675
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		site: '@bounce_bit',
		title: 'BounceBit - Unlock Institutional Yield with CeDeFi Solutions',
		description:
			'BounceBit CeDeFi is an innovative financial platform designed for Bitcoin, Ethereum, BNB, Solana and stablecoins. Unlock institutional-level yields with multiple strategies, one-click deposits, and auto-compounding for optimized growth.',
		images: [
			{
				url: 'https://oss.bouncebit.io/images/eeedaaee99e36485b2b322ffd0861415-1736934185.png',
				width: 1200,
				height: 675
			}
		]
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<Head />

			<body className={GeistSans.className}>
				<script
					dangerouslySetInnerHTML={{
						__html: `
						if (window && /windows|win32/i.test(navigator.userAgent)) {
							setTimeout(() => document.documentElement.classList.add('windows'), 0)
						}
			      `
					}}
				/>
				<ThemeProvider attribute='class'>
					<Layout>{children}</Layout>
				</ThemeProvider>
			</body>
		</html>
	)
}
