import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { RankHeader } from '@/components/rank/RankHeader'
import { RankItem } from '@/components/rank/RankItem'
import { RankStateButton } from '@/components/rank/RankStateButton'
import { Block, StateTopBlocks } from '@/components/rank/StateTopBlock'

type StateRank = {
	id: string
	name: string
	rank: number
	score: number
	iconValue: number
	extraScore: number
	avatars: any[]
}

const topBlocksData: Block[] = [
	{
		city: 'Delhi',
		value: '12.4K',
		score: '9800',
		rank: 1,
		avatars: [
			'https://i.pravatar.cc/100',
			'https://i.pravatar.cc/101',
			'https://i.pravatar.cc/102',
		],
	},
	{
		city: 'Mumbai',
		value: '10.1K',
		score: '9200',
		rank: 2,
		avatars: [
			'https://i.pravatar.cc/103',
			'https://i.pravatar.cc/104',
			'https://i.pravatar.cc/105',
		],
	},
	{
		city: 'Pune',
		value: '8.7K',
		score: '8700',
		rank: 3,
		avatars: ['https://i.pravatar.cc/106', 'https://i.pravatar.cc/107'],
	},
]

const MOCK_STATES: StateRank[] = [
	{
		id: '1',
		name: 'Uttar Pradesh',
		rank: 1,
		score: 40000,
		iconValue: 12312,
		extraScore: 9820,
		avatars: [
			require('@/assets/images/room-admin.png'),
			require('@/assets/images/room-admin.png'),
			require('@/assets/images/room-admin.png'),
			require('@/assets/images/room-admin.png'),
			require('@/assets/images/room-admin.png'),
		],
	},
	{
		id: '2',
		name: 'Maharashtra',
		rank: 2,
		score: 36500,
		iconValue: 11020,
		extraScore: 9340,
		avatars: [
			require('@/assets/images/room-admin.png'),
			require('@/assets/images/room-admin.png'),
			require('@/assets/images/room-admin.png'),
		],
	},
	{
		id: '3',
		name: 'Karnataka',
		rank: 3,
		score: 31200,
		iconValue: 9820,
		extraScore: 8760,
		avatars: [
			require('@/assets/images/room-admin.png'),
			require('@/assets/images/room-admin.png'),
		],
	},
]

export default function StateRankScreen() {
	return (
		<View style={styles.container}>
			<RankHeader
				title='State Star Ranking'
				subtitle=''
				backgroundImage={require('@/assets/images/state-bg.png')}
			/>

			<FlatList
				data={MOCK_STATES}
				keyExtractor={item => item.id}
				contentContainerStyle={styles.listContent}
				ListHeaderComponent={
					<>
						<RankStateButton />
						<StateTopBlocks data={topBlocksData} />
					</>
				}
				renderItem={({ item }) => (
					<RankItem
						title={item.name}
						rank={item.rank}
						score={item.score}
						iconValue={item.iconValue}
						extraScore={item.extraScore}
						avatars={item.avatars}
						onPress={() => {
							console.log('Pressed:', item.name)
						}}
					/>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#3F2105',
	},
	listContent: {
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 24,
	},
})
