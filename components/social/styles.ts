import { StyleSheet } from 'react-native'

export const COLORS = {
	primary: '#5F22D9',
	background: '#FFFFFF',
	backgroundSecondary: '#F7F8FA',
	text: '#1A1F35',
	textSecondary: '#6B7280',
	textMuted: '#A0A5AD',
	border: '#E5E5E5',
	segmentActive: '#FFFFFF',
	segmentInactive: '#E5E5E5',
	iconPlaceholder: '#D1D5DB',
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
	xs: 10,
	sm: 12,
	md: 14,
	lg: 16,
	xl: 18,
}

export const AVATAR_SIZE = 60

export const sharedSocialStyles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		marginTop: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: SPACING.lg,
		paddingBottom: SPACING.md,
		backgroundColor: COLORS.background,
	},
	headerTitle: {
		fontSize: FONT_SIZES.xl,
		fontWeight: '600',
		color: COLORS.text,
	},
	headerIconButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconPlaceholder: {
		backgroundColor: COLORS.iconPlaceholder,
		borderRadius: 4,
	},
	tabBar: {
		flexDirection: 'row',
		paddingHorizontal: SPACING.lg,
	},
	tabItem: {
		paddingVertical: SPACING.md,
		paddingHorizontal: SPACING.md,
		marginRight: SPACING.sm,
	},
	tabItemActive: {},
	tabText: {
		fontSize: FONT_SIZES.lg,
		color: COLORS.textSecondary,
	},
	tabTextActive: {
		color: COLORS.primary,
		fontWeight: '600',
	},
	segmentedContainer: {
		flexDirection: 'row',
		marginHorizontal: SPACING.lg,
		marginVertical: SPACING.md,
		borderRadius: 20,
		overflow: 'hidden',
		backgroundColor: COLORS.segmentInactive,
		borderWidth: 1,

		borderColor: COLORS.border,
	},
	segmentButton: {
		flex: 1,
		paddingVertical: SPACING.md,
		alignItems: 'center',
		borderRadius: 20,
		backgroundColor: COLORS.segmentInactive,
	},
	segmentButtonActive: {
		backgroundColor: COLORS.segmentActive,
		borderWidth: 1,
		borderColor: COLORS.primary,
	},
	segmentText: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textSecondary,
	},
	segmentTextActive: {
		color: '#000',
		fontWeight: '600',
	},
	listItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: SPACING.lg,
		paddingVertical: SPACING.md,
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		backgroundColor: COLORS.iconPlaceholder,
	},
	userInfo: {
		flex: 1,
		marginLeft: SPACING.md,
	},
	username: {
		fontSize: FONT_SIZES.lg,
		fontWeight: '600',
		color: COLORS.text,
		marginBottom: SPACING.xs,
	},
	iconsRow: {
		flexDirection: 'row',
		gap: SPACING.xs,
		marginBottom: SPACING.xs,
	},
	smallIcon: {
		width: 16,
		height: 16,
		borderRadius: 4,
		backgroundColor: COLORS.iconPlaceholder,
	},
	userId: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textMuted,
	},
	rightContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.sm,
	},
	actionIcon: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: COLORS.iconPlaceholder,
	},
	visitTime: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textMuted,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: SPACING.xxl,
	},
	emptyText: {
		fontSize: FONT_SIZES.lg,
		color: COLORS.textSecondary,
		textAlign: 'center',
		marginBottom: SPACING.xs,
	},
	emptySubText: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textMuted,
		textAlign: 'center',
	},
	footerLoader: {
		paddingVertical: SPACING.lg,
		alignItems: 'center',
	},
	footerText: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textMuted,
	},
})
