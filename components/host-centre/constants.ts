import { spacing } from '@/constants/spacing'

export const HOST_CENTRE = {
	headerTitle: 'Host Centre',
	screenPadding: spacing.screen.horizontal,
	cardBorderRadius: 12,
	buttonBorderRadius: 16,

	// Background gradient: peach/orange at top, white at bottom
	gradientStart: '#FFE4D6',
	gradientEnd: '#FFFFFF',

	// My agency card
	myAgencyCardBg: '#FFCBA4',
	myAgencyCardBorder: '#6BFF6B',

	// Host on Mic card
	hostOnMicCardBg: '#FFDE9E',
	hostOnMicCardBorder: 'rgba(255,255,255,0.8)',
	micCircleBg: '#E8D5FF',
	micIconPurple: '#AA66FF',
	lockedButtonBg: '#8A2BE2',
	upgradeButtonBg: '#8A2BE2',
	progressTrackBg: '#E0E0E0',
	progressFillBg: '#BB86FC',
	bulletPurple: '#8A2BE2',

	// Income / Time / Agency / Official cards
	cardLightPurpleBg: '#CDBBF1',
	cardRedBorder: '#FF0000',

	// Text
	textDark: '#333',
	textPurple: '#8A2BE2',
} as const
