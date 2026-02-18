import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SearchIcon(props: any) {
	return (
		<Svg
			width={20}
			height={19}
			viewBox='0 0 20 19'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8.387.001a8.5 8.5 0 105.462 15.105l3.7 3.604a1 1 0 001.395-1.433l-3.7-3.603A8.5 8.5 0 008.387 0zM2 8.586A6.5 6.5 0 1115 8.414 6.5 6.5 0 012 8.586z'
				fill='#000'
			/>
		</Svg>
	)
}

export default SearchIcon
