import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const TITLE_COLOR = '#7C4DFF'

interface RecordScreenHeaderProps {
	onBack: () => void
}

export function RecordScreenHeader({ onBack }: RecordScreenHeaderProps) {
	return (
		<View style={styles.container}>
			<Pressable style={styles.backWrap} onPress={onBack} hitSlop={12}>
				<Text style={styles.back}>‹</Text>
			</Pressable>
			<Text style={styles.title} pointerEvents='none'>
				Record
			</Text>
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
	},
	backWrap: {
		width: 60,
		justifyContent: 'center',
	},
	back: {
		fontSize: 28,
		color: '#374151',
		fontWeight: '300',
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		color: TITLE_COLOR,
		position: 'absolute',
		left: 0,
		right: 0,
		textAlign: 'center',
	},
	placeholder: {
		width: 60,
	},
})
