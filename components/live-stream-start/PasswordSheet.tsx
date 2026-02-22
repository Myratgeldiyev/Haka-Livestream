import { useLiveChatStore } from '@/store/liveChat.store'
import { useLiveStreamStore } from '@/store/liveStream.store'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Alert,
	Animated,
	BackHandler,
	Dimensions,
	Easing,
	Modal,
	Platform,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const ANIMATION_DURATION = 300
const STATUSBAR_HEIGHT =
	Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight ?? 24) + 10
const PASSWORD_LENGTH = 6
const INPUT_BOX_SIZE = 48
const INPUT_BOX_GAP = 12
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.65

const COLORS = {
	background: '#1A1533',
	inputBox: '#2A2444',
	overlay: 'rgba(0, 0, 0, 0.5)',
	textPrimary: '#FFFFFF',
	textSecondary: 'rgba(255, 255, 255, 0.6)',
	titlePurple: '#9B7BE8',
	buttonPurple: '#8B7BE8',
	buttonText: '#FFFFFF',
}

interface PasswordSheetProps {
	visible: boolean
	onClose: () => void
	mode: 'chat' | 'live'
	streamId?: string
}

export function PasswordSheet({
	visible,
	onClose,
	mode,
	streamId,
}: PasswordSheetProps) {
	const insets = useSafeAreaInsets()
	const [modalVisible, setModalVisible] = useState(false)
	const [password, setPassword] = useState('')
	const [isLocked, setIsLocked] = useState(false)
	const [activeTab, setActiveTab] = useState<'Profile' | 'Member'>('Member')
	const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current
	const overlayOpacity = useRef(new Animated.Value(0)).current
	const inputRef = useRef<TextInput>(null)

	const animateOpen = useCallback(() => {
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: 0,
				duration: ANIMATION_DURATION,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.timing(overlayOpacity, {
				toValue: 1,
				duration: ANIMATION_DURATION,
				useNativeDriver: true,
			}),
		]).start()
	}, [translateY, overlayOpacity])

	const animateClose = useCallback(() => {
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: SCREEN_HEIGHT,
				duration: ANIMATION_DURATION,
				easing: Easing.in(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.timing(overlayOpacity, {
				toValue: 0,
				duration: ANIMATION_DURATION,
				useNativeDriver: true,
			}),
		]).start(() => {
			setModalVisible(false)
			setPassword('')
			onClose()
		})
	}, [translateY, overlayOpacity, onClose])

	useEffect(() => {
		if (visible) {
			setModalVisible(true)
			translateY.setValue(SCREEN_HEIGHT)
			overlayOpacity.setValue(0)
			requestAnimationFrame(() => {
				animateOpen()
			})
		} else if (modalVisible) {
			animateClose()
		}
	}, [visible])

	useEffect(() => {
		if (!modalVisible) return

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				animateClose()
				return true
			}
		)

		return () => backHandler.remove()
	}, [modalVisible, animateClose])

	const handleOverlayPress = useCallback(() => {
		animateClose()
	}, [animateClose])

	const handlePasswordChange = useCallback((text: string) => {
		const numericText = text.replace(/[^0-9]/g, '')
		if (numericText.length <= PASSWORD_LENGTH) {
			setPassword(numericText)
		}
	}, [])

	const handleInputBoxPress = useCallback(() => {
		inputRef.current?.focus()
	}, [])

	const handleLockRoom = useCallback(async () => {
		if (password.length !== PASSWORD_LENGTH) return
		try {
			if (mode === 'chat') {
				await useLiveChatStore.getState().setPasswordChatRoom(password)
			} else {
				if (!streamId) return
				await useLiveStreamStore.getState().setPasswordStreamRoom(
					streamId,
					password,
				)
			}
			setIsLocked(true)
		} catch (e: any) {
			Alert.alert(
				'Error',
				e?.message ?? 'Failed to set password. Please try again.',
			)
		}
	}, [password, mode, streamId])

	const handleRemoveLock = useCallback(async () => {
		try {
			if (mode === 'chat') {
				await useLiveChatStore.getState().removePasswordChatRoom()
			} else {
				if (!streamId) return
				await useLiveStreamStore.getState().removePasswordStreamRoom(
					streamId,
				)
			}
			setIsLocked(false)
		} catch (e: any) {
			Alert.alert(
				'Error',
				e?.message ?? 'Failed to remove password. Please try again.',
			)
		}
	}, [mode, streamId])

	const renderPasswordBoxes = () => {
		const boxes = []
		for (let i = 0; i < PASSWORD_LENGTH; i++) {
			const isFilled = i < password.length
			boxes.push(
				<Pressable
					key={i}
					style={styles.inputBox}
					onPress={handleInputBoxPress}
				>
					{isFilled && <View style={styles.inputDot} />}
				</Pressable>
			)
		}
		return boxes
	}

	return (
		<Modal
			visible={modalVisible}
			transparent
			animationType='none'
			statusBarTranslucent
			onRequestClose={animateClose}
		>
			<View style={styles.container}>
				<StatusBar
					backgroundColor={COLORS.background}
					barStyle='light-content'
					translucent
				/>

				<Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
					<Pressable
						style={styles.overlayPressable}
						onPress={handleOverlayPress}
					/>
				</Animated.View>

				<Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
					<View style={styles.tabsContainer}>
						<Pressable
							style={styles.tab}
							onPress={() => setActiveTab('Profile')}
						>
							<Text
								style={[
									styles.tabText,
									activeTab === 'Profile' && styles.tabTextActive,
								]}
							>
								Profile
							</Text>
						</Pressable>
						<Pressable
							style={styles.tab}
							onPress={() => setActiveTab('Member')}
						>
							<Text
								style={[
									styles.tabText,
									activeTab === 'Member' && styles.tabTextActive,
								]}
							>
								Member
							</Text>
						</Pressable>
					</View>

					<Text style={styles.title}>Room Password</Text>

					{isLocked ? (
						<>
							<View style={styles.content}>
								<Text style={styles.subtitle}>The Room Locked</Text>
							</View>
							<View
								style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}
							>
								<Pressable
									style={styles.lockButton}
									onPress={handleRemoveLock}
								>
									<Text style={styles.lockButtonText}>Remove Lock</Text>
								</Pressable>
							</View>
						</>
					) : (
						<>
							<View style={styles.content}>
								<Text style={styles.subtitle}>Set the Room Password</Text>

								<View style={styles.inputContainer}>
									{renderPasswordBoxes()}
								</View>

								<TextInput
									ref={inputRef}
									style={styles.hiddenInput}
									value={password}
									onChangeText={handlePasswordChange}
									keyboardType='number-pad'
									maxLength={PASSWORD_LENGTH}
									autoFocus={false}
								/>
							</View>

							<View
								style={[
									styles.footer,
									{ paddingBottom: insets.bottom + 16 },
								]}
							>
								<Pressable
									style={[
										styles.lockButton,
										password.length < PASSWORD_LENGTH &&
											styles.lockButtonDisabled,
									]}
									onPress={handleLockRoom}
								>
									<Text style={styles.lockButtonText}>Lock room</Text>
								</Pressable>
							</View>
						</>
					)}
				</Animated.View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
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
		height: SHEET_HEIGHT,
		backgroundColor: COLORS.background,
		paddingTop: 16,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},

	tabsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 40,
		paddingVertical: 16,
	},
	tab: {
		paddingVertical: 8,
	},
	tabText: {
		fontSize: 16,
		fontWeight: '500',
		color: COLORS.textSecondary,
	},
	tabTextActive: {
		color: COLORS.textPrimary,
		fontWeight: '700',
	},
	title: {
		fontSize: 20,
		fontWeight: '600',
		color: '#fff',
		textAlign: 'center',
		marginTop: 8,
		marginBottom: 60,
	},
	content: {
		flex: 1,
		alignItems: 'center',
		marginTop: 50,
		paddingHorizontal: 24,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: '500',
		color: COLORS.textPrimary,
		marginBottom: 24,
	},
	inputContainer: {
		flexDirection: 'row',
		gap: INPUT_BOX_GAP,
	},
	inputBox: {
		width: INPUT_BOX_SIZE,
		height: INPUT_BOX_SIZE,
		backgroundColor: COLORS.inputBox,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: COLORS.textPrimary,
	},
	hiddenInput: {
		position: 'absolute',
		opacity: 0,
		height: 0,
		width: 0,
	},
	footer: {
		paddingHorizontal: 24,
	},
	lockButton: {
		backgroundColor: COLORS.buttonPurple,
		borderRadius: 28,
		paddingVertical: 16,
		alignItems: 'center',
	},
	lockButtonDisabled: {
		opacity: 0.6,
	},
	lockButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.buttonText,
	},
})
