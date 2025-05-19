import { Contract } from 'ethers'
import nfTAbi from '@/contract/json/BouncebitPrimeNFT.json'
import { provider_bb } from '@/contract/index'
import { ENV } from '@/const'

export const PRIME_NFT = ENV === 'mainnet' ? '0x493809c89944825af5B738313A4C99ef0bde01ad' : '0x99162A1bEDC2Ab4E826B71074eE6Ec5883b72fA9'

export const prime_nft_contract = new Contract(PRIME_NFT, nfTAbi, provider_bb)
