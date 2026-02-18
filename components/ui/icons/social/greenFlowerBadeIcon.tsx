import { StyleSheet, Text, View } from 'react-native'
import GreenFlowerIcon from '../gender-age-icons/GreenFlowerIcon'
interface P {
	count: string
}
export const GreenFlowerBadgeIcon = ({ count }: P) => {
	return (
		<View style={styles.container}>
			<GreenFlowerIcon />
			<Text style={styles.text}>: {count}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#60D386',
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
