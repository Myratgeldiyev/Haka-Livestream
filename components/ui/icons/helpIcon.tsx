import * as React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'

function HelpIcon(props: any) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<G clipPath='url(#clip0_3918_1274)'>
				<Path
					d='M4 9.6a4 4 0 00-2.262.7 10.403 10.403 0 0120.524 0A4 4 0 0020 9.6a2.4 2.4 0 00-2.4 2.4v6.4a2.4 2.4 0 001.515 2.232A2.4 2.4 0 0116.8 22.4h-4V24h4a4 4 0 003.933-3.267A4 4 0 0024 16.8V12a12 12 0 00-24 0v4.8a4 4 0 004 4 2.4 2.4 0 002.4-2.4V12A2.4 2.4 0 004 9.6z'
					fill='#5F22D9'
				/>
			</G>
			<Defs>
				<ClipPath id='clip0_3918_1274'>
					<Path fill='#fff' d='M0 0H24V24H0z' />
				</ClipPath>
			</Defs>
		</Svg>
	)
}

export default HelpIcon
