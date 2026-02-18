import { AvatarKey, Message, MessageUser } from '@/types/message'

export const MESSAGE_USERS: MessageUser[] = [
	{
		id: '1',
		name: 'John',
		avatar: 'user' as AvatarKey,
		isActive: true,
	},
	{
		id: '2',
		name: 'Monny',
		avatar: 'user' as AvatarKey,
		hasChatStatus: true,
	},
	{
		id: '3',
		name: 'Alex',
		avatar: 'user' as AvatarKey,
		isActive: true,
	},
	{
		id: '4',
		name: 'Sarah',
		avatar: 'user' as AvatarKey,
		isActive: false,
	},
]

export const INBOX_MESSAGES: Message[] = [
	{
		id: '1',
		user: {
			id: '1',
			name: 'John Monny',
			avatar: 'user' as AvatarKey,
			isActive: true,
		},
		lastMessage: 'Hey! Are you coming today?',
		time: '11:30 PM',
		unread: true,
	},
	{
		id: '2',
		user: {
			id: '2',
			name: 'Monny',
			avatar: 'user' as AvatarKey,
			isActive: false,
		},
		lastMessage: "Let's catch up tomorrow",
		time: 'Yesterday',
		unread: false,
	},
	{
		id: '3',
		user: {
			id: '3',
			name: 'Alex',
			avatar: 'user' as AvatarKey,
			isActive: false,
		},
		lastMessage: "Let's catch up tomorrow",
		time: 'Yesterday',
		unread: false,
	},
	{
		id: '4',
		user: {
			id: '4',
			name: 'Sarah',
			avatar: 'user' as AvatarKey,
			isActive: false,
		},
		lastMessage: "Let's catch up tomorrow",
		time: 'Yesterday',
		unread: false,
	},
]

export const FRIENDS_MESSAGES: Message[] = [
	{
		id: '5',
		user: {
			id: '5',
			name: 'Best Friend',
			avatar: 'user' as AvatarKey,
			isActive: true,
		},
		lastMessage: 'Miss you buddy!',
		time: '10:00 AM',
		unread: true,
	},
	{
		id: '6',
		user: {
			id: '6',
			name: 'College Buddy',
			avatar: 'user' as AvatarKey,
			isActive: true,
		},
		lastMessage: 'Party this weekend?',
		time: '9:15 AM',
		unread: false,
	},
]
