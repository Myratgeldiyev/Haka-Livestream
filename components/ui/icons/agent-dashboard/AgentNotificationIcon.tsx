import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function AgentNotificationIcon(props: any) {
	return (
		<Svg
			width={19}
			height={18}
			viewBox='0 0 19 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M4 14.195V7.21c0-1.236.632-2.42 1.757-3.293C6.883 3.043 8.41 2.553 10 2.553c1.591 0 3.117.49 4.243 1.364C15.368 4.79 16 5.974 16 7.21v6.985m-12 0h12m-12 0H2m14 0h2m-9 2.328h2'
				stroke='#000'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M10 2.552c.552 0 1-.347 1-.776C11 1.347 10.552 1 10 1s-1 .347-1 .776c0 .429.448.776 1 .776z'
				stroke='#000'
				strokeWidth={2}
			/>
		</Svg>
	)
}

export default AgentNotificationIcon
