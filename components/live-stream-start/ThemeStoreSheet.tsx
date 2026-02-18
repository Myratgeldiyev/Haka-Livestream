import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Animated,
	BackHandler,
	Dimensions,
	Easing,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BackArrowIcon } from '../ui/icons/chat'
import GoldIcon from '../ui/icons/live-stream/GoldIcon'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const ANIMATION_DURATION = 300
const BOTTOM_RADIUS = 24
const STATUSBAR_HEIGHT =
	Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight ?? 24) + 10

const COLORS = {
	background: '#1A1533',
	cardBackground: '#38334C',
	overlay: 'rgba(0, 0, 0, 0.5)',
	textPrimary: '#FFFFFF',
	textSecondary: 'rgba(255, 255, 255, 0.6)',
	tabActive: '#fff',
	tabActiveText: '#1A1A1A',
	coinGold: '#FFB800',
}

const MAIN_TABS = ['Store', 'Mine', 'Box'] as const
const FILTER_TABS = [
	'Entry',
	'Frame',
	'Chat Bubble',
	'Theme',
	'Special ID',
	'Profile Card',
] as const

interface ThemeStoreSheetProps {
	visible: boolean
	onClose: () => void
}

interface ThemeCardProps {
	title: string
	price: string
}

function ChevronDownPlaceholder() {
	return (
		<View style={styles.chevronDown}>
			<Text style={styles.chevronDownText}>∨</Text>
		</View>
	)
}

function ThemeCard({ title, price }: ThemeCardProps) {
	return (
		<View style={styles.themeCard}>
			<View style={styles.themePreview} />
			<Text style={styles.themeTitle}>{title}</Text>
			<View style={styles.priceRow}>
				<GoldIcon />
				<Text style={styles.priceText}>{price}</Text>
			</View>
		</View>
	)
}

export function ThemeStoreSheet({ visible, onClose }: ThemeStoreSheetProps) {
	const insets = useSafeAreaInsets()
	const [modalVisible, setModalVisible] = useState(false)
	const [activeMainTab, setActiveMainTab] =
		useState<(typeof MAIN_TABS)[number]>('Store')
	const [activeFilterTab, setActiveFilterTab] =
		useState<(typeof FILTER_TABS)[number]>('Theme')
	const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current
	const overlayOpacity = useRef(new Animated.Value(0)).current

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
				toValue: SCREEN_HEIGHT,
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
			translateY.setValue(SCREEN_HEIGHT)
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

	const themeItems = [
		{ title: 'lorem Ipsum', price: '15,000' },
		{ title: 'lorem Ipsum', price: '15,000' },
		{ title: 'lorem Ipsum', price: '15,000' },
		{ title: 'lorem Ipsum', price: '15,000' },
		{ title: 'lorem Ipsum', price: '15,000' },
		{ title: 'lorem Ipsum', price: '15,000' },
	]

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
					backgroundColor={'white'}
					barStyle='light-content'
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
							<BackArrowIcon color={'#fff'} />
						</Pressable>

						<View style={styles.mainTabs}>
							{MAIN_TABS.map(tab => (
								<Pressable
									key={tab}
									style={styles.mainTab}
									onPress={() => setActiveMainTab(tab)}
								>
									<Text
										style={[
											styles.mainTabText,
											activeMainTab === tab && styles.mainTabTextActive,
										]}
									>
										{tab}
									</Text>
								</Pressable>
							))}
						</View>

						<Pressable style={styles.levelButton}>
							<Text style={styles.levelText}>Level</Text>
							<ChevronDownPlaceholder />
						</Pressable>
					</View>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={styles.filterTabsContainer}
						contentContainerStyle={styles.filterTabsContent}
					>
						{FILTER_TABS.map(tab => (
							<Pressable
								key={tab}
								style={[
									styles.filterTab,
									activeFilterTab === tab && styles.filterTabActive,
								]}
								onPress={() => setActiveFilterTab(tab)}
							>
								<Text
									style={[
										styles.filterTabText,
										activeFilterTab === tab && styles.filterTabTextActive,
									]}
								>
									{tab}
								</Text>
							</Pressable>
						))}
					</ScrollView>

					<ScrollView
						style={styles.content}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={[
							styles.gridContainer,
							{ paddingBottom: insets.bottom + 24 },
						]}
					>
						{themeItems.map((item, index) => (
							<ThemeCard key={index} title={item.title} price={item.price} />
						))}
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
		height: SCREEN_HEIGHT,
		backgroundColor: COLORS.background,
		borderTopLeftRadius: BOTTOM_RADIUS,
		borderTopRightRadius: BOTTOM_RADIUS,
		paddingTop: 16,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	mainTabs: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 24,
	},
	mainTab: {
		paddingVertical: 2,
	},
	mainTabText: {
		fontSize: 16,
		fontWeight: '500',
		color: COLORS.textSecondary,
	},
	mainTabTextActive: {
		color: COLORS.textPrimary,

		fontWeight: '600',
	},
	levelButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	levelText: {
		fontSize: 14,
		fontWeight: '500',
		color: COLORS.textPrimary,
	},
	chevronDown: {
		width: 16,
		height: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	chevronDownText: {
		fontSize: 12,
		color: COLORS.textPrimary,
	},
	filterTabsContainer: {
		maxHeight: 44,
		marginBottom: 16,
	},
	filterTabsContent: {
		paddingHorizontal: 16,
		gap: 8,
		alignItems: 'center',
	},
	filterTab: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
	},
	filterTabActive: {
		backgroundColor: COLORS.tabActive,
	},
	filterTabText: {
		fontSize: 14,
		fontWeight: '500',
		color: COLORS.textPrimary,
	},
	filterTabTextActive: {
		color: COLORS.tabActiveText,
	},
	content: {
		flex: 1,
	},
	gridContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 16,
		gap: 12,
	},
	themeCard: {
		width: '48%',
		backgroundColor: COLORS.cardBackground,
		borderRadius: 16,
		overflow: 'hidden',
		paddingBottom: 16,
	},
	themePreview: {
		width: '100%',
		aspectRatio: 1,
		backgroundColor: COLORS.cardBackground,
	},
	themeTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: COLORS.textPrimary,
		textAlign: 'center',
		marginTop: 12,
		marginBottom: 8,
	},
	priceRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
	},
	coinIcon: {
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: COLORS.coinGold,
	},
	priceText: {
		fontSize: 14,
		fontWeight: '600',
		color: COLORS.textPrimary,
	},
})
