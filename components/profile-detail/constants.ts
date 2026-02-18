import { Dimensions } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export const PROFILE_DETAIL = {
	headerBlue: '#4D77FF',
	navBarButtonBg: 'rgba(255,255,255,0.25)',
	onlinePillBg: 'rgba(255,255,255,0.3)',
	onlineDot: '#3B82F6',
	avatarBorder: '#93B5FF',
	avatarSize: 72,
	avatarBorderWidth: 3,
	avatarGapToContent: 12,
	coverHeight: 440,
	floatingButtonBg: '#7C5CBF',
	richGradient: ['#FF9A56', '#FF6B35', '#E63946'] as const,
	charmGradient: ['#9D7BDB', '#6B7FD7', '#4D77FF'] as const,
	fansRankingBg: '#FFF8E7',
	fansRankingPattern: '#F5E6C8',
	giftGalleryCameraBg: '#93B5FF',
	dataUnderline: '#E53935',
	femaleBadgeBg: '#EC4899',
	cardBorderRadius: 16,
	fansCardBorderRadius: 12,
	screenPadding: 16,
} as const

export { SCREEN_WIDTH }
