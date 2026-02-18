import { MomentCard } from '@/components/games/MomentCard'
import { FlatList } from 'react-native'

const MOCK_MOMENTS = [{ id: '1' }, { id: '2' }, { id: '3' }]

export function MomentsList() {
	return (
		<FlatList
			data={MOCK_MOMENTS}
			keyExtractor={item => item.id}
			renderItem={() => <MomentCard />}
			showsVerticalScrollIndicator={false}
		/>
	)
}
