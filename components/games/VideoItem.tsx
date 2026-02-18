import { scaleWidth } from '@/constants/platform'
import { VideoItemType } from '@/types/video'
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Animated,
	GestureResponderEvent,
	PanResponder,
	PanResponderGestureState,
	Pressable,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { VideoRightActions } from './VideoRightAction'
import { VideoUserInfo } from './VideoUserInfo'

const PROGRESS_BAR_HEIGHT = 3
const PROGRESS_BAR_EXPANDED_HEIGHT = 6
const PROGRESS_BAR_PADDING = 0
const PLAY_ICON_SIZE = scaleWidth(80)

type Props = {
	item: VideoItemType
	isActive: boolean
}

export function VideoItem({ item, isActive }: Props) {
	const videoRef = useRef<Video>(null)
	const { width: screenWidth, height: screenHeight } = useWindowDimensions()

	const [isPaused, setIsPaused] = useState(false)
	const [progress, setProgress] = useState(0)
	const [duration, setDuration] = useState(0)
	const [isSeeking, setIsSeeking] = useState(false)
	const [seekProgress, setSeekProgress] = useState(0)
	const [wasPlayingBeforeSeek, setWasPlayingBeforeSeek] = useState(false)

	const playIconOpacity = useRef(new Animated.Value(0)).current
	const progressBarHeight = useRef(new Animated.Value(PROGRESS_BAR_HEIGHT)).current

	const shouldPlay = isActive && !isPaused && !isSeeking

	useEffect(() => {
		if (!isActive) {
			setIsPaused(false)
			setProgress(0)
		}
	}, [isActive])

	useEffect(() => {
		Animated.timing(playIconOpacity, {
			toValue: isPaused ? 1 : 0,
			duration: 150,
			useNativeDriver: true,
		}).start()
	}, [isPaused, playIconOpacity])

	const handlePlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
		if (!status.isLoaded) return

		if (status.durationMillis && status.durationMillis > 0) {
			setDuration(status.durationMillis)
		}

		if (!isSeeking && status.positionMillis !== undefined && status.durationMillis) {
			setProgress(status.positionMillis / status.durationMillis)
		}
	}, [isSeeking])

	const handleTap = useCallback(() => {
		setIsPaused(prev => !prev)
	}, [])

	const seekToPosition = useCallback(async (positionRatio: number) => {
		if (videoRef.current && duration > 0) {
			const positionMillis = Math.floor(positionRatio * duration)
			await videoRef.current.setPositionAsync(positionMillis)
		}
	}, [duration])

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,

			onPanResponderGrant: (evt: GestureResponderEvent) => {
				setWasPlayingBeforeSeek(!isPaused)
				setIsSeeking(true)

				const touchX = evt.nativeEvent.locationX
				const newProgress = Math.max(0, Math.min(1, touchX / screenWidth))
				setSeekProgress(newProgress)

				Animated.timing(progressBarHeight, {
					toValue: PROGRESS_BAR_EXPANDED_HEIGHT,
					duration: 100,
					useNativeDriver: false,
				}).start()
			},

			onPanResponderMove: (evt: GestureResponderEvent, _gestureState: PanResponderGestureState) => {
				const touchX = evt.nativeEvent.pageX
				const newProgress = Math.max(0, Math.min(1, touchX / screenWidth))
				setSeekProgress(newProgress)
			},

			onPanResponderRelease: async () => {
				await seekToPosition(seekProgress)
				setProgress(seekProgress)
				setIsSeeking(false)

				if (wasPlayingBeforeSeek) {
					setIsPaused(false)
				}

				Animated.timing(progressBarHeight, {
					toValue: PROGRESS_BAR_HEIGHT,
					duration: 100,
					useNativeDriver: false,
				}).start()
			},

			onPanResponderTerminate: () => {
				setIsSeeking(false)
				Animated.timing(progressBarHeight, {
					toValue: PROGRESS_BAR_HEIGHT,
					duration: 100,
					useNativeDriver: false,
				}).start()
			},
		})
	).current

	const displayProgress = isSeeking ? seekProgress : progress

	return (
		<View style={[styles.container, { width: screenWidth, height: screenHeight }]}>
			<Video
				ref={videoRef}
				source={item.video}
				style={styles.video}
				resizeMode={ResizeMode.COVER}
				isLooping
				shouldPlay={shouldPlay}
				isMuted={false}
				onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
				progressUpdateIntervalMillis={100}
			/>

			<Pressable style={styles.touchOverlay} onPress={handleTap}>
				<Animated.View style={[styles.playIconContainer, { opacity: playIconOpacity }]}>
					<View style={styles.playIconBackground}>
						<Ionicons name="play" size={48} color="#fff" style={styles.playIcon} />
					</View>
				</Animated.View>
			</Pressable>

			<VideoRightActions />
			<VideoUserInfo username={item.username} tag={item.tag} />

			<View style={styles.progressBarContainer} {...panResponder.panHandlers}>
				<View style={styles.progressBarBackground}>
					<Animated.View
						style={[
							styles.progressBarFill,
							{
								width: `${displayProgress * 100}%`,
								height: progressBarHeight,
							},
						]}
					/>
					<Animated.View
						style={[
							styles.progressBarTrack,
							{ height: progressBarHeight },
						]}
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
	},
	video: {
		...StyleSheet.absoluteFillObject,
	},
	touchOverlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	},
	playIconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	playIconBackground: {
		width: PLAY_ICON_SIZE,
		height: PLAY_ICON_SIZE,
		borderRadius: PLAY_ICON_SIZE / 2,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	playIcon: {
		marginLeft: scaleWidth(6),
	},
	progressBarContainer: {
		position: 'absolute',
		bottom: PROGRESS_BAR_PADDING,
		left: 0,
		right: 0,
		height: 20,
		justifyContent: 'flex-end',
	},
	progressBarBackground: {
		width: '100%',
		height: PROGRESS_BAR_HEIGHT,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		overflow: 'hidden',
	},
	progressBarFill: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		backgroundColor: '#fff',
	},
	progressBarTrack: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'transparent',
	},
})
