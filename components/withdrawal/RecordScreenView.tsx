import React from 'react'
import { StyleSheet, View } from 'react-native'
import { RecordScreenHeader } from './RecordScreenHeader'

interface RecordScreenViewProps {
	onBack: () => void
}

export function RecordScreenView({ onBack }: RecordScreenViewProps) {
	return (
		<View style={styles.container}>
			<RecordScreenHeader onBack={onBack} />
			<View style={styles.content} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	content: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
})
