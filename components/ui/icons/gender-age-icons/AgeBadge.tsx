import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FemaleIcon from './femaleIcon'

type AgeBadgeProps = {
	age: number
	backgroundColor?: string
}

export function AgeBadge({ age, backgroundColor = '#F9467D' }: AgeBadgeProps) {
	return (
		<View style={[styles.container, { backgroundColor }]}>
			<FemaleIcon />

			<View style={styles.dot} />

			<Text style={styles.text}>{age}</Text>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		width: 36,
		height: 13,
		gap: 2,
		borderRadius: 6.5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 3,
	},

	iconPlaceholder: {
		width: 8,
		height: 8,
		borderRadius: 2,
		backgroundColor: 'rgba(255,255,255,0.5)',
	},

	dot: {
		width: 5,
		height: 5,
		borderRadius: 2.5,
		backgroundColor: '#FFFFFF',
	},

	text: {
		fontSize: 8,
		fontWeight: '600',
		color: '#FFFFFF',
		lineHeight: 10,
	},
})
