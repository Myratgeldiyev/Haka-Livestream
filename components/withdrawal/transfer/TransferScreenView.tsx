import { PointsSummaryCard } from '@/components/withdrawal/points'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TransferAmountSection } from './TransferAmountSection'
import { TransferReceiverSection } from './TransferReceiverSection'
import { TransferRuleSection } from './TransferRuleSection'
import { TransferScreenHeader } from './TransferScreenHeader'
import { TransferSubmitButton } from './TransferSubmitButton'

interface TransferScreenViewProps {
	onBack: () => void
	onSubmit?: (receiverId: string, amount: string) => void
	availablePoints?: string
	totalPoints?: string
	unconfirmedPoints?: string
}

export function TransferScreenView({
	onBack,
	onSubmit,
	availablePoints = '0',
	totalPoints = '0',
	unconfirmedPoints = '0',
}: TransferScreenViewProps) {
	const insets = useSafeAreaInsets()
	const [receiverId, setReceiverId] = useState('')
	const [amount, setAmount] = useState('')

	const handleSubmit = () => {
		onSubmit?.(receiverId, amount)
		onBack()
	}

	return (
		<View style={styles.container}>
			<TransferScreenHeader onBack={onBack} />
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
				<TransferReceiverSection
					value={receiverId}
					onChangeText={setReceiverId}
				/>
				<TransferAmountSection value={amount} onChangeText={setAmount} />
			</ScrollView>
			<View style={[styles.footer, { paddingBottom: 16 + insets.bottom }]}>
				<TransferRuleSection />
				<TransferSubmitButton onPress={handleSubmit} />
			</View>
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
		paddingTop: 16,
	},
})
