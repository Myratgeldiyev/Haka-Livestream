import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SettingsScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={() => router.back()}>
					<Text style={styles.closeText}>Close</Text>
				</Pressable>
				<Text style={styles.title}>Settings</Text>
				<View style={styles.placeholder} />
			</View>
			<View style={styles.content}>
				<Text style={styles.text}>Settings content</Text>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#E0E0E0',
	},
	closeText: {
		fontSize: 16,
		color: '#FF2D55',
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: '#1A1A1A',
	},
	placeholder: {
		width: 50,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 16,
		color: '#888888',
	},
})
