import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ChatRoomIcon from '../ui/icons/room-type/chatRoomIcon'
import LiveRoomIcon from '../ui/icons/room-type/liveRoomIcon'

type RoomType = 'live' | 'chat'

interface RoomTypeSelectorProps {
	selectedType: RoomType
	onTypeSelect?: (type: RoomType) => void
}

export function RoomTypeSelector({
	selectedType,
	onTypeSelect,
}: RoomTypeSelectorProps) {
	return (
		<View style={styles.container}>
			<Pressable
				style={[styles.button, selectedType === 'live' && styles.buttonActive]}
				onPress={() => onTypeSelect?.('live')}
			>
				<LiveRoomIcon />
				<Text
					style={[styles.text, selectedType === 'live' && styles.textActive]}
				>
					Live Room
				</Text>
			</Pressable>

			<Pressable
				style={[styles.button, selectedType === 'chat' && styles.buttonActive]}
				onPress={() => onTypeSelect?.('chat')}
			>
				<ChatRoomIcon />
				<Text
					style={[styles.text, selectedType === 'chat' && styles.textActive]}
				>
					Chat Room
				</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 12,
	},
	button: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		paddingVertical: 14,
		borderRadius: 12,
		backgroundColor: '#3D3A50',
	},
	buttonActive: {
		backgroundColor: '#7C4DFF',
	},
	text: {
		fontSize: 16,
		fontWeight: '500',
		color: '#ffffff',
	},
	textActive: {
		color: '#FFFFFF',
	},
})
