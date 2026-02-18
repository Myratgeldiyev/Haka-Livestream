import { fontSizes, fontWeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export function InviteMicEmpty() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Not active users</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 60,
	},
	text: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.medium,
		color: '#000',
	},
})
