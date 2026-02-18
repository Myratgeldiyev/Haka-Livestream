import * as React from 'react'
import Svg, { Defs, G, LinearGradient, Rect, Stop } from 'react-native-svg'

function AdminIcon(props: any) {
	return (
		<Svg
			width={73}
			height={26}
			viewBox='0 0 73 26'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<G filter='url(#filter0_d_5461_555)'>
				<Rect
					width={65}
					height={18}
					rx={9}
					transform='matrix(1 0 0 -1 4 18)'
					fill='url(#paint0_linear_5461_555)'
				/>
			</G>
			<Defs>
				<LinearGradient
					id='paint0_linear_5461_555'
					x1={65}
					y1={9}
					x2={0}
					y2={9}
					gradientUnits='userSpaceOnUse'
				>
					<Stop stopColor='#E21519' />
					<Stop offset={1} />
				</LinearGradient>
			</Defs>
		</Svg>
	)
}

export default AdminIcon
