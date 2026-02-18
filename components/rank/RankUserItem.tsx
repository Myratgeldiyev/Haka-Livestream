import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
	ColorValue,
	Image,
	ImageSourcePropType,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import IndiaFlagSquare from '../ui/flags/indiaFlagSquare'
import { CoinIcon } from '../ui/icons'

const AVATAR_SIZE = 55
const FRAME_SIZE = { width: 76, height: 80 }

export type Rank = 1 | 2 | 3 | 'other'

type GradientColors = readonly [ColorValue, ColorValue]

type Props = {
	rank: Rank
	username: string
	userImage: ImageSourcePropType
}

const BG_BY_RANK: Record<Rank, GradientColors> = {
	1: ['#FEB022', '#F7C874'],
	2: ['#7897D8', '#4179F0'],
	3: ['#CE8F66', '#DF7835'],
	other: ['#689FC4', '#3088C3'],
}

const FRAME_BY_RANK: Partial<Record<1 | 2 | 3, ImageSourcePropType>> = {
	1: require('@/assets/images/frames/city-1.png'),
	2: require('@/assets/images/frames/city-2.png'),
	3: require('@/assets/images/frames/city-3.png'),
}

export const RankUserItem: React.FC<Props> = ({
	rank,
	username,
	userImage,
}) => {
	const frameImage = rank !== 'other' ? FRAME_BY_RANK[rank] : undefined

	return (
		<LinearGradient
			colors={BG_BY_RANK[rank]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
			style={styles.container}
		>
			<View style={styles.imageWrapper}>
				<Image source={userImage} style={styles.avatar} />

				{frameImage && <Image source={frameImage} style={styles.frame} />}
			</View>

			<View style={styles.center}>
				<View style={styles.usernameRow}>
					<Text style={styles.username}>{username}</Text>
					<IndiaFlagSquare />
				</View>

				<View style={styles.statRow}>
					<Image source={require('@/assets/images/luckybag.png')} />
					<Text style={styles.statText}>123,444</Text>
				</View>
			</View>

			<View style={styles.right}>
				<CoinIcon />
				<Text style={styles.rewardText}>400,000</Text>
			</View>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	container: {
		minHeight: 88,
		borderRadius: spacing.lg,
		borderWidth: 2,
		borderColor: '#E5DB1A',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: spacing.xl,
		paddingVertical: spacing.md,
		marginBottom: spacing.md,
	},

	imageWrapper: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: spacing.md,
	},

	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		zIndex: 1,
	},

	frame: {
		position: 'absolute',
		width: FRAME_SIZE.width,
		height: FRAME_SIZE.height,
		zIndex: 2,
	},

	center: {
		flex: 1,
		marginLeft: spacing.md,
	},

	usernameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
		marginBottom: spacing.sm,
	},

	username: {
		color: '#fff',
		fontWeight: fontWeights.bold,
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
	},

	flagPlaceholder: {
		width: spacing.lg,
		height: spacing.lg,
		borderRadius: spacing.xs,
		backgroundColor: 'rgba(0,0,0,0.25)',
	},

	statRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},

	iconPlaceholder: {
		width: spacing.md,
		height: spacing.md,
		borderRadius: spacing.xs,
		backgroundColor: 'rgba(0,0,0,0.35)',
	},

	statText: {
		color: '#2B1600',
		fontWeight: fontWeights.semibold,
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
	},

	right: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},

	rewardText: {
		color: '#2B1600',
		fontWeight: fontWeights.bold,
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
	},
})
