import { GoogleLoginButton } from '@/components/google-ui-button'
import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import {
	Animated,
	Dimensions,
	Easing,
	Image,
	ImageBackground,
	Platform,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path, Rect } from 'react-native-svg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const scale = (size: number) => (SCREEN_WIDTH / 375) * size
const verticalScale = (size: number) => (SCREEN_HEIGHT / 812) * size
const moderateScale = (size: number, factor = 0.5) =>
	size + (scale(size) - size) * factor

const ICON_SIZE = Math.max(22, Math.min(30, moderateScale(26, 0.3)))
const CHECK_SIZE = Math.max(12, Math.min(16, moderateScale(14, 0.3)))

const PhoneIcon = () => (
	<Svg width={ICON_SIZE} height={ICON_SIZE} viewBox='0 0 30 30'>
		<Path
			fill='#000'
			d='M21.25 23.75H8.75V6.25H21.25M21.25 1.25H8.75C7.36 1.25 6.25 2.36 6.25 3.75V26.25C6.25 27.63 7.36 28.75 8.75 28.75H21.25C22.63 28.75 23.75 27.63 23.75 26.25V3.75C23.75 2.36 22.63 1.25 21.25 1.25Z'
		/>
	</Svg>
)

const UserIcon = () => (
	<Svg width={ICON_SIZE} height={ICON_SIZE} viewBox='0 0 24 24'>
		<Path
			fill='#000'
			d='M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.7-9.8 5v2.4h19.6V19.4c0-3.3-6.5-5-9.8-5z'
		/>
	</Svg>
)

const CheckIcon = () => (
	<Svg width={CHECK_SIZE} height={CHECK_SIZE} viewBox='0 0 15 15'>
		<Rect width={15} height={15} fill='#D9D9D9' />
		<Path
			fill='#FF2D55'
			d='M0.14 7.35C2.37 9.76 4.53 11.93 6.61 14.68C8.87 10.18 11.18 5.67 15 0.79L13.97 0.32C10.75 3.74 8.25 6.97 6.07 10.82C4.56 9.45 2.11 7.53 0.62 6.54L0.14 7.35Z'
		/>
	</Svg>
)

const images = [
	require('../../assets/images/sign-up.jpg'),
	require('../../assets/images/sign-up2.png'),
	require('../../assets/images/sign-up3.png'),
]

const AnimatedBG = Animated.createAnimatedComponent(ImageBackground)

export default function SignUpScreen() {
	const [agreed, setAgreed] = useState(false)
	const [index, setIndex] = useState(0)
	const [nextIndex, setNextIndex] = useState(1)
	const insets = useSafeAreaInsets()

	const fade = useRef(new Animated.Value(0)).current

	useEffect(() => {
		const timer = setInterval(() => {
			fade.setValue(0)
			Animated.timing(fade, {
				toValue: 1,
				duration: 1200,
				useNativeDriver: true,
				easing: Easing.inOut(Easing.ease),
			}).start(() => {
				setIndex(nextIndex)
				setNextIndex((nextIndex + 1) % images.length)
			})
		}, 4000)

		return () => clearInterval(timer)
	}, [nextIndex])

	return (
		<View style={styles.root}>
			<ImageBackground
				source={images[index]}
				style={StyleSheet.absoluteFillObject}
			/>
			<AnimatedBG
				source={images[nextIndex]}
				style={[StyleSheet.absoluteFillObject, { opacity: fade }]}
			/>

			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='light-content'
			/>

			<View style={[styles.container, { paddingTop: insets.top }]}>
				<View style={styles.header}>
					<Image
						source={require('../../assets/images/Haka_Live_2png.png')}
						style={styles.logo}
					/>

					<View style={styles.textWrapper}>
						<Text style={styles.logoText}>HAKA LIVE</Text>
						<Text style={styles.subtitle}>
							From Strangeness to friendship to intimacy
						</Text>
					</View>
				</View>

				<View style={styles.buttons}>
					<GoogleLoginButton />

					<AuthButton
						text='Log in with Phone'
						icon={<PhoneIcon />}
						onPress={() => router.push('/(auth)/login-phone')}
					/>

					<Text style={styles.more}>More login Methods</Text>
					<Pressable
						style={styles.iconRow}
						onPress={() => router.push('/(auth)/login-direct')}
					>
						<IconButton icon={<UserIcon />} />
					</Pressable>
				</View>

				<View
					style={[
						styles.footer,
						{
							paddingBottom:
								Math.max(insets.bottom, verticalScale(16)) + verticalScale(8),
						},
					]}
				>
					<View style={styles.agreement}>
						<Pressable
							onPress={() => setAgreed(!agreed)}
							style={[styles.checkbox, agreed && styles.checked]}
						>
							{agreed && <CheckIcon />}
						</Pressable>
						<Text style={styles.terms}>I have read and agreed the</Text>
					</View>

					<Text style={styles.terms}>
						<Text style={styles.link}>HAKA LIVE Terms Of Service</Text> And{' '}
						<Text style={styles.link}>Privacy Policy</Text>
					</Text>
				</View>
			</View>
		</View>
	)
}

const AuthButton = ({ icon, text, onPress }: any) => (
	<Pressable style={styles.authButton} onPress={onPress}>
		<View style={styles.iconWrap}>{icon}</View>
		<Text style={styles.authText}>{text}</Text>
	</Pressable>
)

const IconButton = ({ icon }: any) => (
	<View style={styles.iconButton}>{icon}</View>
)

const BUTTON_WIDTH = Math.min(SCREEN_WIDTH * 0.92, 380)
const BUTTON_HEIGHT = Math.max(52, Math.min(64, verticalScale(60)))
const ICON_BUTTON_SIZE = Math.max(50, Math.min(70, moderateScale(60)))

const styles = StyleSheet.create({
	root: { flex: 1 },
	container: { flex: 1 },

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: scale(20),
		paddingTop:
			Platform.OS === 'android' ? verticalScale(12) : verticalScale(8),
		paddingBottom: verticalScale(12),
	},

	logo: {
		width: moderateScale(62),
		height: moderateScale(58),
		resizeMode: 'contain',
		marginRight: scale(10),
	},

	textWrapper: {
		flex: 1,
		justifyContent: 'center',
	},

	logoText: {
		color: '#fff',
		fontSize: moderateScale(15),
		fontWeight: '600',
		includeFontPadding: false,
	},

	subtitle: {
		color: '#fff',
		fontSize: moderateScale(14),
		lineHeight: moderateScale(18),
		includeFontPadding: false,
	},

	buttons: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: verticalScale(12),
		marginTop: verticalScale(60),
	},

	authButton: {
		width: BUTTON_WIDTH,
		height: BUTTON_HEIGHT,
		borderRadius: BUTTON_HEIGHT / 2,
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: scale(15),
	},

	iconWrap: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		justifyContent: 'center',
		alignItems: 'center',
	},

	authText: {
		position: 'absolute',
		left: 0,
		right: 0,
		textAlign: 'center',
		fontSize: moderateScale(16),
		fontWeight: '600',
		color: '#000',
	},

	more: {
		color: '#fff',
		fontSize: moderateScale(12),
		marginTop: verticalScale(10),
	},

	iconRow: {
		flexDirection: 'row',
		gap: scale(20),
		marginTop: verticalScale(10),
	},

	iconButton: {
		width: ICON_BUTTON_SIZE,
		height: ICON_BUTTON_SIZE,
		borderRadius: ICON_BUTTON_SIZE / 2,
		backgroundColor: '#D9D9D9',
		justifyContent: 'center',
		alignItems: 'center',
	},

	footer: {
		alignItems: 'center',
		paddingHorizontal: scale(16),
	},

	agreement: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: scale(8),
		marginBottom: verticalScale(4),
	},

	checkbox: {
		width: moderateScale(14),
		height: moderateScale(14),
		borderWidth: 1,
		borderColor: '#000',
		backgroundColor: '#D9D9D9',
		alignItems: 'center',
		justifyContent: 'center',
	},

	checked: {
		backgroundColor: '#fff',
	},

	terms: {
		color: '#fff',
		fontSize: moderateScale(12),
		textAlign: 'center',
		lineHeight: moderateScale(18),
	},

	link: {
		fontWeight: '600',
	},
})
