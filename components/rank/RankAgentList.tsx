import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import LittleCoin from '../ui/icons/rank/LittleCoin'
import RankDownArrowIcon from '../ui/icons/rank/RankDownArrowIcon'
import RankMutIcon from '../ui/icons/rank/RankMutIcon'
import { RankAgentItem } from './RankAgentItem'

const MOCK_DATA = [
	{ id: '1', rank: 1 },
	{ id: '2', rank: 2 },
	{ id: '3', rank: 3 },
	{ id: '4', rank: 'other' },
	{ id: '5', rank: 'other' },
]

export const RankAgentsList = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable style={styles.cityBtn}>
					<LittleCoin />
					<Text style={styles.headerText}>Delhi</Text>
					<RankDownArrowIcon width={10} height={5} color='#FEB032' />
				</Pressable>
				<Pressable style={styles.cityBtn}>
					<Text style={styles.text}>Yestarday</Text>
					<RankMutIcon />
				</Pressable>
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
		backgroundColor: '#13249A',
		flex: 1,
		padding: 16,
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 5,
		marginBottom: 12,
	},

	headerText: {
		color: '#FEB032',
		fontSize: 14,
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
