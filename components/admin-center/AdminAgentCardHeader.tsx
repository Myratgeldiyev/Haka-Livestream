import CopyIcon from '@/components/ui/icons/profile-header/copy-icon'
import RightArrowIcon from '@/components/ui/icons/profile-header/right-arrow'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { ADMIN_CENTER } from './constants'

const AVATAR_SIZE = 50

interface AdminAgentCardHeaderProps {
	name: string
	date: string
	time: string
	userId: string
	avatarUri?: string | null
	avatarSource?: ImageSourcePropType
	onCopyId?: () => void
	onChat?: () => void
	onDetails?: () => void
}

export function AdminAgentCardHeader({
	name,
	date,
	time,
	userId,
	avatarUri,
	avatarSource,
	onCopyId,
	onChat,
	onDetails,
}: AdminAgentCardHeaderProps) {
	const imageSource =
		avatarSource ?? (avatarUri ? { uri: avatarUri } : undefined)
	return (
		<View style={styles.wrapper}>
			<View style={styles.row}>
				{imageSource ? (
					<Image
						source={imageSource}
						style={styles.avatar}
						resizeMode='cover'
					/>
				) : (
					<View style={styles.avatarPlaceholder} />
				)}
				<Text style={styles.name} numberOfLines={1}>
					{name}
				</Text>
				<View style={styles.actions}>
					<Pressable
						onPress={onChat}
						style={styles.chatBtn}
						accessibilityRole='button'
						accessibilityLabel='Chat'
					>
						<Ionicons name='chatbubble-outline' size={20} color='#FFFFFF' />
					</Pressable>
					<Pressable
						onPress={onDetails}
						style={({ pressed }) => [
							styles.detailsBtn,
							pressed && styles.detailsBtnPressed,
						]}
						accessibilityRole='button'
						accessibilityLabel='Details'
					>
						<Text style={styles.detailsBtnText}>Details </Text>
						<RightArrowIcon color='#000' width={10} height={14} />
					</Pressable>
				</View>
			</View>
			<View style={styles.secondRow}>
				<View style={styles.avatarSpacer} />
				<View style={styles.dateTimeIdRow}>
					<View>
						<Text style={styles.date}>{date}</Text>
						<Text style={styles.time}>{time}</Text>
					</View>
					<View style={styles.idBlock}>
						<Text style={styles.userId}>ID: {userId}</Text>
						<Pressable
							onPress={onCopyId}
							hitSlop={8}
							style={styles.copyBtn}
							accessibilityRole='button'
						>
							<CopyIcon />
						</Pressable>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		gap: 6,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	avatarSpacer: {
		width: AVATAR_SIZE,
	},
	name: {
		flex: 1,
		minWidth: 0,
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.bold,
		color: ADMIN_CENTER.valueColor,
	},
	secondRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
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
	dateTimeIdRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
		minWidth: 0,
	},
	date: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: ADMIN_CENTER.labelColor,
	},
	time: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: ADMIN_CENTER.labelColor,
	},
	idBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	userId: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.regular,
		color: ADMIN_CENTER.labelColor,
	},
	copyBtn: {
		padding: 2,
	},
	actions: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	chatBtn: {
		width: 36,
		height: 36,
		borderRadius: 12,
		backgroundColor: ADMIN_CENTER.chatButtonBg,
		alignItems: 'center',
		justifyContent: 'center',
	},
	detailsBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 6,
		paddingHorizontal: 6,
		backgroundColor: '#efefef',
		borderRadius: 8,
	},
	detailsBtnPressed: {
		opacity: 0.7,
	},
	detailsBtnText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: '#000',
	},
})
