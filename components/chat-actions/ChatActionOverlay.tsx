import { useUserRelationsStore } from '@/store/user.store'
import type {
	ChatActionOverlayProps,
	ChatActionViewType,
	KickOutReason,
} from '@/types/chat-actions/chat-action.types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	BackHandler,
	Modal,
	Pressable,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native'
import Animated from 'react-native-reanimated'
import { ChatActionContent } from './ChatActionContent'
import { useChatActionAnimation } from './hooks/useChatActionAnimation'
import { KickOutContent } from './KickOutContent'
import { COLORS, OVERLAY_HEIGHT, sharedChatActionStyles } from './styles'

export function ChatActionOverlay({
	visible,
	onClose,
	user,
	onFollow,
	onUnfollow,
	onChat,
	onSendGift,
	onCall,
	onKickOut,
	onViewProfile,
	onMention,
	level,
}: ChatActionOverlayProps) {
	const [modalVisible, setModalVisible] = useState(false)
	const [currentView, setCurrentView] = useState<ChatActionViewType>('main')
	const isClosingRef = useRef(false)

	const followingAll = useUserRelationsStore(s => s.followingAll)
	const followUser = useUserRelationsStore(s => s.followUser)
	const unfollowUser = useUserRelationsStore(s => s.unfollowUser)

	const isFollowed = useMemo(
		() => !!user && followingAll.some(f => String(f.user_id) === user.id),
		[user, followingAll],
	)

	const {
		animatedSheetStyle,
		animatedOverlayStyle,
		animateOpen,
		animateClose,
	} = useChatActionAnimation({ overlayHeight: OVERLAY_HEIGHT })

	const resetToMainView = useCallback(() => {
		setCurrentView('main')
	}, [])

	const handleClose = useCallback(() => {
		if (isClosingRef.current) return
		isClosingRef.current = true
		animateClose(() => {
			setModalVisible(false)
			isClosingRef.current = false
			resetToMainView()
			onClose()
		})
	}, [animateClose, onClose, resetToMainView])

	const handleKickOutPress = useCallback(() => {
		setCurrentView('kick-out')
	}, [])

	const handleKickOut = useCallback(
		(reason: KickOutReason) => {
			if (user) {
				onKickOut?.(user, reason)
				handleClose()
			}
		},
		[user, onKickOut, handleClose],
	)

	const handleFollow = useCallback(() => {
		if (!user) return
		followUser(user.id)
		onFollow?.(user)
	}, [user, followUser, onFollow])

	const handleUnfollow = useCallback(() => {
		if (!user) return
		unfollowUser(user.id)
		onUnfollow?.(user)
	}, [user, unfollowUser, onUnfollow])

	const handleChat = useCallback(() => {
		if (user) onChat?.(user)
	}, [user, onChat])

	const handleSendGift = useCallback(() => {
		if (user) onSendGift?.(user)
	}, [user, onSendGift])

	const handleCall = useCallback(() => {
		if (user) onCall?.(user)
	}, [user, onCall])

	const handleViewProfile = useCallback(() => {
		if (user) onViewProfile?.(user)
	}, [user, onViewProfile])

	const handleMention = useCallback(() => {
		if (user) onMention?.(user)
	}, [user, onMention])

	useEffect(() => {
		if (visible && !modalVisible && !isClosingRef.current) {
			setModalVisible(true)
			requestAnimationFrame(() => {
				animateOpen()
			})
		} else if (!visible && modalVisible && !isClosingRef.current) {
			handleClose()
		}
	}, [visible, modalVisible, animateOpen, handleClose])

	useEffect(() => {
		if (!modalVisible) return

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				if (currentView === 'kick-out') {
					setCurrentView('main')
					return true
				}
				handleClose()
				return true
			},
		)

		return () => backHandler.remove()
	}, [modalVisible, currentView, handleClose])

	if (!user) return null

	return (
		<Modal
			visible={modalVisible}
			transparent
			animationType='none'
			statusBarTranslucent
			onRequestClose={handleClose}
		>
			<View style={sharedChatActionStyles.modalContainer}>
				<StatusBar
					backgroundColor={COLORS.background}
					barStyle='light-content'
					translucent
				/>

				<Animated.View
					style={[sharedChatActionStyles.overlay, animatedOverlayStyle]}
				>
					<Pressable
						style={sharedChatActionStyles.overlayPressable}
						onPress={handleClose}
					/>
				</Animated.View>

				<Animated.View
					style={[sharedChatActionStyles.sheetBase, animatedSheetStyle]}
				>
					<Pressable style={styles.sheetContent} onPress={() => {}}>
						{currentView === 'main' ? (
							<ChatActionContent
								user={user}
								level={level}
								onKickOutPress={handleKickOutPress}
								onFollow={handleFollow}
								onUnfollow={handleUnfollow}
								isFollowed={isFollowed}
								onChat={handleChat}
								onSendGift={handleSendGift}
								onCall={handleCall}
								onViewProfile={handleViewProfile}
								onMention={handleMention}
							/>
						) : (
							<KickOutContent user={user} onKickOut={handleKickOut} />
						)}
					</Pressable>
				</Animated.View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	sheetContent: {
		flex: 1,
	},
})
