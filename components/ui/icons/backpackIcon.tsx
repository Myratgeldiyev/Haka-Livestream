import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function BackpackIcon(props: any) {
	return (
		<Svg
			width={24}
			height={30}
			viewBox='0 0 24 30'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M24 9v18c0 1.65-1.35 3-3 3H3c-1.65 0-3-1.35-3-3V9c0-2.79 1.92-5.115 4.5-5.79V0H9v3h6V0h4.5v3.21c2.58.675 4.5 3 4.5 5.79zM3 15v3h15v3h3v-6H3z'
				fill='#4F53F4'
			/>
		</Svg>
	)
}

export default BackpackIcon
