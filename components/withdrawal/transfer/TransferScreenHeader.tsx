import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface TransferScreenHeaderProps {
	onBack: () => void
}

export function TransferScreenHeader({ onBack }: TransferScreenHeaderProps) {
	return (
		<View style={styles.container}>
			<Pressable style={styles.backWrap} onPress={onBack} hitSlop={12}>
				<Text style={styles.back}>‹</Text>
			</Pressable>
			<Text style={styles.title}>Transfer</Text>
			<View style={styles.placeholder} />
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
	backWrap: {
		width: 60,
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
		position: 'absolute',
		left: 0,
		right: 0,
		textAlign: 'center',
		pointerEvents: 'none',
	},
	placeholder: {
		width: 60,
	},
})
