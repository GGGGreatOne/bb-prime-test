import { API_URL, BB_SCAN_URL, CLUB_URL, NFT_URL, SCORE_API_URL } from '@/const'
import { default as _axios } from 'axios'

export const axios = _axios.create({ baseURL: API_URL })
export const scoreApi = _axios.create({ baseURL: SCORE_API_URL })
export const clubApi = _axios.create({ baseURL: CLUB_URL })
export const bbscanApi = _axios.create({ baseURL: BB_SCAN_URL })
export const NFTApi = _axios.create({ baseURL: NFT_URL })

export default axios
