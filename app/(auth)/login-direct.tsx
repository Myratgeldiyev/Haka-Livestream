import { useUserIdLogin } from '@/hooks/useUserIDlogin'
import { router } from 'expo-router'
import { useState } from 'react'
import {
	ActivityIndicator,
	Dimensions,
	Image,
	ImageBackground,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const scale = (size: number) => (SCREEN_WIDTH / 375) * size
const verticalScale = (size: number) => (SCREEN_HEIGHT / 812) * size
const moderateScale = (size: number, factor = 0.5) =>
	size + (scale(size) - size) * factor

const ICON_SIZE = Math.max(20, Math.min(26, moderateScale(24, 0.3)))
const BACK_ICON_WIDTH = Math.max(11, Math.min(15, moderateScale(13, 0.3)))
const BACK_ICON_HEIGHT = Math.max(14, Math.min(19, moderateScale(17, 0.3)))

const InputIcon = () => (
	<Svg width={ICON_SIZE} height={ICON_SIZE} viewBox='0 0 24 24' fill='none'>
		<Path
			d='M11.9996 12.6399C11.6425 12.6413 11.2957 12.76 11.0125 12.9776C10.7294 13.1953 10.5256 13.5 10.4324 13.8448C10.3392 14.1895 10.3619 14.5554 10.4969 14.886C10.6319 15.2167 10.8718 15.4939 11.1796 15.6749V17.9999H12.8396V15.6749C13.0832 15.5308 13.2853 15.3262 13.4264 15.0809C13.5675 14.8356 13.6426 14.5579 13.6446 14.2749Z'
			stroke='white'
			strokeWidth={0.5}
		/>
		<Path
			d='M18.1454 8.88501H5.85043C4.65749 8.88501 3.69043 9.85207 3.69043 11.045V19.59C3.69043 20.7829 4.65749 21.75 5.85043 21.75H18.1454C19.3384 21.75 20.3054 20.7829 20.3054 19.59V11.045C20.3054 9.85207 19.3384 8.88501 18.1454 8.88501Z'
			stroke='white'
			strokeWidth={0.5}
		/>
		<Path
			d='M6.6748 8.885V7.58C6.6748 6.1664 7.23636 4.81069 8.23593 3.81112C9.23549 2.81155 10.5912 2.25 12.0048 2.25C13.4184 2.25 14.7741 2.81155 15.7737 3.81112C16.7733 4.81069 17.3348 6.1664 17.3348 7.58V8.885'
			stroke='white'
			strokeWidth={0.5}
		/>
	</Svg>
)

export default function LoginDirectScreen() {
	const [userId, setUserId] = useState('')
	const [password, setPassword] = useState('')
	const insets = useSafeAreaInsets()

	const { login, loading, error } = useUserIdLogin()

	const isDisabled = loading || !userId || !password

	const handleLogin = async () => {
		if (isDisabled) return

		try {
			const res = await login({
				user_id: Number(userId),
				password,
			})

			if (res.isNewUser) {
				router.replace('/(auth)/sign-up')
			} else {
				router.replace('/(tabs)/live')
			}
		} catch (e) {}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<ImageBackground
				source={require('../../assets/images/login-bg.jpg')}
				style={styles.background}
				resizeMode='cover'
			>
				<View
					style={[styles.topBar, { marginTop: insets.top + verticalScale(20) }]}
				>
					<Pressable onPress={() => router.back()} hitSlop={12}>
						<Svg
							width={BACK_ICON_WIDTH}
							height={BACK_ICON_HEIGHT}
							viewBox='0 0 13 17'
						>
							<Path
								d='M8.67559 16.5239L0 8.24392L8.67559 0H12.8156L4.10359 8.24392L12.8156 16.5239H8.67559Z'
								fill='black'
							/>
						</Svg>
					</Pressable>
				</View>

				<KeyboardAvoidingView
					style={styles.flex}
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
				>
					<View
						style={[
							styles.centerBlock,
							{
								paddingBottom:
									Math.max(insets.bottom, verticalScale(16)) + verticalScale(8),
							},
						]}
					>
						<Image
							source={require('../../assets/images/new-haka-logo.jpg')}
							style={styles.logo}
						/>

						<Text style={styles.title}>Login ID And Password</Text>

						<View style={styles.inputBlock}>
							<Text style={styles.label}>Haka ID</Text>
							<View style={styles.inputWrapper}>
								<InputIcon />
								<TextInput
									placeholder='Enter ID'
									placeholderTextColor='#fff'
									style={styles.input}
									keyboardType='numeric'
									value={userId}
									onChangeText={setUserId}
								/>
							</View>

							<Text style={styles.label}>Password</Text>
							<View style={styles.inputWrapper}>
								<InputIcon />
								<TextInput
									placeholder='Password'
									placeholderTextColor='#fff'
									style={styles.input}
									secureTextEntry
									value={password}
									onChangeText={setPassword}
								/>
							</View>

							{error && <Text style={styles.error}>{error}</Text>}
						</View>

						<View style={styles.bottomButtonWrapper}>
							<Pressable
								onPress={handleLogin}
								disabled={isDisabled}
								style={[styles.button, isDisabled && styles.disabled]}
							>
								{loading ? (
									<ActivityIndicator color='#800080' />
								) : (
									<Text style={styles.buttonText}>Login</Text>
								)}
							</Pressable>
						</View>
					</View>
				</KeyboardAvoidingView>
			</ImageBackground>
		</TouchableWithoutFeedback>
	)
}

const INPUT_MAX_WIDTH = Math.min(SCREEN_WIDTH * 0.9, 400)
const INPUT_HEIGHT = Math.max(48, Math.min(60, verticalScale(56)))
const BUTTON_HEIGHT = Math.max(48, Math.min(60, verticalScale(55)))

const styles = StyleSheet.create({
	background: { flex: 1 },
	flex: { flex: 1 },

	topBar: {
		paddingHorizontal: scale(20),
	},

	centerBlock: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: scale(20),
		gap: verticalScale(20),
	},

	logo: {
		width: moderateScale(86),
		height: moderateScale(80),
		marginBottom: verticalScale(10),
	},

	title: {
		fontSize: moderateScale(20),
		fontWeight: '600',
		color: '#fff',
	},

	inputBlock: {
		marginTop: verticalScale(40),
		width: '100%',
		maxWidth: INPUT_MAX_WIDTH,
		gap: verticalScale(10),
	},

	label: {
		fontSize: moderateScale(14),
		fontWeight: '600',
		color: '#fff',
	},

	inputWrapper: {
		width: '100%',
		maxWidth: INPUT_MAX_WIDTH,
		height: INPUT_HEIGHT,
		flexDirection: 'row',
		alignItems: 'center',
		gap: scale(12),
		paddingHorizontal: scale(20),
		borderWidth: 1,
		borderColor: '#898483',
		borderRadius: moderateScale(10),
	},

	input: {
		flex: 1,
		fontSize: moderateScale(14),
		color: '#fff',
		includeFontPadding: false,
		textAlignVertical: 'center',
		paddingVertical: 0,
	},

	error: {
		color: '#ff6b6b',
		fontSize: moderateScale(12),
		marginTop: verticalScale(4),
	},

	bottomButtonWrapper: {
		marginTop: verticalScale(30),
		width: '100%',
		maxWidth: INPUT_MAX_WIDTH,
		alignItems: 'center',
	},

	button: {
		width: '100%',
		maxWidth: INPUT_MAX_WIDTH,
		height: BUTTON_HEIGHT,
		borderRadius: moderateScale(10),
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},

	disabled: {
		opacity: 0.6,
	},

	buttonText: {
		fontSize: moderateScale(16),
		color: '#800080',
		fontWeight: '600',
	},
})
