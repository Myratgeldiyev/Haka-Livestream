import {
	FamilyDescriptionBar,
	FamilyHeader,
	FamilyIdentityList,
	FamilyMemberList,
	FamilyMonthNav,
	FamilyTabs,
} from '@/components/family'
import type { FamilyTabId } from '@/components/family'
import { router } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	View,
} from 'react-native'

function formatMonthLabel(year: number, month: number): string {
	const m = String(month).padStart(2, '0')
	return `${year}.${m}`
}

export default function FamilyScreen() {
	const [activeTab, setActiveTab] = useState<FamilyTabId>('monthly_exp')
	const [year, setYear] = useState(2025)
	const [month, setMonth] = useState(8)

	const handleBack = useCallback(() => router.back(), [])
	const handlePrevMonth = useCallback(() => {
		if (month === 1) {
			setMonth(12)
			setYear(y => y - 1)
		} else {
			setMonth(m => m - 1)
		}
	}, [month])
	const handleNextMonth = useCallback(() => {
		if (month === 12) {
			setMonth(1)
			setYear(y => y + 1)
		} else {
			setMonth(m => m + 1)
		}
	}, [month])

	const monthLabel = formatMonthLabel(year, month)

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.safe}>
				<StatusBar barStyle="dark-content" />
				<FamilyHeader onBack={handleBack} />
				<FamilyTabs activeTab={activeTab} onTabChange={setActiveTab} />
				{activeTab === 'monthly_exp' && (
					<>
						<FamilyDescriptionBar />
						<FamilyMonthNav
							monthLabel={monthLabel}
							onPrev={handlePrevMonth}
							onNext={handleNextMonth}
						/>
					</>
				)}
				{activeTab === 'monthly_exp' && (
					<View style={styles.listWrap}>
						<FamilyMemberList />
					</View>
				)}
				{activeTab === 'family_identity' && (
					<View style={styles.listWrap}>
						<FamilyIdentityList />
					</View>
				)}
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
	listWrap: {
		flex: 1,
	},
})
