import type { MusicOverlayProps } from '@/types/room-tools/room-tool.types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Alert,
	Animated,
	Dimensions,
	FlatList,
	Modal,
	Platform,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg'
import { MusicPlayerOverlay } from './MusicPlayerOverlay'

interface SelectedTrack {
	name: string
	uri: string
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const MUSIC_COLORS = {
	background: '#2A2444',
	textPrimary: '#FFFFFF',
	textSecondary: 'rgba(255, 255, 255, 0.7)',
	textMuted: 'rgba(255, 255, 255, 0.5)',
	buttonPrimary: '#7C3AED',
	addButtonText: '#4ADE80',
	overlay: 'rgba(0, 0, 0, 0.5)',
	separator: 'rgba(255, 255, 255, 0.1)',
}

const MUSIC_SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
	xxxl: 32,
}

const MUSIC_FONT_SIZES = {
	xs: 11,
	sm: 12,
	md: 14,
	lg: 16,
	xl: 18,
}

interface MusicTrack {
	id: string
	name: string
	artist: string
	duration: string
	uri?: string
}

const MOCK_TRACKS: MusicTrack[] = [
	{
		id: '1',
		name: 'Aaj_Kii_Raat_Maja_Husn',
		artist: 'unknown',
		duration: '4:06',
		uri: 'mock://track/1',
	},
	{
		id: '2',
		name: 'Aaj_Kii_Raat_Maja_Husn',
		artist: 'unknown',
		duration: '4:06',
		uri: 'mock://track/2',
	},
]

const VINYL_SIZE = Math.min(Math.max(SCREEN_WIDTH * 0.42, 140), 200)

function BackArrowIcon() {
	return (
		<Svg width={24} height={24} viewBox='0 0 24 24' fill='none'>
			<Path
				d='M15 18L9 12L15 6'
				stroke={MUSIC_COLORS.textPrimary}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

function VinylRecordIllustration({ size }: { size: number }) {
	const centerX = size / 2
	const centerY = size / 2
	const outerRadius = size / 2 - 2
	const innerRadius = size * 0.15
	const grooveRadius1 = size * 0.35
	const grooveRadius2 = size * 0.28
	const grooveRadius3 = size * 0.42

	return (
		<View style={{ width: size, height: size }}>
			<Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				<Circle cx={centerX} cy={centerY} r={outerRadius} fill='#1A1A2E' />
				<Circle
					cx={centerX}
					cy={centerY}
					r={grooveRadius3}
					fill='none'
					stroke='rgba(255,255,255,0.05)'
					strokeWidth={1}
				/>
				<Circle
					cx={centerX}
					cy={centerY}
					r={grooveRadius1}
					fill='none'
					stroke='rgba(255,255,255,0.08)'
					strokeWidth={1}
				/>
				<Circle
					cx={centerX}
					cy={centerY}
					r={grooveRadius2}
					fill='none'
					stroke='rgba(255,255,255,0.05)'
					strokeWidth={1}
				/>
				<Circle
					cx={centerX}
					cy={centerY}
					r={innerRadius * 0.35}
					fill='#2A2444'
				/>
			</Svg>
		</View>
	)
}

const vinylStyles = StyleSheet.create({})

export function MusicOverlay({
	visible,
	onClose,
	onSelect,
	onSelectTrack,
	roomId,
	isStreamMode = false,
}: MusicOverlayProps) {
	const [modalVisible, setModalVisible] = useState(false)
	const [showAddMusic, setShowAddMusic] = useState(false)
	const [showPlayer, setShowPlayer] = useState(false)
	const [selectedTrack, setSelectedTrack] = useState<SelectedTrack | null>(null)
	const isClosingRef = useRef(false)
	const fadeAnim = useRef(new Animated.Value(0)).current
	const insets = useSafeAreaInsets()

	const handleClose = useCallback(() => {
		if (isClosingRef.current) return
		isClosingRef.current = true
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start(() => {
			setModalVisible(false)
			setShowAddMusic(false)
			setShowPlayer(false)
			setSelectedTrack(null)
			isClosingRef.current = false
			onClose()
		})
	}, [fadeAnim, onClose])

	const handleAddMusic = useCallback(async () => {
		if (Platform.OS === 'web') {
			Alert.alert('Not Supported', 'File picker is not supported on web.')
			return
		}

		try {
			const DocumentPicker = await import('expo-document-picker')

			if (
				!DocumentPicker ||
				typeof DocumentPicker.getDocumentAsync !== 'function'
			) {
				Alert.alert(
					'Feature Unavailable',
					'Document picker is not available. Please rebuild the app with a development build.'
				)
				return
			}

			const result = await DocumentPicker.getDocumentAsync({
				type: ['audio/*'],
				copyToCacheDirectory: true,
			})

			if (!result.canceled && result.assets && result.assets.length > 0) {
				const asset = result.assets[0]
				const trackName = asset.name.replace(/\.[^/.]+$/, '')
				const track = { name: trackName, uri: asset.uri }
				if (onSelectTrack) {
					onSelectTrack(track)
					onClose()
				} else {
					setSelectedTrack(track)
					setShowPlayer(true)
				}
			}
		} catch (error) {
			console.log('Document picker error:', error)
			Alert.alert(
				'Error',
				'Could not open file picker. This feature requires a development build.'
			)
		}
	}, [onSelectTrack, onClose])

	const handleAddButton = useCallback(() => {
		setShowAddMusic(true)
	}, [])

	const handleBackFromAddMusic = useCallback(() => {
		setShowAddMusic(false)
	}, [])

	const handleClosePlayer = useCallback(() => {
		setShowPlayer(false)
		setSelectedTrack(null)
	}, [])

	const handleAddTrack = useCallback(
		(track: MusicTrack) => {
			if (onSelectTrack) {
				const uri = track.uri ?? `mock://track/${track.id}`
				onSelectTrack({ name: track.name, uri })
				handleClose()
			} else {
				onSelect?.(track.id)
			}
		},
		[onSelect, onSelectTrack, handleClose]
	)

	useEffect(() => {
		if (visible && !modalVisible && !isClosingRef.current) {
			setModalVisible(true)
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 250,
				useNativeDriver: true,
			}).start()
		} else if (!visible && modalVisible && !isClosingRef.current) {
			handleClose()
		}
	}, [visible, modalVisible, fadeAnim, handleClose])

	const buttonWidth = Math.min(SCREEN_WIDTH - MUSIC_SPACING.xxl * 2, 400)
	const buttonHeight = Math.max(50, SCREEN_HEIGHT * 0.06)

	const renderTrackItem = useCallback(
		({ item, index }: { item: MusicTrack; index: number }) => (
			<View
				style={[
					styles.trackItem,
					index < MOCK_TRACKS.length - 1 && styles.trackItemBorder,
				]}
			>
				<View style={styles.trackInfo}>
					<Text style={styles.trackName} numberOfLines={1}>
						{item.name}
					</Text>
					<Text style={styles.trackMeta}>
						{'< '}
						{item.artist}
						{' >'} | {item.duration}
					</Text>
				</View>
				<Pressable
					style={styles.trackAddButton}
					onPress={() => handleAddTrack(item)}
				>
					<Text style={styles.trackAddButtonText}>Add</Text>
				</Pressable>
			</View>
		),
		[handleAddTrack]
	)

	if (showAddMusic) {
		return (
			<Modal
				visible={modalVisible}
				transparent
				animationType='none'
				statusBarTranslucent
				onRequestClose={handleBackFromAddMusic}
			>
				<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
					<StatusBar
						backgroundColor={MUSIC_COLORS.background}
						barStyle='light-content'
						translucent
					/>

					<View
						style={[
							styles.header,
							styles.addMusicHeader,
							{ paddingTop: insets.top + MUSIC_SPACING.md },
						]}
					>
						<Pressable
							style={styles.backButton}
							onPress={handleBackFromAddMusic}
							hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
						>
							<BackArrowIcon />
						</Pressable>

						<Text style={styles.headerTitle}>Add Music</Text>

						<View style={styles.headerSpacer} />
					</View>
					<FlatList
						data={MOCK_TRACKS}
						keyExtractor={item => item.id}
						renderItem={renderTrackItem}
						contentContainerStyle={[
							styles.trackList,
							{ paddingBottom: insets.bottom + MUSIC_SPACING.xxl },
						]}
						showsVerticalScrollIndicator={false}
					/>
				</Animated.View>
			</Modal>
		)
	}

	return (
		<Modal
			visible={modalVisible}
			transparent
			animationType='none'
			statusBarTranslucent
			onRequestClose={handleClose}
		>
			<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
				<StatusBar
					backgroundColor={MUSIC_COLORS.background}
					barStyle='light-content'
					translucent
				/>

				<View
					style={[styles.header, { paddingTop: insets.top + MUSIC_SPACING.md }]}
				>
					<Pressable
						style={styles.backButton}
						onPress={handleClose}
						hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
					>
						<BackArrowIcon />
					</Pressable>

					<Text style={styles.headerTitle}>Music</Text>

					<Pressable
						style={styles.addButton}
						onPress={handleAddButton}
						hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
					>
						<Text style={styles.addButtonText}>+Add</Text>
					</Pressable>
				</View>

				<View style={styles.body}>
					{showPlayer && selectedTrack ? (
						<Pressable
							style={styles.playerBackdrop}
							onPress={handleClosePlayer}
						>
							<Pressable onPress={() => {}} style={styles.playerCardWrapper}>
								<MusicPlayerOverlay
									visible
									trackName={selectedTrack.name}
									trackUri={selectedTrack.uri}
									onClose={handleClosePlayer}
									mode='inline'
									roomId={roomId}
									isStreamMode={isStreamMode}
								/>
							</Pressable>
						</Pressable>
					) : (
						<View style={styles.emptyStateContainer}>
							<VinylRecordIllustration size={VINYL_SIZE} />
							{!selectedTrack && (
								<Text style={styles.emptyStateText}>You have no music now</Text>
							)}
						</View>
					)}
				</View>

				<View
					style={[
						styles.footer,
						{ paddingBottom: insets.bottom + MUSIC_SPACING.xxxl },
					]}
				>
					<Pressable
						style={[
							styles.actionButton,
							{ width: buttonWidth, height: buttonHeight },
						]}
						onPress={handleAddMusic}
					>
						<Text style={styles.actionButtonText}>Add music from phone</Text>
					</Pressable>
				</View>
			</Animated.View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: MUSIC_COLORS.background,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: MUSIC_SPACING.lg,
		paddingBottom: MUSIC_SPACING.md,
	},
	addMusicHeader: {
		justifyContent: 'flex-start',
	},
	headerSpacer: {
		width: 40,
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	headerTitle: {
		flex: 1,
		fontSize: MUSIC_FONT_SIZES.xl,
		fontWeight: '500',
		color: MUSIC_COLORS.textPrimary,
		textAlign: 'center',
	},
	addButton: {
		paddingHorizontal: MUSIC_SPACING.sm,
		paddingVertical: MUSIC_SPACING.xs,
	},
	addButtonText: {
		fontSize: MUSIC_FONT_SIZES.lg,
		fontWeight: '600',
		color: MUSIC_COLORS.addButtonText,
	},
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyStateContainer: {
		alignItems: 'center',
		paddingHorizontal: MUSIC_SPACING.xxl,
	},
	emptyStateText: {
		marginTop: MUSIC_SPACING.xxl,
		fontSize: MUSIC_FONT_SIZES.lg,
		fontWeight: '400',
		color: MUSIC_COLORS.textPrimary,
		textAlign: 'center',
	},
	playerBackdrop: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: MUSIC_SPACING.xxl,
	},
	playerCardWrapper: {
		width: '100%',
	},
	footer: {
		alignItems: 'center',
		paddingHorizontal: MUSIC_SPACING.xxl,
	},
	actionButton: {
		backgroundColor: MUSIC_COLORS.buttonPrimary,
		borderRadius: 28,
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionButtonText: {
		fontSize: MUSIC_FONT_SIZES.lg,
		fontWeight: '600',
		color: MUSIC_COLORS.textPrimary,
	},
	// Add Music screen styles
	trackList: {
		paddingHorizontal: MUSIC_SPACING.lg,
		paddingTop: MUSIC_SPACING.md,
	},
	trackItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: MUSIC_SPACING.lg,
	},
	trackItemBorder: {
		borderBottomWidth: 1,
		borderBottomColor: MUSIC_COLORS.separator,
	},
	trackInfo: {
		flex: 1,
		marginRight: MUSIC_SPACING.lg,
	},
	trackName: {
		fontSize: MUSIC_FONT_SIZES.lg,
		fontWeight: '600',
		fontStyle: 'italic',
		color: MUSIC_COLORS.textPrimary,
		marginBottom: MUSIC_SPACING.xs,
	},
	trackMeta: {
		fontSize: MUSIC_FONT_SIZES.sm,
		fontWeight: '400',
		color: MUSIC_COLORS.textMuted,
	},
	trackAddButton: {
		backgroundColor: MUSIC_COLORS.buttonPrimary,
		paddingHorizontal: MUSIC_SPACING.xxl,
		paddingVertical: MUSIC_SPACING.sm,
		borderRadius: 20,
		minWidth: 80,
		alignItems: 'center',
	},
	trackAddButtonText: {
		fontSize: MUSIC_FONT_SIZES.md,
		fontWeight: '600',
		color: MUSIC_COLORS.textPrimary,
	},
})
