import BankIcon from '@/components/ui/icons/coin-seller/BankIcon'
import BinanceIcon from '@/components/ui/icons/coin-seller/binanceIcon'
import EpayIcon from '@/components/ui/icons/coin-seller/epayIcon'
import UsdtIcon from '@/components/ui/icons/coin-seller/usdtIcon'
import type { PaymentMethodItem } from './types'

const iconSize = '48'

export const PAYMENT_METHODS: PaymentMethodItem[] = [
	{
		id: 'epay',
		name: 'Epay',
		feeLabel: 'Fee: 10,000points',
		arrivalLabel: 'Arrival time',
		icon: <EpayIcon props size={iconSize} />,
	},
	{
		id: 'binance-bep20',
		name: 'BINANCE (BEP20)',
		feeLabel: 'Fee: 1.5%',
		arrivalLabel: 'Arrival time: 1 hour',
		icon: <BinanceIcon props size={iconSize} />,
	},
	{
		id: 'usdt-trc20',
		name: 'USDT- TRC20',
		feeLabel: 'Fee: 1.5%',
		arrivalLabel: 'Arrival time: 1 hour',
		icon: <UsdtIcon props size={iconSize} />,
	},
	{
		id: 'bank-transfer',
		name: 'BANK TRANSFER',
		feeLabel: 'Fee: 3%',
		arrivalLabel: 'Arrival 24 hours',
		icon: <BankIcon props size={iconSize} />,
	},
]
