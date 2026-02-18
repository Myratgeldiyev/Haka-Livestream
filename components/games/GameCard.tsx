import { scaleWidth } from '@/constants/platform'
import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import { GameCardProps } from '@/types/games'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { GameCardBackground } from './GameCardBackground'

const IMAGE_SIZE = scaleWidth(72)
const IMAGE_OVERFLOW = scaleWidth(20)

export function GameCard({
	title,
	image,
	gradient,
	buttonLabel,
	route,
}: GameCardProps) {
	const router = useRouter()

	return (
		<View style={styles.wrapper}>
			{/* SVG BACKGROUND */}
			<GameCardBackground colors={gradient} />

			{/* IMAGE */}
			<Image source={image} style={styles.image} />

			{/* CONTENT */}
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>

				<Pressable
					style={styles.button}
					// onPress={() => router.push(route)}
				>
					<Text style={styles.buttonText}>{buttonLabel}</Text>
				</Pressable>
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: 'center',
	},

	image: {
		position: 'absolute',
		top: IMAGE_OVERFLOW,
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
		borderRadius: scaleWidth(16),
	},

	content: {
		position: 'absolute',
		bottom: spacing.lg,
		alignItems: 'center',
	},

	title: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		marginBottom: spacing.sm,
	},

	button: {
		backgroundColor: '#fff',
		borderRadius: scaleWidth(20),
		paddingHorizontal: spacing.xl,
		paddingVertical: spacing.sm,
	},

	buttonText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
	},
})
