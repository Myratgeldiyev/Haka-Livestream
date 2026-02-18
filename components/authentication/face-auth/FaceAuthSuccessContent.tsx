import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AUTHENTICATION, FACE_AUTH, FACE_AUTH_SUCCESS } from '../constants'

const CIRCLE_BG = '#E8E8E8'
const CIRCLE_SIZE = Math.min(FACE_AUTH.photoPlaceholderSize, 240)
const INNER_SIZE = FACE_AUTH_SUCCESS.innerImageSize
const BADGE_SIZE = FACE_AUTH_SUCCESS.checkmarkCircleSize

interface FaceAuthSuccessContentProps {
	imageUri: string | null
}

export function FaceAuthSuccessContent({ imageUri }: FaceAuthSuccessContentProps) {
	return (
		<View style={styles.wrap}>
			<View style={styles.circle}>
				<View style={styles.innerBox}>
					{imageUri ? (
						<Image
							source={{ uri: imageUri }}
							style={styles.innerImage}
							resizeMode="cover"
						/>
					) : (
						<Text style={styles.imageLabel}>
							{FACE_AUTH_SUCCESS.imagePlaceholderLabel}
						</Text>
					)}
				</View>
				<View style={styles.badge}>
					<Ionicons
						name="checkmark"
						size={BADGE_SIZE * 0.6}
						color={AUTHENTICATION.cardBg}
					/>
				</View>
			</View>
			<Text style={styles.title}>{FACE_AUTH_SUCCESS.successTitle}</Text>
			<Text style={styles.subtitle}>
				{FACE_AUTH_SUCCESS.successSubtitle}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		alignItems: 'center',
		paddingVertical: spacing.xxl,
		paddingHorizontal: spacing.screen.horizontal,
	},
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE / 2,
		backgroundColor: CIRCLE_BG,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: spacing.xl,
		position: 'relative',
	},
	innerBox: {
		width: INNER_SIZE,
		height: INNER_SIZE,
		backgroundColor: AUTHENTICATION.cardBg,
		borderWidth: 1,
		borderColor: AUTHENTICATION.textPrimary,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	innerImage: {
		width: INNER_SIZE,
		height: INNER_SIZE,
	},
	imageLabel: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.regular,
		lineHeight: lineHeights.md,
		color: AUTHENTICATION.textPrimary,
	},
	badge: {
		position: 'absolute',
		right: -BADGE_SIZE / 4,
		top: '50%',
		marginTop: -BADGE_SIZE / 2,
		width: BADGE_SIZE,
		height: BADGE_SIZE,
		borderRadius: BADGE_SIZE / 2,
		backgroundColor: AUTHENTICATION.textPrimary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: fontSizes.xl,
		fontWeight: fontWeights.bold,
		lineHeight: lineHeights.xl,
		color: AUTHENTICATION.textPrimary,
		textAlign: 'center',
		marginBottom: spacing.sm,
	},
	subtitle: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.regular,
		lineHeight: lineHeights.md,
		color: AUTHENTICATION.textPrimary,
		textAlign: 'center',
		paddingHorizontal: spacing.lg,
	},
})
