import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import {
	ImageBackground,
	ImageSourcePropType,
	StyleSheet,
	Text,
	View,
} from 'react-native'

interface LiveDataPkMetricCardProps {
	label: string
	value: string
	imageSource: ImageSourcePropType
}

export function LiveDataPkMetricCard({
	label,
	value,
	imageSource,
}: LiveDataPkMetricCardProps) {
	return (
		<ImageBackground
			source={imageSource}
			style={styles.card}
			resizeMode='cover'
		>
			<View style={styles.content}>
				<Text style={styles.label} numberOfLines={1}>
					{label}
				</Text>
				<Text style={styles.value} numberOfLines={1}>
					{value}
				</Text>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		borderRadius: 12,
		height: 68,
		overflow: 'hidden',
		justifyContent: 'center',
	},
	content: {
		flex: 1,
		padding: 8,
		justifyContent: 'center',
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.regular,
		color: '#FFFFFF',
		marginBottom: 4,
	},
	value: {
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		color: '#FFFFFF',
	},
})
