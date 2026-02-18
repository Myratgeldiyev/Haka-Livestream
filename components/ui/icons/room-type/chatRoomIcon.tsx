import * as React from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'

function ChatRoomIcon(props: any) {
	return (
		<Svg
			width={14}
			height={20}
			viewBox='0 0 14 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M7.5 16.858A7.001 7.001 0 0014 9.875a.625.625 0 10-1.25 0 5.75 5.75 0 01-11.5 0 .625.625 0 00-1.25 0 7 7 0 006.25 6.96v2.54a.625.625 0 101.25 0v-2.517z'
				fill='url(#paint0_linear_3554_837)'
			/>
			<Path
				d='M3 4a4 4 0 018 0v6a4 4 0 11-8 0V4z'
				fill='url(#paint1_linear_3554_837)'
			/>
			<Defs>
				<LinearGradient
					id='paint0_linear_3554_837'
					x1={4.83615e-9}
					y1={4.6345}
					x2={6.725}
					y2={21.03}
					gradientUnits='userSpaceOnUse'
				>
					<Stop stopColor='#CAD2D9' />
					<Stop offset={1} stopColor='#70777D' />
				</LinearGradient>
				<LinearGradient
					id='paint1_linear_3554_837'
					x1={1}
					y1={-3.182}
					x2={8.3455}
					y2={21.8285}
					gradientUnits='userSpaceOnUse'
				>
					<Stop stopColor='#0FAFFF' />
					<Stop offset={1} stopColor='#CC23D1' />
				</LinearGradient>
			</Defs>
		</Svg>
	)
}

export default ChatRoomIcon
