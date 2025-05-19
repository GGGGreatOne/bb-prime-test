import BigNumber from 'bignumber.js'

export default function GetEstGasLimitResult(data: bigint | string | BigNumber) {
	const baseVal = new BigNumber(data.toString())
	const addedVal = baseVal.multipliedBy(1.5).integerValue(BigNumber.ROUND_CEIL)
	return BigInt(addedVal.toString())
}
