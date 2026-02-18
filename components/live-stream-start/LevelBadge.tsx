import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, StyleSheet, Text } from 'react-native'

type Props = {
	age: number
}

export function DiamondLevel({ age }: Props) {
	return (
		<LinearGradient
			colors={['#310A80', '#5316D0']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
			style={styles.container}
		>
			<Image source={require('../../assets/images/diamond.png')} />

			<Text style={styles.ageText}>{age}</Text>
		</LinearGradient>
	)
}
const styles = StyleSheet.create({
	container: {
		width: 60,
		flexDirection: 'row',
		alignItems: 'center',
		height: 22,
		borderRadius: 999,
		gap: 6,
		position: 'relative',
	},

	iconPlaceholder: {
		width: 12,
		height: 12,
		borderRadius: 2,
		backgroundColor: 'rgba(255,255,255,0.6)',
	},

	ageText: {
		color: '#FFFFFF',
		fontSize: 12,
		fontWeight: '600',
		position: 'absolute',
		right: 10,
	},
})
