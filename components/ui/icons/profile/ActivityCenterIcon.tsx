import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ActivityCenterIcon(props: any) {
	return (
		<Svg
			width={26}
			height={26}
			viewBox='0 0 26 26'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M7.667 6.647V3.824c0-.75.28-1.467.781-1.997.5-.53 1.178-.827 1.886-.827h5.333c.707 0 1.385.297 1.885.827s.782 1.248.782 1.997v2.823M13 13.706v.014M1 9.47c0-.748.281-1.466.781-1.996s1.179-.827 1.886-.827h18.667c.707 0 1.385.298 1.885.827.5.53.781 1.248.781 1.997v12.706a2.91 2.91 0 01-.78 1.996c-.5.53-1.18.827-1.886.827H3.667a2.594 2.594 0 01-1.886-.827 2.91 2.91 0 01-.78-1.996V9.47z'
				stroke='#0D99FF'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M1 15.117a25.467 25.467 0 0012 3.02c4.168 0 8.278-1.034 12-3.02'
				stroke='#0D99FF'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default ActivityCenterIcon
