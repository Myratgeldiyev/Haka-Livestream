import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import TopArrowIcon from '../ui/icons/top-up/TopArrowIcon'
import { TOP_UP_COINS } from './constants'

export type TopUpTabId = 'recharge' | 'google_pay' | 'agent'

interface TopUpPaymentTabsProps {
	activeTab: TopUpTabId
	onTabChange: (tab: TopUpTabId) => void
}

const TABS: { id: TopUpTabId; label: string; showInfo?: boolean }[] = [
	{ id: 'recharge', label: 'Recharge' },
	{ id: 'google_pay', label: 'Google Pay' },
	{ id: 'agent', label: 'Agent 30%', showInfo: true },
]

export function TopUpPaymentTabs({
	activeTab,
	onTabChange,
}: TopUpPaymentTabsProps) {
	return (
		<View style={styles.container}>
			{TABS.map(tab => {
				const isActive = activeTab === tab.id
				return (
					<Pressable
						key={tab.id}
						style={styles.tab}
						onPress={() => onTabChange(tab.id)}
					>
						<View style={styles.tabRow}>
							<Text
								style={[
									styles.tabText,
									isActive ? styles.tabTextActive : styles.tabTextInactive,
								]}
							>
								{tab.label}
							</Text>
							{tab.showInfo && (
								<View style={styles.infoWrap}>
									<TopArrowIcon />
								</View>
							)}
						</View>
						{isActive && <View style={styles.underline} />}
					</Pressable>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: TOP_UP_COINS.screenPadding,
		marginBottom: 16,
		justifyContent: 'space-between',
		gap: 20,
	},
	tab: {
		position: 'relative',
		paddingBottom: 8,
	},
	tabRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	tabText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
	},
	tabTextActive: {
		color: TOP_UP_COINS.tabActiveColor,
	},
	tabTextInactive: {
		color: TOP_UP_COINS.tabInactiveColor,
	},
	underline: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 3,
		backgroundColor: TOP_UP_COINS.tabActiveUnderline,
		borderRadius: 2,
	},
	infoWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},
})
