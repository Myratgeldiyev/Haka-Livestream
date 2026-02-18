import { Stack } from 'expo-router'
import React from 'react'

export default function SocialLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="friends" />
			<Stack.Screen name="following" />
			<Stack.Screen name="followers" />
			<Stack.Screen name="visitors" />
		</Stack>
	)
}
