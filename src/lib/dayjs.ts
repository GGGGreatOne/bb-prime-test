import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(duration)
dayjs.extend(updateLocale)

export { dayjs as default }

export function left(timestamp: number | string, isUnix?: boolean) {
	if ((isUnix ? dayjs.unix(+timestamp) : dayjs(+timestamp)).isBefore(dayjs())) return '0'

	const duration = dayjs.duration((isUnix ? dayjs.unix(+timestamp) : dayjs(+timestamp)).diff(dayjs()))

	if (duration.years() > 0) {
		return `${duration.years()}y ${duration.months()}m`
	} else if (duration.months() > 0) {
		return `${duration.months()}m ${duration.days()}d`
	} else if (duration.days() > 0) {
		return `${duration.days()}d ${duration.hours()}h`
	} else if (duration.hours() > 0) {
		return `${duration.hours()}h ${duration.minutes()}m`
	} else if (duration.minutes() > 0) {
		return `${duration.minutes()}m ${duration.seconds()}s`
	} else return `${duration.seconds()}s`
}
