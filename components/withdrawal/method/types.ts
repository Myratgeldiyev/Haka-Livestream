import type { ReactNode } from 'react'
import type { ImageSourcePropType } from 'react-native'

export type PaymentMethodItem = {
	id: string
	name: string
	feeLabel: string
	arrivalLabel: string
	icon?: ImageSourcePropType | ReactNode
}
