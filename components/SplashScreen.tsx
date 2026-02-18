import { Image, StyleSheet, Text, View } from 'react-native'

export default function SplashScreen() {
	return (
		<View style={styles.container}>
			<Image
				source={require('../assets/images/new-haka-logo.jpg')}
				style={styles.logo}
				resizeMode='contain'
			/>

			<Text style={styles.text}>HAKA LIVE</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		width: 120,
		height: 120,
		marginBottom: 16,
	},
	text: {
		fontSize: 26,
		fontFamily: 'Poppins',
		color: '#FEB032',
	},
})
