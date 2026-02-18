import { LinearGradient } from 'expo-linear-gradient'
import { Image, StyleSheet, Text, View } from 'react-native'

export const JoinCallCard = () => {
	return (
		<LinearGradient
			colors={['#4D25FE', '#AB5DE7']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.container}
		>
			<Text style={styles.title}>Join call</Text>

			<View style={styles.arrows}>
				<Text style={styles.arrow}>▶▶▶</Text>
			</View>

			<Text style={styles.bigText}>Party</Text>

			<Image
				source={require('../../assets/images/party.png')}
				style={styles.image}
				resizeMode='contain'
			/>
		</LinearGradient>
	)
}
const styles = StyleSheet.create({
	container: {
		width: 110,
		height: 70,
		borderRadius: 10,
		padding: 8,
		overflow: 'hidden',
	},

	title: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},

	arrows: {
		marginTop: 4,
	},

	arrow: {
		color: 'rgba(255,255,255,0.6)',
		fontSize: 14,
	},

	bigText: {
		position: 'absolute',
		bottom: -6,
		left: 10,
		fontSize: 28,
		fontWeight: '800',
		color: 'rgba(255,255,255,0.25)',
	},

	image: {
		position: 'absolute',
		right: 2,
		bottom: 4,
		width: 58,
		height: 58,
	},
})
