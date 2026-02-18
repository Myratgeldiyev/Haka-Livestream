import { ChatBubble } from '@/components/chat/ChatBubble'
import { ChatDetailHeader } from '@/components/chat/ChatDetailHeader'
import { WriteMessageComponent } from '@/components/chat/WriteMessageComponent'
import { AvatarKey, ChatMessage, MessageUser } from '@/types/message'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from 'react-native'

const MOCK_USER: MessageUser = {
	id: '1',
	name: 'John Monny',
	avatar: 'user' as AvatarKey,
	isActive: true,
}

const MOCK_MESSAGES: ChatMessage[] = [
	{
		id: '1',
		text: 'Hey! How are you doing?',
		time: '12:05',
		isMe: false,
		senderAvatar: 'user' as AvatarKey,
	},
	{
		id: '2',
		text: "I'm doing great! Just finished working on the project.",
		time: '12:08',
		isMe: true,
		isRead: true,
	},
	{
		id: '3',
		text: 'That sounds awesome! Want to grab coffee later?',
		time: '12:10',
		isMe: false,
		senderAvatar: 'user' as AvatarKey,
	},
	{
		id: '4',
		text: 'Sure! What time works for you?',
		time: '12:10',
		isMe: true,
		isRead: true,
	},
	{
		id: '5',
		text: 'How about 3pm at the usual place?',
		time: '12:12',
		isMe: false,
		senderAvatar: 'user' as AvatarKey,
	},
	{
		id: '6',
		text: 'Perfect! See you then!',
		time: '12:13',
		isMe: true,
		isRead: false,
	},
]

export default function ChatDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>()

	return (
		<SafeAreaView style={styles.container}>
			<ChatDetailHeader user={MOCK_USER} />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.content}
				keyboardVerticalOffset={0}
			>
				<FlatList
					data={MOCK_MESSAGES}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <ChatBubble message={item} />}
					contentContainerStyle={styles.messageList}
					showsVerticalScrollIndicator={false}
				/>
				<WriteMessageComponent />
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	content: {
		flex: 1,
	},
	messageList: {
		paddingVertical: 16,
	},
})
