import React, { useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import {
	AttachmentIcon,
	EmojiIcon,
	SendIcon,
} from '../ui/icons/chat'

export function WriteMessageComponent() {
	const [text, setText] = useState('')

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder='Type a message...'
					placeholderTextColor='#667085'
					value={text}
					onChangeText={setText}
					multiline
				/>
			</View>
			<View style={styles.iconsRow}>
				<Pressable style={styles.iconButton}>
					<EmojiIcon />
				</Pressable>
				<Pressable style={styles.iconButton}>
					<AttachmentIcon />
				</Pressable>
				<Pressable style={styles.iconButton}>
					<SendIcon />
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderTopWidth: 1,
		borderTopColor: '#E5E5E5',
		backgroundColor: '#FFF',
	},
	inputContainer: {
		flex: 1,
		backgroundColor: '#F6F6F7',
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginRight: 12,
	},
	input: {
		fontSize: 16,
		color: '#667085',
		maxHeight: 100,
	},
	iconsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	iconButton: {
		padding: 4,
	},
})
