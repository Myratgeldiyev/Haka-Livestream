import type { AddHostListItemData } from '@/components/agent-dashboard/add-host'
import {
	AddHostFilterBar,
	AddHostHeader,
	AddHostListHeader,
	AddHostListItem,
	AddHostSearchBar,
} from '@/components/agent-dashboard/add-host'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MOCK_HOSTS: AddHostListItemData[] = [
	{
		id: '1',
		name: 'PUJJAD',
		userId: '5778980',
		tag: 'HAKA',
		avatarUri: null,
		level: 9,
		hourlyWage: null,
	},
	{
		id: '2',
		name: 'PUJJAD',
		userId: '5778981',
		tag: 'HAKA',
		avatarUri: null,
		level: 9,
		hourlyWage: null,
	},
	{
		id: '3',
		name: 'PUJJAD',
		userId: '5778982',
		tag: 'HAKA',
		avatarUri: null,
		level: 9,
		hourlyWage: null,
	},
	{
		id: '4',
		name: 'PUJJAD',
		userId: '5778982',
		tag: 'HAKA',
		avatarUri: null,
		level: 9,
		hourlyWage: null,
	},
	{
		id: '5',
		name: 'PUJJAD',
		userId: '5778982',
		tag: 'HAKA',
		avatarUri: null,
		level: 9,
		hourlyWage: null,
	},
]

export default function AddHostScreen() {
	const [hosts] = useState<AddHostListItemData[]>(MOCK_HOSTS)

	const handleBack = useCallback(() => router.back(), [])

	const handleTabChange = useCallback(() => {}, [])

	const handleSearch = useCallback((_query: string) => {}, [])

	const handleCopyUserId = useCallback((_userId: string) => {}, [])

	const renderItem: ListRenderItem<AddHostListItemData> = useCallback(
		({ item }) => (
			<AddHostListItem item={item} onCopyUserId={handleCopyUserId} />
		),
		[handleCopyUserId],
	)

	const keyExtractor = useCallback((item: AddHostListItemData) => item.id, [])

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.safe} edges={['top']}>
				<AddHostHeader onBack={handleBack} onTabChange={handleTabChange} />
				<AddHostFilterBar />
				<AddHostSearchBar onSearch={handleSearch} />
				<AddHostListHeader />
				<FlatList
					data={hosts}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
				/>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	safe: {
		flex: 1,
	},
	listContent: {
		paddingBottom: 24,
		backgroundColor: '#E1F8E6',
	},
})
