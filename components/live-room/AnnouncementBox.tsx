import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface AnnouncementBoxProps {
	title?: string
	message?: string
}

export function AnnouncementBox({
	title = 'Announcement',
	message = "Welcome everyone! Let's chat and have fun together!",
}: AnnouncementBoxProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.message} numberOfLines={2} ellipsizeMode='tail'>
				{message}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '60%',
		maxHeight: 56,
		backgroundColor: 'rgba(66, 61, 100, 0.7)',
		borderRadius: spacing.md,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
	},
	title: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: '#FFFFFF',
		marginBottom: spacing.xs,
	},
	message: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#FFFFFF',
	},
})
