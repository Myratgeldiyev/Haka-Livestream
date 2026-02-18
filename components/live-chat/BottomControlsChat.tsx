import { useLiveChatStore } from '@/store/liveChat.store'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export function BottomControlsChat() {
	const { createAndJoinRoom, isConnecting } = useLiveChatStore()

	const handleGoToChat = async () => {
		try {
			const roomId = await createAndJoinRoom()
			console.log('[BottomControlsChat] Navigating with roomId:', roomId)
			router.push({
				pathname: '/chat/[roomId]',
				params: { roomId },
			})
		} catch (e) {
			console.warn('Navigation blocked due to error:', e instanceof Error ? e.message : e)
		}
	}

	return (
		<View style={styles.container}>
			<Pressable
				style={styles.startButton}
				disabled={isConnecting}
				onPress={handleGoToChat}
			>
				<Text style={styles.startButtonText}>
					{isConnecting ? 'Connecting...' : 'Go to chat'}
				</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { alignItems: 'center' },
	startButton: {
		width: 200,
		height: 50,
		backgroundColor: '#3822D9',
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	startButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
})
