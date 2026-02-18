import { BalanceCard } from '@/components/withdrawal/BalanceCard'
import { Button } from '@/components/withdrawal/Buttons'
import { ExchangeCoinsScreenView } from '@/components/withdrawal/exchange-coins'
import { MethodSelector } from '@/components/withdrawal/MethodSelector'
import { PointsScreenView } from '@/components/withdrawal/points'
import { RecordScreenView } from '@/components/withdrawal/RecordScreenView'
import { RulesTable } from '@/components/withdrawal/RulesTables'
import { ScamAlertBanner } from '@/components/withdrawal/ScamAlertBanner'
import { ScreenWrapper } from '@/components/withdrawal/ScreenWrapper'
import { TransferScreenView } from '@/components/withdrawal/transfer'
import { WithdrawalHeader } from '@/components/withdrawal/WithdrawalHeader'
import { WithdrawFormView } from '@/components/withdrawal/WithdrawFormView'
import { usePaymentsStore } from '@/store/payments.store'
import React, { useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'

export default function WithdrawalScreen() {
	const [showWithdrawForm, setShowWithdrawForm] = useState(false)
	const [showRecordView, setShowRecordView] = useState(false)
	const [showPointsView, setShowPointsView] = useState(false)
	const [showExchangeCoinsView, setShowExchangeCoinsView] = useState(false)
	const [showTransferView, setShowTransferView] = useState(false)
	const [formAmount, setFormAmount] = useState('')
	const withdrawableAmount = '0'

	const boundEpayId = usePaymentsStore(s => s.boundEpayId)
	const boundBinance = usePaymentsStore(s => s.boundBinance)
	const boundUsdt = usePaymentsStore(s => s.boundUsdt)
	const boundBank = usePaymentsStore(s => s.boundBank)
	const selectedWithdrawalMethod = usePaymentsStore(s => s.selectedWithdrawalMethod)
	const withdrawalEpay = usePaymentsStore(s => s.withdrawalEpay)
	const withdrawalCrypto = usePaymentsStore(s => s.withdrawalCrypto)
	const withdrawalBank = usePaymentsStore(s => s.withdrawalBank)
	const withdrawalError = usePaymentsStore(s => s.error)
	const clearError = usePaymentsStore(s => s.clearError)

	const handleWithdrawNowFromList = () => {
		setShowWithdrawForm(true)
	}

	const handleAmountChange = (text: string) => {
		clearError()
		setFormAmount(text)
	}

	const handleWithdrawSubmit = async () => {
		const useBinance =
			selectedWithdrawalMethod === 'binance' && boundBinance
		const useUsdt =
			selectedWithdrawalMethod === 'usdt' && boundUsdt
		const useBank =
			selectedWithdrawalMethod === 'bank' && boundBank
		const useEpay =
			(selectedWithdrawalMethod === 'epay' ||
				(!useBinance && !useUsdt && !useBank)) &&
			boundEpayId

		if (!useEpay && !useBinance && !useUsdt && !useBank) {
			Alert.alert('Error', 'Please bind a payment method first')
			return
		}
		const amount = formAmount.trim()
		if (!amount) {
			Alert.alert('Error', 'Please enter amount')
			return
		}

		const success = useBinance
			? await withdrawalCrypto({
					amount,
					method: 'binance',
					wallet_address: boundBinance!.wallet_address,
					network: boundBinance!.network,
				})
			: useUsdt
				? await withdrawalCrypto({
						amount,
						method: 'usdt',
						wallet_address: boundUsdt!.wallet_address,
						network: boundUsdt!.network,
					})
				: useBank
					? await withdrawalBank({
							amount,
							bank_name: boundBank!.bank_name,
							account_number: boundBank!.account_number,
							account_name: boundBank!.account_name,
						})
					: await withdrawalEpay({ amount, epay_id: boundEpayId! })

		if (success) {
			Alert.alert('Success', 'Withdrawal successful')
			setShowWithdrawForm(false)
			setFormAmount('')
		} else {
			const err = usePaymentsStore.getState().error
			if (err !== 'Insufficient beans') {
				Alert.alert('Error', err ?? 'Withdrawal failed')
			}
		}
	}

	if (showRecordView) {
		return (
			<ScreenWrapper>
				<RecordScreenView onBack={() => setShowRecordView(false)} />
			</ScreenWrapper>
		)
	}

	if (showTransferView) {
		return (
			<ScreenWrapper>
				<TransferScreenView onBack={() => setShowTransferView(false)} />
			</ScreenWrapper>
		)
	}

	if (showExchangeCoinsView) {
		return (
			<ScreenWrapper>
				<ExchangeCoinsScreenView
					onBack={() => setShowExchangeCoinsView(false)}
				/>
			</ScreenWrapper>
		)
	}

	if (showPointsView) {
		return (
			<ScreenWrapper>
				<PointsScreenView
					onBack={() => setShowPointsView(false)}
					onTransfer={() => setShowTransferView(true)}
					onExchangePoints={() => setShowExchangeCoinsView(true)}
				/>
			</ScreenWrapper>
		)
	}

	return (
		<ScreenWrapper>
			<WithdrawalHeader
				title='Withdraw'
				rightText='Record'
				onRightPress={() => setShowRecordView(true)}
			/>

			{showWithdrawForm ? (
				<View style={{ flex: 1 }}>
					<WithdrawFormView
						withdrawableAmount={withdrawableAmount}
						amount={formAmount}
						onAmountChange={handleAmountChange}
						onWithdrawPress={handleWithdrawSubmit}
						errorMessage={withdrawalError}
					/>
				</View>
			) : (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 24 }}
				>
					<ScamAlertBanner />
					<BalanceCard />
					<MethodSelector />
					<Button
						title='Withdraw now'
						type='primary'
						onPress={handleWithdrawNowFromList}
					/>
					<Button
						title='Exchange Points for Coins'
						type='outline'
						onPress={() => setShowPointsView(true)}
					/>
					<RulesTable />
				</ScrollView>
			)}
		</ScreenWrapper>
	)
}
