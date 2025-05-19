// mainnet config
// export const ENV = (process.env.NEXT_PUBLIC_ENV || 'testnet' || 'mainnet') as 'mainnet' | 'testnet'
export const ENV = process.env.NEXT_PUBLIC_DEPLOY_ENV === 'testnet' ? 'testnet' : 'mainnet'

export const API_URL = 'https://api-portal.bouncebit.io/api'
export const SCORE_API_URL = 'https://api-portal-test.bouncebit.io/api'
export const CLUB_URL = process.env.NEXT_PUBLIC_CLUB_URL || 'https://api-club.bouncebit.io'
export const BB_SCAN_URL = process.env.NEXT_PUBLIC_BB_SCAN_URL || 'https://api.bbscan.io/mainnet/api'
export const NFT_URL = process.env.NEXT_PUBLIC_NFT_URL || 'https://api-portalg.bouncebit.io'

export const MAX_APPROVAL = '1.1579208923731619542357098500e+77'
export const MAX_APPROVAL_HEX = '0xfffffffffffffffffffffffa0e34bcf70a96e176cbaf886d6228000000000000'

export const PAGE_SIZE = 5
// SOL
// export const ENDPOINT = 'https://solana-mainnet.g.alchemy.com/v2/alqGV-y3cz0uau9dDpvohJmlf8k893tT'
export const SOLANA_DEVNET_ENDPOINT = 'https://solana-devnet.g.alchemy.com/v2/ukZm-vKR2GXBdZR3wjBCVrr2r3p06oZi'

export const IS_SOLANA_DEVNET = ENV === 'mainnet' ? false : true

export const SOLANA_CHAINID = ENV === 'mainnet' ? 12345 : 123456

export const LZ_PROGRAM_ID = IS_SOLANA_DEVNET ? 'ANaK9pUaSpXAumpBh9JmjbJCJcL3zJbU2dFPyjZQLHrn' : 'ANaK9pUaSpXAumpBh9JmjbJCJcL3zJbU2dFPyjZQLHrn'
export const LZ_BB_MINT_ADDRESS = IS_SOLANA_DEVNET ? 'CefQyXPC4Dvymqckg9Bazt14ZsR333UkAKgMZMLedi8k' : '76SYfdi8jT84GqxuTqu7FuyA4GQbrto1pLDGQKsy8K12'
export const LZ_ESCROW = IS_SOLANA_DEVNET ? 'BHuYZa8DVGCFJVsgb1ePJJRHGNp3EHgN2SEiHf45t2Ei' : '9UgXE6Xop7vybtZavdJSADCx16KMBgiWhdgFxiNmAWkw'
export const MINT_START_TS = 1748091600000
