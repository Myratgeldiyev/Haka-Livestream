import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Animated,
	BackHandler,
	Easing,
	Image,
	Modal,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CoinIcon from '../ui/icons/withdrawal/CoinIcon'
import { BackArrowIcon } from '../ui/icons/chat'
import RoomChatIcon from '../ui/icons/live-stream-view/roomChatIcon'
import RoomLiveIcon from '../ui/icons/live-stream-view/roomLiveIcon'

const ANIMATION_DURATION = 300
const SHEET_HEIGHT = 680
const BOTTOM_RADIUS = 24

const COLORS = {
	background: '#2A2444',
	cardBackground: '#E8E4EC',
	overlay: 'rgba(0, 0, 0, 0.5)',
	textPrimary: '#FFFFFF',
	textDark: '#1A1A2E',
	textMuted: '#6B6B7B',
	sectionIconPink: '#FF5C8D',
	sectionIconYellow: '#FFD93D',
	coinRed: '#FF4757',
}

interface RoomDataSheetProps {
	roomId?: string
	description?: string
	created_at?: string
	visible: boolean
	onClose: () => void
	roomImage?: string
}

function ChevronDownPlaceholder() {
	return (
		<View style={styles.chevronIcon}>
			<Text style={styles.chevronText}>∨</Text>
		</View>
	)
}

export function RoomDataSheet({
	visible,
	onClose,
	roomId,
	created_at,
	description,
	roomImage,
}: RoomDataSheetProps) {
	const insets = useSafeAreaInsets()
	const [modalVisible, setModalVisible] = useState(false)
	const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current
	const overlayOpacity = useRef(new Animated.Value(0)).current
	const formattedDate = created_at ? created_at.split('T')[0] : ''

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
					barStyle='light-content'
					translucent
				/>

				<Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
					<Pressable
						style={styles.overlayPressable}
						onPress={handleOverlayPress}
					/>
				</Animated.View>

				<Animated.View
					style={[
						styles.sheet,
						{ paddingBottom: insets.bottom + 24, transform: [{ translateY }] },
					]}
				>
					<View style={styles.header}>
						<Pressable style={styles.backButton} onPress={handleBackPress}>
							<BackArrowIcon />
						</Pressable>
						<Text style={styles.headerTitle}>Edit Info</Text>
						<View style={styles.headerSpacer} />
					</View>

					<View style={styles.profileSection}>
						<View style={styles.avatarContainer}>
							<Image
								source={
									roomImage
										? { uri: roomImage }
										: require('../../assets/images/stream-img.png')
								}
							/>
						</View>
						<View style={styles.profileInfo}>
							<Text style={styles.profileName}>{description}</Text>
							<Text style={styles.roomId}>Room ID: {roomId}</Text>
						</View>
						<Pressable style={styles.dateSelector}>
							<Text style={styles.dateText}>{formattedDate}</Text>
							<ChevronDownPlaceholder />
						</Pressable>
					</View>

					<View style={styles.sectionHeader}>
						<RoomLiveIcon />
						<Text style={styles.sectionTitle}>Live Room</Text>
					</View>

					<View style={styles.card}>
						<View style={styles.cardRow}>
							<View style={styles.cardColumn}>
								<Text style={styles.cardLabel}>Live Duration</Text>
								<Text style={styles.cardValue}>0 mins</Text>
							</View>
							<View style={styles.cardColumnRight}>
								<Text style={styles.cardLabel}>Live room (myself)</Text>
								<View style={styles.valueWithIcon}>
									<CoinIcon />
									<Text style={styles.cardValue}>0</Text>
								</View>
							</View>
						</View>
						<View style={styles.cardRowBottom}>
							<Text style={styles.cardLabel}>PK times</Text>
							<Text style={styles.cardValue}>0</Text>
						</View>
					</View>

					<View style={styles.sectionHeader}>
						<RoomChatIcon />
						<Text style={styles.sectionTitle}>Chat Room</Text>
					</View>

					<View style={styles.card}>
						<View style={styles.cardRow}>
							<View style={styles.cardColumn}>
								<Text style={styles.cardLabel}>Mic Duration</Text>
								<Text style={styles.cardValue}>0 mins</Text>
							</View>
							<View style={styles.cardColumnRight}>
								<Text style={styles.cardLabel}>Chat room gift (room)</Text>
								<View style={styles.valueWithIcon}>
									<CoinIcon />
									<Text style={styles.cardValue}>0</Text>
								</View>
							</View>
						</View>
						<View style={styles.cardRowBottom}>
							<Text style={styles.cardLabel}>Chat room (myself)</Text>
							<Text style={styles.cardValue}>0</Text>
						</View>
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
		marginBottom: 10,
		paddingHorizontal: 20,
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	backIcon: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backIconText: {
		fontSize: 22,
		color: COLORS.textPrimary,
		fontWeight: '300',
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
	headerSpacer: {
		width: 40,
	},
	profileSection: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		backgroundColor: '#38334C',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 28,
	},
	avatarContainer: {
		width: 80,
		height: 80,
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: '#3D3659',
	},
	avatar: {
		width: '100%',
		height: '100%',
	},
	profileInfo: {
		flex: 1,
		marginLeft: 16,
	},
	profileName: {
		fontSize: 18,
		fontWeight: '600',
		color: COLORS.textPrimary,
		marginBottom: 4,
	},
	roomId: {
		fontSize: 14,
		color: '#fff',
	},
	dateSelector: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	dateText: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
	chevronIcon: {
		width: 16,
		height: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	chevronText: {
		fontSize: 14,
		color: COLORS.textPrimary,
	},
	sectionHeader: {
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
		gap: 10,
	},
	sectionIcon: {
		width: 32,
		height: 32,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	liveIconInner: {
		width: 16,
		height: 12,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		borderRadius: 2,
	},
	chatIconInner: {
		width: 16,
		height: 14,
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		borderRadius: 8,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
	card: {
		marginHorizontal: 20,

		backgroundColor: '#38334C',
		borderRadius: 16,
		padding: 20,
		marginBottom: 24,
	},
	cardRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	cardColumn: {
		flex: 1,
	},
	cardColumnRight: {
		flex: 1,
		alignItems: 'flex-end',
	},
	cardLabel: {
		fontSize: 14,
		color: '#fff',
		marginBottom: 6,
	},
	cardValue: {
		fontSize: 16,
		fontWeight: '600',
		color: '#fff',
	},
	valueWithIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	coinIcon: {
		width: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: COLORS.coinRed,
	},

	cardRowBottom: {
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: 'rgba(0, 0, 0, 0.06)',
	},
})
