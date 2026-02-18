import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
	time: string
}

export const CountdownTimer: React.FC<Props> = ({ time }) => {
	const parts = time.split(':')

	return (
		<View style={styles.container}>
			{parts.map((item, index) => (
				<View key={index} style={styles.box}>
					<Text style={styles.text}>{item}</Text>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 8,
	},

	box: {
		width: 54,
		height: 54,
		backgroundColor: '#5D2000',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},

	text: {
		color: '#FEE325',
		fontSize: 20,
		fontWeight: '700',
	},
})
