import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { RankUserItem } from './RankUserItem'

const MOCK_DATA = [
	{ id: '1', rank: 1 },
	{ id: '2', rank: 2 },
	{ id: '3', rank: 3 },
	{ id: '4', rank: 'other' },
	{ id: '5', rank: 'other' },
]

export const RankUsersList = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Rank User</Text>
				<Text style={styles.headerText}>Rewards</Text>
			</View>

			<FlatList
				data={MOCK_DATA}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<RankUserItem
						rank={item.rank as any}
						username='Username'
						userImage={require('@/assets/images/user.png')}
					/>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#492C14',
		flex: 1,
		padding: 16,
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12,
	},

	headerText: {
		color: '#FFF',
		fontSize: 14,
	},
})
