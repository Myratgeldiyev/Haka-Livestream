import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function FanBadgeIcon(props: any) {
	return (
		<Svg
			width={44}
			height={45}
			viewBox='0 0 44 45'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={44} height={45} rx={22} fill='#fff' fillOpacity={0.1} />
			<Path
				d='M20.296 28.09l-2.66 6.41-2.727-3.273H10l5.454-4.363m0 0h3.819L22 30.136l2.727-3.272h3.819m-13.091 0v-3.819l-3.273-2.727 3.272-2.727v-3.818h3.273L22 10.5l3.273 3.273h3.273v3.273l3.272 3.272-3.273 2.727v3.819m-4.841 1.227l2.66 6.409 2.727-3.273H34l-5.454-4.363M22 24.682l4.364-4.364-2.182-2.727L22 19.227l-2.182-1.636-2.182 2.727L22 24.682z'
				stroke='#fff'
				strokeMiterlimit={10}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default FanBadgeIcon
