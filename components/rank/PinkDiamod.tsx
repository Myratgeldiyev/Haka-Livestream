import { Image, StyleSheet, Text, View } from 'react-native'
interface P {
	number: string
}
export const PinkDiamond = ({ number }: P) => {
	return (
		<View style={styles.container}>
			<Image source={require('@/assets/images/Zumrut.png')} />
			<Text style={styles.text}>{number}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FE6BE4',
		paddingHorizontal: 6,
		paddingVertical: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
		borderRadius: 16,
	},
	text: {
		fontSize: 10,
		color: '#fff',
		fontWeight: 500,
	},
})
