import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ScamAlert from '../ui/icons/withdrawal/SpamAlert'

export function ScamAlertBanner() {
	return (
		<Pressable style={styles.container}>
			<View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
				<ScamAlert />
				<Text style={styles.text}>Scam Prevention Alert</Text>
			</View>
			<Text style={styles.arrow}>›</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F3D1B8',
		borderRadius: 12,
		padding: 14,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 12,
	},
	text: {
		color: '#D97706',
		fontWeight: '600',
	},
	arrow: { fontSize: 22, color: '#F59E0B' },
})
