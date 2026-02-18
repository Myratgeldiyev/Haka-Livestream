import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Modal, Pressable, StatusBar, View } from 'react-native'
import { useToolOverlayAnimation } from '@/hooks/room-tools/useToolOverlayAnimation'
import { useToolOverlayBackHandler } from '@/hooks/room-tools/useToolOverlayBackHandler'
import {
	COLORS,
	OVERLAY_HEIGHTS,
	sharedToolOverlayStyles,
} from '../styles'
import type { ToolOverlayWrapperProps } from '@/types/room-tools/room-tool.types'

export function ToolOverlayWrapper({
	visible,
	onClose,
	overlayHeight = OVERLAY_HEIGHTS.medium,
	children,
}: ToolOverlayWrapperProps) {
	const [modalVisible, setModalVisible] = useState(false)
	const isClosingRef = useRef(false)

	const {
		translateY,
		overlayOpacity,
		animateOpen,
		animateClose,
		resetAnimation,
	} = useToolOverlayAnimation({ overlayHeight })

	const handleClose = useCallback(() => {
		if (isClosingRef.current) return
		isClosingRef.current = true
		animateClose(() => {
			setModalVisible(false)
			isClosingRef.current = false
			onClose()
		})
	}, [animateClose, onClose])

	useToolOverlayBackHandler({
		enabled: modalVisible,
		onBack: handleClose,
	})

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

	return (
		<Modal
			visible={modalVisible}
			transparent
			animationType="none"
			statusBarTranslucent
			onRequestClose={handleClose}
		>
			<View style={sharedToolOverlayStyles.modalContainer}>
				<StatusBar
					backgroundColor="transparent"
					barStyle="dark-content"
					translucent
				/>

				<Animated.View
					style={[
						sharedToolOverlayStyles.overlay,
						{ opacity: overlayOpacity },
					]}
				>
					<Pressable
						style={sharedToolOverlayStyles.overlayPressable}
						onPress={handleClose}
					/>
				</Animated.View>

				<Animated.View
					style={[
						sharedToolOverlayStyles.sheetBase,
						{
							height: overlayHeight,
							transform: [{ translateY }],
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
