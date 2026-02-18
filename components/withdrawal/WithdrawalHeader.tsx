import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface HeaderProps {
	title: string
	rightText?: string
	onRightPress?: () => void
}

export function WithdrawalHeader({
	title,
	rightText,
	onRightPress,
}: HeaderProps) {
	const router = useRouter()

	return (
		<View style={styles.container}>
			<Pressable style={styles.side} onPress={() => router.back()}>
				<Text style={styles.icon}>‹</Text>
			</Pressable>

			<Text style={styles.title}>{title}</Text>

			<Pressable
				style={styles.side}
				onPress={onRightPress}
				disabled={!rightText}
			>
				<Text style={styles.rightText}>{rightText}</Text>
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
	},
	side: {
		width: 60,
		justifyContent: 'center',
	},
	icon: {
		fontSize: 28,
		color: '#111',
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
		color: '#111',
	},
	rightText: {
		fontSize: 14,
		color: '#111',
		textAlign: 'right',
	},
})
