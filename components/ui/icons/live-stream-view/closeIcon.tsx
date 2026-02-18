import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function CloseCircleIcon(props: any) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={24} height={24} rx={12} fill='#DDD' fillOpacity={0.5} />
			<Path
				d='M6 18l6-6 6 6m0-12l-6.001 6L6 6'
				stroke='#fff'
				strokeWidth={3}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default CloseCircleIcon
