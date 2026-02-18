import { useRoomPlayAnimation } from '@/hooks/useRoomPlayAnimation'
import type {
	ToolOverlayType,
	ToolUser,
} from '@/types/room-tools/room-tool.types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Animated,
	BackHandler,
	Modal,
	Pressable,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native'
import { ItemOverlayController } from '../room-item-overlays/ItemOverlayController'
import { ToolOverlayController } from '../room-tools/ToolOverlayController'
import { COLORS, sharedStyles } from './room-play-styles'
import type { RoomPlayItemData, RoomPlayOverlayProps } from './room-play.types'
import { RoomPlayContent } from './RoomPlayContent'
import { RoomPlayHeader } from './RoomPlayHeader'

const TOOL_ID_TO_OVERLAY_TYPE: Record<string, ToolOverlayType> = {
	'6': 'voice-on',
	'7': 'gift-effects',
	'8': 'applyer',
	'9': 'clean',
	'10': 'public-msg',
	'11': 'music',
	'12': 'photo',
	'13': 'call',
	'14': 'message',
	'15': 'share',
}
const applyingUser: ToolUser[] = [
	{
		id: '1',
		name: 'Jhane',
		avatarUri: '',
		avatarSource: require('../../assets/images/games/room-avatar.png'),
		genderBadge: 'male',
	},
	{
		id: '2',
		name: 'Yura',
		avatarUri: '',
		avatarSource: require('../../assets/images/games/room-avatar.png'),
		genderBadge: 'female',
	},
]

export function RoomPlayOverlay({
	visible,
	onClose,
	onItemSelect,
	roomId,
	userRole,
	streamIdForMute,
	publicMsgEnabled,
	onTogglePublicMsg,
	onOpenMessageInbox,
	onOpenMusicPlayer,
	onRoomPKRandomMatch,
	onCalculatorStart,
}: RoomPlayOverlayProps) {
	const [modalVisible, setModalVisible] = useState(false)
	const [selectedItem, setSelectedItem] = useState<RoomPlayItemData | null>(
		null
	)
	const [activeToolOverlay, setActiveToolOverlay] =
		useState<ToolOverlayType | null>(null)
	const isClosingRef = useRef(false)
	const {
		translateY,
		overlayOpacity,
		animateOpen,
		animateClose,
		resetAnimation,
	} = useRoomPlayAnimation()

	const handleClose = useCallback(() => {
		if (isClosingRef.current) return
		isClosingRef.current = true
		animateClose(() => {
			setModalVisible(false)
			isClosingRef.current = false
			onClose()
		})
	}, [animateClose, onClose])

	const handleItemSelect = useCallback(
		(item: RoomPlayItemData) => {
			if (item.id === '10' && onTogglePublicMsg) {
				onTogglePublicMsg()
				handleClose()
				return
			}
			if (item.id === '14' && onOpenMessageInbox) {
				onOpenMessageInbox()
				handleClose()
				return
			}
			if (item.id === '11' && onOpenMusicPlayer) {
				onOpenMusicPlayer()
				handleClose()
				return
			}
			const toolOverlayType = TOOL_ID_TO_OVERLAY_TYPE[item.id]
			if (toolOverlayType) {
				setActiveToolOverlay(toolOverlayType)
			} else {
				setSelectedItem(item)
			}
			onItemSelect?.(item)
		},
		[
			handleClose,
			onItemSelect,
			onTogglePublicMsg,
			onOpenMessageInbox,
			onOpenMusicPlayer,
		]
	)

	const handleItemOverlayClose = useCallback(() => {
		setSelectedItem(null)
	}, [])

	const handleRoomPKRandomMatch = useCallback(
		(timeMinutes: number) => {
			handleClose()
			onRoomPKRandomMatch?.(timeMinutes)
		},
		[handleClose, onRoomPKRandomMatch]
	)

	const handleToolOverlayClose = useCallback(() => {
		setActiveToolOverlay(null)
	}, [])

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
			}
		)

		return () => backHandler.remove()
	}, [modalVisible, handleClose])

	return (
		<Modal
			visible={modalVisible}
			transparent
			animationType='none'
			statusBarTranslucent
			onRequestClose={handleClose}
		>
			<View style={styles.container}>
				<StatusBar
					backgroundColor={COLORS.background}
					barStyle='light-content'
					translucent
				/>

				<Animated.View
					style={[sharedStyles.overlay, { opacity: overlayOpacity }]}
				>
					<Pressable
						style={sharedStyles.overlayPressable}
						onPress={handleClose}
					/>
				</Animated.View>

				<Animated.View
					style={[sharedStyles.sheet, { transform: [{ translateY }] }]}
				>
					<Pressable style={styles.sheetContent} onPress={() => {}}>
						<RoomPlayHeader title='Room Play' />
						<RoomPlayContent
							sections={[]}
							onItemSelect={handleItemSelect}
							publicMsgEnabled={publicMsgEnabled}
							onRequestClose={handleClose}
							userRoleOverride={userRole}
							streamIdForMute={streamIdForMute}
						/>
					</Pressable>
				</Animated.View>

				<ItemOverlayController
					selectedItem={selectedItem}
					onClose={handleItemOverlayClose}
					onRoomPKRandomMatch={handleRoomPKRandomMatch}
					onCalculatorStart={onCalculatorStart}
				/>

				<ToolOverlayController
					applyingUsers={applyingUser}
					activeOverlay={activeToolOverlay}
					onClose={handleToolOverlayClose}
					roomId={roomId}
					streamIdForMute={streamIdForMute}
				/>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		zIndex: 9999,
		elevation: 9999,
	},
	sheetContent: {
		flex: 1,
	},
})
