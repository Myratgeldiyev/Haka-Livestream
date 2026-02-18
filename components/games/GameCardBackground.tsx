import React from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'

interface Props {
	colors: [string, string]
}

export function GameCardBackground({ colors }: Props) {
	return (
		<Svg width='100%' height='210' viewBox='0 0 180 210' fill='none'>
			<Defs>
				<LinearGradient
					id='cardGradient'
					x1='90'
					y1='0'
					x2='90'
					y2='210'
					gradientUnits='userSpaceOnUse'
				>
					<Stop offset='0.475457' stopColor={colors[0]} />
					<Stop offset='1' stopColor={colors[1]} />
				</LinearGradient>
			</Defs>

			<Path
				d='M0 71.6049C0 59.6362 10.4418 50.3471 22.3291 51.741L91.5257 59.8545C96.6434 60.4545 101.795 59.0562 105.907 55.951L147.947 24.2044C161.124 14.2543 180 23.6537 180 40.1649V190C180 201.046 171.046 210 160 210H20C8.9543 210 0 201.046 0 190L0 71.6049Z'
				fill='url(#cardGradient)'
			/>
		</Svg>
	)
}
