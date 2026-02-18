import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PROFILE_DETAIL } from './constants'

interface ProfileDetailDataRowProps {
	label?: string
	value: string
}

export function ProfileDetailDataRow({
	label = 'Data',
	value,
}: ProfileDetailDataRowProps) {
	return (
		<View style={styles.container}>
			<View style={styles.labelWrap}>
				<Text style={styles.label}>{label}</Text>
				<View style={styles.redLine} />
			</View>
			<Text style={styles.value}>{value}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 12,
		paddingHorizontal: PROFILE_DETAIL.screenPadding,
		marginBottom: 16,
	},
	labelWrap: {
		alignItems: 'flex-start',
	},
	redLine: {
		width: 12,
		height: 10,
		backgroundColor: '#C61600',
		borderRadius: 2,
		alignSelf: 'center',
		marginBottom: 2,
	},
	label: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	value: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#000',
		flex: 1,
	},
})
