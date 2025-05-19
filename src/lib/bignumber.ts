import { default as _BigNumber } from 'bignumber.js'

_BigNumber.config({ EXPONENTIAL_AT: 1e9 })

const BigNumber = _BigNumber

export default BigNumber
