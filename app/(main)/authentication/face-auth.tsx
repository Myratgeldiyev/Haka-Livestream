import {
	FaceAuthActions,
	FaceAuthHeader,
	FaceAuthPhotoPlaceholder,
	FaceAuthSuccessContent,
	FaceAuthTipsRow,
} from '@/components/authentication/face-auth'
import { AUTHENTICATION } from '@/components/authentication/constants'
import { pickImageFromGallery } from '@/hooks/image-picker-from-gallery'
import { spacing } from '@/constants/spacing'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
	Alert,
	Platform,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native'

type FaceAuthStep = 1 | 3

export default function FaceAuthScreen() {
	const [step, setStep] = useState<FaceAuthStep>(1)
	const [imageUri, setImageUri] = useState<string | null>(null)

	const handleBack = useCallback(() => {
		if (step === 3) setStep(1)
		else router.back()
	}, [step])

	const handleUploadPhoto = useCallback(async () => {
		try {
			const result = await pickImageFromGallery()
			if (result?.uri) setImageUri(result.uri)
		} catch {
			Alert.alert(
				'Permission required',
				'Please allow gallery access to select a photo.'
			)
		}
	}, [])

	const handleStartCertify = useCallback(() => {
		setStep(3)
	}, [])

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.safe}>
				<StatusBar barStyle="dark-content" />
				<FaceAuthHeader
					onBack={handleBack}
					currentStep={step}
				/>
				{step === 1 ? (
					<ScrollView
						style={styles.scroll}
						contentContainerStyle={styles.scrollContent}
						showsVerticalScrollIndicator={false}
					>
						<FaceAuthPhotoPlaceholder imageUri={imageUri} />
						<FaceAuthTipsRow />
						<FaceAuthActions
							onUploadPhoto={handleUploadPhoto}
							onStartCertify={handleStartCertify}
						/>
					</ScrollView>
				) : (
					<ScrollView
						style={styles.scroll}
						contentContainerStyle={styles.scrollContent}
						showsVerticalScrollIndicator={false}
					>
						<FaceAuthSuccessContent imageUri={imageUri} />
					</ScrollView>
				)}
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: AUTHENTICATION.cardBg,
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
		paddingBottom: spacing.xxxl,
		flexGrow: 1,
	},
})
