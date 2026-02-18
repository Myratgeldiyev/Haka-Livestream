import { paymentsApi } from '@/api/payments/payments.api'
import type {
	WithdrawalBankRequest,
	WithdrawalCryptoRequest,
	WithdrawalEpayRequest,
} from '@/api/payments/payments.types'
import { AxiosError } from 'axios'
import { create } from 'zustand'

function getPaymentErrorMessage(e: unknown, fallback: string): string {
	if (e instanceof AxiosError && e.response?.data) {
		const data = e.response.data as { error?: string }
		if (typeof data.error === 'string') return data.error
	}
	if (e instanceof Error) return e.message
	return fallback
}

export type BoundCrypto = { wallet_address: string; network: string }
export type BoundBank = {
	account_name: string
	account_number: string
	bank_name: string
}
export type WithdrawalMethod = 'epay' | 'binance' | 'usdt' | 'bank'

interface PaymentsState {
	boundEpayId: string | null
	boundBinance: BoundCrypto | null
	boundUsdt: BoundCrypto | null
	boundBank: BoundBank | null
	selectedWithdrawalMethod: WithdrawalMethod | null
	isLoading: boolean
	error: string | null
	setBoundEpayId: (id: string | null) => void
	setBoundBinance: (data: BoundCrypto | null) => void
	setBoundUsdt: (data: BoundCrypto | null) => void
	setBoundBank: (data: BoundBank | null) => void
	setSelectedWithdrawalMethod: (method: WithdrawalMethod | null) => void
	clearError: () => void
	topUp: (coinAmount: string) => Promise<boolean>
	withdrawalBank: (params: WithdrawalBankRequest) => Promise<boolean>
	withdrawalCrypto: (params: WithdrawalCryptoRequest) => Promise<boolean>
	withdrawalEpay: (params: WithdrawalEpayRequest) => Promise<boolean>
}

function nextMethod(state: PaymentsState): WithdrawalMethod | null {
	if (state.boundBinance) return 'binance'
	if (state.boundUsdt) return 'usdt'
	if (state.boundBank) return 'bank'
	return null
}

export const usePaymentsStore = create<PaymentsState>((set) => ({
	boundEpayId: null,
	boundBinance: null,
	boundUsdt: null,
	boundBank: null,
	selectedWithdrawalMethod: null,
	isLoading: false,
	error: null,

	setBoundEpayId: (id: string | null) =>
		set(state => ({
			boundEpayId: id,
			selectedWithdrawalMethod: id ? 'epay' : nextMethod(state),
		})),
	setBoundBinance: (data: BoundCrypto | null) =>
		set(state => ({
			boundBinance: data,
			selectedWithdrawalMethod: data
				? 'binance'
				: state.boundEpayId
					? 'epay'
					: state.boundUsdt
						? 'usdt'
						: state.boundBank
							? 'bank'
							: null,
		})),
	setBoundUsdt: (data: BoundCrypto | null) =>
		set(state => ({
			boundUsdt: data,
			selectedWithdrawalMethod: data
				? 'usdt'
				: state.boundEpayId
					? 'epay'
					: state.boundBinance
						? 'binance'
						: state.boundBank
							? 'bank'
							: null,
		})),
	setBoundBank: (data: BoundBank | null) =>
		set(state => ({
			boundBank: data,
			selectedWithdrawalMethod: data
				? 'bank'
				: state.boundEpayId
					? 'epay'
					: state.boundBinance
						? 'binance'
						: state.boundUsdt
							? 'usdt'
							: null,
		})),
	setSelectedWithdrawalMethod: (method: WithdrawalMethod | null) =>
		set({ selectedWithdrawalMethod: method }),
	clearError: () => set({ error: null }),

	topUp: async (coinAmount: string): Promise<boolean> => {
		try {
			set({ isLoading: true, error: null })
			await paymentsApi.topUp({ coin_amount: coinAmount })
			set({ isLoading: false, error: null })
			return true
		} catch (e: unknown) {
			set({
				error: getPaymentErrorMessage(e, 'Top-up failed'),
				isLoading: false,
			})
			return false
		}
	},

	withdrawalBank: async (
		params: WithdrawalBankRequest
	): Promise<boolean> => {
		try {
			set({ isLoading: true, error: null })
			await paymentsApi.withdrawalBank(params)
			set({ isLoading: false, error: null })
			return true
		} catch (e: unknown) {
			set({
				error: getPaymentErrorMessage(e, 'Bank withdrawal failed'),
				isLoading: false,
			})
			return false
		}
	},

	withdrawalCrypto: async (
		params: WithdrawalCryptoRequest
	): Promise<boolean> => {
		try {
			set({ isLoading: true, error: null })
			await paymentsApi.withdrawalCrypto(params)
			set({ isLoading: false, error: null })
			return true
		} catch (e: unknown) {
			set({
				error: getPaymentErrorMessage(e, 'Crypto withdrawal failed'),
				isLoading: false,
			})
			return false
		}
	},

	withdrawalEpay: async (
		params: WithdrawalEpayRequest
	): Promise<boolean> => {
		try {
			set({ isLoading: true, error: null })
			await paymentsApi.withdrawalEpay(params)
			set({ isLoading: false, error: null })
			return true
		} catch (e: unknown) {
			const message =
				e instanceof AxiosError && e.response?.status === 401
					? 'Insufficient beans'
					: getPaymentErrorMessage(e, 'ePay withdrawal failed')
			set({ error: message, isLoading: false })
			return false
		}
	},
}))
