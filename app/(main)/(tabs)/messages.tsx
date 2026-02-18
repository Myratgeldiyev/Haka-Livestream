import {
	MessageHeader,
	MessageTabType,
} from '@/components/message/MessageHeader'
import { MessageList } from '@/components/message/MessageLittle'
import { MessageTabs } from '@/components/message/MessageTab'
import { StoriesRow } from '@/components/message/StoriesRow'
import {
	FRIENDS_MESSAGES,
	INBOX_MESSAGES,
	MESSAGE_USERS,
} from '@/components/message/mock-data'
import { spacing } from '@/constants/spacing'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MessageScreen() {
	const [activeTab, setActiveTab] = useState<MessageTabType>('inbox')

	const messages = activeTab === 'inbox' ? INBOX_MESSAGES : FRIENDS_MESSAGES

	return (
		<SafeAreaView style={styles.container}>
			<MessageHeader activeTab={activeTab} onTabChange={setActiveTab} />
			<StoriesRow users={MESSAGE_USERS} />
			<MessageTabs />
			<MessageList messages={messages} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		paddingTop: spacing.lg,
	},
})
