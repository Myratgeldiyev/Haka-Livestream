import TotalHostIcon from '@/components/ui/icons/agent-dashboard/TotalHostIcon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from '../../constants'

const ICON_SIZE = 48

interface TotalNumberOfHostCardProps {
	totalCount?: number
	onManage?: () => void
}

export function TotalNumberOfHostCard({
	totalCount = 20,
	onManage,
}: TotalNumberOfHostCardProps) {
	return (
		<View style={styles.card}>
			<View style={styles.iconWrap}>
				<TotalHostIcon />
			</View>
			<View style={styles.textBlock}>
				<Text style={styles.label} numberOfLines={1}>
					Total number of host
				</Text>
				<Text style={styles.value}>{totalCount}</Text>
			</View>
			<Pressable
				style={({ pressed }) => [
					styles.manageButton,
					pressed && styles.manageButtonPressed,
				]}
				onPress={onManage}
				accessibilityRole='button'
				accessibilityLabel='Manage hosts'
			>
				<Text style={styles.manageButtonText}>Manage</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: AGENT_DASHBOARD.hostAnalysisTotalCardBg,
		borderRadius: AGENT_DASHBOARD.cardBorderRadius,
		padding: AGENT_DASHBOARD.cardPadding,
		gap: 12,
	},
	iconWrap: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textBlock: {
		flex: 1,
		gap: 4,
		minWidth: 0,
	},
	label: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.regular,
		color: AGENT_DASHBOARD.valueColor,
	},
	value: {
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.valueColor,
	},
	manageButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 20,
		borderWidth: 1.5,
		borderColor: AGENT_DASHBOARD.hostAnalysisManageButtonBorder,
	},
	manageButtonPressed: {
		opacity: 0.8,
	},
	manageButtonText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: AGENT_DASHBOARD.hostAnalysisManageButtonText,
	},
})
