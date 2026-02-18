import {
	CameraView,
	TopInfoOverlay,
} from '@/components/live-stream'
import { leaveChannel } from '@/services/agora/agora.service'
import { useLiveStreamStore } from '@/store/liveStream.store'
import { TopRightControls } from '@/types/game-ranking-types'
import { router } from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function BroadcastScreen() {
	const liveStream = useLiveStreamStore(s => s.liveStream)
	const clearStream = useLiveStreamStore(s => s.clearStream)

	const handleClose = useCallback(async () => {
		await leaveChannel()
		clearStream()
		router.back()
	}, [clearStream])

	useEffect(() => {
		return () => {
			leaveChannel()
			clearStream()
		}
	}, [clearStream])

	if (!liveStream) {
		return null
	}

	return (
		<View style={styles.container}>
			<CameraView>
				<SafeAreaView style={styles.safeAreaTop} edges={['top']}>
					<View style={styles.topBar}>
						<TopInfoOverlay
							username={liveStream.title}
							image={liveStream.room_image}
						/>
						<TopRightControls
							roomId={String(liveStream.display_id)}
							onClose={handleClose}
						/>
					</View>
				</SafeAreaView>
			</CameraView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	safeAreaTop: {
		flex: 0,
	},
	topBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingHorizontal: 12,
		paddingTop: 8,
	},
})
