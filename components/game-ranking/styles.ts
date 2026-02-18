import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native'
import { spacing as globalSpacing } from '@/constants/spacing'
import { fontSizes as globalFontSizes } from '@/constants/typography'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const ANIMATION_DURATION = 300

export const STATUSBAR_HEIGHT =
	Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight ?? 24) + 10

// Use percentage-based height for better responsiveness
export const OVERLAY_HEIGHT = SCREEN_HEIGHT * 0.65

// Helper function to get responsive overlay height (call in components)
export const getOverlayHeight = (screenHeight: number) => screenHeight * 0.65

export const COLORS = {
	background: '#1E1A2E',
	cardBackground: '#2A2444',
	overlay: 'rgba(0, 0, 0, 0.5)',
	textPrimary: '#FFFFFF',
	textSecondary: 'rgba(255, 255, 255, 0.6)',
	tabIndicator: '#FFFFFF',
	subTabActive: '#4A4560',
	subTabInactive: '#2A2444',
	levelBadge: '#7B6BE8',
	csBadge: '#9B3B9B',
	csBadgeBorder: '#FF4444',
	specialBadge: '#FF6B8A',
	coinGold: '#FFB800',
	diamondPurple: '#9B7BE8',
	medalOrange: '#FF8C42',
	gamepadPurple: '#7B6BE8',
	divider: 'rgba(255, 255, 255, 0.1)',
}

export const SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
}

export const FONT_SIZES = {
	xs: 12,
	sm: 14,
	md: 16,
	lg: 18,
	xl: 20,
}

export const AVATAR_SIZE = 56

export const sharedStyles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: COLORS.overlay,
	},
	overlayPressable: {
		flex: 1,
	},
	sheet: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: OVERLAY_HEIGHT,
		backgroundColor: COLORS.background,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: 16,
	},
})
