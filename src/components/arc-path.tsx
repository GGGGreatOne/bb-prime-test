const SVG_WITH = 120
const CIRCLE_RADIUS = SVG_WITH / 2
const ARC_LINE_WIDTH = 11
const ARC_RADIUS = CIRCLE_RADIUS - ARC_LINE_WIDTH / 2
const sin = (percent: number) => ARC_RADIUS * Math.sin(percent * Math.PI * 2)
const cos = (percent: number) => ARC_RADIUS * Math.cos(percent * Math.PI * 2)
// SPACE should be small enough (to - from > n * SPACE)
export const SPACING = 0.002

export default function ArcPath(props: { from: number; to: number; color: string }) {
	const { from, to, color } = props

	if (to - from <= 0) return null

	const largeArcFlag = to - from > 0.5 ? 1 : 0

	return (
		<path
			d={`M${CIRCLE_RADIUS + cos(from)} ${CIRCLE_RADIUS + sin(from)} A${ARC_RADIUS} ${ARC_RADIUS} 0 ${largeArcFlag} 1 ${
				CIRCLE_RADIUS + cos(to)
			} ${CIRCLE_RADIUS + sin(to)}`}
			fill='none'
			stroke={color}
			strokeWidth={ARC_LINE_WIDTH}
			className='cursor-pointer'
		/>
	)
}
