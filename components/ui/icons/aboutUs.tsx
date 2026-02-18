import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function AboutUsIcon(props: any) {
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
				d='M12 0c6.628 0 12 5.373 12 12s-5.372 12-12 12C5.373 24 0 18.627 0 12S5.373 0 12 0zm1.203 10.8h-2.4V18h2.4v-7.2zm-1.19-5.1c-.876 0-1.51.631-1.51 1.483 0 .887.618 1.517 1.51 1.517.856 0 1.49-.63 1.49-1.5 0-.869-.634-1.5-1.49-1.5z'
				fill='#AF52FB'
			/>
		</Svg>
	)
}

export default AboutUsIcon
