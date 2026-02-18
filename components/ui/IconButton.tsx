import { profileColors } from '@/constants/colors'
import { radius } from '@/constants/radius'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

interface IconButtonProps {
	icon: React.ReactNode
	onPress?: () => void
	size?: 'small' | 'medium' | 'large'
	variant?: 'primary' | 'secondary' | 'tertiary'
}

const sizeMap = {
	small: spacing.icon.small,
	medium: spacing.icon.medium,
	large: spacing.icon.large,
}

const variantMap = {
	primary: {
		background: profileColors.accent.blue,
		color: profileColors.text.inverse,
	},
	secondary: {
		background: profileColors.background.secondary,
		color: profileColors.text.primary,
	},
	tertiary: {
		background: 'transparent',
		color: profileColors.text.secondary,
	},
}

export function IconButton({
	icon,
	onPress,
	size = 'medium',
	variant = 'secondary',
}: IconButtonProps) {
	const iconSize = sizeMap[size]
	const variantStyle = variantMap[variant]
	const buttonSize = iconSize + spacing.md

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			style={[
				styles.button,
				{
					width: buttonSize,
					height: buttonSize,
					borderRadius: radius.button,
					backgroundColor: variantStyle.background,
				},
			]}
		>
			<View style={{ width: iconSize, height: iconSize }}>{icon}</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
	},
})
