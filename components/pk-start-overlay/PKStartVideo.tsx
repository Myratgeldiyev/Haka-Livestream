import type { AVPlaybackStatus } from 'expo-av'
import { ResizeMode, Video } from 'expo-av'
import React, { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'

const PK_VIDEO_SOURCE = require('@/assets/videos/pk-video.mp4')

interface PKStartVideoProps {
	width: number
	height: number
	onEnd: () => void
}

export function PKStartVideo({ width, height, onEnd }: PKStartVideoProps) {
	const onEndRef = useRef(onEnd)
	onEndRef.current = onEnd

	const handlePlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
		if (!status.isLoaded) return
		if (status.didJustFinish) {
			onEndRef.current()
		}
	}, [])

	return (
		<View style={[styles.container, { width, height }]} pointerEvents='none'>
			<Video
				source={PK_VIDEO_SOURCE}
				style={StyleSheet.absoluteFill}
				resizeMode={ResizeMode.COVER}
				shouldPlay
				isLooping={false}
				isMuted={false}
				onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
				progressUpdateIntervalMillis={100}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		overflow: 'hidden',
		backgroundColor: 'transparent',
	},
})
