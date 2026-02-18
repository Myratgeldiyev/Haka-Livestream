export interface DateValue {
	day: number
	month: number
	year: number
}

export const MIN_AGE = 18

export const calculateAge = (birthDate: DateValue): number => {
	const today = new Date()
	const birth = new Date(birthDate.year, birthDate.month, birthDate.day)
	let age = today.getFullYear() - birth.getFullYear()
	const monthDiff = today.getMonth() - birth.getMonth()
	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
		age--
	}
	return age
}

export const isValidAge = (birthDate: DateValue): boolean => {
	return calculateAge(birthDate) >= MIN_AGE
}

export const formatDate = (date: DateValue | null): string => {
	if (!date) return ''
	const day = date.day < 10 ? `0${date.day}` : date.day
	const month = date.month + 1 < 10 ? `0${date.month + 1}` : date.month + 1
	return `${day}.${month}.${date.year}`
}
