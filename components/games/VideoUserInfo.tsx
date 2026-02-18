import { spacing } from '@/constants/spacing'
import { fontSizes, lineHeights, fontWeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IndiaFlag from '../ui/flags/indiaFlag'
import { AgeBadge } from '../ui/icons/gender-age-icons/AgeBadge'

type Props = {
	username: string
	tag: string
}

export function VideoUserInfo({ username, tag }: Props) {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={styles.username}>{username}</Text>
				<IndiaFlag />
				<AgeBadge age={29} />
			</View>

			<Text style={styles.tag}>{tag}</Text>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: spacing.md,
		bottom: 80,
	},

	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},

	username: {
		color: '#fff',
		fontWeight: fontWeights.semibold,
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
	},

	flagPlaceholder: {
		width: spacing.lg,
		height: spacing.md,
		backgroundColor: '#666',
		borderRadius: 2,
	},

	tag: {
		marginTop: spacing.xs,
		color: '#fff',
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
	},
})
