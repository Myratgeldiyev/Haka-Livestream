import {
	BindEmailBackground,
	BindEmailCard,
	BindEmailHeader,
} from '@/components/authentication/bind-email'
import { BIND_EMAIL } from '@/components/authentication/constants'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
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

export default function BindEmailScreen() {
	const [email, setEmail] = useState('')

	const handleBack = useCallback(() => router.back(), [])
	const handleNext = useCallback(() => {}, [])

	return (
		<View style={styles.root}>
			<BindEmailBackground>
				<SafeAreaView style={styles.safe}>
					<StatusBar barStyle="light-content" />
					<BindEmailHeader onBack={handleBack} />
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
								<Text style={styles.sectionTitle}>
									{BIND_EMAIL.headerTitle}
								</Text>
								<BindEmailCard
									value={email}
									onChangeText={setEmail}
									onNext={handleNext}
								/>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</BindEmailBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	safe: {
		flex: 1,
		paddingTop:
			Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
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
		color: BIND_EMAIL.headerTextColor,
		marginBottom: -spacing.sm,
	},
})
