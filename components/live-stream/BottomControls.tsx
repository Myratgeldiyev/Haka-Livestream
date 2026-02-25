import { LIVE_STREAM } from '@/constants/liveStream'
import { useLiveStreamStore } from '@/store/liveStream.store'
import { router } from 'expo-router'
import React from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import StreamGameIcon from '../ui/icons/live-stream/streamGameIcon'
import EffectIcon from '../ui/icons/live-tabs/EffectIcon'
import LiveConsoleIcon from '../ui/icons/live-tabs/LiveConsoleIcon'
import SeatLiveIcon from '../ui/icons/live-tabs/SeatLiveIcon'

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
				e instanceof Error
					? e.message
					: 'Failed to start stream. Please try again.'
			Alert.alert('Error', message)
		}
	}

	const handlePress = onGoToLive ?? defaultHandleGoToLive
	const disabled = isLoading || isGoingLive

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
				<Pressable style={styles.centerButton}>
					<EffectIcon />
				</Pressable>
				<Pressable style={styles.centerButton}>
					<SeatLiveIcon />
				</Pressable>
				<Pressable style={styles.centerButton} onPress={onCenterPress}>
					<LiveConsoleIcon />
				</Pressable>
			</View>

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
		marginTop: 12,
		width: LIVE_STREAM.sizes.bottomButton.width,
		height: LIVE_STREAM.sizes.bottomButton.height,
		backgroundColor: LIVE_STREAM.colors.primary,
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	startButtonText: {
		color: LIVE_STREAM.colors.white,
		fontSize: 18,
		fontWeight: '600',
	},
})
