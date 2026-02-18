import { profileColors } from '@/constants/colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface DividerProps {
	vertical?: boolean
	margin?: number
}

export function Divider({ vertical = false, margin = 16 }: DividerProps) {
	return (
		<View
			style={[
				styles.divider,
				vertical ? styles.vertical : styles.horizontal,
				{ margin },
			]}
		/>
	)
}

const styles = StyleSheet.create({
	divider: {
		backgroundColor: profileColors.border.light,
	},
	vertical: {
		width: 1,
		height: '100%',
		marginHorizontal: 16,
	},
	horizontal: {
		width: '100%',
		height: 1,
	},
})
