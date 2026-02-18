import { LiveUserCard } from '@/components/home/LiveUserCard'
import { spacing } from '@/constants/spacing'
import { LiveUser } from '@/types'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
	users: LiveUser[]
}

export const NewTab = ({ users }: Props) => {
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
		minHeight: '100%',
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
