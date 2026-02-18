import { useLiveChatStore } from '@/store/liveChat.store'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
	Animated,
	BackHandler,
	Modal,
	Pressable,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native'
import { useGameRankingAnimation } from '../../hooks/useGameRankingAnimation'
import type {
	GameRankingOverlayProps,
	MainTabType,
} from '../../types/game-ranking'
import { ContributionSection } from './ContributionSection'
import { GameRankingSection } from './GameRankingSection'
import { GameRankingTabs } from './GameRankingTabs'
import { OnlineUsersSection } from './OnlineUsersSection'
import { COLORS, sharedStyles } from './styles'

export function GameRankingOverlay({
	visible,
	onClose,
	roomId,
}: GameRankingOverlayProps) {
	const [modalVisible, setModalVisible] = useState(false)
	const [activeTab, setActiveTab] = useState<MainTabType>('onlineUsers')
	const { users, fetchAllUsersInChatRoom } = useLiveChatStore()
	const visibleUsers = useMemo(() => users, [users])
	useEffect(() => {
		if (!visible || !roomId) return
		fetchAllUsersInChatRoom(roomId).catch(error => {
			console.error('[GameRankingOverlay] Failed to fetch users:', error)
		})
	}, [visible, roomId, fetchAllUsersInChatRoom])
	const {
		translateY,
		overlayOpacity,
		animateOpen,
		animateClose,
		resetAnimation,
	} = useGameRankingAnimation()

	const handleClose = useCallback(() => {
		animateClose(() => {
			setModalVisible(false)
			onClose()
		})
	}, [animateClose, onClose])

	useEffect(() => {
		if (visible) {
			setModalVisible(true)
			resetAnimation()
			requestAnimationFrame(() => {
				animateOpen()
			})
		} else if (modalVisible) {
			handleClose()
		}
	}, [visible])

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

	const renderContent = useCallback(() => {
		switch (activeTab) {
			case 'onlineUsers':
				return (
					<OnlineUsersSection
					data={visibleUsers}
					/>
				)

			case 'contribution':
				return <ContributionSection data={visibleUsers} />

			case 'gameRanking':
				return (
					<GameRankingSection
						data={visibleUsers.filter(u => u.role === 'speaker')}
					/>
				)

			default:
				return null
		}
	}, [activeTab, visibleUsers])

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
					<View style={styles.sheetContent}>
						<GameRankingTabs activeTab={activeTab} onTabChange={setActiveTab} />
						{renderContent()}
					</View>
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
	sheetContent: {
		flex: 1,
	},
})
