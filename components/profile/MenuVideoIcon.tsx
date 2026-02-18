import { ResizeMode, Video } from 'expo-av'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { spacing } from '@/constants/spacing'

const SIZE = spacing.icon.medium

interface MenuVideoIconProps {
	source: number
}

export function MenuVideoIcon({ source }: MenuVideoIconProps) {
	const videoRef = useRef<Video>(null)

	useEffect(() => {
		videoRef.current?.playAsync().catch(() => {})
	}, [])

	return (
		<View style={styles.wrap}>
			<Video
				ref={videoRef}
				source={source}
				style={styles.video}
				resizeMode={ResizeMode.COVER}
				shouldPlay
				isLooping
				isMuted
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		width: SIZE,
		height: SIZE,
		borderRadius: SIZE / 2,
		overflow: 'hidden',
	},
	video: {
		width: '100%',
		height: '100%',
	},
})
