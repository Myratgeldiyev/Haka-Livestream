import { Button } from '@/components/withdrawal/Buttons'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { IncomeListItem } from './IncomeListItem'
import { IncomeSectionHeader } from './IncomeSectionHeader'
import { PointsScreenHeader } from './PointsScreenHeader'
import { PointsSummaryCard } from './PointsSummaryCard'

const INCOME_ITEMS = [
	{ id: 'livestream', label: 'Livestream', value: '0' },
	{ id: 'party', label: 'Party', value: '0' },
	{ id: 'platform', label: 'Platform Rewards', value: '0' },
] as const

interface PointsScreenViewProps {
	onBack: () => void
	onWithdrawNow?: () => void
	onExchangePoints?: () => void
	onTransfer?: () => void
	onDetails?: () => void
	availablePoints?: string
	totalPoints?: string
	unconfirmedPoints?: string
}

export function PointsScreenView({
	onBack,
	onWithdrawNow,
	onExchangePoints,
	onTransfer,
	onDetails,
	availablePoints = '0',
	totalPoints = '0',
	unconfirmedPoints = '0',
}: PointsScreenViewProps) {
	const insets = useSafeAreaInsets()

	return (
		<View style={styles.container}>
			<PointsScreenHeader onBack={onBack} onDetails={onDetails} />
			<ScrollView
				style={styles.scroll}
				contentContainerStyle={[
					styles.scrollContent,
					{ paddingBottom: 24 + insets.bottom },
				]}
				showsVerticalScrollIndicator={false}
			>
				<PointsSummaryCard
					availablePoints={availablePoints}
					totalPoints={totalPoints}
					unconfirmedPoints={unconfirmedPoints}
				/>
				<IncomeSectionHeader />
				{INCOME_ITEMS.map(item => (
					<IncomeListItem key={item.id} label={item.label} value={item.value} />
				))}
				<View style={styles.buttons}>
					<Button title='Withdraw now' type='primary' onPress={onWithdrawNow} />
					<Button
						title='Exchange Points for Coins'
						type='outline'
						onPress={onExchangePoints}
					/>
					<Button title='Transfer' type='outline' onPress={onTransfer} />
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingTop: 8,
	},
	buttons: {
		marginTop: 24,
		gap: 0,
	},
})
