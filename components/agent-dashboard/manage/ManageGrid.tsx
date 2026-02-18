import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { AGENT_DASHBOARD } from '../constants'
import { MANAGE } from './constants'

const SECTION_H_PADDING = AGENT_DASHBOARD.screenPadding * 2
const CARD_H_PADDING = MANAGE.cardPadding * 2

export function getItemWidth(screenWidth: number, columns: number) {
	const gridWidth = screenWidth - SECTION_H_PADDING - CARD_H_PADDING
	return (gridWidth - MANAGE.gridGap * (columns - 1)) / columns
}

interface ManageGridProps {
	children: ReactNode
}

export function ManageGrid({ children }: ManageGridProps) {
	return <View style={styles.grid}>{children}</View>
}

const styles = StyleSheet.create({
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: MANAGE.gridGap,
	},
})
