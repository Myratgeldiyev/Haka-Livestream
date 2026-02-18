import { Stack } from 'expo-router'

export default function WithdrawalLayout() {
	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='withdraw' />
				<Stack.Screen name='method' />
				<Stack.Screen name='epay-bind' />
				<Stack.Screen name='binance-bind' />
				<Stack.Screen name='usdt-bind' />
				<Stack.Screen name='bank-transfer-bind' />
			</Stack>
		</>
	)
}
