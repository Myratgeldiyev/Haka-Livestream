import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'

import { GameGrid } from '@/components/games/GameGrid'
import { GameTabs } from '@/components/games/GamesTabs'
import { MomentsList } from '@/components/games/MomentsList'
import VideosScreen from '@/components/games/VideosScreen'
import { GAME_LIST, GameTabType } from '@/types/games'

export default function GamesScreen() {
	const [activeTab, setActiveTab] = useState<GameTabType>('game')
	const navigation = useNavigation()

	const isVideoTab = activeTab === 'video'

	useEffect(() => {
		navigation.setOptions({
			tabBarStyle: isVideoTab ? { display: 'none' } : undefined,
		})
	}, [isVideoTab, navigation])

	const handleTabChange = useCallback((tab: GameTabType) => {
		setActiveTab(tab)
	}, [])

	if (isVideoTab) {
		return (
			<View style={styles.fullScreen}>
				<View style={styles.videoTabsOverlay}>
					<SafeAreaView edges={['top']}>
						<GameTabs activeTab={activeTab} onChange={handleTabChange} />
					</SafeAreaView>
				</View>
				<VideosScreen />
			</View>
		)
	}

	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.container}>
				<GameTabs activeTab={activeTab} onChange={handleTabChange} />
				{activeTab === 'game' && <GameGrid data={GAME_LIST} />}
				{activeTab === 'moment' && <MomentsList />}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	container: {
		flex: 1,
	},
	fullScreen: {
		flex: 1,
		backgroundColor: '#000',
	},
	videoTabsOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 10,
	},
})
