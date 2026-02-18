import { LiveUserCard } from '@/components/home/LiveUserCard'
import { LiveUserCardSkeleton } from '@/components/home/LiveUserCardSkeleton'
import { LiveUser } from '@/types'
import { router } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TopicEventBanner } from './TopicEventBanner'

type Props = {
	users: LiveUser[]
	isLoading?: boolean
}

const SKELETON_TOP_COUNT = 2
const SKELETON_BOTTOM_COUNT = 4

const handleCardPress = (user: LiveUser) => {
	router.push(`/live/${user.id}`)
}

export const LiveTab = ({ users, isLoading = false }: Props) => {
	if (isLoading) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.content}>
					<View style={styles.grid}>
						{Array.from({ length: SKELETON_TOP_COUNT }).map((_, i) => (
							<LiveUserCardSkeleton key={`skeleton-top-${i}`} />
						))}
					</View>

					<TopicEventBanner />

					<View style={styles.grid}>
						{Array.from({ length: SKELETON_BOTTOM_COUNT }).map((_, i) => (
							<LiveUserCardSkeleton key={`skeleton-bottom-${i}`} />
						))}
					</View>
				</View>
			</SafeAreaView>
		)
	}

	if (users.length === 0) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>No live streams available</Text>
				</View>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<View style={styles.grid}>
					{users.slice(0, 2).map((user, index) => (
						<LiveUserCard
							key={user.id}
							user={user}
							index={index}
							onPress={handleCardPress}
						/>
					))}
				</View>

				<TopicEventBanner />

				<View style={styles.grid}>
					{users.slice(2).map((user, index) => (
						<LiveUserCard
							key={user.id}
							user={user}
							index={index + 2}
							onPress={handleCardPress}
						/>
					))}
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		minHeight: '100%',
		position: 'relative',
	},

	content: {
		flexGrow: 1,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingHorizontal: 0,
		justifyContent: 'space-between',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 40,
	},
	emptyText: {
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
	},
})
