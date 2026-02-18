import { Image, StyleSheet, Text, View } from 'react-native'
interface P {
	number: string
}
export const PurpleDiamond = ({ number }: P) => {
	return (
		<View style={styles.container}>
			<Image source={require('@/assets/images/almas.png')} />
			<Text style={styles.text}>Lv. {number}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#5F22D9',
		paddingHorizontal: 4,
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
