import { resolveImageUrl } from '@/utils/imageUrl'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import type { UserListItemProps } from '../../types/game-ranking'
import { LevelBadge } from '../ui/LevelBadge'
import GoldIcon from '../ui/icons/live-stream/GoldIcon'
import { AVATAR_SIZE, COLORS, FONT_SIZES, SPACING } from './styles'

const AVATAR_PLACEHOLDER = require('../../assets/images/games/room-avatar.png')

export function UserListItem({
	user,
	showSpecialBadges = false,
}: UserListItemProps) {
	const resolvedUri = resolveImageUrl(user.user.profile_picture)
	const avatarSource = resolvedUri
		? { uri: resolvedUri }
		: AVATAR_PLACEHOLDER
	return (
		<View style={styles.container}>
			<View style={styles.leftSection}>
				<View style={styles.avatarContainer}>
					<Image source={avatarSource} style={styles.avatar} />
				</View>
				<View style={styles.userInfo}>
					<Text style={styles.userName}>{user.user.username}</Text>
					<View style={styles.badgesContainer}>
						{user.user.level != null && <LevelBadge level={user.user.level} />}
					</View>
				</View>
			</View>
			<View style={styles.rightSection}>
				{showSpecialBadges && user.user.online_status && (
					<Image
						source={
							resolvedUri
								? { uri: resolvedUri }
								: require('../../assets/images/stream-img.png')
						}
					/>
				)}
				<GoldIcon />
				<Text style={styles.coinAmount}>0 </Text>
				{/* Should add coint amount */}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: SPACING.md,
		paddingHorizontal: SPACING.xl,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.divider,
	},
	leftSection: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	avatarContainer: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		overflow: 'hidden',
		backgroundColor: COLORS.cardBackground,
	},
	avatar: {
		width: '100%',
		height: '100%',
	},
	userInfo: {
		marginLeft: SPACING.md,
		flex: 1,
	},
	userName: {
		fontSize: FONT_SIZES.lg,
		fontWeight: '700',
		color: COLORS.textPrimary,
		marginBottom: SPACING.xs,
	},
	badgesContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.sm,
	},
	levelBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.levelBadge,
		paddingHorizontal: SPACING.sm,
		paddingVertical: 4,
		borderRadius: 10,
		gap: 4,
	},
	levelBadgeIcon: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	},
	levelBadgeText: {
		fontSize: FONT_SIZES.xs,
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
	specialBadge: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: COLORS.specialBadge,
	},
	csBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.csBadge,
		paddingHorizontal: SPACING.sm,
		paddingVertical: 4,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.csBadgeBorder,
		gap: 4,
	},
	csBadgeIcon: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
	},
	csBadgeText: {
		fontSize: FONT_SIZES.xs,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
	rightSection: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.sm,
	},
	diamondIcon: {
		width: 40,
		height: 40,
		borderRadius: 8,
		backgroundColor: COLORS.diamondPurple,
	},
	coinIcon: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: COLORS.coinGold,
	},
	coinAmount: {
		fontSize: FONT_SIZES.md,
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
	femaleIcon: {
		backgroundColor: '#F9467D',
		padding: 5,
		borderRadius: '100%',
	},
})
