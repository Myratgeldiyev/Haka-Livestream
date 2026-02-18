import { spacing } from '@/constants/spacing'
import { LiveUser } from '@/types'
import { Image, StyleSheet, Text, View } from 'react-native'
import { LiveUserCard } from './LiveUserCard'

type Props = {
	users: LiveUser[]
}

export const FollowTab = ({ users }: Props) => {
	const isEmpty = users.length === 0

	return (
		<>
			{isEmpty ? (
				<View style={styles.container}>
					<View style={styles.emptyContainer}>
						<Image
							source={require('../../assets/images/not-found-followed.png')}
							style={styles.emptyImage}
							resizeMode='contain'
						/>
						<Text style={styles.emptyTitle}>
							The host you followed hasn’t started live
						</Text>
					</View>
				</View>
			) : (
				<View style={styles.container}>
					<View style={styles.grid}>
						{users.map((user, index) => (
							<LiveUserCard key={user.id} user={user} index={index} />
						))}
					</View>
				</View>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		minHeight: '100%',
	},
	grid: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},

	emptyContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: spacing.lg,
		marginTop: 100,
	},

	emptyImage: {
		width: 432,
		height: 312,
	},

	emptyTitle: {
		fontSize: 16,
		color: '#000',
		textAlign: 'center',
	},
})
