import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import VideoCameraIcon from '../ui/icons/party/cameraIcon'

interface FloatingPartyButtonProps {
	onPress?: () => void
}

export function FloatingPartyButton({ onPress }: FloatingPartyButtonProps) {
	return (
		<Pressable
			style={styles.container}
			onPress={() => router.push('/live/chat')}
		>
			<VideoCameraIcon />
			<Text style={styles.text}>Party</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: spacing.md,
		right: spacing.xxxl,
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FF4081',
		paddingHorizontal: spacing.xxl,
		paddingVertical: spacing.md,
		borderRadius: spacing.xxl + spacing.xs,
		gap: spacing.sm,
		shadowColor: '#FF4081',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 8,
		elevation: 8,
	},
	iconPlaceholder: {
		width: spacing.icon.medium,
		height: spacing.icon.medium,
		borderRadius: spacing.xs,
	},
	text: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: '#FFFFFF',
	},
})
