import {
	BindPhoneBackground,
	BindPhoneCard,
	BindPhoneHeader,
} from '@/components/authentication/bind-phone'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { BIND_PHONE } from '@/components/authentication/constants'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'

export default function BindPhoneScreen() {
	const [phone, setPhone] = useState('')

	const handleBack = useCallback(() => router.back(), [])
	const handleNext = useCallback(() => {}, [])

	return (
		<View style={styles.root}>
			<BindPhoneBackground>
				<SafeAreaView style={styles.safe}>
					<StatusBar barStyle="light-content" />
					<BindPhoneHeader onBack={handleBack} />
					<KeyboardAvoidingView
						style={styles.keyboard}
						behavior={Platform.OS === 'ios' ? 'padding' : undefined}
						keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
					>
						<ScrollView
							contentContainerStyle={styles.scrollContent}
							keyboardShouldPersistTaps="handled"
							showsVerticalScrollIndicator={false}
						>
							<View style={styles.cardSection}>
								<Text style={styles.sectionTitle}>Bind a phone</Text>
								<BindPhoneCard
									value={phone}
									onChangeText={setPhone}
									onNext={handleNext}
								/>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</BindPhoneBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	safe: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
	},
	keyboard: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		paddingTop: spacing.lg,
		paddingBottom: 24,
	},
	cardSection: {
		alignItems: 'flex-start',
		paddingHorizontal: spacing.screen.horizontal,
	},
	sectionTitle: {
		fontSize: fontSizes.xxl,
		fontWeight: fontWeights.bold,
		lineHeight: lineHeights.xxl,
		color: BIND_PHONE.headerTextColor,
		marginBottom: -spacing.sm,
	},
})
