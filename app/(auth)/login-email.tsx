import { router } from 'expo-router'
import {
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
const MailIcon = () => (
	<Svg width={18} height={14} viewBox='0 0 18 14' fill='none'>
		<Path
			d='M1.616 14C1.15533 14 0.771 13.846 0.463 13.538C0.155 13.23 0.000666667 12.8453 0 12.384V1.616C0 1.15533 0.154333 0.771 0.463 0.463C0.771667 0.155 1.15567 0.000666667 1.615 0H16.385C16.845 0 17.229 0.154333 17.537 0.463C17.845 0.771667 17.9993 1.156 18 1.616V12.385C18 12.845 17.8457 13.2293 17.537 13.538C17.2283 13.8467 16.8443 14.0007 16.385 14H1.616ZM17 1.885L9.448 6.829C9.37733 6.86567 9.306 6.89667 9.234 6.922C9.16133 6.94667 9.08333 6.959 9 6.959C8.91667 6.959 8.83867 6.94667 8.766 6.922C8.69333 6.89733 8.622 6.86633 8.552 6.829L1 1.884V12.384C1 12.564 1.05767 12.7117 1.173 12.827C1.28833 12.9423 1.436 13 1.616 13H16.385C16.5643 13 16.7117 12.9423 16.827 12.827C16.9423 12.7117 17 12.564 17 12.384V1.885ZM9 6L16.692 1H1.308L9 6ZM1 2.096V1.285V1.319V1V1.32V1.268V2.096Z'
			fill='#FFFFFF'
		/>
	</Svg>
)
export default function LoginEmailScreen() {
	return (
		<ImageBackground
			source={require('../../assets/images/login-bg.jpg')}
			style={styles.background}
			resizeMode='cover'
		>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			>
				{/* CENTER BLOCK */}
				<View style={styles.centerBlock}>
					<Image
						source={require('../../assets/images/new-haka-logo.jpg')}
						style={styles.logo}
					/>

					{/* EMAIL INPUT */}
					<View style={styles.inputBlock}>
						<Text style={styles.title}>Login to your account</Text>
						<Text style={styles.label}></Text>

						<View style={styles.inputWrapper}>
							<MailIcon />
							<TextInput
								placeholder='Enter your mail'
								placeholderTextColor='#fff'
								style={styles.input}
								keyboardType='email-address'
								autoCapitalize='none'
							/>
						</View>
					</View>

					{/* LOGIN BUTTON */}
					<Pressable
						style={styles.button}
						onPress={() => router.push('/email-verification')}
					>
						<Text style={styles.buttonText}>Login</Text>
					</Pressable>
				</View>

				{/* BOTTOM TEXT */}
				<View style={styles.bottom}>
					<Text style={styles.bottomText}>
						Need help? Contact our support team...
					</Text>
				</View>
			</KeyboardAvoidingView>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},

	/* CENTER BLOCK */
	centerBlock: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		gap: 20,

		transform: [{ translateY: -110 }],
	},

	logo: {
		width: 86,
		height: 80,
		marginBottom: 10,
	},

	title: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: 16,
		color: '#fff',
		fontWeight: '600',
	},

	/* INPUT */
	inputBlock: {
		width: 380,
		gap: 6,
	},

	label: {
		fontFamily: 'Poppins-Light',
		fontSize: 14,
		fontWeight: '400',
		color: '#fff',
	},
	inputWrapper: {
		width: 380,
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingVertical: 16,
		paddingHorizontal: 20,

		borderWidth: 1,
		borderColor: '#898483',
		borderRadius: 10,

		backgroundColor: 'transparent',
	},

	input: {
		flex: 1,
		fontSize: 14,
		color: '#white',
		backgroundColor: 'transparent',
	},

	inputIcon: {
		width: 20,
		height: 20,
	},

	/* BUTTON */
	button: {
		width: 380,
		height: 55,
		borderRadius: 10,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},

	buttonText: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 16,
		color: '#800080',
	},

	/* BOTTOM */
	bottom: {
		paddingBottom: 50,
		alignItems: 'center',
	},

	bottomText: {
		fontFamily: 'Poppins-Light',
		fontSize: 12,
		color: '#fff',
		fontWeight: '400',
	},
})
