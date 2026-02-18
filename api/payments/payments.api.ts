import { apiClient } from '../axios'
import { ENDPOINTS } from '../endpoints'
import type {
	TopUpRequest,
	TopUpResponse,
	WithdrawalBankRequest,
	WithdrawalCryptoRequest,
	WithdrawalEpayRequest,
	WithdrawalResponse,
} from './payments.types'

export const paymentsApi = {
	topUp: async (params: TopUpRequest): Promise<TopUpResponse> => {
		const response = await apiClient.post<TopUpResponse>(
			ENDPOINTS.PAYMENTS.TOP_UP,
			{ coin_amount: params.coin_amount }
		)
		return response.data
	},

	withdrawalBank: async (
		params: WithdrawalBankRequest
	): Promise<WithdrawalResponse> => {
		const response = await apiClient.post<WithdrawalResponse>(
			ENDPOINTS.PAYMENTS.WITHDRAWAL_BANK,
			{
				amount: params.amount,
				bank_name: params.bank_name,
				account_number: params.account_number,
				account_name: params.account_name,
			}
		)
		return response.data
	},

	withdrawalCrypto: async (
		params: WithdrawalCryptoRequest
	): Promise<WithdrawalResponse> => {
		const response = await apiClient.post<WithdrawalResponse>(
			ENDPOINTS.PAYMENTS.WITHDRAWAL_CRYPTO,
			{
				amount: params.amount,
				method: params.method,
				wallet_address: params.wallet_address,
				network: params.network,
			}
		)
		return response.data
	},

	withdrawalEpay: async (
		params: WithdrawalEpayRequest
	): Promise<WithdrawalResponse> => {
		const response = await apiClient.post<WithdrawalResponse>(
			ENDPOINTS.PAYMENTS.WITHDRAWAL_EPAY,
			{
				amount: params.amount,
				epay_id: params.epay_id,
			}
		)
		return response.data
	},
}
