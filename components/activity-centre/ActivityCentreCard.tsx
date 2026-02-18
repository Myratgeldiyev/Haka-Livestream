import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import {
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { ActivityCentreStatusBadge } from './ActivityCentreStatusBadge'
import { ACTIVITY_CENTRE } from './constants'
import type { ActivityCentreItem } from './types'

interface ActivityCentreCardProps extends ActivityCentreItem {
	onPress?: () => void
}

export function ActivityCentreCard({
	imageSource,
	overlayText,
	title,
	statusLabel,
	onPress,
}: ActivityCentreCardProps) {
	const content = (
		<View style={styles.card}>
			<ImageBackground
				source={imageSource}
				style={styles.imageWrap}
				resizeMode='cover'
			>
				<View style={styles.overlay}>
					<Text
						style={[
							styles.overlayText,
							ACTIVITY_CENTRE.overlayTextShadow && styles.overlayTextShadow,
						]}
						numberOfLines={3}
					></Text>
				</View>
			</ImageBackground>
			<View style={styles.footer}>
				<Text style={styles.title} numberOfLines={1}>
					{title}
				</Text>
				<ActivityCentreStatusBadge label={statusLabel} />
			</View>
		</View>
	)

	if (onPress) {
		return <Pressable onPress={onPress}>{content}</Pressable>
	}
	return content
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: ACTIVITY_CENTRE.screenPadding,
		marginBottom: spacing.lg,
		borderRadius: ACTIVITY_CENTRE.cardBorderRadius,
		overflow: 'hidden',
		backgroundColor: '#fff',
	},
	imageWrap: {
		height: ACTIVITY_CENTRE.cardImageHeight,
		justifyContent: 'center',
		alignItems: 'center',
	},
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: spacing.md,
	},
	overlayText: {
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		color: ACTIVITY_CENTRE.overlayTextColor,
		textAlign: 'center',
	},
	overlayTextShadow: {
		textShadowColor: 'rgba(0,0,0,0.4)',
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 3,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		backgroundColor: '#fff',
		minHeight: 48,
	},
	title: {
		flex: 1,
		fontSize: fontSizes.md,
		fontWeight: fontWeights.semibold,
		lineHeight: lineHeights.md,
		color: '#000',
		marginRight: spacing.sm,
	},
})
