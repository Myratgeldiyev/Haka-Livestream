import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ApplyerRoomPlay(props: any) {
	return (
		<Svg
			width={22}
			height={18}
			viewBox='0 0 22 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M3 18v-2H0V5h3V0h16v5h3v11h-3v2h-2v-2H5v2H3zm-1-4h18V7h-2v5H4V7H2v7zm4-4h10V5h1V2H5v3h1v5z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default ApplyerRoomPlay
