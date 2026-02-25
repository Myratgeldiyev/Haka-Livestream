import { scaleWidth } from '@/constants/platform'
import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, StyleSheet, Text, View } from 'react-native'

const CARD_WIDTH = scaleWidth(110)
const CARD_HEIGHT = scaleWidth(70)
const IMAGE_SIZE = scaleWidth(48)

export const RewardCard = () => {
	return (
		<LinearGradient
			colors={['#095F37', '#16DD80']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.container}
		>
			<Text style={styles.title}>Reward</Text>

			<View style={styles.arrows}>
				<Text style={styles.arrow}>▶▶▶</Text>
			</View>

			<Text style={styles.bigText}>Task</Text>

			<Image
				source={require('../../assets/images/star.png')}
				style={styles.image}
				resizeMode='contain'
			/>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	container: {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		borderRadius: spacing.md,
		padding: spacing.sm,
		overflow: 'hidden',
	},

	title: {
		color: '#fff',
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
	},

	arrows: {
		marginTop: spacing.xs,
	},

	arrow: {
		color: 'rgba(255,255,255,0.6)',
		fontSize: fontSizes.md,
	},

	bigText: {
		position: 'absolute',
		bottom: -6,
		left: spacing.md,
		fontSize: fontSizes.xxxl + 4,
		fontWeight: '800',
		color: 'rgba(255,255,255,0.25)',
	},

	image: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
	},
})
