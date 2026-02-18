import { Dimensions } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export const TOP_UP_COINS = {
	// Balance card - gradient and styling to match design
	balanceCardGradientStart: '#FF9F33',
	balanceCardGradientEnd: '#E65C00',
	balanceCardTextColor: '#fff',
	balanceCardBalanceStroke: '#4A5568',
	balanceCardBorderRadius: 16,
	balanceCardPadding: 20,
	balanceCardSheenColor: 'rgba(255,255,255,0.15)',
	balanceCardCardBorder: 'rgba(255,255,255,0.7)',
	balanceCardCoinIconBg: '#F5C842',
	balanceCardCoinIconText: '#fff',
	coinsDetailsButtonBg: '#fff',
	coinsDetailsButtonText: '#FF69B4',
	coinsDetailsButtonBorderColor: '#FEB032',
	tabActiveUnderline: '#000',
	tabActiveColor: '#000',
	tabInactiveColor: '#9E9E9E',
	paymentCardBorder: '#FEB032',
	paymentCardBorderWidth: 2,
	packageCardBorder: '#FEB032',
	packageCardBorderWidth: 2,
	screenPadding: 16,
	cardBorderRadius: 12,
	gridGap: 12,
	customerServiceColor: '#7C4DFF',
} as const

/** Number of columns for payment method grid (2) and package grid (3). */
export const PAYMENT_GRID_COLUMNS = 2
export const PACKAGE_GRID_COLUMNS = 3

export function getPaymentCardWidth(): number {
	const padding = TOP_UP_COINS.screenPadding * 2
	const gap = TOP_UP_COINS.gridGap
	return (SCREEN_WIDTH - padding - gap) / PAYMENT_GRID_COLUMNS
}

export function getPackageCardWidth(): number {
	const padding = TOP_UP_COINS.screenPadding * 2
	const gap = TOP_UP_COINS.gridGap * (PACKAGE_GRID_COLUMNS - 1)
	return (SCREEN_WIDTH - padding - gap) / PACKAGE_GRID_COLUMNS
}

export { SCREEN_WIDTH }
