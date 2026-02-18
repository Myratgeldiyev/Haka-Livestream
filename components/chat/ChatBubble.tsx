import { ChatMessage, images } from '@/types/message'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Props {
	message: ChatMessage
}

export function ChatBubble({ message }: Props) {
	if (message.isMe) {
		return (
			<View style={styles.myMessageContainer}>
				<View style={styles.timeContainer}>
					<Text style={styles.time}>{message.time}</Text>
				</View>
				<View style={styles.myBubble}>
					<Text style={styles.myText}>{message.text}</Text>
				</View>
				{message.isRead && (
					<View style={styles.timeContainer}>
						<Text style={styles.readStatus}>Read</Text>
					</View>
				)}
			</View>
		)
	}

	return (
		<View style={styles.otherMessageContainer}>
			<View style={styles.otherWrapper}>
				<View style={styles.topRow}>
					{message.senderAvatar && (
						<Image
							source={images[message.senderAvatar]}
							style={styles.avatar}
						/>
					)}
					<Text style={styles.time}>{message.time}</Text>
				</View>
				<View style={styles.otherBubble}>
					<Text style={styles.otherText}>{message.text}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	myMessageContainer: {
		alignItems: 'flex-end',
		marginBottom: 12,
		paddingHorizontal: 16,
	},
	myBubble: {
		backgroundColor: '#0CA201',
		borderRadius: 10,
		paddingHorizontal: 14,
		paddingVertical: 10,
		maxWidth: '75%',
	},
	myText: {
		color: '#FFF',
		fontSize: 16,
	},
	timeContainer: {
		marginTop: 4,
	},
	time: {
		fontSize: 12,
		color: '#667085',
	},
	readStatus: {
		fontSize: 12,
		color: '#667085',
	},
	otherMessageContainer: {
		alignItems: 'flex-start',
		marginBottom: 12,
		paddingHorizontal: 16,
	},
	otherWrapper: {
		maxWidth: '75%',
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
	},
	avatar: {
		width: 24,
		height: 24,
		borderRadius: 12,
		marginRight: 8,
	},
	otherBubble: {
		backgroundColor: '#F6F6F7',
		borderRadius: 10,
		paddingHorizontal: 14,
		marginLeft: 18,
		paddingVertical: 10,
	},
	otherText: {
		color: '#667085',
		fontSize: 16,
	},
})
