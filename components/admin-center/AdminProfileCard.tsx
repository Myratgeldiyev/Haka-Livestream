import CopyIcon from '@/components/ui/icons/profile-header/copy-icon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { ADMIN_CENTER } from './constants'

const AVATAR_SIZE = 48
const SMALL_AVATAR_SIZE = 24

interface AdminProfileCardProps {
	name?: string
	userId?: string
	roles?: string
	avatarUri?: string | null
	secondaryAvatarUri?: string | null
	onCopyId?: () => void
	onMessage?: () => void
}

export function AdminProfileCard({
	name = 'Raj',
	userId = '123455',
	roles = 'Super admin | Official',
	avatarUri,
	secondaryAvatarUri,
	onCopyId,
	onMessage,
}: AdminProfileCardProps) {
	return (
		<View style={styles.card}>
			<View style={styles.topRow}>
				{avatarUri ? (
					<Image
						source={{ uri: avatarUri }}
						style={styles.avatar}
						resizeMode='cover'
					/>
				) : (
					<View style={styles.avatarPlaceholder} />
				)}
				<View style={styles.nameBlock}>
					<Text style={styles.name} numberOfLines={1}>
						{name}
					</Text>
					<View style={styles.idRow}>
						<Text style={styles.userId}>ID: {userId}</Text>
						<Pressable
							onPress={onCopyId}
							hitSlop={8}
							style={styles.copyBtn}
							accessibilityLabel={`Copy ID ${userId}`}
							accessibilityRole='button'
						>
							<CopyIcon />
						</Pressable>
					</View>
				</View>
			</View>
			<View style={styles.divider} />
			<View style={styles.bottomRow}>
				<Text style={styles.roles} numberOfLines={1}>
					{roles}
				</Text>
				{secondaryAvatarUri ? (
					<Image
						source={{ uri: secondaryAvatarUri }}
						style={styles.smallAvatar}
						resizeMode='cover'
					/>
				) : (
					<View style={styles.smallAvatarPlaceholder} />
				)}
				<Pressable
					onPress={onMessage}
					style={({ pressed }) => [
						styles.messageBtn,
						pressed && styles.messageBtnPressed,
					]}
					accessibilityRole='button'
					accessibilityLabel='Message'
				>
					<Text style={styles.messageBtnText}>Message &gt;</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: ADMIN_CENTER.cardBg,
		borderRadius: ADMIN_CENTER.cardBorderRadius,
		padding: ADMIN_CENTER.screenPadding,
		marginHorizontal: ADMIN_CENTER.screenPadding,
		marginBottom: 16,
		gap: 0,
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	avatarPlaceholder: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		backgroundColor: ADMIN_CENTER.dividerColor,
	},
	nameBlock: {
		flex: 1,
		minWidth: 0,
		gap: 2,
	},
	name: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: ADMIN_CENTER.valueColor,
	},
	idRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	userId: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: ADMIN_CENTER.labelColor,
	},
	copyBtn: {
		padding: 2,
	},
	divider: {
		height: 1,
		backgroundColor: '#838383',
		marginVertical: 12,
	},
	bottomRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	roles: {
		flex: 1,
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: ADMIN_CENTER.valueColor,
		minWidth: 0,
	},
	smallAvatar: {
		width: SMALL_AVATAR_SIZE,
		height: SMALL_AVATAR_SIZE,
		borderRadius: SMALL_AVATAR_SIZE / 2,
	},
	smallAvatarPlaceholder: {
		width: SMALL_AVATAR_SIZE,
		height: SMALL_AVATAR_SIZE,
		borderRadius: SMALL_AVATAR_SIZE / 2,
		backgroundColor: ADMIN_CENTER.dividerColor,
	},
	messageBtn: {
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	messageBtnPressed: {
		opacity: 0.7,
	},
	messageBtnText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: ADMIN_CENTER.labelColor,
	},
})
