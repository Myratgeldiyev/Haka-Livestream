import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RULE_ITEMS = ['1. Min transfer 1000k point']

export function TransferRuleSection() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Rule description</Text>
			{RULE_ITEMS.map((rule, index) => (
				<Text key={index} style={styles.rule}>
					{rule}
				</Text>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 24,
	},
	title: {
		fontSize: 16,
		fontWeight: '700',
		color: '#111111',
		marginBottom: 8,
	},
	rule: {
		fontSize: 15,
		color: '#111111',
		marginBottom: 4,
	},
})
