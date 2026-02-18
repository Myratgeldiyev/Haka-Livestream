import { fontSizes, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { TOP_UP_COINS } from './constants'

interface TopUpCustomerServiceLinkProps {
	onPress?: () => void
}

export function TopUpCustomerServiceLink({
	onPress,
}: TopUpCustomerServiceLinkProps) {
	return (
		<Pressable style={styles.wrap} onPress={onPress}>
			<Text style={styles.text}>{'>>Top up customer service<<'}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	wrap: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 20,
		paddingBottom: 32,
	},
	text: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: TOP_UP_COINS.customerServiceColor,
		fontWeight: '500',
	},
})
