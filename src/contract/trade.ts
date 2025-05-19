import { Contract } from 'ethers'
import trade_abi from './json/trade.json'
import { provider_bb } from '.'
import { ENV } from '@/const'
import ethena_rewards_json from './json/ethena-rewards.json'

export const TRADE_TARGET = ENV === 'mainnet' ? '0xF9bbe09e764484159554a90462A1C5879C34863C' : '0xea195Be57C932Eb81707B8E7e5c5a7F5248c08A9'

export const trade_contract = new Contract(TRADE_TARGET, trade_abi, provider_bb)

export const TRADE_REWARDS_TARGET = ENV === 'mainnet' ? '0x6555781cFf384858A8C62c654831718338c12ad8' : '0xbAe8b1C6ae698D58c4e4390A811487009C5739f0'

export const trade_rewards_contract = new Contract(TRADE_REWARDS_TARGET, ethena_rewards_json.abi, provider_bb)
