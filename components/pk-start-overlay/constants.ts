import { Dimensions } from 'react-native'
import type { PKUser } from './types'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export const DEFAULT_PK_USERS: { userA: PKUser; userB: PKUser } = {
	userA: {
		id: 'a',
		name: 'User A',
		score: 12766678,
		avatarSource: require('@/assets/images/games/room-avatar.png'),
	},
	userB: {
		id: 'b',
		name: 'User B',
		score: 12766678,
		avatarSource: require('@/assets/images/games/room-avatar.png'),
	},
}

export const PK_START_OVERLAY = {
	startCard: {
		width: 200,
		minHeight: 100,
		borderRadius: 20,
	},
	expanded: {
		width: SCREEN_WIDTH,
		minHeight: 110,
		/** Total content height so badge + main + bottom row are visible */
		contentHeight: 220,
		avatarSize: 56,
		badgeHeight: 28,
		borderRadius: 20,
	},
	mini: {
		size: 88,
		borderRadius: 16,
		avatarSize: 36,
	},
} as const

export const PK_COLORS = {
	pink: '#E91E78',
	pinkDark: '#C2185B',
	blue: '#5C6BC0',
	blueDark: '#3949AB',
	badgeBg: 'rgba(0,0,0,0.35)',
	yellow: '#FFC107',
	red: '#E53935',
	white: '#FFFFFF',
	scoreStar: '#FFD700',
	scoreStarOutline: '#E6A800',
	iconMuted: 'rgba(255,255,255,0.5)',
	/** Score bar: red section */
	scoreBarRed: '#C62828',
	scoreBarRedLight: '#E53935',
	scoreBarRedDark: '#B71C1C',
	/** Score bar: blue section */
	scoreBarBlue: '#1565C0',
	scoreBarBlueLight: '#1976D2',
	scoreBarBlueDark: '#0D47A1',
	/** Score bar border & edge highlight */
	scoreBarBorder: '#E6A800',
	scoreBarHighlight: 'rgba(255, 200, 100, 0.5)',
	/** Overlay frame border (top/bottom) */
	frameBorder: '#C9A227',
} as const
