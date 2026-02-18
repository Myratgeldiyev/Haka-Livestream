import { RtcSurfaceView } from 'react-native-agora'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { getAgoraEngine } from '@/services/agora/agora.service'

interface RemoteVideoViewProps {
	/** Owner's UID for remote video */
	ownerUid: number
	/** Whether remote video is available */
	videoAvailable?: boolean
	/** Room image URL for fallback background */
	roomImage?: string | null
	/** Children to render on top of video */
	children?: React.ReactNode
}

export function RemoteVideoView({
	ownerUid,
	videoAvailable = false,
	roomImage,
	children,
}: RemoteVideoViewProps) {
	const setupDoneRef = useRef(false)

	useEffect(() => {
		const setupRemoteVideo = async () => {
			if (setupDoneRef.current) return

			try {
				const appId = process.env.EXPO_PUBLIC_AGORA_APP_ID!
				const engine = await getAgoraEngine(appId)

				// Setup remote video canvas
				engine.setupRemoteVideo({
					uid: ownerUid,
					renderMode: 1, // RENDER_MODE_HIDDEN
				})

				setupDoneRef.current = true
			} catch (error) {
				console.error('[RemoteVideoView] Failed to setup remote video:', error)
			}
		}

		if (ownerUid && ownerUid > 0 && videoAvailable) {
			setupRemoteVideo()
		}

		return () => {
			setupDoneRef.current = false
		}
	}, [ownerUid, videoAvailable])

	// When video is unavailable, show ImageBackground fallback
	if (!videoAvailable) {
		return (
			<ImageBackground
				source={roomImage ? { uri: roomImage } : require('@/assets/images/games/chat-room-bg.png')}
				style={styles.container}
				resizeMode="cover"
			>
				{children}
			</ImageBackground>
		)
	}

	return (
		<View style={styles.container}>
			<RtcSurfaceView
				style={styles.video}
				canvas={{
					uid: ownerUid,
					renderMode: 1, // RENDER_MODE_HIDDEN
				}}
			/>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		backgroundColor: '#000',
	},
	video: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
})
