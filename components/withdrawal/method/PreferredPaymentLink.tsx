import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

const LINK_COLOR = '#9B7BE8'

interface PreferredPaymentLinkProps {
	onPress?: () => void
}

export function PreferredPaymentLink({ onPress }: PreferredPaymentLinkProps) {
	return (
		<Pressable style={styles.container} onPress={onPress} hitSlop={8}>
			<Text style={styles.text}>My most preferred way to receive payment</Text>
			<Text style={styles.chevron}>›</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 4,
		paddingVertical: 20,
	},
	text: {
		fontSize: 14,
		color: LINK_COLOR,
		fontWeight: '500',
	},
	chevron: {
		fontSize: 18,
		color: LINK_COLOR,
		fontWeight: '300',
	},
})
