import {
	AUTHENTICATION,
	AuthenticationHeader,
	AuthenticationMethodCard,
	AuthenticationMyAuthSection,
} from '@/components/authentication'
import BindPhoneIcon from '@/components/ui/icons/authentication/BindPhoneIcon'
import FaceVerIcon from '@/components/ui/icons/authentication/FaceVerIcon'
import { spacing } from '@/constants/spacing'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useCallback } from 'react'
import {
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native'

const ICON_SIZE = 24
const ICON_COLOR = '#fff'

export default function AuthenticationScreen() {
	const handleBack = useCallback(() => router.back(), [])
	const handleFaceAuth = useCallback(
		() => router.push('/(main)/authentication/face-auth'),
		[]
	)
	const handleBindPhone = useCallback(
		() => router.push('/(main)/authentication/bind-phone'),
		[]
	)
	const handleBindEmail = useCallback(
		() => router.push('/(main)/authentication/bind-email'),
		[]
	)

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.safe}>
				<StatusBar barStyle="dark-content" />
				<AuthenticationHeader onBack={handleBack} />
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					<AuthenticationMyAuthSection />
					<AuthenticationMethodCard
						icon={<FaceVerIcon />}
						title={AUTHENTICATION.faceAuth.title}
						description={AUTHENTICATION.faceAuth.description}
						buttonLabel={AUTHENTICATION.faceAuth.buttonLabel}
						onPress={handleFaceAuth}
					/>
					<AuthenticationMethodCard
						icon={<BindPhoneIcon />}
						title={AUTHENTICATION.bindPhone.title}
						description={AUTHENTICATION.bindPhone.description}
						buttonLabel={AUTHENTICATION.bindPhone.buttonLabel}
						onPress={handleBindPhone}
					/>
					<AuthenticationMethodCard
						icon={
							<Ionicons
								name="mail-outline"
								size={ICON_SIZE}
								color={ICON_COLOR}
							/>
						}
						title={AUTHENTICATION.bindEmail.title}
						description={AUTHENTICATION.bindEmail.description}
						buttonLabel={AUTHENTICATION.bindEmail.buttonLabel}
						onPress={handleBindEmail}
					/>
				</ScrollView>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: AUTHENTICATION.screenBg,
	},
	safe: {
		flex: 1,
		paddingTop:
			Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: spacing.xxl,
		backgroundColor: AUTHENTICATION.screenBg,
	},
})
