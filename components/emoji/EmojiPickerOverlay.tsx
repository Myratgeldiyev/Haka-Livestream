import React, { useCallback } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { EmojiPicker } from './EmojiPicker'

const PICKER_BOTTOM_OFFSET = 56

export interface EmojiPickerOverlayProps {
	visible: boolean
	onEmojiSelect: (placeholder: string) => void
	onClose: () => void
}

export function EmojiPickerOverlay({
	visible,
	onEmojiSelect,
	onClose,
}: EmojiPickerOverlayProps) {
	const insets = useSafeAreaInsets()

	const handleSelect = useCallback(
		(placeholder: string) => {
			onEmojiSelect(placeholder)
			onClose()
		},
		[onEmojiSelect, onClose]
	)

	return (
		<Modal
			visible={visible}
			transparent
			animationType='fade'
			statusBarTranslucent
			onRequestClose={onClose}
		>
			<View style={styles.root} pointerEvents='box-none'>
				<Pressable style={styles.backdrop} onPress={onClose} />
				<View
					style={[
						styles.panelWrap,
						{ bottom: PICKER_BOTTOM_OFFSET + insets.bottom },
					]}
					pointerEvents='box-none'
				>
					<EmojiPicker onEmojiSelect={handleSelect} />
				</View>
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
})
