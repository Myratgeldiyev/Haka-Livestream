import {
	LIVE_DATA,
	LiveDataHeader,
	LiveDataMetricsCard,
	LiveDataMonthlyContent,
	LiveDataPkContent,
	LiveDataWeeklyContent,
	type MainTab,
	type SubTab,
} from '@/components/live-data'
import { router } from 'expo-router'
import React, { useCallback, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const TAB_BAR_HEIGHT = 52
const BOTTOM_PADDING = 24

export default function LiveDataScreen() {
	const [mainTab, setMainTab] = useState<MainTab>('live')
	const [subTab, setSubTab] = useState<SubTab>('daily')

	const handleMainTabChange = useCallback((tab: MainTab) => {
		setMainTab(tab)
		setSubTab(tab === 'pk' ? 'random' : 'daily')
	}, [])
	const insets = useSafeAreaInsets()

	const handleBack = useCallback(() => router.back(), [])
	const handleDatePress = useCallback(() => {}, [])
	const handleGetMorePoints = useCallback(() => {}, [])
	const handleWeekPress = useCallback(() => {}, [])
	const handleMonthPress = useCallback(() => {}, [])

	const contentContainerStyle = useMemo(
		() => ({
			...styles.scrollContent,
			paddingBottom: insets.bottom + TAB_BAR_HEIGHT + BOTTOM_PADDING,
			backgroundColor:
				mainTab === 'pk'
					? LIVE_DATA.screenBg
					: subTab === 'weekly' || subTab === 'monthly'
						? LIVE_DATA.weeklyScreenBg
						: LIVE_DATA.screenBg,
		}),
		[insets.bottom, mainTab, subTab],
	)

	const rootStyle = useMemo(
		() => [
			styles.root,
			mainTab === 'live' &&
				(subTab === 'weekly' || subTab === 'monthly') && {
					backgroundColor: LIVE_DATA.weeklyScreenBg,
				},
		],
		[mainTab, subTab],
	)

	const renderContent = () => {
		if (mainTab === 'pk') {
			return <LiveDataPkContent />
		}
		if (subTab === 'weekly') {
			return <LiveDataWeeklyContent onWeekPress={handleWeekPress} />
		}
		if (subTab === 'monthly') {
			return <LiveDataMonthlyContent onMonthPress={handleMonthPress} />
		}
		return (
			<LiveDataMetricsCard
				onDatePress={handleDatePress}
				onGetMorePoints={handleGetMorePoints}
			/>
		)
	}

	return (
		<View style={rootStyle}>
			<SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
				<LiveDataHeader
					mainTab={mainTab}
					subTab={subTab}
					onBack={handleBack}
					onMainTabChange={handleMainTabChange}
					onSubTabChange={setSubTab}
				/>
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={contentContainerStyle}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps="handled"
				>
					{renderContent()}
				</ScrollView>
			</SafeAreaView>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: LIVE_DATA.screenBg,
	},
	safe: {
		flex: 1,
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		paddingBottom: BOTTOM_PADDING,
	},
})
