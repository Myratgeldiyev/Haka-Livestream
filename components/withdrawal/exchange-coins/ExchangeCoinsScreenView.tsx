import { PointsSummaryCard } from '@/components/withdrawal/points'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { AnchorLayout } from './DateRangeOverlay'
import { DateRangeOverlay } from './DateRangeOverlay'
import { ExchangeCoinsButton } from './ExchangeCoinsButton'
import { ExchangeCoinsScreenHeader } from './ExchangeCoinsScreenHeader'
import { ExchangeQuantitySection } from './ExchangeQuantitySection'
import { VerificationSection } from './VerificationSection'

interface ExchangeCoinsScreenViewProps {
	onBack: () => void
	onExchange?: (optionId: string, verificationCode: string) => void
	availablePoints?: string
	totalPoints?: string
	unconfirmedPoints?: string
}

export function ExchangeCoinsScreenView({
	onBack,
	onExchange,
	availablePoints = '0',
	totalPoints = '0',
	unconfirmedPoints = '0',
}: ExchangeCoinsScreenViewProps) {
	const insets = useSafeAreaInsets()
	const [selectedOptionId, setSelectedOptionId] = useState<string | null>('1')
	const [verificationCode, setVerificationCode] = useState('')
	const [displayCode, setDisplayCode] = useState('123456')
	const [showDateRangeOverlay, setShowDateRangeOverlay] = useState(false)
	const [selectedDateRange, setSelectedDateRange] = useState('Last 30 days')
	const [dateAnchorLayout, setDateAnchorLayout] = useState<AnchorLayout | null>(
		null
	)

	const handleRefreshCode = () => {
		setDisplayCode(String(Math.floor(100000 + Math.random() * 900000)))
	}

	const handleDatePress = (layout: AnchorLayout) => {
		setDateAnchorLayout(layout)
		setShowDateRangeOverlay(true)
	}

	const handleExchange = () => {
		if (selectedOptionId) {
			onExchange?.(selectedOptionId, verificationCode)
			onBack()
		}
	}

	return (
		<View style={styles.container}>
			<ExchangeCoinsScreenHeader onBack={onBack} />
			<ScrollView
				style={styles.scroll}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
			>
				<PointsSummaryCard
					availablePoints={availablePoints}
					totalPoints={totalPoints}
					unconfirmedPoints={unconfirmedPoints}
				/>
				<ExchangeQuantitySection
					selectedId={selectedOptionId}
					onSelect={setSelectedOptionId}
					dateLabel={selectedDateRange}
					onDatePress={handleDatePress}
				/>
				<VerificationSection
					code={verificationCode}
					onCodeChange={setVerificationCode}
					displayCode={displayCode}
					onRefreshCode={handleRefreshCode}
				/>
			</ScrollView>
			<View style={[styles.footer, { paddingBottom: 16 + insets.bottom }]}>
				<ExchangeCoinsButton onPress={handleExchange} />
			</View>
			<DateRangeOverlay
				visible={showDateRangeOverlay}
				selectedValue={selectedDateRange}
				onSelect={setSelectedDateRange}
				onClose={() => setShowDateRangeOverlay(false)}
				anchorLayout={dateAnchorLayout}
			/>
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
		paddingBottom: 16,
	},
	footer: {
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 26,
		paddingTop: 16,
	},
})
