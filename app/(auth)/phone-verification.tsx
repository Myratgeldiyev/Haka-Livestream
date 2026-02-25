import { router } from 'expo-router'
import { useCallback, useMemo, useRef, useState } from 'react'
import {
	ActivityIndicator,
	ImageBackground,
	Keyboard,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
	useWindowDimensions,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'
import { useVerifyOtp } from '../../hooks/useVerifyOtp'

const OTP_LENGTH = 6
const HORIZONTAL_PADDING = 20
const OTP_GAP = 10
const MAX_CONTENT_WIDTH = 400

const verticalScale = (size: number, screenHeight: number) =>
	Math.min(size * 1.2, (screenHeight / 812) * size)

export default function VerifyCodeScreen() {
	const [code, setCode] = useState('')
	const inputRef = useRef<TextInput>(null)
	const { verifyOtp, loading, error, phoneNumber, otpCode } = useVerifyOtp()
	const insets = useSafeAreaInsets()
	const { width: screenWidth, height: screenHeight } = useWindowDimensions()

	const contentWidth = useMemo(
		() => Math.min(screenWidth - 2 * HORIZONTAL_PADDING, MAX_CONTENT_WIDTH),
		[screenWidth],
	)
	const otpBoxSize = useMemo(
		() => Math.min(50, Math.floor((contentWidth - 5 * OTP_GAP) / 6)),
		[contentWidth],
	)

	const otpRowWidth = 6 * otpBoxSize + 5 * OTP_GAP

	const dynamicStyles = useMemo(
		() => ({
			topBar: {
				paddingTop: insets.top,
				paddingHorizontal: HORIZONTAL_PADDING,
			},
			content: {
				paddingHorizontal: HORIZONTAL_PADDING,
			},
			otpRow: { gap: OTP_GAP },
			otpBox: {
				width: otpBoxSize,
				height: otpBoxSize,
				marginTop: verticalScale(24, screenHeight),
			},
			otpOverlayInput: {
				width: otpRowWidth,
				height: otpBoxSize,
				top: verticalScale(24, screenHeight),
			},
			button: {
				width: contentWidth,
				marginTop: verticalScale(32, screenHeight),
			},
		}),
		[insets.top, screenHeight, contentWidth, otpBoxSize, otpRowWidth],
	)

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
			<ImageBackground
				source={require('../../assets/images/login-bg.jpg')}
				style={styles.background}
				resizeMode='cover'
			>
				<Pressable
					style={styles.dismissKeyboardArea}
					onPress={Keyboard.dismiss}
				/>
				<View style={styles.contentOverlay} pointerEvents='box-none'>
					<View style={[styles.topBar, dynamicStyles.topBar]}>
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

					<View style={styles.contentCenter} pointerEvents='box-none'>
						<View style={[styles.content, dynamicStyles.content]}>
					<Text style={styles.subtitle}>Verify your Phone number</Text>

					<View style={styles.otpWrapper}>
						<View style={[styles.otpRow, dynamicStyles.otpRow]}>
							{Array.from({ length: OTP_LENGTH }).map((_, i) => (
								<View key={i} style={[styles.otpBox, dynamicStyles.otpBox]}>
									<Text style={styles.otpText}>{code[i] || ''}</Text>
								</View>
							))}
						</View>
						<TextInput
							ref={inputRef}
							value={code}
							onChangeText={handleChange}
							keyboardType='number-pad'
							textContentType='oneTimeCode'
							maxLength={OTP_LENGTH}
							style={[styles.otpOverlayInput, dynamicStyles.otpOverlayInput]}
							editable={!loading}
							caretHidden
							selectTextOnFocus
						/>
					</View>

					{error && <Text style={styles.errorText}>{error}</Text>}

					<Pressable onPress={handleConfirm} disabled={isButtonDisabled}>
						<View
							style={[styles.button, dynamicStyles.button, isButtonDisabled && styles.buttonDisabled]}
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
						</View>
					</View>
			</ImageBackground>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},
	dismissKeyboardArea: {
		...StyleSheet.absoluteFillObject,
		zIndex: 0,
	},
	contentOverlay: {
		...StyleSheet.absoluteFillObject,
		zIndex: 1,
		flex: 1,
	},
	topBar: {
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
	contentCenter: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		alignItems: 'center',
	},
	subtitle: {
		fontFamily: 'Poppins',
		fontWeight: '600',
		fontSize: 16,
		color: '#fff',
		marginBottom: 40,
	},
	otpWrapper: {
		position: 'relative',
	},
	otpRow: {
		flexDirection: 'row',
	},
	otpOverlayInput: {
		position: 'absolute',
		left: 0,
		top: 0,
		backgroundColor: 'transparent',
		color: 'transparent',
		padding: 0,
		margin: 0,
		fontSize: 1,
	},
	otpBox: {
		backgroundColor: '#D9D9D9',
		justifyContent: 'center',
		alignItems: 'center',
	},
	otpText: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
	},
	errorText: {
		fontFamily: 'Poppins-Light',
		fontSize: 14,
		color: '#ff6b6b',
		marginTop: 16,
	},
	button: {
		height: 55,
		borderRadius: 10,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
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
