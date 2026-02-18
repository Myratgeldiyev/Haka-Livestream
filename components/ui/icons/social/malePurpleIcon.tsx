import { StyleSheet, Text, View } from 'react-native'
import MaleIcon from '../gender-age-icons/maleIcon'
interface P {
	count: string
}
export const MalePurpleIcon = ({ count }: P) => {
	return (
		<View style={styles.container}>
			<MaleIcon />
			<Text style={styles.text}>: {count}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#5F22D9',
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
