'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import PrimeBtn from '@/components/button'
import VerifiedSVG from '@/svgs/verified.svg'
import { NFTApi } from '@/lib/axios'
import { UserInfoResponse } from '@/app/tasks/type'
import { useConnectedAddress } from '@/hooks/useWallet'
import { useAppKit, useDisconnect } from '@reown/appkit/react'
import { setJWTToken, useJWTToken } from '@/hooks/useJWTToken'
import { useRequest } from 'ahooks'
import clsx from 'clsx'
import { CompleteDialog } from '@/components/wireframe/CompleteDialog'
import { useLogin } from '@/hooks/useLogin'
import { UserInfo } from '@/hooks/useUserInfo'
import { shortAddress } from '@/lib/utils'
import { Config, watchAccount } from '@wagmi/core'
import { useConfig } from 'wagmi'
import { setLocalUserInfo, useLocalUserInfo } from '@/hooks/useLocalUserInfo'

interface VerifyItem {
	title: string
	step: number
	action: string
	method: () => void
	disabled: boolean
	isVerify?: boolean
	showDisconnect?: boolean
}

const VerifyItem = ({ title, step, action, isVerify, disabled, method, showDisconnect }: VerifyItem) => {
	const token = useJWTToken()
	const { disconnect } = useDisconnect()
	const verified = useMemo(() => {
		return isVerify ?? false
	}, [isVerify])
	return (
		<div>
			<div className='mb-[18px] flex items-center justify-between'>
				<div className='flex items-center'>
					<div className='h-[20px] w-[20px] min-w-[20px] rounded-full bg-body text-center text-[14px]'>{step}</div>
					<span className='pl-[12px] font-inter text-[18px] text-[#fff] max-xl:text-[14px]'>{title}</span>
				</div>
				<div
					className={clsx(
						'flex h-[28px] items-center gap-1 rounded-[100px] bg-body p-[3px_10px] text-sm text-primary',
						step !== 1 && !token ? '!bg-[rgba(255,255,255,0.4)]' : ''
					)}>
					{verified ? 'Verified' : 'Verify'} {verified && <VerifiedSVG />}
				</div>
			</div>
			<PrimeBtn
				onClick={() => {
					if (disabled) return
					method()
				}}
				className={clsx('w-[295px] max-xl:w-auto', disabled && 'cursor-not-allowed bg-[rgba(255,255,255,0.4)]')}>
				{action}
			</PrimeBtn>
			{showDisconnect && (
				<PrimeBtn className='ml-4' onClick={disconnect}>
					Disconnect
				</PrimeBtn>
			)}
		</div>
	)
}

const QUOTE_TWEET_URL = 'https://x.com/bounce_bit/status/1887490105742700813'

export const Verify = () => {
	const { address } = useConnectedAddress()
	const { open: ConnectWallet } = useAppKit()
	const [open, setOpen] = useState(false)
	const [hasShowTip, setHasShowTip] = useState(false)
	const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)

	const localUserInfo = useLocalUserInfo()
	const token = localUserInfo.token
	const { login: _login } = useLogin()
	const wagmiConfig = useConfig() as Config
	const unwatch = watchAccount(wagmiConfig, {
		onChange() {
			console.log('local', localUserInfo.wallet?.toLowerCase())
			console.log('address', address)
			if (address && localUserInfo.wallet?.toLowerCase() !== address?.toLowerCase()) {
				setJWTToken(null)
				setUserInfo(undefined)
				setLocalUserInfo({
					wallet: '',
					token: ''
				})
			}
		}
	})
	useEffect(() => {
		return () => unwatch()
	}, [unwatch])
	const { run: getUserInfo } = useRequest(
		async () => {
			const rep = await NFTApi<UserInfoResponse>({
				url: '/extra/user/info',
				method: 'get',
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			setUserInfo(rep.data.data)
		},
		{
			ready: !!token,
			refreshDeps: [token],
			pollingInterval: 10000
		}
	)

	const login = useCallback(async () => {
		await _login()
		getUserInfo()
	}, [getUserInfo, _login])

	const followCheck = useCallback(async () => {
		await NFTApi({
			url: '/extra/prime/x/follow/check',
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}, [token])

	const discordCheck = useCallback(async () => {
		await NFTApi({
			url: '/extra/prime/discord/guilds/check',
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}, [token])

	const authDisc = useCallback(async () => {
		if (!address) {
			await ConnectWallet()
			return
		}
		const rep = await NFTApi({
			url: '/extra/auth/discord/url',
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		window.open(rep.data.data, '_blank', 'width=600,height=600')
	}, [token, address, ConnectWallet])
	const authX = useCallback(async () => {
		if (!address) {
			await ConnectWallet()
			return
		}
		const rep = await NFTApi({
			url: '/extra/auth/twitter/url',
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		window.open(rep.data.data, '_blank', 'width=600,height=600')
	}, [token, address, ConnectWallet])

	const openX = useCallback(() => {
		window.open('https://x.com/bounce_bit', '_blank')
	}, [])

	const openDiscord = useCallback(() => {
		window.open('https://discord.com/invite/bouncebit', '_blank')
	}, [])

	const quoteTwitterCheck = useCallback(async () => {
		await NFTApi({
			url: '/extra/prime/x/quote/check',
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}, [token])

	const quoteTwitter = useCallback(() => {
		const tweetUrl = QUOTE_TWEET_URL
		const comment =
			'When BlackRock tokenizes and BounceBit mobilizes –\n' +
			'a new chapter in capital markets begins.' +
			'The black rocks NFT marks that movement.\n' +
			"I'll be minting soon. There's only 1,000 available."
		const encodedText = encodeURIComponent(comment + '\n\n' + tweetUrl)
		window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank', 'width=600,height=600')
	}, [])

	const { runAsync: checkTasks } = useRequest(
		async () => {
			if (!token) return
			await Promise.all([discordCheck(), followCheck(), quoteTwitterCheck()])
		},
		{
			ready: !!token,
			refreshDeps: [token],
			manual: true
		}
	)

	const Verifications = useMemo(() => {
		return [
			{
				title: 'Bind Your Wallet Address',
				step: 1,
				isVerify: !!(address && token),
				action: address ? (address && token ? (shortAddress(address) ?? '') : 'Sign message') : 'Connect Wallet',
				disabled: false,
				method: address ? login : ConnectWallet,
				showDisconnect: !!(address && token)
			},
			{
				title: 'Follow @bounce_bit on X',
				step: 2,
				isVerify: userInfo?.IsXFollow,
				action: userInfo?.XId ? (userInfo?.IsXFollow ? (userInfo?.XName ?? '') : 'Follow Twitter') : 'Twitter Authorization',
				disabled: !token,
				method: userInfo?.XId ? openX : authX
			},
			{
				title: 'Quote Tweet BounceBit’s Announcement',
				step: 3,
				isVerify: userInfo?.IsXRetweet,
				action: 'Quote Twitter',
				disabled: !token,
				method: userInfo?.XId ? quoteTwitter : authX
			},
			{
				title: "Join BounceBit's Official Discord",
				step: 4,
				isVerify: userInfo?.IsDiscordJoinGuild,
				action: userInfo?.DiscordId ? (userInfo?.IsDiscordJoinGuild ? (userInfo?.DiscordName ?? '') : 'Connect Discord') : 'Discord Authorization',
				disabled: !token,
				method: userInfo?.DiscordId ? openDiscord : authDisc
			}
		]
	}, [address, ConnectWallet, authDisc, authX, login, token, userInfo, openDiscord, openX, quoteTwitter])

	useEffect(() => {
		if (userInfo?.IsDiscordJoinGuild && userInfo?.IsXRetweet && userInfo?.IsXFollow && !hasShowTip) {
			setOpen(true)
			setHasShowTip(true)
		}
	}, [userInfo, hasShowTip])

	// useEffect(() => {
	// 	if (address) {
	// 		setJWTToken(null)
	// 		setUserInfo(undefined)
	// 	}
	// }, [address])

	useEffect(() => {
		if (userInfo?.Account !== address) setUserInfo(undefined)
	}, [userInfo, address])

	return (
		<div className='mt-[64px] flex flex-col gap-[40px]'>
			{Verifications.map((v, i) => {
				return (
					<VerifyItem
						key={i}
						title={v.title}
						showDisconnect={v?.showDisconnect}
						step={v.step}
						action={v.action}
						isVerify={v.isVerify}
						method={v.method}
						disabled={v.disabled}
					/>
				)
			})}
			<div className='text-center'>
				<PrimeBtn className={clsx('w-[295px] max-xl:w-auto', !token && 'cursor-not-allowed bg-[rgba(255,255,255,0.4)]')} onClick={checkTasks}>
					Verification Tasks
				</PrimeBtn>
			</div>
			<CompleteDialog open={open} setOpen={o => setOpen(o)} />
		</div>
	)
}
