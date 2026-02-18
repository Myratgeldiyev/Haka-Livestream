import { images, MessageUser } from '@/types/message'
import { router } from 'expo-router'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { BackArrowIcon } from '../ui/icons/chat'

interface Props {
	user: MessageUser
}

export function ChatDetailHeader({ user }: Props) {
	return (
		<View style={styles.container}>
			<Pressable onPress={() => router.back()} style={styles.backButton}>
				<BackArrowIcon />
			</Pressable>

			<View style={styles.centerContent}>
				<Image source={images[user.avatar]} style={styles.avatar} />
				<View style={styles.textContainer}>
					<Text style={styles.username}>{user.name}</Text>
					<View style={styles.statusRow}>
						<View style={styles.onlineDot} />
						<Text style={styles.statusText}>Online</Text>
					</View>
				</View>
			</View>

			<View style={styles.placeholder} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E5E5',
		backgroundColor: '#FFF',
	},
	backButton: {
		padding: 4,
		width: 32,
	},
	centerContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 12,
	},
	textContainer: {
		justifyContent: 'center',
	},
	username: {
		fontSize: 16,
		fontWeight: '500',
		color: '#000',
	},
	statusRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 2,
	},
	onlineDot: {
		width: 6,
		height: 6,
		borderRadius: 5,
		backgroundColor: '#0CA201',
		marginRight: 6,
	},
	statusText: {
		fontSize: 12,
		color: '#667085',
	},
	placeholder: {
		width: 32,
	},
})
