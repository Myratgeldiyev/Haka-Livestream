import { Dimensions, StyleSheet } from 'react-native'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export const ANIMATION_DURATION = 300

export const OVERLAY_HEIGHTS = {
	small: SCREEN_HEIGHT * 0.35,
	medium: SCREEN_HEIGHT * 0.55,
	large: SCREEN_HEIGHT * 0.75,
}

export const COLORS = {
	background: '#FFFFFF',
	overlay: 'rgba(0, 0, 0, 0.5)',

	textPrimary: '#1A1A1A',
	textSecondary: '#666666',
	textMuted: '#999999',
	textPlaceholder: '#AAAAAA',

	buttonPrimary: '#5F22D9',
	buttonPrimaryText: '#FFFFFF',

	searchBackground: '#F5F5F5',
	searchBorder: '#E0E0E0',
	searchIcon: '#666666',

	divider: '#F0F0F0',

	closeIcon: '#1A1A1A',

	genderMale: '#3B82F6',
	genderFemale: '#EC4899',

	sharePlatformCopyLink: '#7C3AED',
	sharePlatformWhatsApp: '#000000',
	sharePlatformFacebook: '#1877F2',
	sharePlatformX: '#000000',

	iconPlaceholder: 'rgba(0, 0, 0, 0.1)',
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
	lg: 60,
	xl: 80,
}

export const BUTTON_HEIGHT = {
	sm: 32,
	md: 40,
	lg: 48,
}

export const ICON_SIZES = {
	sm: 16,
	md: 20,
	lg: 24,
	xl: 32,
}

export const SHARE_PLATFORM_ICON_SIZE = 56

export const sharedToolOverlayStyles = StyleSheet.create({
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
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: SPACING.xl,
	},
	headerTitle: {
		fontSize: FONT_SIZES.xl,
		fontWeight: FONT_WEIGHTS.medium,
		color: COLORS.textPrimary,
	},
	closeButton: {
		position: 'absolute',
		right: 0,
		top: 0,
		width: ICON_SIZES.lg,
		height: ICON_SIZES.lg,
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeIconPlaceholder: {
		width: ICON_SIZES.lg,
		height: ICON_SIZES.lg,
		backgroundColor: COLORS.iconPlaceholder,
		borderRadius: BORDER_RADIUS.xs,
	},
	userListItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: SPACING.md,
	},
	userAvatar: {
		width: AVATAR_SIZES.lg,
		height: AVATAR_SIZES.lg,
		borderRadius: AVATAR_SIZES.lg / 2,
		backgroundColor: COLORS.iconPlaceholder,
	},
	userInfo: {
		flex: 1,
		marginLeft: SPACING.lg,
	},
	userName: {
		fontSize: FONT_SIZES.lg,
		fontWeight: FONT_WEIGHTS.semibold,
		color: COLORS.textPrimary,
	},
	genderBadge: {
		width: ICON_SIZES.md,
		height: ICON_SIZES.md,
		borderRadius: ICON_SIZES.md / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: SPACING.xs,
	},
	genderBadgeFemale: {
		backgroundColor: COLORS.genderFemale,
	},
	genderBadgeMale: {
		backgroundColor: COLORS.genderMale,
	},
	actionButton: {
		height: BUTTON_HEIGHT.sm,
		paddingHorizontal: SPACING.xl,
		borderRadius: BORDER_RADIUS.pill,
		backgroundColor: COLORS.buttonPrimary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionButtonText: {
		fontSize: FONT_SIZES.md,
		fontWeight: FONT_WEIGHTS.semibold,
		color: COLORS.buttonPrimaryText,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.searchBackground,
		borderRadius: BORDER_RADIUS.pill,
		paddingHorizontal: SPACING.lg,
		height: BUTTON_HEIGHT.md,
	},
	searchIconPlaceholder: {
		width: ICON_SIZES.md,
		height: ICON_SIZES.md,
		backgroundColor: COLORS.iconPlaceholder,
		borderRadius: BORDER_RADIUS.xs,
		marginRight: SPACING.sm,
	},
	searchInput: {
		flex: 1,
		fontSize: FONT_SIZES.md,
		color: COLORS.textPrimary,
	},
	sharePlatformsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: SPACING.xl,
		paddingBottom: SPACING.lg,
		borderTopWidth: 1,
		borderTopColor: COLORS.divider,
	},
	sharePlatformItem: {
		alignItems: 'center',
	},
	sharePlatformIcon: {
		width: SHARE_PLATFORM_ICON_SIZE,
		height: SHARE_PLATFORM_ICON_SIZE,
		borderRadius: SHARE_PLATFORM_ICON_SIZE / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: SPACING.sm,
	},
	sharePlatformIconPlaceholder: {
		width: ICON_SIZES.lg,
		height: ICON_SIZES.lg,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		borderRadius: BORDER_RADIUS.xs,
	},
	sharePlatformName: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textPrimary,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: SPACING.xxxl,
	},
	emptyText: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textMuted,
	},
	iconPlaceholder: {
		backgroundColor: COLORS.iconPlaceholder,
		borderRadius: BORDER_RADIUS.xs,
	},
})
