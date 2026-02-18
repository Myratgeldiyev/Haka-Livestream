import { StyleSheet, Text, View } from 'react-native'
import SmallStarBadge from '../gender-age-icons/smallStarBadge'
interface P {
	count: string
}
export const SmallStarBadgeIcon = ({ count }: P) => {
	return (
		<View style={styles.container}>
			<SmallStarBadge />
			<Text style={styles.text}>:{count}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#8B7B1F',
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
