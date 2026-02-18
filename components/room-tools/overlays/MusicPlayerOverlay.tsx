import PlaylistIcon from '@/components/ui/icons/chat/PlayListIcon'
import MusicRoomPlay from '@/components/ui/icons/room-play/MusicRoomPlay'
import { useLiveChatStore } from '@/store/liveChat.store'
import { useLiveStreamStore } from '@/store/liveStream.store'
import Slider from '@react-native-community/slider'
import { Audio } from 'expo-av'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Animated,
	Dimensions,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Circle, Line, Path } from 'react-native-svg'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

/** UUID v4 pattern; stream IDs are UUIDs, voice room IDs are not. Fallback to stream API when id looks like a stream id. */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const PLAYER_COLORS = {
	background: '#3D3556',
	textPrimary: '#FFFFFF',
	sliderTrack: '#5A5472',
	sliderActive: '#7C3AED',
	iconColor: '#FFFFFF',
	overlayBg: 'rgba(0, 0, 0, 0.6)',
}

const PLAYER_SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
}

const MINI_SQUARE_SIZE = 64

interface MusicPlayerOverlayProps {
	visible: boolean
	trackName: string
	trackUri: string
	onClose: () => void
	mode?: 'inline' | 'fullscreen'
	roomId?: string
	/** When true, use video stream API (playMusic/stopMusic) instead of voice room API. */
	isStreamMode?: boolean
	isCollapsed?: boolean
	onCollapse?: () => void
	onExpand?: () => void
	onOpenPlaylist?: () => void
}

function CollapseIcon() {
	return (
		<Svg width={28} height={28} viewBox='0 0 24 24' fill='none'>
			<Path
				d='M4 14L10 14L10 20'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M20 10L14 10L14 4'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M14 10L21 3'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M3 21L10 14'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

function PowerIcon() {
	return (
		<Svg width={28} height={28} viewBox='0 0 24 24' fill='none'>
			<Path
				d='M12 2L12 12'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
			/>
			<Path
				d='M17.66 6.34C19.14 7.82 20 9.83 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 9.83 4.86 7.82 6.34 6.34'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
			/>
		</Svg>
	)
}

function VolumeIcon() {
	return (
		<Svg width={24} height={24} viewBox='0 0 24 24' fill='none'>
			<Path
				d='M11 5L6 9H2V15H6L11 19V5Z'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M15.54 8.46C16.48 9.4 17 10.67 17 12C17 13.33 16.48 14.6 15.54 15.54'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
			/>
		</Svg>
	)
}

function PlayIcon() {
	return (
		<Svg width={32} height={32} viewBox='0 0 24 24' fill='none'>
			<Circle
				cx={12}
				cy={12}
				r={10}
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
			/>
			<Path
				d='M10 8L16 12L10 16V8Z'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

function PauseIcon() {
	return (
		<Svg width={32} height={32} viewBox='0 0 24 24' fill='none'>
			<Circle
				cx={12}
				cy={12}
				r={10}
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
			/>
			<Line
				x1={10}
				y1={8}
				x2={10}
				y2={16}
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
			/>
			<Line
				x1={14}
				y1={8}
				x2={14}
				y2={16}
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
			/>
		</Svg>
	)
}

function NextIcon() {
	return (
		<Svg width={28} height={28} viewBox='0 0 24 24' fill='none'>
			<Path
				d='M5 4L15 12L5 20V4Z'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Line
				x1={19}
				y1={5}
				x2={19}
				y2={19}
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
			/>
		</Svg>
	)
}

function RepeatIcon() {
	return (
		<Svg width={28} height={28} viewBox='0 0 24 24' fill='none'>
			<Path
				d='M17 1L21 5L17 9'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M7 23L3 19L7 15'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3'
				stroke={PLAYER_COLORS.iconColor}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export function MusicPlayerOverlay({
	visible,
	trackName,
	trackUri,
	onClose,
	mode = 'fullscreen',
	roomId,
	isStreamMode = false,
	isCollapsed = false,
	onCollapse,
	onExpand,
	onOpenPlaylist,
}: MusicPlayerOverlayProps) {
	const [volume, setVolume] = useState(0.5)
	const [isPlaying, setIsPlaying] = useState(false)
	const soundRef = useRef<Audio.Sound | null>(null)
	const volumeRef = useRef(0.5)
	const opIdRef = useRef(0)
	const lastPressRef = useRef(0)
	const fadeAnim = useRef(new Animated.Value(0)).current
	const insets = useSafeAreaInsets()

	const playRoomMusic = useLiveChatStore(s => s.playRoomMusic)
	const stopRoomMusic = useLiveChatStore(s => s.stopRoomMusic)
	const streamPlayMusic = useLiveStreamStore(s => s.playMusic)
	const streamStopMusic = useLiveStreamStore(s => s.stopMusic)

	const playMusicApi = useCallback(
		(id: string) => {
			const useStreamApi = isStreamMode || (id != null && UUID_REGEX.test(id))
			if (useStreamApi) streamPlayMusic(id).catch(() => {})
			else playRoomMusic(id).catch(() => {})
		},
		[isStreamMode, streamPlayMusic, playRoomMusic]
	)
	const stopMusicApi = useCallback(
		(id: string) => {
			const useStreamApi = isStreamMode || (id != null && UUID_REGEX.test(id))
			if (useStreamApi) streamStopMusic(id).catch(() => {})
			else stopRoomMusic(id).catch(() => {})
		},
		[isStreamMode, streamStopMusic, stopRoomMusic]
	)

	const PRESS_DEBOUNCE_MS = 420
	const withDebounce = useCallback(
		(fn: () => void) => () => {
			const now = Date.now()
			if (now - lastPressRef.current < PRESS_DEBOUNCE_MS) return
			lastPressRef.current = now
			fn()
		},
		[]
	)
	const isInline = mode === 'inline'

	const unloadAudio = useCallback(async (sound?: Audio.Sound | null) => {
		const targetSound = sound ?? soundRef.current
		if (!targetSound) return

		if (!sound) {
			soundRef.current = null
		}
		setIsPlaying(false)

		try {
			const status = await targetSound.getStatusAsync()
			if (status.isLoaded) {
				await targetSound.stopAsync()
				await targetSound.unloadAsync()
			}
		} catch {}
	}, [])

	const loadAndPlayAudio = useCallback(async () => {
		if (!trackUri) return

		const currentOpId = ++opIdRef.current

		await unloadAudio()

		try {
			await Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
				staysActiveInBackground: false,
			})

			const { sound } = await Audio.Sound.createAsync(
				{ uri: trackUri },
				{ shouldPlay: true, volume: volumeRef.current }
			)

			if (currentOpId !== opIdRef.current) {
				await unloadAudio(sound)
				return
			}

			soundRef.current = sound
			setIsPlaying(true)
		} catch {}
	}, [trackUri, unloadAudio])

	const handlePlayPause = useCallback(async () => {
		const sound = soundRef.current
		if (!sound) {
			if (trackUri) {
				await loadAndPlayAudio()
			}
			return
		}

		try {
			const status = await sound.getStatusAsync()
			if (!status.isLoaded) {
				if (trackUri) {
					await loadAndPlayAudio()
				}
				return
			}

			if (isPlaying) {
				await sound.pauseAsync()
				setIsPlaying(false)
				if (roomId) stopMusicApi(roomId)
			} else {
				await sound.playAsync()
				setIsPlaying(true)
				if (roomId) playMusicApi(roomId)
			}
		} catch {
			setIsPlaying(false)
		}
	}, [
		isPlaying,
		roomId,
		playMusicApi,
		stopMusicApi,
		trackUri,
		loadAndPlayAudio,
	])

	const handleVolumeChange = useCallback(async (value: number) => {
		setVolume(value)
		volumeRef.current = value
		const sound = soundRef.current
		if (!sound) return

		try {
			const status = await sound.getStatusAsync()
			if (status.isLoaded) {
				await sound.setVolumeAsync(value)
			}
		} catch {}
	}, [])

	const handlePowerOff = useCallback(async () => {
		opIdRef.current++
		if (roomId) stopMusicApi(roomId)
		await unloadAudio()
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start(() => {
			onClose()
		})
	}, [unloadAudio, fadeAnim, onClose, roomId, stopMusicApi])

	useEffect(() => {
		if (visible && trackUri) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true,
			}).start()
			loadAndPlayAudio()
		}

		return () => {
			opIdRef.current++
			if (roomId) stopMusicApi(roomId)
			unloadAudio()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible, trackUri])

	useEffect(() => {
		return () => {
			opIdRef.current++
			const sound = soundRef.current
			if (sound) {
				soundRef.current = null
				sound
					.getStatusAsync()
					.then(status => {
						if (status.isLoaded) {
							sound
								.stopAsync()
								.then(() => sound.unloadAsync())
								.catch(() => {})
						}
					})
					.catch(() => {})
			}
		}
	}, [])

	if (!visible) {
		return null
	}

	if (isInline && isCollapsed) {
		return (
			<View style={styles.miniSquare} pointerEvents='none'>
				<View style={styles.miniSquareIcon}>
					<MusicRoomPlay width={28} height={26} />
				</View>
				<Text style={styles.miniSquareText} numberOfLines={1}>
					Music
				</Text>
			</View>
		)
	}

	const containerWidth = isInline
		? SCREEN_WIDTH - PLAYER_SPACING.xxl * 2
		: Math.min(SCREEN_WIDTH - PLAYER_SPACING.xxl * 2, 420)
	const sliderWidth = containerWidth * 0.35

	const playerCard = (
		<View
			style={[
				styles.container,
				isInline && styles.containerInline,
				!isInline && {
					width: containerWidth,
					...styles.containerFullscreen,
					marginBottom: insets.bottom + BOTTOM_BAR_OFFSET,
				},
			]}
		>
			<View style={styles.header}>
				<Pressable
					style={styles.iconButton}
					onPress={withDebounce(
						isInline && onCollapse ? onCollapse : handlePowerOff
					)}
					hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
				>
					<CollapseIcon />
				</Pressable>
				<Pressable
					style={styles.iconButton}
					onPress={withDebounce(handlePowerOff)}
					hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
				>
					<PowerIcon />
				</Pressable>
			</View>

			<View style={styles.trackInfoContainer}>
				<Text style={styles.trackName} numberOfLines={1}>
					{trackName}
				</Text>
			</View>

			<View style={styles.controlsContainer}>
				<View style={styles.volumeContainer}>
					<VolumeIcon />
					<Slider
						style={[styles.volumeSlider, { width: sliderWidth }]}
						minimumValue={0}
						maximumValue={1}
						value={volume}
						onValueChange={handleVolumeChange}
						minimumTrackTintColor={PLAYER_COLORS.sliderActive}
						maximumTrackTintColor={PLAYER_COLORS.sliderTrack}
						thumbTintColor={PLAYER_COLORS.textPrimary}
					/>
				</View>

				<View style={styles.playbackControls}>
					<Pressable
						style={styles.controlButton}
						onPress={withDebounce(handlePlayPause)}
					>
						{isPlaying ? <PauseIcon /> : <PlayIcon />}
					</Pressable>
					<Pressable style={styles.controlButton}>
						<NextIcon />
					</Pressable>
					<Pressable style={styles.controlButton}>
						<RepeatIcon />
					</Pressable>
					<Pressable
						style={styles.controlButton}
						onPress={withDebounce(() => onOpenPlaylist?.())}
						hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
					>
						<PlaylistIcon />
					</Pressable>
				</View>
			</View>
		</View>
	)

	if (isInline) {
		return playerCard
	}

	return (
		<Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
			<Pressable
				style={styles.backdropPressable}
				onPress={withDebounce(handlePowerOff)}
			/>
			{playerCard}
		</Animated.View>
	)
}

const BOTTOM_BAR_OFFSET = 100

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.12)',
		alignItems: 'center',
		justifyContent: 'flex-end',
		zIndex: 9999,
		elevation: 9999,
	},
	backdropPressable: {
		...StyleSheet.absoluteFillObject,
	},
	container: {
		backgroundColor: PLAYER_COLORS.background,
		borderRadius: 16,
		paddingHorizontal: PLAYER_SPACING.xl,
		paddingVertical: PLAYER_SPACING.lg,
	},
	containerInline: {
		width: '100%',
	},
	containerFullscreen: {
		alignSelf: 'center',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: PLAYER_SPACING.xxl,
	},
	iconButton: {
		padding: PLAYER_SPACING.xs,
	},
	trackInfoContainer: {
		marginBottom: PLAYER_SPACING.xl,
	},
	trackName: {
		fontSize: 18,
		fontWeight: '600',
		fontStyle: 'italic',
		color: PLAYER_COLORS.textPrimary,
	},
	controlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	volumeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	volumeSlider: {
		height: 40,
		marginLeft: PLAYER_SPACING.sm,
	},
	playbackControls: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: PLAYER_SPACING.md,
	},
	controlButton: {
		padding: PLAYER_SPACING.xs,
	},
	miniSquare: {
		width: MINI_SQUARE_SIZE,
		backgroundColor: PLAYER_COLORS.background,
		borderRadius: 12,
		paddingVertical: PLAYER_SPACING.sm,
		paddingHorizontal: PLAYER_SPACING.sm,
		alignItems: 'center',
		justifyContent: 'center',
	},
	miniSquareIcon: {
		marginBottom: PLAYER_SPACING.xs,
		alignItems: 'center',
		justifyContent: 'center',
	},
	miniSquareText: {
		fontSize: 11,
		fontWeight: '600',
		color: PLAYER_COLORS.textPrimary,
	},
})
