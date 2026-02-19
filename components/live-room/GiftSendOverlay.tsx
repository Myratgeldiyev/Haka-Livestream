import { fontSizes, fontWeights } from '@/constants/typography'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Animated,
	BackHandler,
	Easing,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import GiftMicIcon from '../ui/icons/live-stream/GiftMicIcon'
import GoldIcon from '../ui/icons/live-stream/GoldIcon'
import RightArrowIcon from '../ui/icons/profile-header/right-arrow'

const ANIMATION_DURATION = 280
const OVERLAY_HEIGHT_RATIO = 0.68

export interface GiftSendOverlayProps {
	visible: boolean
	onClose: () => void
}

const CATEGORIES = ['Bag', 'Hot', 'Lucky', 'Event', 'SVIP', 'Customized']
const QUANTITIES = [1, 10, 20, 50]

export function GiftSendOverlay({ visible, onClose }: GiftSendOverlayProps) {
	const { width: windowWidth, height: windowHeight } = useWindowDimensions()
	const insets = useSafeAreaInsets()
	const overlayHeight = windowHeight * OVERLAY_HEIGHT_RATIO

	const panelPaddingH = 16
	const avatarRowPaddingH = 10
	const avatarGap = 12
	const allMarginLeft = 8
	const numAvatarItems = 6 // 5 avatars + All
	const availableAvatarWidth =
		windowWidth -
		panelPaddingH * 2 -
		avatarRowPaddingH * 2 -
		avatarGap * (numAvatarItems - 1) -
		allMarginLeft
	const avatarSize = Math.min(
		44,
		Math.max(32, Math.floor(availableAvatarWidth / numAvatarItems)),
	)
	// Responsive: gift area height scales with overlay so it never breaks layout
	const giftAreaMinHeight = Math.min(
		140,
		Math.max(80, Math.floor(overlayHeight * 0.2)),
	)
	// Responsive: category gap so horizontal scroll doesn't look too tight on small screens
	const categoryGap = Math.min(20, Math.max(12, Math.floor(windowWidth * 0.04)))

	const [modalVisible, setModalVisible] = useState(false)
	const [selectedQuantity, setSelectedQuantity] = useState(1)
	const isClosingRef = useRef(false)

	const translateY = useRef(new Animated.Value(overlayHeight)).current
	const backdropOpacity = useRef(new Animated.Value(0)).current

	const animateOpen = useCallback(() => {
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: 0,
				duration: ANIMATION_DURATION,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.timing(backdropOpacity, {
				toValue: 1,
				duration: ANIMATION_DURATION,
				useNativeDriver: true,
			}),
		]).start()
	}, [translateY, backdropOpacity])

	const animateClose = useCallback(
		(onComplete: () => void) => {
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: overlayHeight,
					duration: ANIMATION_DURATION,
					easing: Easing.in(Easing.cubic),
					useNativeDriver: true,
				}),
				Animated.timing(backdropOpacity, {
					toValue: 0,
					duration: ANIMATION_DURATION,
					useNativeDriver: true,
				}),
			]).start(() => {
				onComplete()
			})
		},
		[translateY, backdropOpacity, overlayHeight],
	)

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
			translateY.setValue(overlayHeight)
			backdropOpacity.setValue(0)
			setModalVisible(true)
			requestAnimationFrame(() => animateOpen())
		} else if (!visible && modalVisible && !isClosingRef.current) {
			handleClose()
		}
	}, [
		visible,
		modalVisible,
		overlayHeight,
		translateY,
		backdropOpacity,
		animateOpen,
		handleClose,
	])

	useEffect(() => {
		if (!modalVisible) return
		const sub = BackHandler.addEventListener('hardwareBackPress', () => {
			handleClose()
			return true
		})
		return () => sub.remove()
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
				<Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
					<Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
				</Animated.View>

				<Animated.View
					style={[
						styles.panel,
						{
							height: overlayHeight,
							paddingBottom: Math.max(insets.bottom, 16),
							transform: [{ translateY }],
						},
					]}
				>
					<View style={styles.avatarRow}>
						{[1, 2, 3, 4, 5].map(i => (
							<View
								key={i}
								style={[
									styles.avatar,
									{
										width: avatarSize,
										height: avatarSize,
										borderRadius: avatarSize / 2,
									},
									i === 1 && styles.avatarSelected,
								]}
							/>
						))}
						<View style={[styles.allWrap, { marginLeft: avatarGap }]}>
							<View
								style={[
									styles.allIcon,
									{
										width: avatarSize,
										height: avatarSize,
										borderRadius: avatarSize / 2,
									},
								]}
							>
								<GiftMicIcon />
							</View>
							<Text style={styles.allLabel}>All</Text>
						</View>
					</View>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={styles.categoriesScroll}
						contentContainerStyle={[
							styles.categoriesContent,
							{ gap: categoryGap },
						]}
					>
						{CATEGORIES.map(cat => (
							<Text key={cat} style={styles.categoryLabel}>
								{cat}
							</Text>
						))}
					</ScrollView>

					<View style={[styles.giftArea, { minHeight: giftAreaMinHeight }]} />

					<View style={styles.bottomBar}>
						<Pressable style={styles.balanceRow}>
							<GoldIcon />
							<Text style={styles.balanceText}>100</Text>
							<RightArrowIcon color='#fff' />
						</Pressable>
						{/* Responsive: flex row instead of absolute so quantity + send button always fit */}
						<View style={styles.bottomBarRight}>
							<View style={styles.quantityRow}>
								{QUANTITIES.map(q => (
									<Pressable
										key={q}
										style={[
											styles.quantityChip,
											selectedQuantity === q && styles.quantityChipSelected,
										]}
										onPress={() => setSelectedQuantity(q)}
									>
										<Text
											style={[
												styles.quantityText,
												selectedQuantity === q && styles.quantityTextSelected,
											]}
										>
											{q}
										</Text>
									</Pressable>
								))}
							</View>
							<Pressable style={styles.sendButton}>
								<Text style={styles.sendButtonText}>Send</Text>
							</Pressable>
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
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	panel: {
		backgroundColor: '#25203C',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingHorizontal: 16,
		paddingTop: 16,
		overflow: 'hidden',
		minHeight: 0,
	},
	avatarRow: {
		backgroundColor: '#1D192F',
		borderRadius: 20,
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 6,
		gap: 12,
		marginBottom: 16,
	},
	avatar: {
		backgroundColor: 'rgba(255,255,255,0.15)',
	},
	avatarSelected: {
		borderWidth: 2,
		borderColor: '#22C55E',
	},
	allWrap: {
		alignItems: 'center',
		position: 'relative',
	},
	allIcon: {
		backgroundColor: 'rgba(255,255,255,0.2)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	allLabel: {
		position: 'absolute',
		fontSize: fontSizes.xs,
		bottom: -5,
		backgroundColor: '#fff',
		borderRadius: 10,
		paddingHorizontal: 6,
		paddingVertical: 2,
		color: '#000',
		fontWeight: fontWeights.medium,
	},
	categoriesScroll: {
		marginBottom: 12,
	},
	categoriesContent: {
		gap: 20,
		paddingHorizontal: 10,
		flexDirection: 'row',
		paddingRight: 16,
	},
	categoryLabel: {
		fontSize: fontSizes.sm,
		color: '#FFFFFF',
		fontWeight: fontWeights.medium,
	},
	giftArea: {
		flex: 1,
		minHeight: 120,
		marginBottom: 16,
	},
	bottomBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 12,
		flexWrap: 'wrap',
	},
	balanceRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	balanceText: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.semibold,
		color: '#fff',
	},
	bottomBarRight: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		flexShrink: 0,
	},
	quantityRow: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1D192F',
		paddingRight: 5,
		borderRadius: 20,
		gap: 8,
	},
	quantityChip: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 8,
	},
	quantityChipSelected: {
		borderRadius: 20,
		paddingHorizontal: 18,
		backgroundColor: '#5F22D9',
	},
	quantityText: {
		fontSize: fontSizes.sm,
		color: '#FFFFFF',
		fontWeight: fontWeights.medium,
	},
	quantityTextSelected: {
		color: '#FFFFFF',
	},
	sendButton: {
		backgroundColor: '#5F22D9',
		paddingVertical: 10,
		paddingHorizontal: 24,
		borderRadius: 22,
	},
	sendButtonText: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.semibold,
		color: '#FFFFFF',
	},
})
