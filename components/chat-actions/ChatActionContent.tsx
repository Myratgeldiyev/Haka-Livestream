import { LevelBadge } from '@/components/ui/LevelBadge'
import type { ChatActionContentProps } from '@/types/chat-actions/chat-action.types'
import React, { ReactNode } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import IndiaFlagRounded from '../ui/flags/indiaFlagRounded'
import { LocationIcon } from '../ui/icons'
import ActionUserIcon from '../ui/icons/chat-actions/actionUserIcon'
import ChatCallIcon from '../ui/icons/chat-actions/ChatCallIcon'
import ChatFollowIcon from '../ui/icons/chat-actions/ChatFollowIcon'
import ChatMessageIcon from '../ui/icons/chat-actions/ChatMessageIcon'
import ChatPrizeIcon from '../ui/icons/chat-actions/ChatPrizeIcon'
import ChatUnfollowIcon from '../ui/icons/chat-actions/ChatUnfollowIcon'
import KickOutIcon from '../ui/icons/chat-actions/KickOutIcon'
import SobackoIcon from '../ui/icons/chat-actions/SobackoIcon'
import FemaleIcon from '../ui/icons/gender-age-icons/femaleIcon'
import {
	BORDER_RADIUS,
	COLORS,
	FONT_SIZES,
	FONT_WEIGHTS,
	ICON_SIZES,
	SPACING,
	sharedChatActionStyles,
} from './styles'

const OVERLAP_AVATAR_SIZE = 120

function IconPlaceholder({ size }: { size: number }) {
	return (
		<View
			style={[
				sharedChatActionStyles.iconPlaceholder,
				{ width: size, height: size },
			]}
		/>
	)
}

function UserAvatar({
	avatarUri,
	avatarSource,
	size = 100,
}: {
	avatarUri?: string
	avatarSource?: import('react-native').ImageSourcePropType
	size?: number
}) {
	return (
		<View
			style={[
				styles.avatarWrapper,
				{
					width: size,
					height: size,
					borderRadius: size / 2,
				},
			]}
		>
			{avatarUri && (
				<Image source={{ uri: avatarUri }} style={styles.avatarImage} />
			)}

			{!avatarUri && avatarSource && (
				<Image source={avatarSource} style={styles.avatarImage} />
			)}

			{!avatarUri && !avatarSource && <View style={styles.avatarFallback} />}
		</View>
	)
}

function StatItem({ count, label }: { count: number; label: string }) {
	return (
		<View style={styles.statItem}>
			<Text style={styles.statCount}>{count}</Text>
			<Text style={styles.statLabel}>{label}</Text>
		</View>
	)
}

function ActionButton({
	label,
	onPress,
	icon,
}: {
	label: string
	onPress?: () => void
	icon?: ReactNode
}) {
	return (
		<Pressable style={styles.actionButton} onPress={onPress}>
			<View style={styles.actionIconContainer}>{icon}</View>
			<Text style={styles.actionLabel}>{label}</Text>
		</Pressable>
	)
}

export function ChatActionContent({
	user,
	onKickOutPress,
	canModerateActions = false,
	onFollow,
	onUnfollow,
	isFollowed,
	onChat,
	onSendGift,
	onCall,
	onViewProfile,
	onMention,
	level,
}: ChatActionContentProps) {
	return (
		<View style={styles.container}>
			<View
				style={[
					styles.avatarOverlapWrapper,
					{ marginTop: -OVERLAP_AVATAR_SIZE / 2 },
				]}
			>
				<View style={styles.avatarContainer}>
					<UserAvatar
						avatarUri={user.avatarUri}
						avatarSource={user.avatarSource}
						size={OVERLAP_AVATAR_SIZE}
					/>
					{user.isVerified && (
						<View style={styles.verifiedBadge}>
							<IconPlaceholder size={ICON_SIZES.md} />
						</View>
					)}
				</View>
			</View>

			<View style={styles.headerRow}>
				<Pressable style={styles.headerIcon} onPress={onMention}>
					<SobackoIcon />
				</Pressable>
				<Pressable style={styles.headerIcon} onPress={onViewProfile}>
					<ActionUserIcon />
				</Pressable>
			</View>

			<View style={[styles.profileSection, styles.profileSectionAfterAvatar]}>
				<View style={styles.nameRow}>
					<Text style={styles.userName}>{user.name}</Text>
					{user.isVerified && (
						<View style={styles.verifiedIcon}>
							<IconPlaceholder size={ICON_SIZES.sm} />
						</View>
					)}
				</View>

				<Text style={styles.userId}>ID: {user.id}</Text>
			</View>

			<View style={styles.tagsRow}>
				<View style={styles.badgeFemaleIcon}>
					<FemaleIcon />
					<Text style={styles.badgeText}>24</Text>
				</View>
				<View style={styles.badgeLocation}>
					<LocationIcon />
					<Text style={styles.badgeText}>India</Text>
					<IndiaFlagRounded size={16} />
				</View>

				{level != null && <LevelBadge level={user.level} />}
				<View style={styles.badgeSvip}>
					<ActionUserIcon size={30} />
					<Text style={styles.badgeText}>SVIP</Text>
				</View>
				<View style={styles.badgeSvip}>
					<ActionUserIcon size={30} />
					<Text style={styles.badgeText}>Member</Text>
				</View>
			</View>

			<View style={styles.statsRow}>
				<StatItem count={user.friendsCount || 0} label='Friends' />
				<StatItem count={user.followingCount || 0} label='Following' />
				<StatItem count={user.followersCount || 0} label='Followers' />
				<StatItem count={user.visitorsCount || 0} label='Visitors' />
			</View>

			{canModerateActions && (
				<>
					<Pressable style={styles.kickOutSection} onPress={onKickOutPress}>
						<View style={styles.kickOutIconContainer}>
							<KickOutIcon />
						</View>
						<Text style={styles.kickOutText}>Kick out</Text>
					</Pressable>

					<View style={styles.actionsRow}>
						<ActionButton
							label={isFollowed ? 'Unfollow' : 'Follow'}
							icon={isFollowed ? <ChatUnfollowIcon /> : <ChatFollowIcon />}
							onPress={isFollowed ? onUnfollow : onFollow}
						/>
						<ActionButton
							label='Chat'
							icon={<ChatMessageIcon />}
							onPress={onChat}
						/>
						<ActionButton
							label='Send Gift'
							icon={<ChatPrizeIcon />}
							onPress={onSendGift}
						/>
						<ActionButton
							label='Call'
							icon={<ChatCallIcon />}
							onPress={onCall}
						/>
					</View>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	avatarOverlapWrapper: {
		alignItems: 'center',
	},
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		alignItems: 'center',
		marginBottom: SPACING.lg,
	},
	avatarWrapper: {
		overflow: 'hidden',
		backgroundColor: COLORS.iconBackground,
		justifyContent: 'center',
		alignItems: 'center',
	},

	avatarImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},

	avatarFallback: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.iconBackground,
	},
	headerIcon: {
		width: ICON_SIZES.xl,
		height: ICON_SIZES.xl,
		justifyContent: 'center',
		alignItems: 'center',
	},
	badgeFemaleIcon: {
		backgroundColor: '#FE3BA4',
		paddingHorizontal: 10,
		borderRadius: 20,
		display: 'flex',
		height: 30,
		flexDirection: 'row',
		gap: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	badgeText: {
		fontSize: 10,
		color: '#fff',
	},
	profileSection: {
		alignItems: 'center',
		marginBottom: SPACING.lg,
	},
	profileSectionAfterAvatar: {
		marginTop: SPACING.sm,
	},
	avatarContainer: {
		position: 'relative',
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 9999,
		backgroundColor: COLORS.iconBackground,
	},
	verifiedBadge: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: ICON_SIZES.lg,
		height: ICON_SIZES.lg,
		borderRadius: ICON_SIZES.lg / 2,
		backgroundColor: COLORS.verifiedBadge,
		justifyContent: 'center',
		alignItems: 'center',
	},
	nameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.xs,
	},
	userName: {
		fontSize: FONT_SIZES.xl,
		fontWeight: FONT_WEIGHTS.bold,
		color: COLORS.textPrimary,
	},
	verifiedIcon: {
		width: ICON_SIZES.md,
		height: ICON_SIZES.md,
	},
	userId: {
		fontSize: FONT_SIZES.md,
		color: '#fff',
		marginTop: SPACING.xs,
	},
	tagsRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: SPACING.sm,
		marginBottom: SPACING.xl,
	},
	tag: {
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.md,
		borderRadius: BORDER_RADIUS.pill,
		backgroundColor: COLORS.tagDiamond,
		height: 30,
	},
	levelTag: {
		backgroundColor: COLORS.tagLevel,
	},
	tagText: {
		fontSize: 10,
		color: COLORS.textPrimary,
		fontWeight: FONT_WEIGHTS.medium,
	},
	badgeLocation: {
		backgroundColor: COLORS.tagDiamond,
		paddingHorizontal: 5,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 30,
		borderRadius: 20,
		gap: 2,
		paddingVertical: 3,
		flexDirection: 'row',
	},
	badgeSvip: {
		backgroundColor: '#31205B',
		paddingHorizontal: 4,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		height: 30,
		paddingVertical: 3,
		flexDirection: 'row',
	},
	statsRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: SPACING.xxl,
	},
	statItem: {
		display: 'flex',
		flexDirection: 'row',
		gap: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	statCount: {
		fontSize: FONT_SIZES.md,
		fontWeight: FONT_WEIGHTS.bold,
		color: COLORS.textPrimary,
	},
	statLabel: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textPrimary,
		marginTop: SPACING.xs,
	},
	kickOutSection: {
		alignItems: 'center',
		marginBottom: SPACING.xxl,
	},
	kickOutIconContainer: {
		width: 48,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: SPACING.sm,
	},
	kickOutText: {
		fontSize: FONT_SIZES.md,
		color: '#fff',
	},
	actionsRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: SPACING.lg,
	},
	actionButton: {
		alignItems: 'center',
	},
	actionIconContainer: {
		width: 48,
		height: 48,
		borderRadius: BORDER_RADIUS.md,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: SPACING.sm,
	},
	actionLabel: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textPrimary,
	},
})
