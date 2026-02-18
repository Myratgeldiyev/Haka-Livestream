import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function RightArrowWithIcon(props: any) {
	return (
		<Svg
			width={15}
			height={15}
			viewBox='0 0 15 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect x={0.5} y={0.5} width={14} height={14} rx={7} stroke='#fff' />
			<Path
				d='M4.483 3L4 3.875 9.069 7 4 10.125l.483.875L11 7 4.483 3z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default RightArrowWithIcon
