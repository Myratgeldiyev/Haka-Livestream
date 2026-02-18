import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import { images, Message } from '@/types/message'
import { router } from 'expo-router'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

const AVATAR_SIZE = 60
const ACTIVE_DOT_SIZE = 12

interface Props {
	message: Message
}

export function MessageItem({ message }: Props) {
	const handlePress = () => {
		router.push(`/chat/${message.id}`)
	}

	return (
		<Pressable onPress={handlePress} style={styles.container}>
			<View style={styles.avatarWrapper}>
				<Image source={images[message.user.avatar]} style={styles.avatar} />

				{message.user.isActive && <View style={styles.activeDot} />}
			</View>

			<View style={styles.content}>
				<Text style={styles.name}>{message.user.name}</Text>
				<Text style={styles.text} numberOfLines={1}>
					{message.lastMessage}
				</Text>
			</View>

			<Text style={styles.time}>{message.time}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
	},
	avatarWrapper: {
		position: 'relative',
		marginRight: spacing.md,
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},
	activeDot: {
		position: 'absolute',
		right: 2,
		bottom: 2,
		width: ACTIVE_DOT_SIZE,
		height: ACTIVE_DOT_SIZE,
		borderRadius: ACTIVE_DOT_SIZE / 2,
		backgroundColor: '#2ECC71',
		borderWidth: 2,
		borderColor: '#fff',
	},
	content: {
		flex: 1,
	},
	name: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
	},
	text: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#666',
		marginTop: 2,
	},
	time: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#999',
		marginLeft: spacing.sm,
	},
})
