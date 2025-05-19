interface Props {
	lg?: boolean
	xl?: boolean
}

export default function Loader({ lg, xl }: Props) {
	return (
		<div className={xl ? 'loadership_XKONG' : lg ? 'loadership_TIKHH' : 'loadership_TGGYD'}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
