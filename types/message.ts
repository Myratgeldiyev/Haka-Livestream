// types/message.ts
export type AvatarKey = 'user' | 'user2' | 'user3'

export interface MessageUser {
	name: string
	id: string
	avatar: AvatarKey
	isActive?: boolean
	hasChatStatus?: boolean
}

export interface Message {
	id: string
	user: MessageUser
	lastMessage: string
	time: string
	unread?: boolean
}
export interface ChatMessage {
	id: string
	text: string
	time: string
	isMe: boolean
	isRead?: boolean
	senderAvatar?: AvatarKey
}

export const images = {
	user: require('../assets/images/user.png'),
	user2: require('../assets/images/user.png'),
	user3: require('../assets/images/user.png'),
} as const
