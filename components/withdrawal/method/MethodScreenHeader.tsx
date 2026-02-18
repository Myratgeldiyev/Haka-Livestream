import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const HEADER_BG = '#FFFFFF'

export function MethodScreenHeader() {
	return (
		<View style={styles.container}>
			<Pressable onPress={() => router.back()} hitSlop={12}>
				<Text style={styles.back}>‹</Text>
			</Pressable>
			<Text style={styles.title}>Method</Text>
			<View style={styles.rightRow}>
				<Text style={styles.inText}>IN</Text>
				<Text style={styles.chevronDown}>▼</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		backgroundColor: HEADER_BG,
	},
	back: {
		fontSize: 28,
		color: '#000000',
		fontWeight: '300',
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
		color: '#000000',
	},
	rightRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	inText: {
		fontSize: 14,
		color: '#000000',
		fontWeight: '500',
	},
	chevronDown: {
		fontSize: 10,
		color: '#000000',
	},
})
