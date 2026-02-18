import { profileColors } from '@/constants/colors'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

interface AvatarProps {
	src?: string | null
}

export function Avatar({ src }: AvatarProps) {
	const avatarSize = 88

	return (
		<View
			style={[
				styles.container,
				{
					width: avatarSize,
					height: avatarSize,
					borderRadius: avatarSize / 2,
					backgroundColor: profileColors.background.secondary,
				},
			]}
		>
			<Image
				source={
					src ? { uri: src } : require('@/assets/images/placeholder-user.png')
				}
				style={[
					styles.image,
					{
						width: avatarSize,
						height: avatarSize,
						borderRadius: avatarSize / 2,
					},
				]}
			/>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 2,
	},
	image: {
		resizeMode: 'cover',
	},
})
