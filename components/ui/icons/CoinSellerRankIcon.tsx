import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

interface CoinSellerRankIconProps {
	color?: string
	width?: number
	height?: number
}

function CoinSellerRankIcon({
	color = '#F59E0B',
	width = 24,
	height = 24,
}: CoinSellerRankIconProps) {
	return (
		<Svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
		>
			<Path
				d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4l-6.4 4.8 2.4-7.2-6-4.8h7.6L12 2z"
				stroke={color}
				strokeWidth={2}
				strokeLinejoin="round"
			/>
			<Circle
				cx={12}
				cy={12}
				r={3}
				fill={color}
			/>
		</Svg>
	)
}

export default CoinSellerRankIcon
