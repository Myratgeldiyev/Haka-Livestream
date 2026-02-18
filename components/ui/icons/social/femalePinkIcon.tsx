import { StyleSheet, Text, View } from 'react-native'
import FemaleIcon from '../gender-age-icons/femaleIcon'
interface P {
	count: string
}
export const FemalePinkIcon = ({ count }: P) => {
	return (
		<View style={styles.container}>
			<FemaleIcon />
			<Text style={styles.text}>: 26</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F9467D',
		paddingHorizontal: 5,
		borderRadius: 20,
		display: 'flex',
		flexDirection: 'row',
		gap: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 12,
	},
})
