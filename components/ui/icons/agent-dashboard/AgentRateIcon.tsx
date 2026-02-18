import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function AgentRateIcon(props: any) {
	return (
		<Svg
			width={10}
			height={12}
			viewBox='0 0 14 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M9.941 8H12.5a1.001 1.001 0 00.708-1.707L7 0 .793 6.293a.997.997 0 000 1.414A1 1 0 001.5 8h2.489c-.068 2.75-.566 5.755-3.989 8h1c4.633 0 8.443-3.5 8.941-8z'
				fill='#FF2D55'
			/>
		</Svg>
	)
}

export default AgentRateIcon
