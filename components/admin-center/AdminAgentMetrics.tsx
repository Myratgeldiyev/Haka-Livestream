import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AdminMicIcon from '../ui/icons/admin-centre/AdminMicIcon'
import { ADMIN_CENTER } from './constants'

interface AdminAgentMetricsProps {
	totalBasicIncome?: string
	totalValidHost?: number
}

export function AdminAgentMetrics({
	totalBasicIncome = 'XXXXXXXXX',
	totalValidHost = 0,
}: AdminAgentMetricsProps) {
	return (
		<View style={styles.row}>
			<View style={styles.block}>
				<View style={styles.labelRow}>
					<Text style={styles.label}>Total Basic Income</Text>
					<View style={styles.questionIcon}>
						<Text style={styles.questionText}>?</Text>
					</View>
				</View>
				<View style={styles.valueRow}>
					<AdminMicIcon color='#FACB1B' />
					<Text style={styles.value} numberOfLines={1}>
						{totalBasicIncome}
					</Text>
				</View>
			</View>
			<View style={styles.block}>
				<Text style={styles.label}>Total Valid Host</Text>
				<View style={styles.valueRow}>
					<AdminMicIcon color='#FF2A23' />
					<Text style={styles.value}>{totalValidHost}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		gap: 16,
		marginTop: 12,
	},
	block: {
		flex: 1,
		minWidth: 0,
		gap: 4,
	},
	labelRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: 600,
		color: ADMIN_CENTER.valueColor,
	},
	questionIcon: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: ADMIN_CENTER.questionIconBg,
		alignItems: 'center',
		justifyContent: 'center',
	},
	questionText: {
		fontSize: 10,
		fontWeight: fontWeights.semibold,
		color: '#FFFFFF',
	},
	valueRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	value: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: ADMIN_CENTER.valueColor,
		flex: 1,
		minWidth: 0,
	},
})
