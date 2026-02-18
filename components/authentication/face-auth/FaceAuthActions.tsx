import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AUTHENTICATION, FACE_AUTH } from '../constants'

interface FaceAuthActionsProps {
	onUploadPhoto?: () => void
	onStartCertify?: () => void
}

export function FaceAuthActions({
	onUploadPhoto,
	onStartCertify,
}: FaceAuthActionsProps) {
	return (
		<View style={styles.wrap}>
			<Pressable
				style={({ pressed }) => [
					styles.button,
					styles.buttonOutline,
					pressed && styles.buttonPressed,
				]}
				onPress={onUploadPhoto}
			>
				<Text style={styles.buttonOutlineLabel}>
					{FACE_AUTH.uploadButtonLabel}
				</Text>
			</Pressable>
			<Pressable
				style={({ pressed }) => [
					styles.button,
					styles.buttonFilled,
					pressed && styles.buttonPressed,
				]}
				onPress={onStartCertify}
			>
				<Text style={styles.buttonFilledLabel}>
					{FACE_AUTH.startCertifyButtonLabel}
				</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		paddingHorizontal: spacing.screen.horizontal,
		paddingTop: spacing.lg,
		paddingBottom: spacing.xxxl,
		gap: spacing.md,
	},
	button: {
		paddingVertical: spacing.button.vertical,
		paddingHorizontal: spacing.button.horizontal,
		borderRadius: 26,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonOutline: {
		backgroundColor: AUTHENTICATION.cardBg,
		borderWidth: FACE_AUTH.buttonBorderWidth,
		borderColor: AUTHENTICATION.primary,
	},
	buttonFilled: {
		backgroundColor: AUTHENTICATION.primary,
	},
	buttonPressed: {
		opacity: 0.85,
	},
	buttonOutlineLabel: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.semibold,
		lineHeight: lineHeights.lg,
		color: AUTHENTICATION.primary,
	},
	buttonFilledLabel: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.semibold,
		lineHeight: lineHeights.lg,
		color: AUTHENTICATION.primaryButtonText,
	},
})
