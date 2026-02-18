import { RoomResponse } from '@/api/live-chat/room.types'
import type { RoomPlayUserRole } from '@/components/room-play/room-play.types'
import { useLiveChatStore } from '@/store/liveChat.store'
import { useLiveStreamStore } from '@/store/liveStream.store'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useEffect } from 'react'
import {
	Dimensions,
	Image,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import Animated, {
	Easing,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'
import BadgeIcon from '../ui/icons/live-stream/badgeIcon'
import ChatStatusIcon from '../ui/icons/live-stream/chatStatusIcon'
import CopyPasteIcon from '../ui/icons/live-stream/copyPasteIcon'
import SettingTopUserIcon from '../ui/icons/live-stream/settingTopUserIcon'
import ShareTopInfoIcon from '../ui/icons/live-stream/shareTopUserInfoIcon'
import { EditInfoBottomSheetStart } from './EditInfoBottomSheetStart'
import { MemberSection } from './MemberSection'
import { PasswordSheet } from './PasswordSheet'
import { RoomAdminSheet } from './RoomAdminSheet'
import { RoomDataSheet } from './RoomDataSheet'
import { RoomTypeSheet } from './RoomTypeSheet'
import { ThemeStoreSheet } from './ThemeStoreSheet'

const ANIMATION_DURATION = 300
const SHEET_HEIGHT_MAX = 580
const BORDER_RADIUS = 20
const CUSTOMIZATION_ICON_SIZE = 48

const GLASS_BASE = '#4B4367'
const GLASS_LIGHT = '#5A5278'
const GLASS_DARK = '#3D3555'
const GLASS_TRANSPARENT = 'rgba(75, 67, 103, 0.92)'
const TOP_REFLECTION = 'rgba(255, 255, 255, 0.22)'
const TOP_REFLECTION_MID = 'rgba(255, 255, 255, 0.06)'
const TOP_REFLECTION_END = 'rgba(255, 255, 255, 0)'
const HOTSPOT = 'rgba(255, 255, 255, 0.12)'
const HOTSPOT_END = 'rgba(255, 255, 255, 0)'
const EDGE_STROKE = 'rgba(255, 255, 255, 0.35)'
const SHADOW_COLOR = '#1B1628'

function GlassEdgeArc({ size }: { size: number }) {
	const r = size / 2
	const pathLeftTop = `M 0 ${r} A ${r} ${r} 0 0 1 ${r} 0`
	const pathRightBottom = `M ${size} ${r} A ${r} ${r} 0 0 1 ${r} ${size}`
	return (
		<Svg
			width={size}
			height={size}
			style={StyleSheet.absoluteFill}
			pointerEvents='none'
			viewBox={`0 0 ${size} ${size}`}
		>
			<Path
				d={pathLeftTop}
				fill='none'
				stroke={EDGE_STROKE}
				strokeWidth={1.25}
				strokeLinecap='round'
			/>
			<Path
				d={pathRightBottom}
				fill='none'
				stroke={EDGE_STROKE}
				strokeWidth={1.25}
				strokeLinecap='round'
			/>
		</Svg>
	)
}

function GlassIconWrap({ children }: { children: React.ReactNode }) {
	const size = CUSTOMIZATION_ICON_SIZE
	return (
		<View
			style={[
				glassIconStyles.wrap,
				{ width: size, height: size, borderRadius: size / 2 },
			]}
		>
			<LinearGradient
				colors={[GLASS_LIGHT, GLASS_BASE, GLASS_TRANSPARENT, GLASS_DARK]}
				locations={[0, 0.35, 0.6, 1]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={[StyleSheet.absoluteFill, glassIconStyles.radius]}
			/>
			<View
				style={[
					StyleSheet.absoluteFill,
					glassIconStyles.radius,
					glassIconStyles.overlay,
				]}
			>
				<LinearGradient
					colors={[TOP_REFLECTION, TOP_REFLECTION_MID, TOP_REFLECTION_END]}
					locations={[0, 0.4, 1]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					style={StyleSheet.absoluteFill}
				/>
			</View>
			<View
				style={[
					StyleSheet.absoluteFill,
					glassIconStyles.radius,
					glassIconStyles.overlay,
				]}
			>
				<LinearGradient
					colors={[HOTSPOT, HOTSPOT_END]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={StyleSheet.absoluteFill}
				/>
			</View>
			<GlassEdgeArc size={size} />
			<View style={glassIconStyles.inner} pointerEvents='none'>
				{children}
			</View>
		</View>
	)
}

const glassIconStyles = StyleSheet.create({
	wrap: {
		overflow: 'hidden',
		...Platform.select({
			ios: {
				shadowColor: SHADOW_COLOR,
				shadowOffset: { width: 4, height: 6 },
				shadowOpacity: 0.5,
				shadowRadius: 8,
			},
			android: { elevation: 8 },
		}),
	},
	radius: { borderRadius: 9999 },
	overlay: { overflow: 'hidden', borderRadius: 9999 },
	inner: {
		...StyleSheet.absoluteFillObject,
		alignItems: 'center',
		justifyContent: 'center',
	},
})

const COLORS = {
	sheetBackground: '#25203C',
	cardBackground: '#2A2444',
	border: '#3D3659',
	overlay: 'rgba(0, 0, 0, 0.5)',
	textPrimary: '#FFFFFF',
	textSecondary: 'rgba(255, 255, 255, 0.6)',
	chatBadge: '#FF69B4',
}

const SPACING = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
}

type TabType = 'profile' | 'member'

interface TopUserInfoSheetProps {
	visible: boolean
	onClose: () => void
	data: RoomResponse | null
	/** When provided (live stream), overrides role and uses stream API for updates. */
	userRoleOverride?: RoomPlayUserRole
}

export function TopUserInfoSheet({
	visible,
	onClose,
	data,
	userRoleOverride,
}: TopUserInfoSheetProps) {
	const updateRoom = useLiveChatStore(s => s.updateRoom)
	const chatRole = useLiveChatStore(s => s.role)
	const updateStream = useLiveStreamStore(s => s.updateStream)
	const role = userRoleOverride ?? chatRole

	const [activeTab, setActiveTab] = React.useState<TabType>('profile')
	const [modalVisible, setModalVisible] = React.useState(false)
	const [roomTypeSheetVisible, setRoomTypeSheetVisible] = React.useState(false)
	const [editInfoSheetVisible, setEditInfoSheetVisible] = React.useState(false)
	const [roomDataSheetVisible, setRoomDataSheetVisible] = React.useState(false)
	const [roomAdminSheetVisible, setRoomAdminSheetVisible] =
		React.useState(false)
	const [themeStoreSheetVisible, setThemeStoreSheetVisible] =
		React.useState(false)
	const [passwordSheetVisible, setPasswordSheetVisible] = React.useState(false)
	const [roomCustomizationVisible, setRoomCustomizationVisible] =
		React.useState(false)
	const animationProgress = useSharedValue(0)
	const insets = useSafeAreaInsets()
	const windowHeight = Dimensions.get('window').height
	const sheetHeight = Math.min(SHEET_HEIGHT_MAX, windowHeight - insets.top - 60)
	const sheetHeightSv = useSharedValue(sheetHeight)
	React.useEffect(() => {
		sheetHeightSv.value = sheetHeight
	}, [sheetHeight, sheetHeightSv])

	// Kullanıcının owner veya admin olup olmadığını kontrol et
	const isOwnerOrAdmin = role === 'owner' || role === 'admin'

	const handleEditSave = useCallback(
		async ({
			roomName,
			announcement,
		}: {
			roomName: string
			announcement: string
		}) => {
			if (!data?.id) return

			if (userRoleOverride !== undefined) {
				await updateStream(data.id, {
					title: roomName,
					description: announcement,
				})
			} else {
				await updateRoom(data.id, {
					title: roomName,
					description: announcement,
				})
			}

			setEditInfoSheetVisible(false)
		},
		[data?.id, userRoleOverride, updateRoom, updateStream],
	)

	useEffect(() => {
		if (visible) {
			setModalVisible(true)
			animationProgress.value = withTiming(1, {
				duration: ANIMATION_DURATION,
				easing: Easing.out(Easing.cubic),
			})
		} else {
			animationProgress.value = withTiming(
				0,
				{
					duration: ANIMATION_DURATION,
					easing: Easing.in(Easing.cubic),
				},
				finished => {
					if (finished) {
						runOnJS(setModalVisible)(false)
					}
				},
			)
		}
	}, [visible, animationProgress])

	const handleClose = useCallback(() => {
		animationProgress.value = withTiming(
			0,
			{
				duration: ANIMATION_DURATION,
				easing: Easing.in(Easing.cubic),
			},
			finished => {
				if (finished) {
					runOnJS(onClose)()
					runOnJS(setModalVisible)(false)
				}
			},
		)
	}, [animationProgress, onClose])

	const sheetAnimatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					animationProgress.value,
					[0, 1],
					[sheetHeightSv.value, 0],
				),
			},
		],
	}))

	const overlayAnimatedStyle = useAnimatedStyle(() => ({
		opacity: animationProgress.value,
	}))

	const handleSheetPress = useCallback(() => {}, [])

	return (
		<Modal
			visible={modalVisible}
			transparent
			animationType='none'
			statusBarTranslucent
			onRequestClose={handleClose}
		>
			<View style={styles.modalContainer}>
				<StatusBar
					backgroundColor={COLORS.sheetBackground}
					barStyle='light-content'
					translucent
				/>

				<Animated.View style={[styles.overlay, overlayAnimatedStyle]}>
					<Pressable style={styles.overlayPressable} onPress={handleClose} />
				</Animated.View>

				<Animated.View
					style={[
						styles.sheet,
						{
							height: sheetHeight,
							paddingBottom: insets.bottom > 0 ? insets.bottom : 24,
						},
						sheetAnimatedStyle,
					]}
				>
					<Pressable style={styles.sheetPressable} onPress={handleSheetPress}>
						<View style={styles.tabsContainer}>
							<Pressable
								style={styles.tab}
								onPress={() => setActiveTab('profile')}
							>
								<Text
									style={[
										styles.tabText,
										activeTab === 'profile' && styles.tabTextActive,
									]}
								>
									Profile
								</Text>
								{activeTab === 'profile' && (
									<View style={styles.tabIndicator} />
								)}
							</Pressable>

							<Pressable
								style={styles.tab}
								onPress={() => setActiveTab('member')}
							>
								<Text
									style={[
										styles.tabText,
										activeTab === 'member' && styles.tabTextActive,
									]}
								>
									Member
								</Text>
								{activeTab === 'member' && <View style={styles.tabIndicator} />}
							</Pressable>
						</View>

						<ScrollView
							style={styles.scrollContent}
							contentContainerStyle={[
								styles.scrollContentContainer,
								{ paddingBottom: insets.bottom + 24 },
							]}
							showsVerticalScrollIndicator={false}
							keyboardShouldPersistTaps='handled'
						>
							{activeTab === 'profile' && (
								<View style={styles.content}>
									<View style={styles.profileSection}>
										<View style={styles.avatarContainer}>
											<Image
												source={
													data?.room_image
														? { uri: data.room_image }
														: require('../../assets/images/stream-img.png')
												}
												style={styles.avatar}
											/>
										</View>

										<View style={styles.profileInfo}>
											<View style={styles.usernameRow}>
												<Text style={styles.username}>{data?.title}</Text>
												<ChatStatusIcon />
											</View>

											<View style={styles.idRow}>
												<Text style={styles.userId}>
													ID: {data?.owner?.user_id}
												</Text>
												<CopyPasteIcon />
											</View>

											<View style={styles.actionIcons}>
												<BadgeIcon />
												{isOwnerOrAdmin && (
													<Pressable
														onPress={() =>
															setRoomCustomizationVisible(prev => !prev)
														}
													>
														<SettingTopUserIcon />
													</Pressable>
												)}
												<ShareTopInfoIcon />
											</View>
										</View>
									</View>

									<View style={styles.roomOwnerCard}>
										<View style={styles.roomOwnerAvatar}>
											<Image
												source={
													data?.owner?.profile_picture
														? { uri: data.owner.profile_picture }
														: require('../../assets/images/stream-img.png')
												}
												style={styles.roomOwnerAvatarImage}
											/>
										</View>
										<View style={styles.roomOwnerInfo}>
											<Text style={styles.roomOwnerLabel}>Room Owner</Text>
											<Text style={styles.roomOwnerName}>
												{data?.owner?.username}
											</Text>
										</View>
									</View>

									<View style={styles.announcementSection}>
										<Text style={styles.announcementTitle}>Announcement</Text>
										<Text style={styles.announcementText}>
											{data?.description}
										</Text>
									</View>

									{isOwnerOrAdmin && roomCustomizationVisible && (
										<View style={styles.customizationSection}>
											<Text style={styles.customizationTitle}>
												Room Customization
											</Text>
											<View style={styles.customizationGrid}>
												<Pressable
													style={styles.gridItem}
													onPress={() => setRoomTypeSheetVisible(true)}
												>
													<Image
														source={require('@/assets/room-play/11.png')}
														style={{ width: 60, height: 48 }}
													/>
													<Text style={styles.rowText}>Settings</Text>
												</Pressable>

												<Pressable
													style={styles.gridItem}
													onPress={() => setEditInfoSheetVisible(true)}
												>
													<Image
														source={require('@/assets/room-play/12.png')}
														style={{ width: 60, height: 48 }}
													/>
													<Text style={styles.rowText}>Edit</Text>
												</Pressable>

												<Pressable
													style={styles.gridItem}
													onPress={() => setThemeStoreSheetVisible(true)}
												>
													<Image
														source={require('@/assets/room-play/13.png')}
														style={{ width: 60, height: 48 }}
													/>
													<Text style={styles.rowText}>Theme</Text>
												</Pressable>

												<Pressable
													style={styles.gridItem}
													onPress={() => setPasswordSheetVisible(true)}
												>
													<Image
														source={require('@/assets/room-play/14.png')}
														style={{ width: 60, height: 48 }}
													/>
													<Text style={styles.rowText}>Password</Text>
												</Pressable>

												<Pressable
													style={styles.gridItem}
													onPress={() => setRoomDataSheetVisible(true)}
												>
													<Image
														source={require('@/assets/room-play/15.png')}
														style={{ width: 60, height: 48 }}
													/>
													<Text style={styles.rowText}>Room data</Text>
												</Pressable>

												<View style={styles.gridItem}>
													<Image
														source={require('@/assets/room-play/16.png')}
														style={{ width: 60, height: 48 }}
													/>
													<Text style={styles.rowText}>Fan Badge</Text>
												</View>

												<Pressable
													style={styles.gridItem}
													onPress={() => setRoomAdminSheetVisible(true)}
												>
													<Image
														source={require('@/assets/room-play/17.png')}
														style={{ width: 60, height: 48 }}
													/>
													<Text style={styles.rowText}>Room admin</Text>
												</Pressable>
											</View>
										</View>
									)}
								</View>
							)}

							{activeTab === 'member' && (
								<View style={styles.memberContent}>
									<MemberSection />
								</View>
							)}
						</ScrollView>
					</Pressable>
				</Animated.View>

				<RoomTypeSheet
					isVisible={roomTypeSheetVisible}
					onClose={() => setRoomTypeSheetVisible(false)}
				/>

				<EditInfoBottomSheetStart
					initialAnnouncement={data?.description}
					initialRoomName={data?.title}
					profileImage={data?.room_image}
					roomId={data?.id}
					visible={editInfoSheetVisible}
					onSave={handleEditSave}
					onClose={() => setEditInfoSheetVisible(false)}
				/>

				<RoomDataSheet
					roomImage={data?.room_image}
					roomId={data?.id}
					description={data?.description}
					created_at={data?.created_at}
					visible={roomDataSheetVisible}
					onClose={() => setRoomDataSheetVisible(false)}
				/>

				<RoomAdminSheet
					roomId={data?.id}
					visible={roomAdminSheetVisible}
					onClose={() => setRoomAdminSheetVisible(false)}
				/>

				<ThemeStoreSheet
					visible={themeStoreSheetVisible}
					onClose={() => setThemeStoreSheetVisible(false)}
				/>

				<PasswordSheet
					visible={passwordSheetVisible}
					onClose={() => setPasswordSheetVisible(false)}
				/>
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
	overlayPressable: {
		flex: 1,
	},
	sheet: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: COLORS.sheetBackground,
		borderTopLeftRadius: BORDER_RADIUS,
		borderTopRightRadius: BORDER_RADIUS,
		paddingTop: 16,
		overflow: 'hidden',
	},
	sheetPressable: {
		flex: 1,
	},
	tabsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 40,
		marginBottom: SPACING.xl,
	},
	row: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},

	tab: {
		alignItems: 'center',
		paddingVertical: SPACING.sm,
	},
	tabText: {
		fontSize: 16,
		fontWeight: '500',
		color: COLORS.textSecondary,
	},
	tabTextActive: {
		color: COLORS.textPrimary,
		fontWeight: '600',
	},
	tabIndicator: {
		width: 40,
		height: 2,
		backgroundColor: COLORS.textPrimary,
		marginTop: SPACING.xs,
		borderRadius: 1,
	},
	scrollContent: {
		flex: 1,
	},
	scrollContentContainer: {
		flexGrow: 1,
	},
	content: {
		paddingHorizontal: SPACING.xl,
	},
	memberContent: {
		flex: 1,
	},
	profileSection: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		marginBottom: SPACING.lg,
	},
	avatarContainer: {
		width: 78,
		height: 78,
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: COLORS.cardBackground,
	},
	avatar: {
		width: '100%',
		height: '100%',
	},
	profileInfo: {
		marginLeft: SPACING.md,
		justifyContent: 'center',
	},
	usernameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.sm,
	},
	username: {
		fontSize: 18,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
	chatBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.chatBadge,
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderRadius: 12,
		gap: 4,
	},
	chatBadgeText: {
		fontSize: 12,
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
	idRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: SPACING.xs,
		gap: SPACING.sm,
	},
	userId: {
		fontSize: 14,
		color: COLORS.textSecondary,
	},
	copyButton: {
		padding: SPACING.xs,
	},
	actionIcons: {
		flexDirection: 'row',
		marginTop: SPACING.sm,
		gap: SPACING.md,
	},
	actionIcon: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: COLORS.cardBackground,
		justifyContent: 'center',
		alignItems: 'center',
	},
	roomOwnerCard: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#292440',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#000',
		padding: SPACING.md,
		marginBottom: SPACING.lg,
	},
	roomOwnerAvatar: {
		width: 50,
		height: 50,
		borderRadius: '100%',
		overflow: 'hidden',
		backgroundColor: COLORS.border,
	},
	roomOwnerAvatarImage: {
		width: '100%',
		height: '100%',
	},
	roomOwnerInfo: {
		marginLeft: SPACING.md,
	},
	roomOwnerLabel: {
		fontSize: 12,
		color: '#fff',
	},
	roomOwnerName: {
		fontSize: 14,
		fontWeight: '600',
		color: '#fff',
		marginTop: 2,
	},
	announcementSection: {
		marginBottom: SPACING.lg,
	},
	announcementTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: COLORS.textSecondary,
		marginBottom: SPACING.xs,
	},
	announcementText: {
		fontSize: 14,
		color: COLORS.textPrimary,
		lineHeight: 20,
	},
	customizationSection: {
		marginTop: SPACING.sm,
	},
	customizationTitle: {
		fontSize: 14,
		fontWeight: '700',
		color: COLORS.textPrimary,
		marginBottom: SPACING.lg,
	},

	customizationRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: SPACING.xl,
	},
	customizationItem: {
		alignItems: 'center',
		width: 70,
	},
	customizationIconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		borderWidth: 1,
		borderColor: COLORS.border,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: SPACING.sm,
	},
	customizationLabel: {
		fontSize: 11,
		color: COLORS.textPrimary,
		textAlign: 'center',
	},
	iconPlaceholder: {
		backgroundColor: COLORS.border,
	},
	memberPlaceholder: {
		fontSize: 16,
		color: COLORS.textSecondary,
		textAlign: 'center',
		marginTop: 40,
	},
	customizationGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		rowGap: SPACING.xl,
		columnGap: SPACING.xl,
	},

	gridItem: {
		width: '20%',
		alignItems: 'center',
		gap: SPACING.sm,
	},

	rowText: {
		fontSize: 12,
		color: '#fff',
		fontWeight: '500',
		textAlign: 'center',
	},
})
