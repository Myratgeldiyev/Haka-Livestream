import {
	ActivityCentreCardList,
	ActivityCentreHeader,
	ActivityCentreTabs,
} from '@/components/activity-centre'
import type {
	ActivityCentreTabId,
	ActivityCentreItem,
} from '@/components/activity-centre'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native'

export default function ActivityCentreScreen() {
	const [activeTab, setActiveTab] = useState<ActivityCentreTabId>('ongoing')

	const handleBack = useCallback(() => router.back(), [])
	const handleTabChange = useCallback((tab: ActivityCentreTabId) => {
		setActiveTab(tab)
	}, [])
	const handleCardPress = useCallback((_item: ActivityCentreItem) => {
		// TODO: navigate to activity detail
	}, [])

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.safe}>
				<StatusBar barStyle="dark-content" />
				<ActivityCentreHeader onBack={handleBack} />
				<ActivityCentreTabs activeTab={activeTab} onTabChange={handleTabChange} />
				<ActivityCentreCardList
					activeTab={activeTab}
					onCardPress={handleCardPress}
				/>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	safe: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0,
	},
})
