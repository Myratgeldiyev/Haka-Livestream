import type { ChatMessage as ChatMessageType } from '@/api/live-chat/room.types'
import type { ChatUser } from '@/types/chat-actions/chat-action.types'
import React, { useEffect, useRef, useState } from 'react'
import {
	Dimensions,
	FlatList,
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { ChatActionOverlay } from '../chat-actions/ChatActionOverlay'
import { ChatMessage } from './ChatMessage'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const AVATAR_SIZE = Math.max(32, SCREEN_WIDTH * 0.09)

const DEFAULT_AVATAR = require('@/assets/images/stream-img.png')

export interface ChatMessageItem {
	id: string
	username: string
	message: string
	avatar: ImageSourcePropType
}

interface ChatListProps {
	messages: ChatMessageType[] | ChatMessageItem[]
	statusText?: string | null
}

function isChatMessage(
	msg: ChatMessageType | ChatMessageItem
): msg is ChatMessageType {
	return 'user' in msg || 'text' in msg
}

function ChatRow({
	item,
	onPress,
}: {
	item: ChatMessageType | ChatMessageItem
	onPress: () => void
}) {
	const avatarSource = isChatMessage(item)
		? item.user?.profile_picture
			? { uri: item.user.profile_picture }
			: DEFAULT_AVATAR
		: item.avatar ?? DEFAULT_AVATAR

	const username = isChatMessage(item)
		? item.user?.username || `User ${item.user?.user_id ?? 'Unknown'}`
		: item.username

	const messageText = isChatMessage(item) ? item.text : item.message
	const imageUri = isChatMessage(item) ? item.imageUri : undefined

	return (
		<Pressable style={styles.row} onPress={onPress}>
			<View style={styles.avatarWrapper}>
				<Image source={avatarSource} style={styles.avatar} />
			</View>

			<View style={styles.textBlock}>
				<Text style={styles.username} numberOfLines={1}>
					{username}
				</Text>
				{imageUri ? (
					<Image source={{ uri: imageUri }} style={styles.imageMessage} />
				) : (
					<ChatMessage
						text={messageText}
						style={styles.message}
						numberOfLines={2}
					/>
				)}
			</View>
		</Pressable>
	)
}

export function ChatList({ messages, statusText }: ChatListProps) {
	const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
	const flatListRef = useRef<FlatList>(null)

	useEffect(() => {
		if (messages.length > 0) {
			setTimeout(() => {
				flatListRef.current?.scrollToEnd({ animated: true })
			}, 100)
		}
	}, [messages.length])

	const handleRowPress = (item: ChatMessageType | ChatMessageItem) => {
		let user: ChatUser

		if (isChatMessage(item)) {
			user = {
				id: item.id,
				name: item.user?.username || `User ${item.user?.user_id ?? 'Unknown'}`,
				avatarSource: item.user?.profile_picture
					? { uri: item.user.profile_picture }
					: DEFAULT_AVATAR,
			}
		} else {
			user = {
				id: item.id,
				name: item.username,
				avatarSource: item.avatar ?? DEFAULT_AVATAR,
			}
		}
		setSelectedUser(user)
	}

	const handleClose = () => {
		setSelectedUser(null)
	}

	return (
		<View style={styles.container}>
			{messages.length === 0 && statusText ? (
				<View style={styles.statusWrapper}>
					<Text style={styles.statusText}>{statusText}</Text>
				</View>
			) : null}
			<FlatList
				ref={flatListRef}
				data={messages}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<ChatRow item={item} onPress={() => handleRowPress(item)} />
				)}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				maintainVisibleContentPosition={{
					minIndexForVisible: 0,
				}}
			/>

			<ChatActionOverlay
				visible={selectedUser !== null}
				onClose={handleClose}
				user={selectedUser}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '65%',
		maxWidth: Math.min(280, SCREEN_WIDTH * 0.7),
		maxHeight: Math.max(120, SCREEN_WIDTH * 0.36),
	},
	statusWrapper: {
		paddingVertical: 8,
		paddingHorizontal: 10,
		alignSelf: 'flex-start',
		backgroundColor: 'rgba(0,0,0,0.35)',
		borderRadius: 10,
		marginBottom: 6,
	},
	statusText: {
		color: 'rgba(255,255,255,0.85)',
		fontSize: Math.max(11, SCREEN_WIDTH * 0.032),
		fontWeight: '600',
	},
	listContent: {
		flexGrow: 1,
		justifyContent: 'flex-end',
		paddingBottom: 4,
	},
	avatarWrapper: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		overflow: 'hidden',
		backgroundColor: '#DDD',
		flexShrink: 0,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: Math.max(8, SCREEN_WIDTH * 0.02),
		gap: Math.max(6, SCREEN_WIDTH * 0.015),
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	textBlock: {
		flex: 1,
		flexDirection: 'column',
	},
	username: {
		fontSize: Math.max(11, SCREEN_WIDTH * 0.032),
		lineHeight: Math.max(14, SCREEN_WIDTH * 0.04),
		fontWeight: '600',
		color: '#5F22D9',
		marginBottom: 2,
	},
	message: {
		fontSize: Math.max(11, SCREEN_WIDTH * 0.032),
		lineHeight: Math.max(14, SCREEN_WIDTH * 0.04),
		color: '#FFFFFF',
		flexWrap: 'wrap',
	},
	imageMessage: {
		width: Math.min(180, SCREEN_WIDTH * 0.16),
		height: Math.min(140, SCREEN_WIDTH * 0.26),
		borderRadius: 10,
		backgroundColor: 'rgba(255,255,255,0.08)',
	},
})
