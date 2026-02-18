import { LiveUserCard } from '@/components/home/LiveUserCard'
import { spacing } from '@/constants/spacing'
import { LiveUser } from '@/types'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

type Props = {
	users: LiveUser[]
}

export const NearbyTab = ({ users }: Props) => {
	const [gpsEnabled] = React.useState(false)

	if (!gpsEnabled) {
		return (
			<View style={styles.container}>
				<View style={styles.center}>
					<Image
						source={require('../../assets/images/gps-turnof.png')}
						style={styles.gpsImage}
						resizeMode='contain'
					/>
					<Text style={styles.gpsText}>Turn on GPS</Text>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.grid}>
				{users.map((user, index) => (
					<LiveUserCard key={user.id} user={user} index={index} />
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		minHeight: '100%', // 🔥 KRİTİK
		position: 'relative',
	},

	grid: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
	},

	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: spacing.lg,
	},

	gpsImage: {
		width: '100%',
		height: 260,
		marginBottom: spacing.md,
	},

	gpsText: {
		fontSize: 16,
		color: '#000',
		fontWeight: '500',
	},
})
