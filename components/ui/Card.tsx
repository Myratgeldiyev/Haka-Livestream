import { profileColors } from '@/constants/colors'
import { radius } from '@/constants/radius'
import { spacing } from '@/constants/spacing'
import React, { ReactNode, useState } from 'react'
import { Pressable, StyleSheet, ViewStyle } from 'react-native'

type CardVariant = 'default' | 'outlined' | 'elevated'

interface CardProps {
	children: ReactNode
	variant?: CardVariant
	backgroundColor?: string
	onPress?: () => void
	style?: ViewStyle
}

export function Card({
	children,
	variant = 'default',
	backgroundColor = profileColors.background.primary,
	onPress,
	style,
}: CardProps) {
	const [pressed, setPressed] = useState(false)

	return (
		<Pressable
			disabled={!onPress}
			onPress={onPress}
			onPressIn={() => setPressed(true)}
			onPressOut={() => setPressed(false)}
			style={[
				styles.base,
				styles[variant],
				{
					backgroundColor,
					transform: [{ scale: pressed ? 0.98 : 1 }],
				},
				style,
			]}
		>
			{children}
		</Pressable>
	)
}
const styles = StyleSheet.create({
	base: {
		borderRadius: radius.card,
		padding: spacing.card,
	},

	default: {},

	outlined: {
		borderWidth: 1,
		borderColor: profileColors.border.light,
	},

	elevated: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 4,
	},
})
