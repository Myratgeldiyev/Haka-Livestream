import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AgencyCenterMethodLabelBadge } from './AgencyCenterMethodLabelBadge'
import { AGENCY_CENTER } from './constants'

interface AgencyCenterMethod2CardProps {
	userId?: string
	hostCode?: string
}

export function AgencyCenterMethod2Card({
	userId = '123456',
	hostCode = 'ABC123',
}: AgencyCenterMethod2CardProps) {
	return (
		<View style={styles.card}>
			<AgencyCenterMethodLabelBadge label={AGENCY_CENTER.method2Label} />
			<Text style={styles.title}>{AGENCY_CENTER.method2Title}</Text>
			<Text style={styles.description}>{AGENCY_CENTER.method2Description}</Text>
			<View style={styles.infoBox}>
				<Text style={[styles.infoLine, styles.infoLineFirst]}>
					User ID: {userId}
				</Text>
				<Text style={styles.infoLine}>Host Code No. {hostCode}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: AGENCY_CENTER.screenPadding,
		marginBottom: spacing.lg,
		padding: spacing.xxl,
		borderWidth: AGENCY_CENTER.cardBorderWidth,
		borderColor: AGENCY_CENTER.cardBorder,
		borderRadius: AGENCY_CENTER.cardBorderRadius,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: AGENCY_CENTER.highlightText,
		marginBottom: spacing.xs,
		textAlign: 'center',
	},
	description: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#000',
		textAlign: 'center',
		marginBottom: spacing.md,
	},
	infoBox: {
		backgroundColor: AGENCY_CENTER.infoBoxBg,
		borderWidth: 1,
		borderColor: AGENCY_CENTER.infoBoxBorder,
		borderRadius: AGENCY_CENTER.infoBoxBorderRadius,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
	},
	infoLine: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		color: '#000',
	},
	infoLineFirst: {
		marginBottom: spacing.xs,
	},
})
