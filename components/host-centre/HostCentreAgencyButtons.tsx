import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { HOST_CENTRE } from './constants'

interface HostCentreAgencyButtonsProps {
	onBecomeAgency?: () => void
	onLeaveAgency?: () => void
	onChangeAgency?: () => void
}

export function HostCentreAgencyButtons({
	onBecomeAgency,
	onLeaveAgency,
	onChangeAgency,
}: HostCentreAgencyButtonsProps) {
	return (
		<View style={styles.wrap}>
			<View style={styles.row}>
				<Pressable style={styles.btn} onPress={onBecomeAgency}>
					<Text style={styles.btnText}>become agency</Text>
				</Pressable>
				<Pressable style={styles.btn} onPress={onLeaveAgency}>
					<Text style={styles.btnText}>Leave agency</Text>
				</Pressable>
			</View>
			<Pressable
				style={[styles.btn, styles.btnSingle]}
				onPress={onChangeAgency}
			>
				<Text style={styles.btnText}>Chenge agency</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		marginHorizontal: HOST_CENTRE.screenPadding,
		marginBottom: spacing.md,

		gap: spacing.sm,
	},
	row: {
		flexDirection: 'row',
		gap: spacing.md,
	},
	btn: {
		flex: 1,
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		backgroundColor: HOST_CENTRE.cardLightPurpleBg,
		borderWidth: 1,
		borderColor: HOST_CENTRE.cardRedBorder,
		borderRadius: HOST_CENTRE.cardBorderRadius,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnSingle: {
		flex: undefined,
		alignSelf: 'center',
		minWidth: 160,
	},
	btnText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: HOST_CENTRE.textDark,
	},
})
