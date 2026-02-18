import { LinearGradient } from 'expo-linear-gradient'
import { Image, StyleSheet, Text, View } from 'react-native'

export const RewardCard = () => {
	return (
		<LinearGradient
			colors={['#095F37', '#16DD80']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={styles.container}
		>
			<Text style={styles.title}>Reward</Text>

			<View style={styles.arrows}>
				<Text style={styles.arrow}>▶▶▶</Text>
			</View>

			<Text style={styles.bigText}>Task</Text>

			<Image
				source={require('../../assets/images/star.png')}
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
		right: 0,
		bottom: 0,
		width: 48,
		height: 48,
	},
})
