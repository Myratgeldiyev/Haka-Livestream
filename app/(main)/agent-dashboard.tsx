import type { AgentDashboardTabId } from '@/components/agent-dashboard'
import {
	AgentDashboardBanner,
	AgentDashboardEarningsCard,
	AgentDashboardHeader,
	AgentDashboardPromoList,
	AgentDashboardTabs,
	AgentDashboardToolsGrid,
	DataContent,
	ManageContent,
} from '@/components/agent-dashboard'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native'

export default function AgentDashboardScreen() {
	const [activeTab, setActiveTab] = useState<AgentDashboardTabId>('make_money')

	const handleBack = useCallback(() => router.back(), [])
	const handleWithdraw = useCallback(() => {}, [])
	const handleToolPress = useCallback((id: string) => {
		if (id === 'add_host') {
			router.push('/add-host')
		}
	}, [])
	const handlePromoPress = useCallback((_id: string) => {}, [])

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.safe}>
				<StatusBar barStyle='light-content' />
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					<AgentDashboardHeader
						onBack={handleBack}
						progressPercent={activeTab === 'data' ? 20 : 4}
						progressPillText={activeTab === 'data' ? 'max' : 'A: 8%'}
					/>
					<View style={{ width: 260, marginLeft: 7, marginVertical: 20 }}>
						<AgentDashboardTabs
							activeTab={activeTab}
							onTabChange={setActiveTab}
						/>
					</View>
					{activeTab === 'make_money' && (
						<>
							<AgentDashboardEarningsCard onWithdraw={handleWithdraw} />
							<AgentDashboardBanner />
							<AgentDashboardToolsGrid onToolPress={handleToolPress} />
							<AgentDashboardPromoList onItemPress={handlePromoPress} />
						</>
					)}
					{activeTab === 'manage' && <ManageContent />}
					{activeTab === 'data' && <DataContent />}
				</ScrollView>
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
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 24,
	},
})
