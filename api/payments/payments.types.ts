export interface TopUpRequest {
	coin_amount: string
}

export interface TopUpResponse {
	success?: boolean
	[key: string]: unknown
}

export interface WithdrawalBankRequest {
	amount: string
	bank_name: string
	account_number: string
	account_name: string
}

export interface WithdrawalCryptoRequest {
	amount: string
	method: string
	wallet_address: string
	network: string
}

export interface WithdrawalEpayRequest {
	amount: string
	epay_id: string
}

export interface WithdrawalResponse {
	success?: boolean
	[key: string]: unknown
}
