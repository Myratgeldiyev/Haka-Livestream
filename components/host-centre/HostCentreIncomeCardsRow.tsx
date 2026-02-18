import { spacing } from '@/constants/spacing'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { HOST_CENTRE } from './constants'
import { HostCentreIncomeCard } from './HostCentreIncomeCard'

export function HostCentreIncomeCardsRow() {
	return (
		<View style={styles.row}>
			<HostCentreIncomeCard label="Today income" amount="50000" />
			<HostCentreIncomeCard label="Weekly income" amount="50000" />
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginHorizontal: HOST_CENTRE.screenPadding,
		marginBottom: spacing.md,
		gap: spacing.md,
	},
})
