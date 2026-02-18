import { Message } from '@/types/message'
import React from 'react'
import { FlatList } from 'react-native'
import { MessageItem } from './MessageItem'

interface Props {
	messages: Message[]
}

export function MessageList({ messages }: Props) {
	return (
		<FlatList
			data={messages}
			keyExtractor={item => item.id}
			renderItem={({ item }) => <MessageItem message={item} />}
			showsVerticalScrollIndicator={false}
		/>
	)
}
