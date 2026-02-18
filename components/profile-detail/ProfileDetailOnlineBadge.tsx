import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PROFILE_DETAIL } from './constants'

export function ProfileDetailOnlineBadge() {
	return (
		<View style={styles.badge}>
			<View style={styles.dot} />
			<Text style={styles.text}>Online</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	badge: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: PROFILE_DETAIL.onlinePillBg,
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 100,
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: PROFILE_DETAIL.onlineDot,
	},
	text: {
		fontSize: 12,
		fontWeight: '600',
		color: '#fff',
	},
})
