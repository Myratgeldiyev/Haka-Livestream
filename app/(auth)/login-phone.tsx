import { useAuthStore } from '@/store/auth.store'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	Dimensions,
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const scale = (size: number) => (SCREEN_WIDTH / 375) * size
const verticalScale = (size: number) => (SCREEN_HEIGHT / 812) * size
const moderateScale = (size: number, factor = 0.5) =>
	size + (scale(size) - size) * factor

const PhoneIcon = () => (
	<Svg width={moderateScale(24)} height={moderateScale(24)} viewBox='0 0 24 24'>
		<Path
			fill='white'
			d='M5.73 2.04C6.95.83 8.95 1.05 9.97 2.41l1.26 1.68c.83 1.11.76 2.66-.23 3.64l-.24.24c.06.41.4 1.27 1.83 2.69c1.43 1.42 2.3 1.76 2.71 1.82l.41-.41c.88-.87 2.22-.71 3.3-.12l1.91 1.04c1.64.89 2.05 3.11.71 4.44l-1.42 1.41c-.45.45-1.05.82-1.78.89c-1.81.17-6.03-.05-10.46-4.45C4.15 11.14 3.36 7.56 3.25 5.79c-.05-.89.37-1.65.91-2.18z'
		/>
	</Svg>
)

export default function LoginPhoneScreen() {
	const [phoneNumber, setPhoneNumber] = useState('')
	const insets = useSafeAreaInsets()

	const {
		requestOtp,
		isRequestingOtp,
		otpRequestError,
		otpRequestSuccess,
		resetOtpState,
	} = useAuthStore()

	const disabled = isRequestingOtp || phoneNumber.trim().length === 0

	const handleLogin = async () => {
		if (disabled) return
		await requestOtp(phoneNumber.trim())
	}

	useEffect(() => {
		if (otpRequestSuccess) {
			router.push('/phone-verification')
			resetOtpState()
		}
	}, [otpRequestSuccess, resetOtpState])

	return (
		<ImageBackground
			source={require('../../assets/images/login-bg.jpg')}
			style={styles.background}
		>
			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='light-content'
			/>

			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
			>
				<View style={[styles.content, { paddingTop: insets.top }]}>
					<Image
						source={require('../../assets/images/new-haka-logo.jpg')}
						style={styles.logo}
					/>

					<View style={styles.inputBlock}>
						<Text style={styles.title}>Login to your account</Text>
						<Text style={styles.label}>Phone</Text>

						<View style={styles.inputWrapper}>
							<PhoneIcon />
							<TextInput
								style={styles.input}
								placeholder='Enter your phone number'
								placeholderTextColor='rgba(255,255,255,0.7)'
								keyboardType='phone-pad'
								value={phoneNumber}
								onChangeText={setPhoneNumber}
								editable={!isRequestingOtp}
							/>
						</View>

						{otpRequestError && (
							<Text style={styles.error}>{otpRequestError}</Text>
						)}
					</View>

					<Pressable
						style={[styles.button, disabled && styles.disabled]}
						onPress={handleLogin}
						disabled={disabled}
					>
						{isRequestingOtp ? (
							<ActivityIndicator color='#800080' />
						) : (
							<Text style={styles.buttonText}>Login</Text>
						)}
					</Pressable>
				</View>

				<View
					style={[
						styles.bottom,
						{ paddingBottom: insets.bottom + verticalScale(20) },
					]}
				>
					<Text style={styles.bottomText}>
						Need help? Contact our support team...
					</Text>
				</View>
			</KeyboardAvoidingView>
		</ImageBackground>
	)
}

const INPUT_MAX_WIDTH = Math.min(SCREEN_WIDTH * 0.9, 400)

const styles = StyleSheet.create({
	flex: { flex: 1 },
	background: { flex: 1 },

	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: scale(20),
		gap: verticalScale(20),
	},

	logo: {
		width: moderateScale(86),
		height: moderateScale(80),
		resizeMode: 'contain',
		marginBottom: verticalScale(10),
	},

	inputBlock: {
		width: '100%',
		maxWidth: INPUT_MAX_WIDTH,

		gap: verticalScale(6),
	},

	title: {
		fontSize: moderateScale(16),
		fontWeight: '600',
		color: '#fff',
	},

	label: {
		fontSize: moderateScale(14),
		color: '#fff',
		marginTop: verticalScale(4),
	},

	inputWrapper: {
		height: Math.max(48, Math.min(60, verticalScale(52))),
		flexDirection: 'row',
		alignItems: 'center',
		gap: scale(10),
		paddingHorizontal: scale(16),
		borderWidth: 1,
		borderColor: '#898483',
		borderRadius: moderateScale(10),
	},

	input: {
		flex: 1,
		color: '#fff',
		fontSize: moderateScale(14),
		includeFontPadding: false,
		textAlignVertical: 'center',
		alignItems: 'center',
	},

	error: {
		fontSize: moderateScale(12),
		color: '#ff6b6b',
		marginTop: verticalScale(4),
	},

	button: {
		width: '100%',
		maxWidth: INPUT_MAX_WIDTH,
		height: Math.max(48, Math.min(60, verticalScale(52))),
		borderRadius: moderateScale(10),
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: verticalScale(10),
	},

	disabled: {
		opacity: 0.6,
	},

	buttonText: {
		fontSize: moderateScale(16),
		fontWeight: '600',
		color: '#800080',
	},

	bottom: {
		alignItems: 'center',
		paddingHorizontal: scale(20),
	},

	bottomText: {
		fontSize: moderateScale(12),
		color: '#fff',
		textAlign: 'center',
	},
})
