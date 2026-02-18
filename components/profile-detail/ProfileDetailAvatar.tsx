import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native'
import { PROFILE_DETAIL } from './constants'

interface ProfileDetailAvatarProps {
	source?: ImageSourcePropType | { uri: string }
}

export function ProfileDetailAvatar({ source }: ProfileDetailAvatarProps) {
	return (
		<View style={styles.borderWrap}>
			<View style={styles.inner}>
				{source ? (
					<Image source={source} style={styles.image} resizeMode='cover' />
				) : (
					<View style={styles.placeholder} />
				)}
			</View>
		</View>
	)
}

const size = PROFILE_DETAIL.avatarSize
const borderWidth = PROFILE_DETAIL.avatarBorderWidth
const totalSize = size + borderWidth * 2

const styles = StyleSheet.create({
	borderWrap: {
		width: totalSize,
		height: totalSize,
		borderRadius: totalSize / 2,

		backgroundColor: '#fff',
		position: 'absolute',
		left: PROFILE_DETAIL.screenPadding,
		top: PROFILE_DETAIL.coverHeight - totalSize / 3.5,
		zIndex: 2,
	},
	inner: {
		flex: 1,
		borderRadius: size / 2,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	placeholder: {
		flex: 1,
		backgroundColor: PROFILE_DETAIL.avatarBorder,
	},
})
