/* eslint-disable @next/next/no-page-custom-font */
import Script from 'next/script'

export default function Head() {
	return (
		// eslint-disable-next-line @next/next/no-head-element
		<head>
			<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			<link rel='manifest' href='/manifest.json' />
			<link rel='icon' href='/images/meta/favicon.png' />
			<link rel='icon' sizes='128x128' href='/images/meta/favicon128x128.png' />
			<link rel='icon' sizes='64x64' href='/images/meta/favicon64x64.png' />
			<link rel='icon' sizes='32x32' href='/images/meta/favicon32x32.png' />
			<meta name='theme-color' content='#EBEBEB' />
			<meta property='og:type' content='website' />
			<meta property='og:image' content='https://portal.bouncebit.io/images/meta/cover.png' />
			<meta property='og:url' content='https://portal.bouncebit.io' />
			<meta property='og:site_name' content='BounceBit Portal' />
			<meta property='og:locale' content='en' />
			<meta property='og:image:width' content='1280' />
			<meta property='og:image:height' content='720' />
			<meta name='twitter:title' content='BounceBit Portal' />
			<meta name='twitter:site' content='@bounce_bit' />
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:image' content='https://portal.bouncebit.io/images/meta/cover.png' />
			<meta
				name='twitter:description'
				content='BounceBit CeDeFi is an innovative financial platform designed for Bitcoin, Ethereum, BNB, Solana and stablecoins. Unlock institutional-level yields with multiple strategies, one-click deposits, and auto-compounding for optimized growth.'
			/>
			<meta name='twitter:image:width' content='1280' />
			<meta name='twitter:image:height' content='720' />
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
			<link href='https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600&family=Roboto+Mono&display=swap' rel='stylesheet'></link>
			<Script src='https://www.googletagmanager.com/gtag/js?id=G-7Z2SVF6WPD' />
			<Script id='google-analytics'>
				{`
          window.dataLayer = window.dataLayer || []
					function gtag() {
						dataLayer.push(arguments)
					}
					gtag('js', new Date())
		
					gtag('config', 'G-7Z2SVF6WPD')
        `}
			</Script>
		</head>
	)
}
