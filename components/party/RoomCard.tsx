import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { useLiveChatStore } from '@/store/liveChat.store'
import { router } from 'expo-router'
import React from 'react'
import {
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import IndiaFlag from '../ui/flags/indiaFlag'
import NetworkPartyIcon from '../ui/icons/party/network'

const AVATAR_SIZE = 80
const VIEWER_AVATAR_SIZE = 40

const colors = {
	cardBg: '#ead9f6ff',
	text: '#1A1A1A',
	textMuted: '#cab0a0ff',
	tagFunny: '#FFB74D',
	tagChatting: '#E91E63',
	tagDancing: '#9C27B0',
	tagSinging: '#FFAB91',
}

const tagColors: Record<string, string> = {
	Funny: colors.tagFunny,
	Chatting: colors.tagChatting,
	Dancing: colors.tagDancing,
	Singing: colors.tagSinging,
}

export interface RoomData {
	id: string
	hostName: string
	hostAvatar: ImageSourcePropType
	category: string
	viewerCount: number
	viewers: ImageSourcePropType[]
}

interface RoomCardProps {
	data: RoomData
	/** When provided, called on press instead of default enterRoom + navigate (e.g. for custom overlay + join flow). */
	onPress?: (data: RoomData) => void
}

export function RoomCard({ data, onPress: onPressProp }: RoomCardProps) {
	const { enterRoom, isConnecting, clearMinimized } = useLiveChatStore()

	const handlePress = async () => {
		if (onPressProp) {
			onPressProp(data)
			return
		}
		if (isConnecting) return
		clearMinimized()
		try {
			await enterRoom(data.id)
			router.push({
				pathname: '/chat/[roomId]',
				params: { roomId: data.id },
			})
		} catch (e) {
			console.log('Failed to enter room', e)
		}
	}

	const tagColor = tagColors[data.category] || colors.tagFunny

	return (
		<Pressable style={styles.container} onPress={handlePress}>
			<View style={styles.avatarContainer}>
				<Image source={data.hostAvatar} style={styles.avatar} />
			</View>

			<View style={styles.content}>
				<View style={styles.nameRow}>
					<Text style={styles.hostName}>{data.hostName}</Text>
					<IndiaFlag />
				</View>

				<View style={styles.bottomRow}>
					<View style={[styles.tag, { backgroundColor: tagColor }]}>
						<Text style={styles.tagText}>{data.category}</Text>
					</View>

					<View style={styles.viewersRow} />

					<View style={styles.countContainer}>
						<NetworkPartyIcon />
						<Text style={styles.countText}>
							{data.viewerCount.toString().padStart(2, '0')}
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: colors.cardBg,
		borderRadius: spacing.lg,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xl,
		marginHorizontal: spacing.lg,
		marginVertical: spacing.sm,
		gap: spacing.md,
	},

	avatarContainer: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: spacing.md,
		overflow: 'hidden',
		backgroundColor: '#EFD3F2',
	},
	avatar: {
		width: '100%',
		height: '100%',
	},

	content: {
		flex: 1,
		justifyContent: 'space-between',
	},

	nameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},

	hostName: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: colors.text,
	},

	bottomRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},

	tag: {
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: spacing.md,
	},

	tagText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: '#FFFFFF',
	},

	viewersRow: {
		flexDirection: 'row',
		flex: 1,
	},

	viewerAvatarWrapper: {
		width: VIEWER_AVATAR_SIZE,
		height: VIEWER_AVATAR_SIZE,
		borderRadius: VIEWER_AVATAR_SIZE / 2,
		overflow: 'hidden',
		borderWidth: 2,
		borderColor: '#FFFFFF',
		backgroundColor: '#DDD',
	},

	viewerAvatar: {
		width: '100%',
		height: '100%',
		borderRadius: VIEWER_AVATAR_SIZE / 2,
	},

	countContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},

	countText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: colors.textMuted,
		fontWeight: fontWeights.medium,
	},
})
