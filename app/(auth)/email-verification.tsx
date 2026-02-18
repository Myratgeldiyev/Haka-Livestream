import { router } from 'expo-router'
import { useRef, useState } from 'react'
import {
	ImageBackground,
	Keyboard,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'

export default function VerifyCodeScreen() {
	const [code, setCode] = useState('')
	const inputRef = useRef<TextInput>(null)

	const handleChange = (value: string) => {
		if (value.length <= 6) {
			setCode(value)
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ImageBackground
				source={require('../../assets/images/login-bg.jpg')}
				style={styles.background}
				resizeMode='cover'
			>
				<View style={styles.topBar}>
					<Pressable onPress={() => router.back()}>
						<Svg width={13} height={17} viewBox='0 0 13 17' fill='none'>
							<Path
								d='M8.67559 16.5239L-0.000413835 8.24392L8.67559 -7.9155e-05H12.8156L4.10359 8.24392L12.8156 16.5239H8.67559Z'
								fill='black'
							/>
						</Svg>
					</Pressable>

					<Text style={styles.headerTitle}>Account Verification</Text>

					<View style={{ width: 13 }} />
				</View>

				<View style={styles.content}>
					<Text style={styles.subtitle}>Verify your mail</Text>

					<Pressable
						style={styles.otpRow}
						onPress={() => inputRef.current?.focus()}
					>
						{Array.from({ length: 6 }).map((_, i) => (
							<View key={i} style={styles.otpBox}>
								<Text style={styles.otpText}>{code[i] || ''}</Text>
							</View>
						))}
					</Pressable>

					<TextInput
						ref={inputRef}
						value={code}
						onChangeText={handleChange}
						keyboardType='number-pad'
						textContentType='oneTimeCode'
						maxLength={6}
						style={styles.hiddenInput}
					/>

					<Pressable onPress={() => router.push('/(auth)/register')}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Confirm</Text>
						</View>
					</Pressable>

					<Text style={styles.resendText}>
						Didn’t receive the code? Resend in 30 seconds
					</Text>
				</View>
			</ImageBackground>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},

	topBar: {
		marginTop: 77,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	headerTitle: {
		fontFamily: '',
		fontWeight: '600',
		fontSize: 20,
		lineHeight: 20,
		color: '#fff',
	},

	/* CONTENT */
	content: {
		alignItems: 'center',
		marginTop: 113,
	},

	subtitle: {
		fontFamily: 'Poppins',
		fontWeight: '600',
		fontSize: 16,
		color: '#fff',
		marginBottom: 40,
	},

	/* OTP */
	otpRow: {
		flexDirection: 'row',
		gap: 14,
	},

	otpBox: {
		width: 50,
		height: 50,
		backgroundColor: '#D9D9D9',
		marginTop: 110,
		justifyContent: 'center',
		alignItems: 'center',
	},

	otpText: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
	},

	hiddenInput: {
		position: 'absolute',
		opacity: 0,
	},

	/* BUTTON */
	button: {
		width: 380,
		height: 55,
		borderRadius: 10,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 176,
	},

	buttonText: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 16,
		color: '#800080',
	},

	/* RESEND */
	resendText: {
		marginTop: 20,
		fontFamily: 'Poppins-Light',
		fontWeight: '400',
		fontSize: 16,
		color: '#fff',
	},
})
