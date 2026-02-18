import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { LIVE_DATA } from './constants'

interface LiveDataActionButtonProps {
	onPress?: () => void
}

export function LiveDataActionButton({ onPress }: LiveDataActionButtonProps) {
	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
			accessibilityLabel='Get more points'
			accessibilityRole='button'
		>
			<Text style={styles.text}>Get more points</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: LIVE_DATA.buttonBg,
		paddingVertical: 14,
		paddingHorizontal: 24,
		borderRadius: 14,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
	},
	buttonPressed: {
		opacity: 0.85,
	},
	text: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: LIVE_DATA.buttonText,
	},
})
