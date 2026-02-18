import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	Dimensions,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BankIcon from '../ui/icons/coin-seller/BankIcon'
import BinanceIcon from '../ui/icons/coin-seller/binanceIcon'
import EpayIcon from '../ui/icons/coin-seller/epayIcon'
import UsdtIcon from '../ui/icons/coin-seller/usdtIcon'

type PaymentMethod = 'epay' | 'binance' | 'usdt' | 'bank'

interface PaymentMethodSheetProps {
	visible: boolean
	onClose: () => void
	onConfirm: (method: PaymentMethod) => void
	selectedMethod?: PaymentMethod
}

const SCREEN_HEIGHT = Dimensions.get('window').height

const PAYMENT_METHODS: {
	id: PaymentMethod
	label: string
	icon: React.ReactNode
}[] = [
	{ id: 'epay', label: 'Epay', icon: <EpayIcon /> },
	{ id: 'binance', label: 'BINANCE (BEP20)', icon: <BinanceIcon /> },
	{ id: 'usdt', label: 'USDT', icon: <UsdtIcon /> },
	{ id: 'bank', label: 'BANK TRANSFER)', icon: <BankIcon /> },
]

export function PaymentMethodSheet({
	visible,
	onClose,
	onConfirm,
	selectedMethod: initialMethod = 'epay',
}: PaymentMethodSheetProps) {
	const insets = useSafeAreaInsets()
	const [selectedMethod, setSelectedMethod] =
		useState<PaymentMethod>(initialMethod)
	const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current
	const fadeAnim = useRef(new Animated.Value(0)).current

	useEffect(() => {
		if (visible) {
			setSelectedMethod(initialMethod)
			Animated.parallel([
				Animated.timing(slideAnim, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start()
		} else {
			Animated.parallel([
				Animated.timing(slideAnim, {
					toValue: SCREEN_HEIGHT,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start()
		}
	}, [visible, initialMethod, slideAnim, fadeAnim])

	const handleConfirm = () => {
		onConfirm(selectedMethod)
		onClose()
	}

	const handleOverlayPress = () => {
		Animated.parallel([
			Animated.timing(slideAnim, {
				toValue: SCREEN_HEIGHT,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start(() => {
			onClose()
		})
	}

	return (
		<Modal
			visible={visible}
			transparent
			animationType='none'
			onRequestClose={handleOverlayPress}
		>
			<View style={styles.modalContainer}>
				<Animated.View
					style={[
						styles.overlay,
						{
							opacity: fadeAnim,
						},
					]}
				>
					<Pressable
						style={styles.overlayPressable}
						onPress={handleOverlayPress}
					/>
				</Animated.View>

				<Animated.View
					style={[
						styles.sheetContainer,
						{
							transform: [{ translateY: slideAnim }],
							paddingBottom: insets.bottom + spacing.lg,
						},
					]}
				>
					<View style={styles.header}>
						<Pressable onPress={handleOverlayPress} style={styles.headerButton}>
							<Text style={styles.cancelText}>Cancel</Text>
						</Pressable>
						<Text style={styles.headerTitle}>Payment Method</Text>
						<Pressable onPress={handleConfirm} style={styles.headerButton}>
							<Text style={styles.confirmText}>Confirm</Text>
						</Pressable>
					</View>

					<Text style={styles.subtitle}>Select payment method</Text>

					<View style={styles.methodsList}>
						{PAYMENT_METHODS.map(method => (
							<Pressable
								key={method.id}
								style={styles.methodItem}
								onPress={() => setSelectedMethod(method.id)}
							>
								<View style={styles.methodLeft}>
									{method.icon}
									<Text style={styles.methodLabel}>{method.label}</Text>
								</View>
								<View
									style={[
										styles.radioOuter,
										selectedMethod === method.id && styles.radioOuterSelected,
									]}
								>
									{selectedMethod === method.id && (
										<View style={styles.radioInner} />
									)}
								</View>
							</Pressable>
						))}
					</View>
				</Animated.View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	overlayPressable: {
		flex: 1,
	},
	sheetContainer: {
		backgroundColor: '#FFF',
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: spacing.lg,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.md,
	},
	headerButton: {
		padding: spacing.sm,
	},
	cancelText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.regular,
		color: '#6B7280',
	},
	headerTitle: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	confirmText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: '#7C3AED',
	},
	subtitle: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.regular,
		color: '#6B7280',
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.lg,
	},
	methodsList: {
		paddingHorizontal: spacing.lg,
	},
	methodItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: spacing.lg,
	},
	methodLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.md,
	},
	methodLabel: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: '#000',
	},
	radioOuter: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: '#D1D5DB',
		alignItems: 'center',
		justifyContent: 'center',
	},
	radioOuterSelected: {
		borderColor: '#7C3AED',
		backgroundColor: '#7C3AED',
	},
	radioInner: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#FFF',
	},
	iconContainer: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: '#3B5998',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	epayTextContainer: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	},
	epayText: {
		fontSize: 16,
		fontWeight: '700',
		color: '#FFF',
		fontStyle: 'italic',
	},
	iconContainerBinance: {
		width: 56,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconContainerUsdt: {
		width: 56,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconContainerBank: {
		width: 56,
		height: 56,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
