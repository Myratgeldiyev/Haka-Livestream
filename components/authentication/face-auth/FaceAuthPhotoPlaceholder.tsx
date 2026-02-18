import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AUTHENTICATION, FACE_AUTH } from '../constants'

const PLACEHOLDER_COLOR = '#E8E8E8'
const PERSON_ICON_COLOR = '#B0B0B0'
const SIZE = Math.min(FACE_AUTH.photoPlaceholderSize, 240)

interface FaceAuthPhotoPlaceholderProps {
	imageUri?: string | null
}

export function FaceAuthPhotoPlaceholder({
	imageUri = null,
}: FaceAuthPhotoPlaceholderProps) {
	return (
		<View style={styles.wrap}>
			<View style={styles.circle}>
				{imageUri ? (
					<Image
						source={{ uri: imageUri }}
						style={styles.previewImage}
						resizeMode="cover"
					/>
				) : (
					<Ionicons
						name="person-outline"
						size={SIZE * 0.45}
						color={PERSON_ICON_COLOR}
					/>
				)}
			</View>
			<Text style={styles.instruction}>{FACE_AUTH.uploadInstruction}</Text>
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
		width: SIZE,
		height: SIZE,
		borderRadius: SIZE / 2,
		backgroundColor: PLACEHOLDER_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: spacing.lg,
		overflow: 'hidden',
	},
	previewImage: {
		width: SIZE,
		height: SIZE,
	},
	instruction: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.regular,
		lineHeight: lineHeights.md,
		color: AUTHENTICATION.textPrimary,
		textAlign: 'center',
	},
})
