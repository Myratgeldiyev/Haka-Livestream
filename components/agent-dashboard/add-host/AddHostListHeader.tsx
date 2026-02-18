import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../constants'

export function AddHostListHeader() {
	return (
		<View style={styles.row}>
			<View style={styles.colUser}>
				<Text style={styles.label}>User</Text>
			</View>
			<View style={styles.colLevel}>
				<Text style={styles.label}>Level</Text>
			</View>
			<View style={styles.colWage}>
				<Text style={styles.label}>Hourly wage</Text>
			</View>
			<View style={styles.colSuper}>
				<Text style={styles.label}>Super A</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: AGENT_DASHBOARD.screenPadding,
		paddingVertical: 10,
		paddingBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: AGENT_DASHBOARD.dividerColor,
	},
	colUser: {
		flex: 2,
		minWidth: 0,
	},
	colLevel: {
		width: 48,
		alignItems: 'center',
	},
	colWage: {
		flex: 1,
		minWidth: 56,
		alignItems: 'center',
	},
	colSuper: {
		width: 56,
		alignItems: 'center',
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: AGENT_DASHBOARD.valueColor,
	},
})
