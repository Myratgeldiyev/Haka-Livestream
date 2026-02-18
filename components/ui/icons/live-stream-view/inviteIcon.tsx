import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function InviteIcon(props: any) {
	return (
		<Svg
			width={18}
			height={22}
			viewBox='0 0 18 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M8.945 0a5 5 0 015 5v4a5 5 0 11-10 0V5a5 5 0 015-5zM0 10h2.015a7.002 7.002 0 0013.858 0h2.016a9.004 9.004 0 01-7.944 7.945V22h-2v-4.055A9.004 9.004 0 010 10z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default InviteIcon
