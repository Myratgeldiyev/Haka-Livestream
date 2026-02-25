import {
	DraggableMinimizedRoomOverlay,
	DraggableMinimizedStreamOverlay,
} from '@/components/live-room'
import SplashScreenComponent from '@/components/SplashScreen'
import { initializeAuth } from '@/api/axios'
import * as Font from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { LogBox, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

// Suppress "Unable to activate keep awake" from expo-keep-awake (used by Expo dev tools on Android).
// The native module can fail; the rejection is reported as an unhandled promise rejection.
LogBox.ignoreLogs(['Unable to activate keep awake'])

export default function RootLayout() {
	const [isAppReady, setIsAppReady] = useState(false)

	useEffect(() => {
		SplashScreen.hideAsync().catch(() => {})

		async function prepare() {
			await Font.loadAsync({
				Poppins: require('../assets/fonts/Poppins-Bold.ttf'),
			})
			setIsAppReady(true)
			await SplashScreen.hideAsync()
		}

		prepare()
	}, [])
	useEffect(() => {
		initializeAuth()
	}, [])

	if (!isAppReady) {
		return (
			<View style={styles.flex1}>
				<SplashScreenComponent />
			</View>
		)
	}

	return (
		<GestureHandlerRootView style={styles.flex1}>
			<SafeAreaProvider>
				<View style={styles.flex1}>
					<Stack
						screenOptions={{
							headerShown: false,
						}}
					/>
					<DraggableMinimizedRoomOverlay />
					<DraggableMinimizedStreamOverlay />
				</View>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	flex1: { flex: 1, backgroundColor: '#FFFFFF' },
})
