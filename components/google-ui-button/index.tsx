import React, { useEffect } from 'react'
import {
	Alert,
	Dimensions,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'

import { useGoogleAuth } from '@/app/(auth)/googleAuth'
import { router } from 'expo-router'
import Svg, { Path } from 'react-native-svg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const scale = (size: number) => (SCREEN_WIDTH / 375) * size
const verticalScale = (size: number) => (SCREEN_HEIGHT / 812) * size
const moderateScale = (size: number, factor = 0.5) =>
	size + (scale(size) - size) * factor

const ICON_SIZE = Math.max(22, Math.min(30, moderateScale(26, 0.3)))

const GoogleIcon = () => (
	<Svg width={ICON_SIZE} height={ICON_SIZE} viewBox='0 0 30 30' fill='none'>
		<Path
			d='M27.2569 12.5519H26.25V12.5H15V17.5H22.0644C21.0338 20.4106 18.2644 22.5 15 22.5C10.8581 22.5 7.5 19.1419 7.5 15C7.5 10.8581 10.8581 7.5 15 7.5C16.9119 7.5 18.6513 8.22125 19.9756 9.39937L23.5112 5.86375C21.2787 3.78312 18.2925 2.5 15 2.5C8.09688 2.5 2.5 8.09688 2.5 15C2.5 21.9031 8.09688 27.5 15 27.5C21.9031 27.5 27.5 21.9031 27.5 15C27.5 14.1619 27.4137 13.3438 27.2569 12.5519Z'
			fill='#FFC107'
		/>
		<Path
			d='M3.94141 9.18188L8.04828 12.1938C9.15953 9.4425 11.8508 7.5 15.0002 7.5C16.912 7.5 18.6514 8.22125 19.9758 9.39937L23.5114 5.86375C21.2789 3.78312 18.2927 2.5 15.0002 2.5C10.1989 2.5 6.03516 5.21062 3.94141 9.18188Z'
			fill='#FF3D00'
		/>
		<Path
			d='M15.0002 27.4999C18.2289 27.4999 21.1627 26.2643 23.3808 24.2549L19.5121 20.9812C18.2151 21.9681 16.6299 22.5017 15.0002 22.4999C11.7489 22.4999 8.98832 20.4268 7.94832 17.5337L3.87207 20.6743C5.94082 24.7224 10.1421 27.4999 15.0002 27.4999Z'
			fill='#4CAF50'
		/>
		<Path
			d='M27.2569 12.5519H26.25V12.5H15V17.5H22.0644C21.5714 18.8853 20.6833 20.0957 19.51 20.9819L23.3806 24.2544C23.1069 24.5031 27.5 21.25 27.5 15C27.5 14.1619 27.4137 13.3438 27.2569 12.5519Z'
			fill='#1976D2'
		/>
	</Svg>
)
export function GoogleLoginButton() {
	const { request, response, signIn } = useGoogleAuth()

	useEffect(() => {
		if (response?.type === 'success') {
			const { authentication } = response

			if (!authentication?.accessToken) {
				Alert.alert('Google Login Failed')
				return
			}

			console.log('GOOGLE ACCESS TOKEN:', authentication.accessToken)

			router.replace('/')
		}
	}, [response])

	return (
		<Pressable
			style={styles.button}
			disabled={!request}
			onPress={() => signIn()}
		>
			<View style={styles.icon}>
				<GoogleIcon />
			</View>
			<Text style={styles.text}>Log in with Google</Text>
		</Pressable>
	)
}

const BUTTON_WIDTH = Math.min(SCREEN_WIDTH * 0.92, 380)
const BUTTON_HEIGHT = Math.max(52, Math.min(64, verticalScale(60)))

const styles = StyleSheet.create({
	button: {
		width: BUTTON_WIDTH,
		height: BUTTON_HEIGHT,
		borderRadius: BUTTON_HEIGHT / 2,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		paddingHorizontal: scale(15),
	},
	icon: {
		width: ICON_SIZE,
		alignItems: 'center',
	},
	text: {
		position: 'absolute',
		left: 0,
		right: 0,
		textAlign: 'center',
		fontSize: moderateScale(16),
		fontWeight: '600',
		color: '#000',
	},
})
