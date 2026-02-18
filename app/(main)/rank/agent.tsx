import { RankAgentsList } from '@/components/rank/RankAgentList'
import { RankHeaderAgent } from '@/components/rank/RankHeaderAgent'
import { StyleSheet, View } from 'react-native'

type StateRank = {
	id: string
	name: string
	rank: number
	score: number
	iconValue: number
	extraScore: number
	avatars: any[]
}

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

export default function AgentScreen() {
	return (
		<View style={styles.container}>
			<RankHeaderAgent
				title='Agent'
				subtitle=''
				backgroundImage={require('@/assets/images/rank-agent.png')}
			/>

			<RankAgentsList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 24,
	},
})
