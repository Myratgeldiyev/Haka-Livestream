import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function BlueUserIcon(props: any) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M6.667 5.333a5.333 5.333 0 1110.666 0 5.333 5.333 0 01-10.666 0zm0 8A6.667 6.667 0 000 20a4 4 0 004 4h16a4 4 0 004-4 6.667 6.667 0 00-6.667-6.667H6.667z'
				fill='#0D99FF'
			/>
		</Svg>
	)
}

export default BlueUserIcon
