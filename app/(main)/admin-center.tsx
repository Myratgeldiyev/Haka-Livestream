import type { AdminAgentCardData } from '@/components/admin-center'
import {
	AdminAgentCard,
	AdminCenterHeader,
	AdminProfileCard,
	AgencyInvitationSection,
} from '@/components/admin-center'
import { router } from 'expo-router'
import React, { useCallback, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const LIST_BOTTOM_PADDING = 24
const TAB_BAR_HEIGHT = 52

const MOCK_AGENTS: AdminAgentCardData[] = [
	{
		id: '1',
		name: 'MD SAMIR Rider',
		date: '2025-06-19',
		time: '23:38:59',
		userId: '123455',
		avatarSource: require('@/assets/images/stream-img.png'),
		totalBasicIncome: 'XXXXXXXXX',
		totalValidHost: 0,
		dailyValues: [0, 0, 0, 0, 0, 0, 0],
	},
	{
		id: '2',
		name: 'MD SAMIR Rider',
		date: '2025-06-19',
		time: '23:38:59',
		userId: '123456',
		avatarSource: require('@/assets/images/stream-img.png'),
		totalBasicIncome: 'XXXXXXXXX',
		totalValidHost: 0,
		dailyValues: [0, 0, 0, 0, 0, 0, 0],
	},
	{
		id: '3',
		name: 'MD SAMIR Rider',
		date: '2025-06-19',
		time: '23:38:59',
		userId: '123457',
		avatarSource: require('@/assets/images/stream-img.png'),
		totalBasicIncome: 'XXXXXXXXX',
		totalValidHost: 0,
		dailyValues: [0, 0, 0, 0, 0, 0, 0],
	},
]

export default function AdminCenterScreen() {
	const [agents] = useState<AdminAgentCardData[]>(MOCK_AGENTS)
	const insets = useSafeAreaInsets()

	const handleBack = useCallback(() => router.back(), [])

	const handleCopyId = useCallback(() => {}, [])

	const handleMessage = useCallback(() => {}, [])

	const handleInvite = useCallback(() => {}, [])

	const renderItem: ListRenderItem<AdminAgentCardData> = useCallback(
		({ item }) => (
			<AdminAgentCard
				data={item}
				onCopyId={handleCopyId}
				onChat={() => {}}
				onDetails={() => {}}
			/>
		),
		[handleCopyId],
	)

	const keyExtractor = useCallback((item: AdminAgentCardData) => item.id, [])

	const listHeader = useMemo(
		() => (
			<>
				<AdminProfileCard onCopyId={handleCopyId} onMessage={handleMessage} />
				<AgencyInvitationSection onInvite={handleInvite} />
			</>
		),
		[handleCopyId, handleMessage, handleInvite],
	)

	const listContentStyle = useMemo(
		() => ({
			...styles.listContent,
			paddingBottom:
				insets.bottom + TAB_BAR_HEIGHT + LIST_BOTTOM_PADDING,
		}),
		[insets.bottom],
	)

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
				<AdminCenterHeader onBack={handleBack} />
				<FlatList
					data={agents}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					ListHeaderComponent={listHeader}
					contentContainerStyle={listContentStyle}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				/>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	safe: {
		flex: 1,
	},
	listContent: {
		paddingBottom: LIST_BOTTOM_PADDING,
		flexGrow: 1,
	},
})
