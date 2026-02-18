import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Animated,
	BackHandler,
	Modal,
	Pressable,
	StatusBar,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useItemOverlayAnimation } from '../../hooks/useItemOverlayAnimation'
import {
	COLORS,
	OVERLAY_HEIGHTS,
	sharedOverlayStyles,
} from './item-overlay.styles'
import type { ItemOverlayWrapperProps } from './item-overlay.types'

export function ItemOverlayWrapper({
	visible,
	onClose,
	overlayHeight = OVERLAY_HEIGHTS.roomPK,
	children,
}: ItemOverlayWrapperProps) {
	const [modalVisible, setModalVisible] = useState(false)
	const isClosingRef = useRef(false)
	const insets = useSafeAreaInsets()

	const {
		translateY,
		overlayOpacity,
		animateOpen,
		animateClose,
		resetAnimation,
	} = useItemOverlayAnimation({ overlayHeight })

	const handleClose = useCallback(() => {
		if (isClosingRef.current) return
		isClosingRef.current = true
		animateClose(() => {
			setModalVisible(false)
			isClosingRef.current = false
			onClose()
		})
	}, [animateClose, onClose])

	useEffect(() => {
		if (visible && !modalVisible && !isClosingRef.current) {
			setModalVisible(true)
			resetAnimation()
			requestAnimationFrame(() => {
				animateOpen()
			})
		} else if (!visible && modalVisible && !isClosingRef.current) {
			handleClose()
		}
	}, [visible, modalVisible, resetAnimation, animateOpen, handleClose])

	useEffect(() => {
		if (!modalVisible) return

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				handleClose()
				return true
			},
		)

		return () => backHandler.remove()
	}, [modalVisible, handleClose])

	return (
		<Modal
			visible={modalVisible}
			transparent
			animationType="none"
			statusBarTranslucent
			onRequestClose={handleClose}
		>
			<View style={sharedOverlayStyles.modalContainer}>
				<StatusBar
					backgroundColor={COLORS.background}
					barStyle="light-content"
					translucent
				/>

				<Animated.View
					style={[sharedOverlayStyles.overlay, { opacity: overlayOpacity }]}
				>
					<Pressable
						style={sharedOverlayStyles.overlayPressable}
						onPress={handleClose}
					/>
				</Animated.View>

				<Animated.View
					style={[
						sharedOverlayStyles.sheetBase,
						{
							height: overlayHeight,
							transform: [{ translateY }],
							paddingBottom:
								(sharedOverlayStyles.sheetBase.paddingBottom as number) +
								insets.bottom,
						},
					]}
				>
					<Pressable style={{ flex: 1 }} onPress={() => {}}>
						{children}
					</Pressable>
				</Animated.View>
			</View>
		</Modal>
	)
}
