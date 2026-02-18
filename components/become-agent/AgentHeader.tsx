import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import LeftArrowIcon from '../ui/icons/LeftArrowIcon'

interface AppHeaderProps {
	title: string
	onBackPress: () => void
}

export function AgentHeader({ title, onBackPress }: AppHeaderProps) {
	return (
		<View style={styles.container}>
			<Pressable onPress={onBackPress} style={styles.backButton}>
				<LeftArrowIcon />
			</Pressable>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.rightSpacer} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 66,
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
	},
	backButton: {
		padding: 8,
	},
	backIconPlaceholder: {
		width: 16,
		height: 16,
		backgroundColor: '#CCCCCC',
		borderRadius: 2,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000000',
	},
	rightSpacer: {
		width: 32,
	},
})
