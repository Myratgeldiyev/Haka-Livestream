import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Animated,
	Dimensions,
	Modal,
	Pressable,
	StyleSheet,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { EmojiPicker } from './EmojiPicker'
import { Image } from 'expo-image'
import type { ImageSourcePropType } from 'react-native'
import { getEmojiDisplaySource } from '@/constants/emoji'

const PICKER_BOTTOM_OFFSET = 56

export interface EmojiPickerOverlayProps {
	visible: boolean
	onEmojiSelect?: (placeholder: string) => void
	onClose: () => void
}

export function EmojiPickerOverlay({
	visible,
	onEmojiSelect,
	onClose,
}: EmojiPickerOverlayProps) {
	const insets = useSafeAreaInsets()
	const [previewEmojiId, setPreviewEmojiId] = useState<string | null>(null)
	const scale = useRef(new Animated.Value(0.2)).current

	const handlePressEmoji = useCallback((id: string) => {
		setPreviewEmojiId(id)
	}, [])

	const handleBackdropPress = useCallback(() => {
		if (previewEmojiId != null) {
			setPreviewEmojiId(null)
			onClose()
			return
		}
		onClose()
	}, [onClose, previewEmojiId])

	const previewSource: ImageSourcePropType | undefined =
		previewEmojiId != null
			? (getEmojiDisplaySource(previewEmojiId) as ImageSourcePropType | undefined)
			: undefined

	const { height: windowHeight, width: windowWidth } = Dimensions.get('window')
	const previewHeight = windowHeight * 0.4

	useEffect(() => {
		if (!previewEmojiId || !previewSource) {
			return
		}

		scale.setValue(0.2)

		const anim = Animated.sequence([
			Animated.timing(scale, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}),
			Animated.delay(1000),
			Animated.timing(scale, {
				toValue: 0.2,
				duration: 200,
				useNativeDriver: true,
			}),
		])

		anim.start(() => {
			setPreviewEmojiId(null)
			onClose()
		})

		return () => {
			anim.stop()
		}
	}, [previewEmojiId, previewSource, scale, onClose])

	return (
		<Modal
			visible={visible}
			transparent
			animationType='fade'
			statusBarTranslucent
			onRequestClose={onClose}
		>
			<View style={styles.root} pointerEvents='box-none'>
				<Pressable style={styles.backdrop} onPress={handleBackdropPress} />
				{previewEmojiId == null && (
					<View
						style={[
							styles.panelWrap,
							{ bottom: PICKER_BOTTOM_OFFSET + insets.bottom },
						]}
						pointerEvents='box-none'
					>
						<EmojiPicker onEmojiPress={handlePressEmoji} />
					</View>
				)}

				{previewEmojiId != null && previewSource != null && (
					<View style={styles.previewOverlay} pointerEvents='box-none'>
						<Animated.View
							style={[
								styles.previewContainer,
								{ height: previewHeight, width: windowWidth },
								{ transform: [{ scale }] },
							]}
						>
							<Image
								source={previewSource}
								style={styles.previewImage}
								contentFit='contain'
							/>
						</Animated.View>
					</View>
				)}
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	root: { flex: 1, justifyContent: 'flex-end' },
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	panelWrap: { position: 'absolute', left: 16, right: 16 },
	previewOverlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	},
	previewContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	previewImage: {
		width: '80%',
		height: '100%',
	},
})
