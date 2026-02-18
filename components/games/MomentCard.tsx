import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import IndiaFlag from '../ui/flags/indiaFlag'
import { AgeBadge } from '../ui/icons/gender-age-icons/AgeBadge'
import CommentMoment from '../ui/icons/moments/CommentMoment'
import LikeMoment from '../ui/icons/moments/LikeMoment'
import OnlineMoment from '../ui/icons/moments/OnlineMoment'
import PrizeMoment from '../ui/icons/moments/PrizeMoment'
import ShareMoment from '../ui/icons/moments/ShareMoment'

const AVATAR_SIZE = 80

export function MomentCard() {
	const { width } = useWindowDimensions()
	const imageHeight = width * 0.8 // Maintain aspect ratio

	return (
		<View style={styles.card}>
			<View style={styles.topRow}>
				<View style={styles.imageContainer}>
					<Image
						source={require('@/assets/images/moment-avatarpng.png')}
						style={styles.avatar}
					/>
					<View style={styles.online}>
						<OnlineMoment />
					</View>
				</View>

				<View style={styles.userInfo}>
					<View style={styles.nameRow}>
						<Text style={styles.name}>Princess May</Text>

						<IndiaFlag />
					</View>

					<AgeBadge age={20} />
				</View>
			</View>

			<Image
				source={require('@/assets/images/moment.png')}
				style={[styles.mainImage, { height: imageHeight }]}
			/>

			<Text style={styles.hashtags}>#gameplay #moment #fun</Text>

			<View style={styles.bottomRow}>
				<View style={styles.actions}>
					<View style={styles.momentRow}>
						<LikeMoment />
						<Text style={styles.count}>0</Text>
					</View>
					<View style={styles.momentRow}>
						<CommentMoment />
						<Text style={styles.count}>0</Text>
					</View>
					<View style={styles.momentRow}>
						<ShareMoment color='#000' />
						<Text style={styles.count}>0</Text>
					</View>
					<View style={styles.momentRow}>
						<PrizeMoment />
						<Text style={styles.count}>0</Text>
					</View>
				</View>

				<Text style={styles.time}>10 min ago</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#FFFFFF',
		padding: spacing.lg,
		gap: spacing.md,
	},

	momentRow: {
		flexDirection: 'row',
		gap: spacing.xs,
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.md,
	},

	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
	},

	userInfo: {
		flex: 1,
		gap: spacing.sm,
	},

	nameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},

	name: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},

	flagPlaceholder: {
		width: spacing.xl,
		height: spacing.md,
		backgroundColor: '#E0E0E0',
		borderRadius: 2,
	},

	smallIconPlaceholder: {
		width: spacing.xl,
		height: spacing.xl,
		backgroundColor: '#E0E0E0',
		borderRadius: spacing.xl / 2,
	},

	mainImage: {
		width: '100%',
		backgroundColor: '#EEE',
	},

	hashtags: {
		color: '#5F22D9',
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
	},

	bottomRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	actions: {
		flexDirection: 'row',
		gap: spacing.lg,
	},

	actionItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},

	iconPlaceholder: {
		width: spacing.xl,
		height: spacing.xl,
		backgroundColor: '#E0E0E0',
		borderRadius: spacing.xl / 2,
	},

	count: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#000',
		fontWeight: fontWeights.semibold,
	},

	time: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	imageContainer: {
		position: 'relative',
	},
	online: {
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
})
