import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { useEffect } from 'react'
import SplashScreen from '../components/SplashScreen'
import { useAuthStore } from '../store/auth.store'

export default function Index() {
	const { initializeAuth, isAuthenticated, user } = useAuthStore()

	useEffect(() => {
		const bootstrap = async () => {
			await initializeAuth()

			const onboardingSeen = await AsyncStorage.getItem('onboarding_seen')

			if (onboardingSeen !== 'true') {
				router.replace('/start')
				return
			}

			const { isAuthenticated: isAuth, user: currentUser } = useAuthStore.getState()

			if (isAuth) {
				if (currentUser?.username) {
					router.replace('/live')
				} else {
					router.replace('/register')
				}
			} else {
				router.replace('/sign-up')
			}
		}

		bootstrap()
	}, [])

	return <SplashScreen />
}
