import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface PointsScreenHeaderProps {
	onBack: () => void
	onDetails?: () => void
}

export function PointsScreenHeader({
	onBack,
	onDetails,
}: PointsScreenHeaderProps) {
	return (
		<View style={styles.container}>
			<Pressable style={styles.side} onPress={onBack} hitSlop={12}>
				<Text style={styles.back}>‹</Text>
			</Pressable>
			<Text style={styles.title}>Points</Text>
			<Pressable style={styles.side} onPress={onDetails} hitSlop={12}>
				<Text style={styles.details}>Details</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 52,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 8,
	},
	side: {
		minWidth: 60,
		justifyContent: 'center',
	},
	back: {
		fontSize: 28,
		color: '#111111',
		fontWeight: '300',
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
		color: '#111111',
	},
	details: {
		fontSize: 14,
		color: '#111111',
		textAlign: 'right',
	},
})
