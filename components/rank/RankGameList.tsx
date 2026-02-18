import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import RankMutIcon from '../ui/icons/rank/RankMutIcon'
import TimerIcon from '../ui/icons/rank/TimerIcon'
import { RankAgentItem } from './RankAgentItem'

const MOCK_DATA = [
	{ id: '1', rank: 1 },
	{ id: '2', rank: 2 },
	{ id: '3', rank: 3 },
	{ id: '4', rank: 'other' },
	{ id: '5', rank: 'other' },
]

export const RankGameList = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.row}>
					<TimerIcon />
					<Text style={styles.headerText}>DAY:HH:MIN:SEC</Text>
				</View>

				<View style={styles.row}>
					<RankMutIcon />
					<Text style={styles.headerText}>Current</Text>
				</View>
			</View>

			<FlatList
				data={MOCK_DATA}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<RankAgentItem
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
		backgroundColor: '#47014A',
		flex: 1,
		padding: 16,

		marginTop: -40,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 5,
		marginBottom: 12,
	},

	headerText: {
		color: '#fff',
		fontSize: 14,
	},
	row: {
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center',
	},
	cityBtn: {
		backgroundColor: '#040926',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 16,
	},
	text: {
		color: '#fff',
	},
})
