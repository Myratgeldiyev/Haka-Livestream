import { Dimensions, StyleSheet } from 'react-native'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const ANIMATION_DURATION = 300

export const OVERLAY_HEIGHTS = {
	roomPK: SCREEN_HEIGHT * 0.42,
	calculator: SCREEN_HEIGHT * 0.48,
	games: SCREEN_HEIGHT * 0.75,
}

export const COLORS = {
	background: '#252038',
	overlay: 'rgba(0, 0, 0, 0.5)',
	textPrimary: '#FFFFFF',
	textSecondary: 'rgba(255, 255, 255, 0.7)',
	textMuted: 'rgba(255, 255, 255, 0.5)',

	buttonPrimary: '#7C3AED',
	buttonSecondary: '#3D3556',
	buttonOutline: 'transparent',
	buttonOutlineBorder: '#5B4A8A',

	gradientStart: '#FF2D92',
	gradientEnd: '#7C3AED',

	timeOptionDefault: '#514D63',
	timeOptionSelected: '#7C3AED',

	gameCardBackground: '#3D3556',

	iconPlaceholder: 'rgba(255, 255, 255, 0.2)',
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
	header: 24,
}

export const BORDER_RADIUS = {
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
	pill: 9999,
}

export const BUTTON_HEIGHT = {
	sm: 40,
	md: 48,
	lg: 56,
}

export const GAME_CARD = {
	size: 72,
	iconSize: 48,
	borderRadius: 16,
}

export const TIME_OPTION = {
	height: 48,
	minWidth: 90,
	borderRadius: 24,
}

export const sharedOverlayStyles = StyleSheet.create({
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
		backgroundColor: COLORS.background,
		borderTopLeftRadius: BORDER_RADIUS.xxl,
		borderTopRightRadius: BORDER_RADIUS.xxl,
		paddingTop: SPACING.xl,
		paddingHorizontal: SPACING.xl,
		paddingBottom: SPACING.xxxl,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: SPACING.xxl,
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.md,
	},
	headerTitle: {
		fontSize: FONT_SIZES.title,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
	headerRight: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.sm,
	},
	headerRightText: {
		fontSize: FONT_SIZES.lg,
		color: COLORS.textPrimary,
	},
	sectionTitle: {
		fontSize: FONT_SIZES.lg,
		color: COLORS.textPrimary,
		marginBottom: SPACING.lg,
	},
	buttonPrimary: {
		height: BUTTON_HEIGHT.lg,
		borderRadius: BORDER_RADIUS.pill,
		backgroundColor: COLORS.buttonPrimary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonPrimaryText: {
		fontSize: FONT_SIZES.xl,
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
	buttonOutline: {
		height: BUTTON_HEIGHT.lg,
		borderRadius: BORDER_RADIUS.pill,
		backgroundColor: COLORS.buttonOutline,
		borderWidth: 2,
		borderColor: COLORS.buttonOutlineBorder,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonOutlineText: {
		fontSize: FONT_SIZES.xl,
		fontWeight: '600',
		color: COLORS.textMuted,
	},
	iconPlaceholder: {
		backgroundColor: COLORS.iconPlaceholder,
		borderRadius: BORDER_RADIUS.sm,
	},
})
