import { UploadRoomImagePayload } from '@/api/live-chat/room.types'
import { pickImageFromGallery } from '@/hooks/image-picker-from-gallery'
import { useLiveChatStore } from '@/store/liveChat.store'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Animated,
	Dimensions,
	Easing,
	Image,
	Keyboard,
	Modal,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const ANIMATION_DURATION = 300
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.7
const BORDER_RADIUS = 20

const COLORS = {
	sheetBackground: '#25203C',
	overlay: 'rgba(0, 0, 0, 0.5)',
	textPrimary: '#FFFFFF',
	textSecondary: 'rgba(255, 255, 255, 0.6)',
	inputBackground: '#3B3650',
	border: '#898483',
	buttonPrimary: '#7C4DFF',
}

interface EditInfoBottomSheetProps {
	visible: boolean
	onClose: () => void
	onSave?: (data: { roomName: string; announcement: string }) => void
	initialRoomName?: string
	initialAnnouncement?: string
	profileImage?: string
	roomId?: string
}

function EditBadgeIcon() {
	return (
		<View style={styles.editBadge}>
			<Svg width={12} height={12} viewBox='0 0 24 24' fill='none'>
				<Path
					d='M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 00-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 10-2.621-2.621z'
					stroke='#FFFFFF'
					strokeWidth={2}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<Path
					d='M19 15v3a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h3'
					stroke='#FFFFFF'
					strokeWidth={2}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</Svg>
		</View>
	)
}

export function EditInfoBottomSheetStart({
	visible,
	onClose,
	onSave,
	initialRoomName = 'Wateen',
	initialAnnouncement = "Welcome everyone! Let's chat and have fun together",
	profileImage,
	roomId,
}: EditInfoBottomSheetProps) {
	const insets = useSafeAreaInsets()
	const [modalVisible, setModalVisible] = useState(false)
	const [roomName, setRoomName] = useState(initialRoomName)
	const [announcement, setAnnouncement] = useState(initialAnnouncement)
	const [selectedImage, setSelectedImage] =
		useState<UploadRoomImagePayload | null>(null)

	const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current
	const overlayOpacity = useRef(new Animated.Value(0)).current
	const uploadRoomImage = useLiveChatStore(s => s.uploadRoomImage)

	const handlePickImage = async () => {
		if (!roomId) return

		const result = await pickImageFromGallery()
		if (!result) return

		const payload: UploadRoomImagePayload = {
			uri: result.uri,
			name: result.name ?? 'room-image.jpg',
			type: result.type ?? 'image/jpeg',
		}

		setSelectedImage(payload)

		try {
			await uploadRoomImage(roomId, payload)
		} catch (e) {
			console.error('Image upload failed', e)
		}
	}

	useEffect(() => {
		if (visible) {
			setModalVisible(true)
			setRoomName(initialRoomName)
			setAnnouncement(initialAnnouncement)

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
		} else if (modalVisible) {
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: SHEET_HEIGHT,
					duration: ANIMATION_DURATION,
					easing: Easing.in(Easing.cubic),
					useNativeDriver: true,
				}),
				Animated.timing(overlayOpacity, {
					toValue: 0,
					duration: ANIMATION_DURATION,
					useNativeDriver: true,
				}),
			]).start(() => setModalVisible(false))
		}
	}, [visible])

	const handleClose = useCallback(() => {
		Keyboard.dismiss()
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: SHEET_HEIGHT,
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
			onClose()
		})
	}, [])

	const handleSubmit = () => {
		onSave?.({ roomName, announcement })
		handleClose()
	}

	const defaultImage = require('@/assets/images/stream-img.png')

	const imageSource = selectedImage
		? { uri: selectedImage.uri }
		: profileImage
		? { uri: profileImage }
		: defaultImage

	return (
		<Modal visible={modalVisible} transparent animationType='none'>
			<View style={styles.modalContainer}>
				<StatusBar barStyle='light-content' translucent />

				<Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
					<Pressable style={{ flex: 1 }} onPress={handleClose} />
				</Animated.View>

				<Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
					<Text style={styles.headerTitle}>Edit Info</Text>

					<View style={styles.profileSection}>
						<Pressable onPress={handlePickImage} style={styles.imageContainer}>
							<Image source={imageSource} style={styles.profileImage} />
							<EditBadgeIcon />
						</Pressable>

						<Text style={styles.editRoomText}>Edit Room Info</Text>
					</View>

					<View style={styles.formSection}>
						<Text style={styles.label}>Room Name</Text>
						<TextInput
							style={styles.input}
							value={roomName}
							onChangeText={setRoomName}
						/>

						<Text style={styles.label}>Announcement</Text>
						<TextInput
							style={styles.textArea}
							value={announcement}
							onChangeText={setAnnouncement}
							multiline
						/>
					</View>

					<View
						style={[
							styles.buttonContainer,
							{ paddingBottom: insets.bottom + 24 },
						]}
					>
						<Pressable style={styles.submitButton} onPress={handleSubmit}>
							<Text style={styles.submitButtonText}>Submit</Text>
						</Pressable>
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
	sheet: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: SHEET_HEIGHT,
		backgroundColor: COLORS.sheetBackground,
		borderTopLeftRadius: BORDER_RADIUS,
		borderTopRightRadius: BORDER_RADIUS,
		paddingTop: 24,
		paddingHorizontal: 24,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: '#FFF',
		textAlign: 'center',
		marginBottom: 24,
	},
	profileSection: { alignItems: 'center', marginBottom: 32 },
	imageContainer: { position: 'relative', marginBottom: 12 },
	profileImage: { width: 60, height: 60, borderRadius: 12 },
	editBadge: {
		position: 'absolute',
		bottom: -4,
		right: -4,
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: '#5F22D9',
		justifyContent: 'center',
		alignItems: 'center',
	},
	editRoomText: { color: '#FFF', fontSize: 14 },
	formSection: { flex: 1 },
	label: { color: '#FFF', marginBottom: 8, fontWeight: '600' },
	input: {
		backgroundColor: COLORS.inputBackground,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: COLORS.border,
		padding: 14,
		color: '#FFF',
		marginBottom: 20,
	},
	textArea: {
		backgroundColor: COLORS.inputBackground,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: COLORS.border,
		padding: 14,
		color: '#FFF',
		minHeight: 100,
	},
	buttonContainer: { paddingVertical: 24 },
	submitButton: {
		backgroundColor: COLORS.buttonPrimary,
		borderRadius: 28,
		paddingVertical: 16,
		alignItems: 'center',
	},
	submitButtonText: { color: '#FFF', fontWeight: '600', fontSize: 16 },
})
