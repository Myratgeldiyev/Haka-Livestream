import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import React from 'react'
import {
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import CoinIcon from '../ui/icons/withdrawal/CoinIcon'

const AVATAR_SIZE = 30

type Props = {
	title: string
	rank: number
	score: number
	extraScore: number
	iconValue: number
	icon?: ImageSourcePropType
	avatars: ImageSourcePropType[]
	onPress?: () => void
}

export const RankItem = ({
	title,
	rank,
	score,
	extraScore,
	iconValue,
	icon,
	avatars,
	onPress,
}: Props) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Text style={styles.rank}>{rank}</Text>

			<View style={styles.center}>
				<Text style={styles.title}>{title}</Text>
				<View style={styles.ImageWrapper}>
					<View style={styles.avatars}>
						{avatars.slice(0, 5).map((img, i) => (
							<Image
								key={i}
								source={img}
								style={[styles.avatar, { marginLeft: i === 0 ? 0 : -12 }]}
							/>
						))}
					</View>
					<View style={styles.iconBlock}>
						<Image
							source={require('@/assets/images/luckybag.png')}
							style={styles.icon}
						/>
						<Text style={styles.iconValue}>{iconValue.toLocaleString()}</Text>
					</View>
				</View>
			</View>

			<View style={styles.right}>
				<CoinIcon />
				<Text style={styles.score}>{score.toLocaleString()}</Text>
			</View>
		</Pressable>
	)
}
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: spacing.md,
		marginBottom: spacing.md,
		borderRadius: spacing.md,
		backgroundColor: '#DDBD9D',
	},
	ImageWrapper: {
		flexDirection: 'row',
	},
	rank: {
		width: spacing.xxl + spacing.xs,
		fontWeight: fontWeights.bold,
		color: '#5D2000',
		fontSize: fontSizes.md,
	},

	center: {
		flex: 1,
	},

	title: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: '#fff',
		marginBottom: spacing.sm,
	},

	avatars: {
		flexDirection: 'row',
	},

	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		borderWidth: 1,
		borderColor: '#FFF',
		backgroundColor: '#ccc',
	},

	iconBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
		marginLeft: spacing.md,
	},

	icon: {
		width: spacing.lg,
		height: spacing.lg,
	},

	iconValue: {
		fontWeight: fontWeights.semibold,
		color: '#3F2105',
		fontSize: fontSizes.md,
	},

	right: {
		flexDirection: 'row',
		gap: 1,
		alignItems: 'center',
	},

	score: {
		fontWeight: fontWeights.bold,
		color: '#3F2105',
		fontSize: fontSizes.md,
	},

	extraScore: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#5D2000',
	},
})
