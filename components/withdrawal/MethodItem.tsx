import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface Props {
	title: string
	fee: string
	time: string
}

export function MethodItem({ title, fee, time }: Props) {
	return (
		<View style={styles.card}>
			<View style={styles.left}>
				<View style={styles.iconPlaceholder} />

				<View style={styles.info}>
					<Text style={styles.title}>{title}</Text>

					<View style={styles.tags}>
						<Text style={styles.tag}>{fee}</Text>
						<Text style={styles.tag}>{time}</Text>
					</View>
				</View>
			</View>

			<Pressable style={styles.bindButton}>
				<Text style={styles.bindText}>Bind</Text>
			</Pressable>
		</View>
	)
}
const styles = StyleSheet.create({
	card: {
		backgroundColor: '#FFF',
		borderRadius: 16,
		padding: 14,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	left: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	iconPlaceholder: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: '#E5E7EB',
	},
	info: {
		marginLeft: 12,
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontWeight: '700',
		color: '#000',
		marginBottom: 6,
	},
	tags: {
		flexDirection: 'row',
		gap: 8,
		flexWrap: 'wrap',
	},
	tag: {
		backgroundColor: '#EDE9FE',
		color: '#6D28D9',
		fontSize: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 8,
	},
	bindButton: {
		backgroundColor: '#6D28D9',
		paddingHorizontal: 14,
		paddingVertical: 6,
		borderRadius: 14,
	},
	bindText: {
		color: '#FFF',
		fontSize: 14,
		fontWeight: '600',
	},
})
