import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
type P = {
	size?: number
}
function ActionUserIcon({ size = 50 }: P) {
	return (
		<Svg width={size} height={size} viewBox='0 0 50 50' fill='none'>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M21 20a4 4 0 118 0 4 4 0 01-8 0zm0 6a5 5 0 00-5 5 3 3 0 003 3h12a3 3 0 003-3 5 5 0 00-5-5h-8z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default ActionUserIcon
