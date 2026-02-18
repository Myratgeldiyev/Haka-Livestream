import { pickImageFromGallery } from '@/hooks/image-picker-from-gallery'
import React, { useEffect, useRef, useState } from 'react'
import {
	Alert,
	Animated,
	Image,
	ImageSourcePropType,
	Keyboard,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	useWindowDimensions,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type RoomImagePayload = { uri: string; name?: string; type?: string }

interface EditInfoBottomSheetProps {
	visible: boolean
	onClose: () => void
	onSave?: (data: { roomName: string; announcement: string }) => void
	onImageSelect?: (payload: RoomImagePayload) => void
	initialRoomName?: string
	initialAnnouncement?: string
	/** Room image URI; when null, a black placeholder is shown. Tappable to pick from gallery. */
	roomImageUri?: string | null
	/** @deprecated Use roomImageUri */
	profileImage?: ImageSourcePropType
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

export function EditInfoBottomSheet({
	visible,
	onClose,
	onSave,
	onImageSelect,
	initialRoomName = 'Room Name',
	initialAnnouncement = 'announcement',
	roomImageUri = null,
	profileImage,
}: EditInfoBottomSheetProps) {
	const { height: windowHeight } = useWindowDimensions()
	const insets = useSafeAreaInsets()
	const sheetHeight = Math.min(windowHeight * 0.7, windowHeight - insets.top - 40)

	const [roomName, setRoomName] = useState(initialRoomName)
	const [announcement, setAnnouncement] = useState(initialAnnouncement)

	const translateY = useRef(new Animated.Value(sheetHeight)).current
	const backdropOpacity = useRef(new Animated.Value(0)).current

	useEffect(() => {
		if (visible) {
			setRoomName(initialRoomName)
			setAnnouncement(initialAnnouncement)
			openSheet()
		} else {
			closeSheet()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- only run when visibility/props change
	}, [visible, initialRoomName, initialAnnouncement])

	const openSheet = () => {
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(backdropOpacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start()
	}

	const closeSheet = () => {
		Keyboard.dismiss()
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: sheetHeight,
				duration: 250,
				useNativeDriver: true,
			}),
			Animated.timing(backdropOpacity, {
				toValue: 0,
				duration: 250,
				useNativeDriver: true,
			}),
		]).start()
	}

	const handleBackdropPress = () => {
		onClose()
	}

	const handleSubmit = () => {
		onSave?.({ roomName, announcement })
		onClose()
	}

	const handlePickImage = async () => {
		try {
			const result = await pickImageFromGallery()
			if (result) onImageSelect?.(result)
		} catch {
			Alert.alert('Error', 'Gallery permission denied or selection failed.')
		}
	}

	const showRoomImage =
		roomImageUri ??
		(profileImage &&
		typeof profileImage === 'object' &&
		'uri' in profileImage
			? (profileImage as { uri: string }).uri
			: null)

	return (
		<Modal
			visible={visible}
			transparent
			animationType='none'
			statusBarTranslucent
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
					<Pressable
						style={styles.backdropPressable}
						onPress={handleBackdropPress}
					/>
				</Animated.View>

				<Animated.View
					style={[
						styles.sheet,
						{
							height: sheetHeight,
							paddingBottom: Math.max(insets.bottom, 24),
							transform: [{ translateY }],
						},
					]}
				>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : undefined}
						style={styles.keyboardAvoid}
					>
						<Text style={styles.headerTitle}>Edit Info</Text>

						<View style={styles.profileSection}>
							<Pressable style={styles.imageContainer} onPress={handlePickImage}>
								{showRoomImage ? (
									<Image
										source={{ uri: showRoomImage }}
										style={styles.profileImage}
										resizeMode='cover'
									/>
								) : (
									<View style={[styles.profileImage, styles.placeholderImage]} />
								)}
								<EditBadgeIcon />
							</Pressable>
							<Text style={styles.editRoomText}>Edit Room Info</Text>
						</View>

						<ScrollView
							style={styles.formScroll}
							contentContainerStyle={styles.formScrollContent}
							keyboardShouldPersistTaps="handled"
							showsVerticalScrollIndicator={false}
						>
							<View style={styles.formSection}>
								<Text style={styles.label}>Room Name</Text>
								<TextInput
									style={styles.input}
									value={roomName}
									onChangeText={setRoomName}
									placeholderTextColor='#8E8E93'
								/>

								<Text style={styles.label}>Announcement</Text>
								<TextInput
									style={styles.textArea}
									value={announcement}
									onChangeText={setAnnouncement}
									multiline
									numberOfLines={4}
									textAlignVertical='top'
									placeholderTextColor='#8E8E93'
								/>
							</View>

							<View style={styles.buttonContainer}>
								<Pressable style={styles.submitButton} onPress={handleSubmit}>
									<Text style={styles.submitButtonText}>Submit</Text>
								</Pressable>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</Animated.View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	backdropPressable: {
		flex: 1,
	},
	sheet: {
		backgroundColor: '#25203C',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingTop: 32,
		paddingHorizontal: 24,
	},
	keyboardAvoid: {
		flex: 1,
	},
	formScroll: {
		flex: 1,
	},
	formScrollContent: {
		paddingBottom: 24,
		flexGrow: 1,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: '#FFFFFF',
		textAlign: 'center',
		marginBottom: 24,
	},
	profileSection: {
		alignItems: 'center',
		marginBottom: 32,
	},
	imageContainer: {
		position: 'relative',
		marginBottom: 12,
	},
	profileImage: {
		width: 60,
		height: 60,
		borderRadius: 12,
	},
	placeholderImage: {
		backgroundColor: 'black',
	},
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
	editRoomText: {
		fontSize: 14,
		fontWeight: '400',
		color: '#FFFFFF',
	},
	formSection: {
		marginBottom: 8,
	},
	label: {
		fontSize: 14,
		fontWeight: '600',
		color: '#FFFFFF',
		marginBottom: 8,
	},
	input: {
		backgroundColor: '#3B3650',
		borderWidth: 1,
		borderColor: '#898483',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 14,
		fontSize: 14,
		color: '#FFFFFF',
		marginBottom: 20,
	},
	textArea: {
		backgroundColor: '#3B3650',
		borderWidth: 1,
		borderColor: '#898483',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 14,
		fontSize: 14,
		color: '#FFFFFF',
		minHeight: 100,
	},
	buttonContainer: {
		paddingVertical: 24,
	},
	submitButton: {
		backgroundColor: '#7C4DFF',
		borderRadius: 28,
		paddingVertical: 16,
		alignItems: 'center',
	},
	submitButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#FFFFFF',
	},
})
