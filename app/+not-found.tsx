import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NotFoundScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.code}>404</Text>
				<Text style={styles.title}>Page Not Found</Text>
				<Text style={styles.description}>
					The page you're looking for doesn't exist.
				</Text>
				<Pressable style={styles.button} onPress={() => router.replace('/')}>
					<Text style={styles.buttonText}>Go Home</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
	},
	code: {
		fontSize: 72,
		fontWeight: '700',
		color: '#FF2D55',
		marginBottom: 8,
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
		color: '#1A1A1A',
		marginBottom: 8,
	},
	description: {
		fontSize: 16,
		color: '#888888',
		textAlign: 'center',
		marginBottom: 32,
	},
	button: {
		backgroundColor: '#FF2D55',
		paddingHorizontal: 32,
		paddingVertical: 14,
		borderRadius: 28,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
})
