import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function LikeSocialIcon(props: any) {
	return (
		<Svg
			width={26}
			height={24}
			viewBox='0 0 26 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M23.006 12.794L13.01 23 3.016 12.794a6.887 6.887 0 01-1.525-2.335 7.059 7.059 0 01.14-5.509 6.855 6.855 0 011.643-2.249 6.613 6.613 0 012.38-1.381 6.473 6.473 0 015.314.585 6.734 6.734 0 012.043 1.867 6.73 6.73 0 012.046-1.851 6.473 6.473 0 015.3-.566c.875.286 1.681.756 2.371 1.379a6.856 6.856 0 011.638 2.241 7.058 7.058 0 01.151 5.492 6.887 6.887 0 01-1.511 2.335'
				stroke='#000'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default LikeSocialIcon
