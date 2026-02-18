import { router } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import {
	ActivityIndicator,
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
import { useVerifyOtp } from '../../hooks/useVerifyOtp'

const OTP_LENGTH = 6

export default function VerifyCodeScreen() {
	const [code, setCode] = useState('')
	const inputRef = useRef<TextInput>(null)
	const { verifyOtp, loading, error, phoneNumber, otpCode } = useVerifyOtp()

	const isButtonDisabled = loading || code.length !== OTP_LENGTH

	const handleChange = (value: string) => {
		if (value.length <= OTP_LENGTH) {
			setCode(value)
		}
	}

	const handleConfirm = useCallback(async () => {
		if (isButtonDisabled || !phoneNumber) return
		await verifyOtp(phoneNumber, code)
	}, [code, phoneNumber, verifyOtp, isButtonDisabled])

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

					<View style={styles.spacer} />
				</View>

				<View style={styles.content}>
					<Text style={styles.subtitle}>Verify your Phone number</Text>

					<Pressable
						style={styles.otpRow}
						onPress={() => inputRef.current?.focus()}
					>
						{Array.from({ length: OTP_LENGTH }).map((_, i) => (
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
						maxLength={OTP_LENGTH}
						style={styles.hiddenInput}
						editable={!loading}
					/>

					{error && <Text style={styles.errorText}>{error}</Text>}

					<Pressable onPress={handleConfirm} disabled={isButtonDisabled}>
						<View
							style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
						>
							{loading ? (
								<ActivityIndicator color='#800080' />
							) : (
								<Text style={styles.buttonText}>Confirm</Text>
							)}
						</View>
					</Pressable>

					<Text style={styles.resendText}>
						Didn't receive the code? Resend in 30 seconds
					</Text>

					{otpCode && (
						<Text style={styles.otpHint}>DEV: OTP Code is {otpCode}</Text>
					)}
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
	spacer: {
		width: 13,
	},
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
	errorText: {
		fontFamily: 'Poppins-Light',
		fontSize: 14,
		color: '#ff6b6b',
		marginTop: 16,
	},
	button: {
		width: 380,
		height: 55,
		borderRadius: 10,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 176,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 16,
		color: '#800080',
	},
	resendText: {
		marginTop: 20,
		fontFamily: 'Poppins-Light',
		fontWeight: '400',
		fontSize: 16,
		color: '#fff',
	},
	otpHint: {
		marginTop: 12,
		fontFamily: 'Poppins-Light',
		fontSize: 14,
		color: '#4ade80',
	},
})
