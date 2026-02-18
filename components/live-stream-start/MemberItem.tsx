import React from 'react'
import {
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import AdminIcon from '../ui/icons/live-stream/adminIcon'
import AdminIconMen from '../ui/icons/live-stream/adminIconMen'
import { DiamondLevel } from './LevelBadge'

export interface MemberItemProps {
	username: string
	level: number
	avatar?: ImageSourcePropType
	isAdmin?: boolean
	isHighlighted?: boolean
	onPress?: () => void
}

const COLORS = {
	background: '#1E1B2E',
	backgroundHighlight: '#252238',
	textPrimary: '#FFFFFF',
	avatarBorder: '#2DD4BF',
	levelBadgeBg: '#6366F1',
	levelBadgeGradientStart: '#8B5CF6',
	adminBadgeBg: '#7F1D1D',
	adminBadgeBorder: '#991B1B',
	placeholder: '#3D3659',
}

const SIZES = {
	avatarSize: 56,
	avatarBorderWidth: 2,
	levelIconSize: 18,
	adminIconSize: 16,
}

const SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
}

function AvatarPlaceholder() {
	return (
		<View style={styles.avatarContainer}>
			<View style={styles.avatarPlaceholder} />
		</View>
	)
}

export function MemberItem({
	username,
	level,
	avatar,
	isAdmin = false,
	isHighlighted = false,
	onPress,
}: MemberItemProps) {
	return (
		<Pressable style={[styles.container]} onPress={onPress}>
			<View style={styles.avatarWrapper}>
				{avatar ? (
					<View style={styles.avatarContainer}>
						<Image source={avatar} style={styles.avatarImage} />
					</View>
				) : (
					<View style={styles.avatarContainer}>
						<Image
							source={require('../../assets/images/games/room-avatar.png')}
							style={styles.avatarImage}
						/>
					</View>
				)}
			</View>

			<View style={styles.userInfo}>
				<Text style={styles.username}>{username}</Text>
				<DiamondLevel age={35} />
			</View>

			<View style={styles.rightSection}>
				{isAdmin && (
					<View style={styles.adminBadge}>
						<AdminIcon />
						<View style={styles.textWrapper}>
							<AdminIconMen />
							<Text style={styles.text}>Admin</Text>
						</View>
					</View>
				)}
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: SPACING.md,
		paddingHorizontal: SPACING.lg,
		backgroundColor: '#1E1533',
	},
	avatarWrapper: {
		marginRight: SPACING.md,
	},
	avatarContainer: {
		width: 50,
		height: 50,
		borderRadius: SIZES.avatarSize / 2,
		overflow: 'hidden',
	},
	avatarImage: {
		width: '100%',
		height: '100%',
	},
	avatarPlaceholder: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.placeholder,
		borderRadius: SIZES.avatarSize / 2,
	},
	userInfo: {
		flex: 1,
		justifyContent: 'center',
	},
	username: {
		fontSize: 18,
		fontWeight: '700',
		color: COLORS.textPrimary,
		marginBottom: SPACING.xs,
	},
	levelBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.levelBadgeBg,
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderRadius: 12,
		alignSelf: 'flex-start',
		gap: SPACING.xs,
	},
	levelIconPlaceholder: {
		width: SIZES.levelIconSize,
		height: SIZES.levelIconSize,
		borderRadius: SIZES.levelIconSize / 2,
		backgroundColor: COLORS.levelBadgeGradientStart,
	},
	levelText: {
		fontSize: 13,
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
	rightSection: {
		minWidth: 80,
		alignItems: 'flex-end',
	},
	adminBadge: {
		flexDirection: 'row',
		position: 'relative',
		alignItems: 'center',
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs + 2,
		borderRadius: 6,
		gap: SPACING.xs,
	},
	adminIconPlaceholder: {
		width: SIZES.adminIconSize,
		height: SIZES.adminIconSize,
		borderRadius: SIZES.adminIconSize / 2,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
	},
	textWrapper: {
		display: 'flex',
		flexDirection: 'row',

		fontWeight: '600',
		position: 'absolute',
		left: 20,
		top: 8,
	},
	text: {
		color: '#fff',
		fontSize: 12,
	},
})
