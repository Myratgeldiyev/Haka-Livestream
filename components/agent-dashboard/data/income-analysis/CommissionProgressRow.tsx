import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../../constants'

interface CommissionProgressRowProps {
	icon: React.ReactNode
	label: string
	value: string
	progress: number
	progressColor: string
	percentage: string
}

export function CommissionProgressRow({
	icon,
	label,
	value,
	progress,
	progressColor,
	percentage,
}: CommissionProgressRowProps) {
	const clampedProgress = Math.min(1, Math.max(0, progress))

	return (
		<View style={styles.row}>
			<View style={styles.iconWrap}>{icon}</View>
			<View style={styles.textAndBar}>
				<Text style={styles.label} numberOfLines={1}>
					{label}: {value}
				</Text>
				<View style={styles.barRow}>
					<View style={styles.track}>
						<View
							style={[
								styles.fill,
								{ width: `${clampedProgress * 100}%`, backgroundColor: progressColor },
							]}
						/>
					</View>
					<Text style={styles.percent}>{percentage}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	iconWrap: {
		width: 32,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textAndBar: {
		flex: 1,
		gap: 8,
		minWidth: 0,
	},
	label: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.valueColor,
	},
	barRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	track: {
		flex: 1,
		height: AGENT_DASHBOARD.progressBarHeight,
		backgroundColor: AGENT_DASHBOARD.incomeCompositionProgressTrack,
		borderRadius: 4,
		overflow: 'hidden',
	},
	fill: {
		height: '100%',
		borderRadius: 4,
	},
	percent: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: AGENT_DASHBOARD.valueColor,
		minWidth: 32,
		textAlign: 'right',
	},
})
