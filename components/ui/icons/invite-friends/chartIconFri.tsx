import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ChartIconFri(props: any) {
	return (
		<Svg
			width={18}
			height={18}
			viewBox='0 0 18 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M8.188 9.592l1.236-8.085a8.25 8.25 0 00-1.236-.102 8.188 8.188 0 108.187 8.188c0-.193-.015-.38-.028-.57l-8.16.57zM11.078 0L9.842 8.085l8.159-.57A8.182 8.182 0 0011.078 0z'
				fill='#FC0'
			/>
		</Svg>
	)
}

export default ChartIconFri
