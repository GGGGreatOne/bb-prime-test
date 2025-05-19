import BrandBtn from '@/components/brand-btn'
import WaleltImg from '@/components/wallet-img'
import { formatPrice, shortAddress, smartBalance } from '@/lib/utils'
// import { dispatchEvent } from '@/lib/window-event'
import { useAccount } from 'wagmi'
import { wallets } from './connect-wallet'
import MenuSVG from '@/svgs/menu.svg'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ArrowSVG from '@/svgs/arrow-up-right.svg'
import CopySVG from '@/svgs/copy.svg'
import CheckedSVG from '@/svgs/checked.svg'
import PowerSVG from '@/svgs/power.svg'
import {
	BB_ETH_Token,
	BB_Token,
	BBTC_BB_Token,
	BBTC_BSC_Token,
	BBTC_ETH_Token,
	BBUSD_BB_Token,
	BBUSD_BSC_Token,
	BBUSD_ETH_Token,
	USDC_ETH_Token,
	BNB_Token,
	BSC_SOL_Token,
	BSC_USD_Token,
	BTCB_Token,
	ETH_Token,
	FDUSD_Token,
	stBB_Token,
	stBBTC_Token,
	USDT_Token,
	USDY_Token,
	WBTC_Token,
	USCC_Token,
	USYC_Token,
	ETH_BASE_Token,
	USDC_BASE_Token
} from '@/contract/erc20'
import clsx from 'clsx'
import { addressStore, useAllBalance } from '@/hooks/useAllBalance'
import { writeText } from '@/lib/clipboard'
import WalletSVG from '@/svgs/wallet.svg'
import Loader from '@/components/loader/loader'
import { useTokenPrice } from '@/hooks/useTokenPrice'
import TokenLogo from '@/components/logo/token-logo'
import { useAppKit, useAppKitAccount, useDisconnect, useWalletInfo } from '@reown/appkit/react'
import { useSolBalance } from '@/hooks/solana/useSolBalance'
import BigNumber from 'bignumber.js'
import useTokenAccount from '@/hooks/solana/useTokenAccount'
import useSPLTokenBalance from '@/hooks/solana/useSplBalance'
import { LZ_BB_MINT_ADDRESS } from '@/const'

const displayTokenList = [
	BB_Token,
	stBB_Token,
	BBTC_BB_Token,
	stBBTC_Token,
	BBUSD_BB_Token,

	ETH_Token,
	WBTC_Token,
	USDT_Token,
	BBTC_ETH_Token,
	BBUSD_ETH_Token,
	BB_ETH_Token,
	USDC_ETH_Token,
	USDY_Token,
	USCC_Token,
	USYC_Token,

	BNB_Token,
	BTCB_Token,
	FDUSD_Token,
	BSC_USD_Token,
	BSC_SOL_Token,
	BBTC_BSC_Token,
	BBUSD_BSC_Token,
	ETH_BASE_Token,
	USDC_BASE_Token
]

export default function Account() {
	const { open: ConnectWallet } = useAppKit()
	const [init, setInit] = useState(false)
	useEffect(() => {
		setInit(true)
	}, [])

	const account = useAccount()
	const { address: _address } = useAppKitAccount()
	const { walletInfo } = useWalletInfo()
	const [open, setOpen] = useState(false)
	const [copied, setCopied] = useState(false)
	const { disconnect } = useDisconnect()
	const { allBalance } = useAllBalance()
	const { getPrice } = useTokenPrice()
	const bbPrice = getPrice('bb')
	const solPrice = getPrice('sol')
	const BBSolTokenAddress = useTokenAccount(LZ_BB_MINT_ADDRESS, _address)
	// const AuctionSolTokenAddress = useTokenAccount(AUCTION_SOL, _address)
	const userSolBalance = useSolBalance(_address)
	const userBBSolBalance = useSPLTokenBalance(BBSolTokenAddress)
	// const userAuctionSolBalance = useSPLTokenBalance(AuctionSolTokenAddress)
	const theAddress = process.env.NEXT_PUBLIC_FAKE_ADDRESS || _address!

	useEffect(() => {
		if (theAddress) {
			addressStore.setState({ address: theAddress })
		}
	}, [theAddress])

	if (theAddress && init) {
		const wallet = wallets.find(item => item.id === account.connector?.id)

		return (
			<div className='relative z-20 text-sm'>
				<div
					onClick={e => {
						if (open) {
							setOpen(false)
						} else {
							e.stopPropagation()
							setOpen(true)
							window.addEventListener(
								'click',
								() => {
									setOpen(false)
								},
								{ once: true }
							)
						}
					}}
					className='flex cursor-pointer items-center rounded-full bg-body p-2'>
					<WaleltImg className='mr-1.5 h-5 w-5 max-sm:hidden' wallet={wallet?.name || ''} src={account.connector?.icon || walletInfo?.icon} />
					<span className='max-sm:hidden'>{shortAddress(theAddress)}</span>

					<MenuSVG className={clsx('ml-2 h-4 w-4 text-secondary transition-transform max-sm:ml-0', open && '-rotate-90')} />
				</div>

				{open && (
					<motion.div
						initial={{ scale: 0.9, width: 275 }}
						animate={{ scale: 1 }}
						onClick={e => e.stopPropagation()}
						className='absolute right-0 top-full origin-top pt-2'>
						<div
							className='rounded-lg bg-body text-sm'
							style={{ boxShadow: '0px 0px 0px 1px rgba(34, 33, 8, 0.08), 0px 1px 2px 0px rgba(34, 33, 8, 0.04), 0px 16px 32px -12px rgba(34, 33, 8, 0.25)' }}>
							<div className='flex items-center p-4'>
								<WaleltImg className='mr-2 h-8 w-8' wallet={wallet?.name || ''} src={account.connector?.icon || walletInfo?.icon} />
								<div>
									<div className='text-xs text-secondary'>{account.chain?.name || 'Solana'}</div>
									<a
										href={account.chain?.name ? `https://bbscan.io/address/${theAddress}` : `https://solscan.io/account/${theAddress}`}
										target='_blank'
										className='flex items-center text-sm hover:underline'
										rel='noreferrer'>
										{shortAddress(theAddress)}
										<ArrowSVG className='ml-1 h-4 w-4' />
									</a>
								</div>

								<button
									onClick={() => {
										if (copied) return

										setCopied(true)
										writeText(theAddress!)
										setTimeout(() => setCopied(false), 3000)
									}}
									className='ml-3 rounded-full border p-2 text-secondary hover:border-subtle-bg hover:bg-subtle-bg'>
									{!copied ? <CopySVG className='h-4 w-4' /> : <CheckedSVG className='h-4 w-4' />}
								</button>
								<button onClick={() => disconnect()} className='ml-2 rounded-full border p-2 hover:border-subtle-bg hover:bg-subtle-bg'>
									<PowerSVG className='h-4 w-4 text-secondary' />
								</button>
							</div>

							{displayTokenList.some(item => +allBalance[item.symbol]! || +allBalance[item.chain + item.symbol]!) && (
								<ul className='max-h-[480px] overflow-auto border-t max-sm:max-h-[360px]'>
									{displayTokenList.map(item => {
										const balance =
											item.symbol === 'BB' && item.chain === 'eth'
												? allBalance[item.chain + item.symbol]!
												: allBalance[item.chain + item.symbol]! || allBalance[item.symbol] || '0'
										if (+balance) {
											const price = getPrice(item.symbol)
											return (
												<li key={item.contract + item.chain} className='flex items-center px-4 py-3 hover:bg-subtle-bg'>
													<TokenLogo token={item.symbol} chain={item.chain} size={20} className='mr-2' />
													{item.symbol}
													<div className='ml-auto text-right text-xs'>
														<div>
															{smartBalance(balance, item.decimals)}
															{item.symbol === 'stBBTC' && (
																<span className='ml-0.5 text-secondary'>({smartBalance(allBalance['stBBTC_locked']!, 18, 2)} locked)</span>
															)}
														</div>

														<div className='text-secondary'>${formatPrice((price * +balance) / 10 ** item.decimals)}</div>
													</div>
												</li>
											)
										}

										return null
									})}
								</ul>
							)}
							{!account.chain?.name && (
								<ul className='max-h-[480px] overflow-auto border-t max-sm:max-h-[360px]'>
									<li className='flex items-center px-4 py-3 hover:bg-subtle-bg'>
										<TokenLogo token={'sol'} chain={'sol'} size={20} className='mr-2' />
										SOL
										<div className='ml-auto text-right text-xs'>
											<div>{userSolBalance?.toFormat() || '-'}</div>
											<div className='text-secondary'>${userSolBalance ? BigNumber(solPrice).times(userSolBalance.toString()).toFormat() : '-'}</div>
										</div>
									</li>
									<li className='flex items-center px-4 py-3 hover:bg-subtle-bg'>
										<TokenLogo token={'bb'} chain={'sol'} size={20} className='mr-2' />
										BB
										<div className='ml-auto text-right text-xs'>
											<div>{userBBSolBalance?.uiAmount || '-'}</div>
											<div className='text-secondary'>
												${userBBSolBalance?.uiAmount ? BigNumber(userBBSolBalance.uiAmount?.toString()).times(bbPrice).toFormat() : '-'}
											</div>
										</div>
									</li>
									{/* <li className='flex items-center px-4 py-3 hover:bg-subtle-bg'>
										<TokenLogo token={'auction'} chain={'sol'} size={20} className='mr-2' />
										AUCTION
										<div className='ml-auto text-right text-xs'>
											<div>{userAuctionSolBalance?.uiAmount || '-'}</div>
											<div className='text-secondary'>
												${userAuctionSolBalance?.uiAmount ? BigNumber(userAuctionSolBalance.uiAmount?.toString()).times(auctionPrice).toFormat() : '-'}
											</div>
										</div>
									</li> */}
								</ul>
							)}
						</div>
					</motion.div>
				)}
			</div>
		)
	}

	if (!init) {
		return (
			<BrandBtn disabled className='flex h-9 w-[120px] items-center justify-center rounded-full p-2'>
				<Loader />
			</BrandBtn>
		)
	}

	return (
		<BrandBtn
			className='max-sm:rounded-full max-sm:p-2'
			onClick={() => {
				ConnectWallet()
			}}>
			<WalletSVG className='hidden max-sm:block' />
			<span className='max-sm:hidden'>Connect Wallet</span>
		</BrandBtn>
	)
}
