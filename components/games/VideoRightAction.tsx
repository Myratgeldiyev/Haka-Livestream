import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import PrizeMoment from '../ui/icons/moments/PrizeMoment'
import CommentVideo from '../ui/icons/videos/commentVideo'
import LikeVideo from '../ui/icons/videos/likeVideo'
import MoreVideo from '../ui/icons/videos/moreVideo'
import ShareVideo from '../ui/icons/videos/shareVideo'

export function VideoRightActions() {
	return (
		<View style={styles.container}>
			<View style={styles.avatarWrapper}>
				<Image
					style={styles.image}
					source={require('../../assets/images/games/room-avatar.png')}
				/>
				<View style={styles.plus}>
					<Text style={styles.plusText}>+</Text>
				</View>
			</View>

			<View style={styles.action}>
				<PrizeMoment />
				<Text style={styles.count}>0</Text>
			</View>
			<View style={styles.action}>
				<LikeVideo />
				<Text style={styles.count}>0</Text>
			</View>
			<View style={styles.action}>
				<CommentVideo />
				<Text style={styles.count}>0</Text>
			</View>
			<View style={styles.action}>
				<ShareVideo />
				<Text style={styles.count}>0</Text>
			</View>
			<View style={styles.action}>
				<MoreVideo />
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		right: spacing.md,
		bottom: 100,
		alignItems: 'center',
		gap: spacing.md,
	},

	avatarWrapper: {
		alignItems: 'center',
		marginBottom: spacing.xl,
	},

	avatar: {
		width: spacing.avatar.medium,
		height: spacing.avatar.medium,
		borderRadius: spacing.avatar.medium / 2,
		backgroundColor: '#444',
	},

	plus: {
		position: 'absolute',
		bottom: -4,
		width: spacing.md,
		height: spacing.md,
		borderRadius: spacing.md / 2,
		backgroundColor: '#5F22D9',
		borderColor: '#000',
	},
	plusText: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		textAlign: 'center',
		color: '#fff',
	},
	action: {
		alignItems: 'center',
	},
	image: {
		borderRadius: spacing.xl,
		width: spacing.avatar.small,
		height: spacing.avatar.small,
		borderWidth: 1,
		borderColor: '#fff',
	},
	iconPlaceholder: {
		width: spacing.icon.large,
		height: spacing.icon.large,
		borderRadius: spacing.icon.large / 2,
		marginTop: spacing.md,
		backgroundColor: '#555',
		marginBottom: 2,
	},

	count: {
		color: '#fff',
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
	},
})
