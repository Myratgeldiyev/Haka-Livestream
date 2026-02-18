import { fontWeights } from '@/constants/typography'
import { spacing } from '@/constants/spacing'
import React from 'react'
import {
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { TOP_UP_COINS } from './constants'

// Use reward-topup.png; if the file is named rewadr-topup.png, change the path accordingly
const REWARD_BANNER_IMAGE = require('@/assets/images/rewadr-topup.png')

const STROKE_OFFSETS: { marginLeft?: number; marginTop?: number }[] = [
	{ marginTop: -4 },
	{ marginTop: 4 },
	{ marginLeft: -4 },
	{ marginLeft: 4 },
	{ marginLeft: -3, marginTop: -3 },
	{ marginLeft: -3, marginTop: 3 },
	{ marginLeft: 3, marginTop: -3 },
	{ marginLeft: 3, marginTop: 3 },
	{ marginLeft: -2, marginTop: -4 },
	{ marginLeft: -2, marginTop: 4 },
	{ marginLeft: 2, marginTop: -4 },
	{ marginLeft: 2, marginTop: 4 },
	{ marginLeft: -4, marginTop: -2 },
	{ marginLeft: -4, marginTop: 2 },
	{ marginLeft: 4, marginTop: -2 },
	{ marginLeft: 4, marginTop: 2 },
]

const TITLE = 'Recharge Reward'

export function TopUpRechargeRewardBanner() {
	return (
		<View style={styles.wrap}>
			<ImageBackground
				source={REWARD_BANNER_IMAGE}
				style={styles.banner}
				resizeMode="cover"
				imageStyle={styles.bannerImage}
			>
				<View style={styles.titleWrap}>
					{STROKE_OFFSETS.map((offset, i) => (
						<Text
							key={i}
							style={[styles.titleStroke, offset]}
							pointerEvents="none"
						>
							{TITLE}
						</Text>
					))}
					<Text style={styles.title}>{TITLE}</Text>
				</View>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		marginHorizontal: TOP_UP_COINS.screenPadding,
		marginBottom: spacing.lg,
		borderRadius: TOP_UP_COINS.cardBorderRadius,
		overflow: 'hidden',
		borderWidth: 2,
		borderColor: '#F5C842',
	},
	banner: {
		minHeight: 100,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: spacing.lg,
		paddingHorizontal: spacing.md,
	},
	bannerImage: {
		borderRadius: TOP_UP_COINS.cardBorderRadius - 2,
	},
	titleWrap: {
		position: 'relative',
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleStroke: {
		position: 'absolute',
		left: 8,
		top: 8,
		fontSize: 36,
		lineHeight: 44,
		fontWeight: fontWeights.bold,
		fontStyle: 'italic',
		color: '#009FD9',
	},
	title: {
		fontSize: 36,
		lineHeight: 44,
		fontWeight: fontWeights.bold,
		fontStyle: 'italic',
		color: '#6A1B9A',
	},
})
