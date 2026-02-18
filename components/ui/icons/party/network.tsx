import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function NetworkPartyIcon(props: any) {
	return (
		<Svg
			width={14}
			height={14}
			viewBox='0 0 14 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M0 10a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1H1a1 1 0 01-1-1v-3zm5-4a1 1 0 011-1h2a1 1 0 011 1v7a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm5-5a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V1z'
				fill='#000'
				fillOpacity={0.5}
			/>
		</Svg>
	)
}

export default NetworkPartyIcon
