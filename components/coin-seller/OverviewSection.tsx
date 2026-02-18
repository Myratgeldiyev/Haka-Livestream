import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BlueUserIcon from '../ui/icons/coin-seller/BlueUserIcon'
import GoldIcon from '../ui/icons/live-stream/GoldIcon'

interface OverviewSectionProps {
	coinsSold: number
	numberOfCustomers: number
}

export function OverviewSection({
	coinsSold,
	numberOfCustomers,
}: OverviewSectionProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Overview</Text>
			<View style={styles.statsRow}>
				<View style={styles.statItem}>
					<Text style={styles.statLabel}>Coins Sold</Text>
					<View style={{ flexDirection: 'row', gap: 5, marginTop: 3 }}>
						<GoldIcon />
						<Text style={styles.statLabel}>XXX</Text>
					</View>
				</View>
				<View style={styles.divider} />
				<View style={styles.statItem}>
					<Text style={styles.statLabel}>number of Customer</Text>
					<View style={{ flexDirection: 'row', gap: 5, marginTop: 3 }}>
						<BlueUserIcon />
						<Text style={styles.statLabel}>XXX</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		borderRadius: spacing.md,
		padding: spacing.lg,
	},
	title: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: '#000',
		marginBottom: spacing.md,
	},
	statsRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	statItem: {
		flex: 1,
	},
	statValue: {
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xl,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	statLabel: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#6B7280',
		marginTop: spacing.xs,
	},
	divider: {
		width: 1,
		height: 40,
		backgroundColor: '#E5E7EB',
	},
})
