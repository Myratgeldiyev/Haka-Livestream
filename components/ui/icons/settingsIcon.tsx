import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SettingsIcon(props: any) {
	return (
		<Svg
			width={24}
			height={28}
			viewBox='0 0 24 28'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M24 6.93L12 0 0 6.93v13.855l12 6.93 12-6.93V6.93zM12 18.825a4.969 4.969 0 110-9.938 4.969 4.969 0 010 9.938z'
				fill='#FF559A'
			/>
		</Svg>
	)
}

export default SettingsIcon
