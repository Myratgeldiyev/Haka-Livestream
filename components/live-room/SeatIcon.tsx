import React from 'react'
import { StyleSheet, View } from 'react-native'

interface SeatIconProps {
	size?: number
}

export function SeatIcon({ size = 58 }: SeatIconProps) {
	return (
		<View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
			<View style={styles.couchPlaceholder} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: 'rgba(94, 234, 212, 0.5)',
		backgroundColor: 'rgba(45, 55, 72, 0.3)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	couchPlaceholder: {
		width: 28,
		height: 20,
		backgroundColor: 'rgba(167, 243, 208, 0.4)',
		borderRadius: 6,
	},
})
