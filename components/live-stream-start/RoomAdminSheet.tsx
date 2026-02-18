import type { RoomUsers } from '@/api/live-chat/room.types'
import { useLiveChatStore } from '@/store/liveChat.store'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Alert,
	Animated,
	BackHandler,
	Easing,
	Image,
	Modal,
	Pressable,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackArrowIcon } from '../ui/icons/chat'

const ANIMATION_DURATION = 300
const SHEET_HEIGHT = 580
const BOTTOM_RADIUS = 24

const COLORS = {
	background: '#F8F8F8',
	overlay: 'rgba(0, 0, 0, 0.5)',
	textPrimary: '#1A1A1A',
	textSecondary: '#666666',
	upgradeBanner: '#F5C4A1',
	upgradeBannerText: '#1A1A1A',
	adminBadge: '#8B7BE8',
	adminBadgeText: '#FFFFFF',
	removeButton: '#B3B3B3',
	removeButtonText: '#595959',
	white: '#FFFFFF',
}

interface RoomAdminSheetProps {
	visible: boolean
	onClose: () => void
	roomId?: string
}

interface AdminItemProps {
	admin: RoomUsers
	onRemove: (userId: string) => void
}

function ChevronRightPlaceholder() {
	return (
		<View style={styles.chevronRight}>
			<Text style={styles.chevronRightText}>{'>'}</Text>
		</View>
	)
}

function RemoveIconPlaceholder() {
	return (
		<View style={styles.removeIcon}>
			<View style={styles.removeIconLine} />
		</View>
	)
}

function AdminItem({ admin, onRemove }: AdminItemProps) {
	const handleRemove = () => {
		Alert.alert(
			'Remove Admin',
			`Are you sure you want to remove ${admin.user.username} from admin role?`,
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Remove',
					style: 'destructive',
					onPress: () => onRemove(admin.user.user_id),
				},
			]
		)
	}

	return (
		<View style={styles.adminItem}>
			<View style={styles.adminItemLeft}>
				<View style={styles.avatarContainer}>
					{admin.user.profile_picture ? (
						<Image
							source={{ uri: admin.user.profile_picture }}
							style={styles.avatar}
						/>
					) : (
						<Image
							source={require('../../assets/images/games/room-avatar.png')}
							style={styles.avatar}
						/>
					)}
				</View>
				<View style={styles.adminItemInfo}>
					<Text style={styles.adminName}>{admin.user.username}</Text>
					<View>
						<Image source={require('@/assets/images/room-admin.png')} />
					</View>
				</View>
			</View>
			<Pressable style={styles.removeButton} onPress={handleRemove}>
				<RemoveIconPlaceholder />
				<Text style={styles.removeButtonText}>Remove</Text>
			</Pressable>
		</View>
	)
}

export function RoomAdminSheet({
	visible,
	onClose,
	roomId: propRoomId,
}: RoomAdminSheetProps) {
	const insets = useSafeAreaInsets()
	const [modalVisible, setModalVisible] = useState(false)
	const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current
	const overlayOpacity = useRef(new Animated.Value(0)).current

	const users = useLiveChatStore(s => s.users)
	const storeRoomId = useLiveChatStore(s => s.roomId)
	const fetchAllUsersInChatRoom = useLiveChatStore(
		s => s.fetchAllUsersInChatRoom
	)
	const removeUser = useLiveChatStore(s => s.removeAdmin)

	const roomId = propRoomId || storeRoomId

	const admins = users.filter(user => user.role === 'admin')
	const maxAdmins = 5

	useEffect(() => {
		if (visible && roomId) {
			fetchAllUsersInChatRoom(roomId).catch(error => {
				console.error('Failed to fetch users:', error)
			})
		}
	}, [visible, roomId, fetchAllUsersInChatRoom])

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
	}, [translateY, overlayOpacity, onClose])

	useEffect(() => {
		if (visible) {
			setModalVisible(true)
			translateY.setValue(SHEET_HEIGHT)
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

	const handleBackPress = useCallback(() => {
		animateClose()
	}, [animateClose])

	const handleRemoveAdmin = useCallback(
		async (userId: string) => {
			if (!roomId) {
				Alert.alert('Error', 'No active room found')
				return
			}

			try {
				console.log('Removing admin:', userId)

				await removeUser(userId)

				await fetchAllUsersInChatRoom(roomId)

				Alert.alert('Success', 'Admin removed successfully')
			} catch (error: any) {
				console.error('Failed to remove admin:', error)
				Alert.alert('Error', error.message || 'Failed to remove admin')
			}
		},
		[removeUser, roomId, fetchAllUsersInChatRoom]
	)

	return (
		<Modal
			visible={modalVisible}
			transparent
			animationType='none'
			statusBarTranslucent
			onRequestClose={handleBackPress}
		>
			<View style={styles.container}>
				<StatusBar
					backgroundColor={COLORS.background}
					barStyle='dark-content'
					translucent
				/>

				<Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
					<Pressable
						style={styles.overlayPressable}
						onPress={handleOverlayPress}
					/>
				</Animated.View>

				<Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
					<View style={styles.header}>
						<Pressable style={styles.backButton} onPress={handleBackPress}>
							<BackArrowIcon />
						</Pressable>
						<Text style={styles.headerTitle}>Room Admin</Text>
						<View style={styles.headerSpacer} />
					</View>

					<Text style={styles.subtitle}>
						Room Admin Number: {admins.length}/{maxAdmins}
					</Text>

					<Pressable style={styles.upgradeBanner}>
						<Text style={styles.upgradeBannerText}>
							Upgrade to more room members, you can set{'\n'}more RoomAdmin
						</Text>
						<ChevronRightPlaceholder />
					</Pressable>

					<ScrollView
						style={styles.adminList}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: insets.bottom + 24,
						}}
					>
						{admins.length > 0 ? (
							admins.map(admin => (
								<AdminItem
									key={admin.user.user_id}
									admin={admin}
									onRemove={handleRemoveAdmin}
								/>
							))
						) : (
							<View style={styles.emptyState}>
								<Text style={styles.emptyStateText}>No admins yet</Text>
							</View>
						)}
					</ScrollView>
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
		minHeight: SHEET_HEIGHT,
		backgroundColor: COLORS.background,
		borderTopLeftRadius: BOTTOM_RADIUS,
		borderTopRightRadius: BOTTOM_RADIUS,
		paddingTop: 16,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 16,
		paddingHorizontal: 20,
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
	headerSpacer: {
		width: 40,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: '500',
		color: COLORS.textPrimary,
		textAlign: 'center',
		marginBottom: 16,
	},
	upgradeBanner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.upgradeBanner,
		marginHorizontal: 20,
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderRadius: 16,
		marginBottom: 24,
	},
	upgradeBannerText: {
		flex: 1,
		fontSize: 14,
		fontWeight: '500',
		color: COLORS.upgradeBannerText,
		lineHeight: 20,
	},
	chevronRight: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 12,
	},
	chevronRightText: {
		fontSize: 20,
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
	adminList: {
		flex: 1,
		paddingHorizontal: 20,
	},
	adminItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	adminItemLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	avatarContainer: {
		width: 56,
		height: 56,
		borderRadius: 28,
		overflow: 'hidden',
		backgroundColor: '#E0E0E0',
	},
	avatar: {
		width: '100%',
		height: '100%',
	},
	adminItemInfo: {
		marginLeft: 12,
		flex: 1,
	},
	adminName: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.textPrimary,
		marginBottom: 6,
	},
	removeButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.removeButton,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 16,
		gap: 4,
	},
	removeIcon: {
		width: 14,
		height: 14,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 7,
		borderColor: COLORS.removeButtonText,
	},
	removeIconLine: {
		width: 7,
		height: 1,
		backgroundColor: COLORS.removeButtonText,
		borderRadius: 1,
	},
	removeButtonText: {
		fontSize: 13,
		fontWeight: '500',
		color: COLORS.removeButtonText,
	},
	emptyState: {
		paddingVertical: 40,
		alignItems: 'center',
	},
	emptyStateText: {
		fontSize: 16,
		color: COLORS.textSecondary,
	},
})
