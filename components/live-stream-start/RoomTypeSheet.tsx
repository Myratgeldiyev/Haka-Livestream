import {
	ApplyModeToggle,
	GameGrid,
	type GameId,
	MicCountSelector,
	RoomTypeSelector,
} from '@/components/room-type'
import { useLiveChatStore } from '@/store/liveChat.store'
import React, { useCallback, useEffect, useState } from 'react'
import {
	Dimensions,
	Modal,
	Pressable,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import Animated, {
	Easing,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ApplySettingsBtn } from '../room-type/ApplySettingsBtn'

const ANIMATION_DURATION_OPEN = 300
const ANIMATION_DURATION_CLOSE = 250
const SHEET_HEIGHT_MAX = 650
const BORDER_RADIUS = 20

const COLORS = {
	sheetBackground: '#25203C',
	overlay: 'rgba(0, 0, 0, 0.5)',
	textPrimary: '#FFFFFF',
}

const SPACING = {
	sm: 8,
	md: 12,
	lg: 16,
	xl: 24,
}

interface RoomTypeSheetProps {
	isVisible: boolean
	onClose: () => void
}

const MIC_TO_COUNT = {
	'5 Mic': 5,
	'10 Mic': 10,
	'15 Mic': 15,
	'20 Mic': 20,
} as const

const COUNT_TO_MIC = {
	5: '5 Mic',
	10: '10 Mic',
	15: '15 Mic',
	20: '20 Mic',
} as const

export function RoomTypeSheet({ isVisible, onClose }: RoomTypeSheetProps) {
	const roomSeatCount = useLiveChatStore(s => s.roomSeatCount)
	const setRoomSeatCount = useLiveChatStore(s => s.setRoomSeatCount)
	const [roomType, setRoomType] = useState<'live' | 'chat'>('chat')
	const [selectedMic, setSelectedMic] = useState<
		'5 Mic' | '10 Mic' | '15 Mic' | '20 Mic'
	>(() => COUNT_TO_MIC[roomSeatCount as 5 | 10 | 15 | 20] ?? '10 Mic')
	useEffect(() => {
		if (isVisible)
			setSelectedMic(
				COUNT_TO_MIC[roomSeatCount as 5 | 10 | 15 | 20] ?? '10 Mic'
			)
	}, [isVisible, roomSeatCount])
	const [applyMode, setApplyMode] = useState(true)
	const [selectedGame, setSelectedGame] = useState<GameId>('none')

	const [modalVisible, setModalVisible] = useState(false)
	const animationProgress = useSharedValue(0)
	const insets = useSafeAreaInsets()
	const windowHeight = Dimensions.get('window').height
	const sheetHeight = Math.min(SHEET_HEIGHT_MAX, windowHeight - insets.top - 60)
	const sheetHeightSv = useSharedValue(sheetHeight)
	useEffect(() => {
		sheetHeightSv.value = sheetHeight
	}, [sheetHeight, sheetHeightSv])

	useEffect(() => {
		if (isVisible) {
			setModalVisible(true)
			animationProgress.value = withTiming(1, {
				duration: ANIMATION_DURATION_OPEN,
				easing: Easing.out(Easing.cubic),
			})
		} else {
			animationProgress.value = withTiming(
				0,
				{
					duration: ANIMATION_DURATION_CLOSE,
					easing: Easing.in(Easing.cubic),
				},
				finished => {
					if (finished) {
						runOnJS(setModalVisible)(false)
					}
				}
			)
		}
	}, [isVisible, animationProgress])

	const handleClose = useCallback(() => {
		animationProgress.value = withTiming(
			0,
			{
				duration: ANIMATION_DURATION_CLOSE,
				easing: Easing.in(Easing.cubic),
			},
			finished => {
				if (finished) {
					runOnJS(onClose)()
					runOnJS(setModalVisible)(false)
				}
			}
		)
	}, [animationProgress, onClose])

	const sheetAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					animationProgress.value,
					[0, 1],
					[sheetHeightSv.value, 0]
				),
			},
		],
	}))

	const overlayAnimatedStyle = useAnimatedStyle(() => ({
		opacity: animationProgress.value,
	}))

	const handleApply = useCallback(() => {
		setRoomSeatCount(MIC_TO_COUNT[selectedMic])
		handleClose()
	}, [selectedMic, setRoomSeatCount, handleClose])

	return (
		<Modal
			visible={modalVisible}
			transparent
			animationType='none'
			statusBarTranslucent
			onRequestClose={handleClose}
		>
			<View style={styles.modalContainer}>
				<StatusBar
					backgroundColor={COLORS.sheetBackground}
					barStyle='light-content'
					translucent
				/>

				<Animated.View style={[styles.overlay, overlayAnimatedStyle]}>
					<Pressable style={styles.overlayPressable} onPress={handleClose} />
				</Animated.View>

				<Animated.View
					style={[
						styles.sheet,
						{
							height: sheetHeight,
							paddingBottom: insets.bottom > 0 ? insets.bottom : 24,
						},
						sheetAnimatedStyle,
					]}
				>
					<ScrollView
						style={styles.scrollView}
						contentContainerStyle={styles.content}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps='handled'
					>
						<View style={styles.section}>
							<Text style={styles.sectionTitle}>Room Type</Text>
							<RoomTypeSelector
								selectedType={roomType}
								onTypeSelect={setRoomType}
							/>
						</View>
						<MicCountSelector
							selectedMic={selectedMic}
							onMicSelect={setSelectedMic}
						/>
						<ApplyModeToggle isEnabled={applyMode} onToggle={setApplyMode} />
						<GameGrid
							selectedGame={selectedGame}
							onGameSelect={setSelectedGame}
						/>
					</ScrollView>
					<View style={styles.footer}>
						<ApplySettingsBtn onPress={handleApply} />
					</View>
				</Animated.View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: COLORS.overlay,
	},
	overlayPressable: {
		flex: 1,
	},
	sheet: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#25203C',
		borderTopLeftRadius: BORDER_RADIUS,
		borderTopRightRadius: BORDER_RADIUS,
		paddingTop: 16,
		overflow: 'hidden',
		flexDirection: 'column',
	},
	scrollView: {
		flex: 1,
	},
	content: {
		padding: SPACING.lg,
		paddingBottom: SPACING.xl,
		gap: SPACING.xl,
	},
	footer: {
		paddingHorizontal: SPACING.lg,
		paddingTop: 20,
		backgroundColor: '#25203C',
	},
	section: {
		gap: SPACING.md,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
})
