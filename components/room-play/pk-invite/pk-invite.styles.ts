import { StyleSheet } from 'react-native'

export const PK_INVITE_COLORS = {
	background: '#25203C',
	textPrimary: '#FFFFFF',
	textSecondary: 'rgba(255, 255, 255, 0.7)',
	buttonBackground: '#7C3AED',
	rowBackground: 'rgba(255, 255, 255, 0.08)',
	imagePlaceholder: 'rgba(255, 255, 255, 0.2)',
}

export const PK_INVITE_SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
}

export const PK_INVITE_FONT_SIZES = {
	sm: 12,
	md: 14,
	lg: 16,
	xl: 18,
}

export const pkInviteStyles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: PK_INVITE_COLORS.background,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: PK_INVITE_SPACING.lg,
		paddingVertical: PK_INVITE_SPACING.md,
		position: 'relative',
	},
	backButton: {
		position: 'absolute',
		left: PK_INVITE_SPACING.lg,
		padding: PK_INVITE_SPACING.sm,
	},
	headerTitle: {
		fontSize: PK_INVITE_FONT_SIZES.xl,
		fontWeight: '600',
		color: PK_INVITE_COLORS.textPrimary,
	},
	listContainer: {
		flex: 1,
		paddingHorizontal: PK_INVITE_SPACING.lg,
	},
	listContent: {
		paddingVertical: PK_INVITE_SPACING.md,
		gap: PK_INVITE_SPACING.md,
	},
	emptyText: {
		color: PK_INVITE_COLORS.textSecondary,
		fontSize: PK_INVITE_FONT_SIZES.md,
		textAlign: 'center',
		marginTop: PK_INVITE_SPACING.xxl,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: PK_INVITE_COLORS.rowBackground,
		borderRadius: 12,
		padding: PK_INVITE_SPACING.md,
	},
	roomImage: {
		width: 48,
		height: 48,
		borderRadius: 8,
	},
	imagePlaceholder: {
		width: 48,
		height: 48,
		borderRadius: 8,
		backgroundColor: PK_INVITE_COLORS.imagePlaceholder,
	},
	roomInfo: {
		flex: 1,
		marginLeft: PK_INVITE_SPACING.md,
	},
	roomTitle: {
		fontSize: PK_INVITE_FONT_SIZES.lg,
		fontWeight: '500',
		color: PK_INVITE_COLORS.textPrimary,
	},
	roomId: {
		fontSize: PK_INVITE_FONT_SIZES.sm,
		color: PK_INVITE_COLORS.textSecondary,
		marginTop: PK_INVITE_SPACING.xs,
	},
	inviteButton: {
		backgroundColor: PK_INVITE_COLORS.buttonBackground,
		paddingHorizontal: PK_INVITE_SPACING.lg,
		paddingVertical: PK_INVITE_SPACING.sm,
		borderRadius: 20,
	},
	inviteButtonText: {
		fontSize: PK_INVITE_FONT_SIZES.md,
		fontWeight: '600',
		color: PK_INVITE_COLORS.textPrimary,
	},
})
