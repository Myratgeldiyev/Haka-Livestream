import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import { images, MessageUser } from '@/types/message'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import MicrophoneIcon from '../ui/icons/message/microphoneIcon'

const AVATAR_SIZE = 60
const ITEM_WIDTH = 64
const ACTIVE_DOT_SIZE = 12
const CHAT_STATUS_HEIGHT = 20

interface Props {
	users: MessageUser[]
}

export function StoriesRow({ users }: Props) {
	return (
		<View style={styles.wrapper}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.container}
			>
				{users.map(item => (
					<View key={item.id} style={styles.item}>
						<View style={styles.avatarWrapper}>
							<Image source={images[item.avatar]} style={styles.avatar} />

							{item.isActive && <View style={styles.activeDot} />}

							{item.hasChatStatus && (
								<View style={styles.chatStatus}>
									<MicrophoneIcon />
									<Text style={styles.chatText}>Chat</Text>
								</View>
							)}
						</View>

						<Text style={styles.name}>{item.name}</Text>
					</View>
				))}
			</ScrollView>
		</View>
	)
}
const styles = StyleSheet.create({
	wrapper: {
		paddingTop: spacing.sm,
	},

	container: {
		paddingHorizontal: spacing.lg,
		gap: spacing.md,
		alignItems: 'flex-start',
	},

	item: {
		width: ITEM_WIDTH,
		alignItems: 'center',
	},

	avatarWrapper: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		position: 'relative',
	},

	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},

	activeDot: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		width: ACTIVE_DOT_SIZE,
		height: ACTIVE_DOT_SIZE,
		borderRadius: ACTIVE_DOT_SIZE / 2,
		backgroundColor: '#2ECC71',
		borderWidth: 2,
		borderColor: '#fff',
	},

	chatStatus: {
		position: 'absolute',
		bottom: -6,
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
		backgroundColor: '#0088FF',
		paddingHorizontal: spacing.sm,
		height: CHAT_STATUS_HEIGHT,
		borderRadius: CHAT_STATUS_HEIGHT / 2,
		borderWidth: 1,
		borderColor: '#fff',
	},

	chatText: {
		color: '#fff',
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.semibold,
	},

	name: {
		marginTop: spacing.sm,
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: '#000',
		textAlign: 'center',
	},
})
