import { LIVE_STREAM } from '@/constants/liveStream'
import { useLiveStreamStore } from '@/store/liveStream.store'
import { router } from 'expo-router'
import React from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import StreamGameIcon from '../ui/icons/live-stream/streamGameIcon'

function GameButton() {
	return <StreamGameIcon />
}

interface BottomControlsProps {
	onCenterPress?: () => void
	onGoToLive?: () => Promise<void>
	isGoingLive?: boolean
}

export function BottomControls({
	onCenterPress,
	onGoToLive,
	isGoingLive = false,
}: BottomControlsProps) {
	const { startStream, isLoading } = useLiveStreamStore()

	const defaultHandleGoToLive = async () => {
		try {
			const liveStream = await startStream()
			router.replace(`/live/${liveStream.id}`)
		} catch (e) {
			const message =
				e instanceof Error ? e.message : 'Failed to start stream. Please try again.'
			Alert.alert('Error', message)
		}
	}

	const handlePress = onGoToLive ?? defaultHandleGoToLive
	const disabled = isLoading || isGoingLive

	return (
		<View style={styles.container}>
			<Pressable style={styles.centerButton} onPress={onCenterPress}>
				<GameButton />
			</Pressable>

			<Pressable
				style={styles.startButton}
				disabled={disabled}
				onPress={handlePress}
			>
				<Text style={styles.startButtonText}>
					{disabled ? 'Connecting...' : 'Go to live'}
				</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	centerButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	startButton: {
		marginTop: LIVE_STREAM.spacing.bottomButtonMargin,
		width: LIVE_STREAM.sizes.bottomButton.width,
		height: LIVE_STREAM.sizes.bottomButton.height,
		backgroundColor: LIVE_STREAM.colors.primary,
		borderRadius: LIVE_STREAM.sizes.borderRadius,
		justifyContent: 'center',
		alignItems: 'center',
	},
	startButtonText: {
		color: LIVE_STREAM.colors.white,
		fontSize: 18,
		fontWeight: '600',
	},
})
