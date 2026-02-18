import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

interface PaymentMethodIconProps {
	color?: string
	width?: number
	height?: number
}

function PaymentMethodIcon({
	color = '#10B981',
	width = 24,
	height = 24,
}: PaymentMethodIconProps) {
	return (
		<Svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
		>
			<Rect
				x={2}
				y={4}
				width={20}
				height={16}
				rx={2}
				stroke={color}
				strokeWidth={2}
			/>
			<Path
				d="M2 10h20"
				stroke={color}
				strokeWidth={2}
			/>
			<Path
				d="M6 15h4"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	)
}

export default PaymentMethodIcon
