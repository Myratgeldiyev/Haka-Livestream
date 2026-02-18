import { Dimensions, StyleSheet } from 'react-native'
import { spacing as globalSpacing } from '@/constants/spacing'
import { fontSizes as globalFontSizes, fontWeights as globalFontWeights } from '@/constants/typography'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const ANIMATION_DURATION = 300

// Use percentage-based height for better responsiveness
export const OVERLAY_HEIGHT = SCREEN_HEIGHT * 0.72

// Helper function to get responsive overlay height (call in components)
export const getOverlayHeight = (screenHeight: number) => screenHeight * 0.72

export const COLORS = {
	background: '#252038',
	overlay: 'rgba(0, 0, 0, 0.5)',

	textPrimary: '#FFFFFF',
	textSecondary: 'rgba(255, 255, 255, 0.7)',
	textMuted: 'rgba(255, 255, 255, 0.5)',
	textHighlight: '#FF2D55',

	buttonPrimary: '#7C3AED',
	buttonPrimaryText: '#FFFFFF',

	tagLevel: '#FF6B8A',
	tagCountry: '#3D3556',
	tagDiamond: '#3D3556',
	tagSvip: '#3D3556',
	tagMember: '#3D3556',

	radioUnselected: '#3D3556',
	radioSelected: '#7C3AED',

	iconBackground: '#3D3556',
	divider: 'rgba(255, 255, 255, 0.1)',

	avatarBorder: '#7C3AED',
	verifiedBadge: '#3B82F6',
}

export const SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
	xxxl: 32,
}

export const FONT_SIZES = {
	xs: 10,
	sm: 12,
	md: 14,
	lg: 16,
	xl: 18,
	xxl: 20,
	title: 22,
}

export const FONT_WEIGHTS = {
	regular: '400' as const,
	medium: '500' as const,
	semibold: '600' as const,
	bold: '700' as const,
}

export const BORDER_RADIUS = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
	pill: 9999,
}

export const AVATAR_SIZES = {
	sm: 32,
	md: 48,
	lg: 80,
	xl: 100,
}

export const ICON_SIZES = {
	sm: 16,
	md: 20,
	lg: 24,
	xl: 32,
}

export const sharedChatActionStyles = StyleSheet.create({
	modalContainer: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		zIndex: 9999,
		elevation: 9999,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: COLORS.overlay,
	},
	overlayPressable: {
		flex: 1,
	},
	sheetBase: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: OVERLAY_HEIGHT,
		backgroundColor: COLORS.background,
		borderTopLeftRadius: BORDER_RADIUS.xxl,
		borderTopRightRadius: BORDER_RADIUS.xxl,
		paddingTop: 0,
		paddingHorizontal: SPACING.xl,
		paddingBottom: SPACING.xxxl,
		overflow: 'visible',
	},
	title: {
		fontSize: FONT_SIZES.xl,
		fontWeight: FONT_WEIGHTS.semibold,
		color: COLORS.textPrimary,
		textAlign: 'center',
		marginBottom: SPACING.xl,
	},
	iconPlaceholder: {
		backgroundColor: COLORS.iconBackground,
		borderRadius: BORDER_RADIUS.sm,
	},
})
