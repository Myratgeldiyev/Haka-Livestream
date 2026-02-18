import DashFirstIcon from '@/components/ui/icons/agent-dashboard/DashFirstIcon'
import DashSecondIcon from '@/components/ui/icons/agent-dashboard/DashSecondIcon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../../constants'
import { CommissionProgressRow } from './CommissionProgressRow'

export function IncomeCompositionSection() {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Income Compositon</Text>
			<View style={styles.rows}>
				<CommissionProgressRow
					icon={<DashFirstIcon />}
					label='Host Commission'
					value='1234567'
					progress={0.67}
					progressColor={'#FF69B4'}
					percentage='67%'
				/>
				<CommissionProgressRow
					icon={<DashSecondIcon />}
					label='Invite agent Commission'
					value='1234567'
					progress={0.67}
					progressColor={'#009FD9'}
					percentage='67%'
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
		backgroundColor: AGENT_DASHBOARD.cardBg,
		borderRadius: AGENT_DASHBOARD.cardBorderRadius,
		padding: AGENT_DASHBOARD.cardPadding,
		gap: 16,
	},
	title: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.sectionTitleColor,
	},
	rows: {
		gap: 16,
	},
})
