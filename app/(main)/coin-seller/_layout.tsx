import { Stack } from 'expo-router'
import React from 'react'

export default function CoinSellerLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='index' />
			<Stack.Screen name='coin-seller-details' />
			<Stack.Screen name='edit-quick-message' />
		</Stack>
	)
}
