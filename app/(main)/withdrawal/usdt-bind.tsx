import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import { usePaymentsStore } from '@/store/payments.store'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SCREEN_BG = '#FFFFFF'
const HEADER_BG = '#FFFFFF'
const INPUT_BG = '#FFFFFF'
const INPUT_BORDER = '#E0E0E0'
const PLACEHOLDER_COLOR = '#9CA3AF'
const BIND_BUTTON_BG = '#5F22D9'

export default function UsdtBindScreen() {
	const insets = useSafeAreaInsets()
	const setBoundUsdt = usePaymentsStore(s => s.setBoundUsdt)
	const [walletAddress, setWalletAddress] = useState('')
	const [confirmWalletAddress, setConfirmWalletAddress] = useState('')
	const [network, setNetwork] = useState('')

	const handleBack = useCallback(() => router.back(), [])
	const handleBind = useCallback(() => {
		const wallet = walletAddress.trim()
		const confirm = confirmWalletAddress.trim()
		const net = network.trim()
		if (!wallet || !confirm || !net) {
			Alert.alert('Error', 'Please fill all fields')
			return
		}
		if (wallet !== confirm) {
			Alert.alert('Error', 'Wallet addresses do not match')
			return
		}
		setBoundUsdt({ wallet_address: wallet, network: net })
		router.back()
	}, [walletAddress, confirmWalletAddress, network, setBoundUsdt])

	return (
		<View style={styles.root}>
			<StatusBar barStyle="dark-content" backgroundColor={HEADER_BG} />
			<SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
				<View style={[styles.header, { paddingTop: insets.top }]}>
					<Pressable
						onPress={handleBack}
						style={styles.backButton}
						hitSlop={12}
						accessibilityLabel="Go back"
						accessibilityRole="button"
					>
						<Text style={styles.backChevron}>‹</Text>
					</Pressable>
					<Text style={styles.headerTitle}>USDT Bind</Text>
					<View style={styles.headerPlaceholder} />
				</View>

				<KeyboardAvoidingView
					style={styles.keyboardView}
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
					keyboardVerticalOffset={0}
				>
					<ScrollView
						style={styles.scroll}
						contentContainerStyle={[
							styles.scrollContent,
							{ paddingBottom: insets.bottom + 24 },
						]}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
					>
						<Text style={styles.sectionTitle}>Account information</Text>

						<Text style={styles.label}>Wallet address</Text>
						<TextInput
							style={styles.input}
							placeholder="Please enter"
							placeholderTextColor={PLACEHOLDER_COLOR}
							value={walletAddress}
							onChangeText={setWalletAddress}
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="default"
						/>

						<Text style={styles.label}>Confirm wallet address</Text>
						<TextInput
							style={styles.input}
							placeholder="Please enter"
							placeholderTextColor={PLACEHOLDER_COLOR}
							value={confirmWalletAddress}
							onChangeText={setConfirmWalletAddress}
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="default"
						/>

						<Text style={styles.label}>Network</Text>
						<TextInput
							style={styles.input}
							placeholder="Please enter"
							placeholderTextColor={PLACEHOLDER_COLOR}
							value={network}
							onChangeText={setNetwork}
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="default"
						/>

						<Pressable
							style={({ pressed }) => [
								styles.bindButton,
								pressed && styles.bindButtonPressed,
							]}
							onPress={handleBind}
							accessibilityLabel="Bind"
							accessibilityRole="button"
						>
							<Text style={styles.bindButtonText}>bind</Text>
						</Pressable>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: SCREEN_BG,
	},
	safe: {
		flex: 1,
		backgroundColor: SCREEN_BG,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: spacing.screen.horizontal,
		paddingBottom: spacing.md,
		minHeight: 56,
		backgroundColor: HEADER_BG,
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backChevron: {
		fontSize: 28,
		color: '#000000',
		fontWeight: '300',
	},
	headerTitle: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xl,
		fontWeight: fontWeights.bold,
		color: '#000000',
	},
	headerPlaceholder: {
		width: 40,
		height: 40,
	},
	keyboardView: {
		flex: 1,
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: spacing.screen.horizontal,
		paddingTop: spacing.section.vertical,
	},
	sectionTitle: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: '#000000',
		marginBottom: spacing.xl,
	},
	label: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.bold,
		color: '#000000',
		marginBottom: spacing.sm,
	},
	input: {
		backgroundColor: INPUT_BG,
		borderWidth: 1,
		borderColor: INPUT_BORDER,
		borderRadius: 10,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.input.paddingVertical,
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#000000',
		marginBottom: spacing.xl,
		...Platform.select({
			ios: {
				paddingVertical: 14,
			},
			android: {
				paddingVertical: 12,
			},
		}),
	},
	bindButton: {
		backgroundColor: BIND_BUTTON_BG,
		paddingVertical: spacing.button.largeVertical,
		borderRadius: 28,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: spacing.xl,
	},
	bindButtonPressed: {
		opacity: 0.9,
	},
	bindButtonText: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.regular,
		color: '#FFFFFF',
	},
})
