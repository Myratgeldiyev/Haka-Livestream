import { Stack } from 'expo-router'

export default function RankLayout() {
	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='state' />
				<Stack.Screen name='city' />
				<Stack.Screen name='agent' />
				<Stack.Screen name='game' />
				<Stack.Screen name='activity' />
			</Stack>
		</>
	)
}
