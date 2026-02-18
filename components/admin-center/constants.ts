import { Dimensions } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export const ADMIN_CENTER = {
	SCREEN_WIDTH,
	screenPadding: 16,
	headerGradientStart: '#FFE5E9',
	headerGradientEnd: '#FFFFFF',
	cardBg: '#FFFFFF',
	cardBorderRadius: 12,
	cardShadow: 'rgba(0,0,0,0.06)',
	dividerColor: '#E9E9E9',
	labelColor: '#666666',
	valueColor: '#1A1A1A',
	inviteButtonBg: '#3495FF',
	inviteButtonText: '#FFFFFF',
	filterBarBg: '#E9E9E9',
	filterBarBorderRadius: 10,
	chatButtonBg: '#3495FF',
	detailsButtonColor: '#666666',
	questionIconBg: '#999999',
	moneyIconYellow: '#F5A623',
	validHostIconRed: '#FF2D55',
	dayCellIconGrey: '#999999',
} as const
