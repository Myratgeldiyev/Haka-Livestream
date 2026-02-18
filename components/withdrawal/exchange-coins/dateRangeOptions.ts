export const DATE_RANGE_OPTIONS = [
	'Last 30 days',
	'Last 7 days',
	'Last month',
	'This month',
	'Last week',
	'Current Week',
	'Today',
] as const

export type DateRangeOption = (typeof DATE_RANGE_OPTIONS)[number]
