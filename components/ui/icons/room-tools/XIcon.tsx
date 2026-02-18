import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function XIcon(props: any) {
	return (
		<Svg
			width={14}
			height={13}
			viewBox='0 0 14 13'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M11.025 0h2.147l-4.69 5.374L14 12.688H9.68L6.294 8.253l-3.87 4.435H.275l5.016-5.75L0 .001h4.43l3.056 4.053L11.025 0zm-.755 11.4h1.19L3.78 1.221H2.504L10.27 11.4z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default XIcon
