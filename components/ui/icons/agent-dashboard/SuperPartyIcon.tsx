import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SuperPartyIcon(props: any) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path
				d="M12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zM5 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm14 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM7 14h10v4H7v-4z"
				fill="#7C3AED"
			/>
		</Svg>
	)
}

export default SuperPartyIcon
