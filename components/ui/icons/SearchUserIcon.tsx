import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SearchUserIcon(props: any) {
	return (
		<Svg
			width={30}
			height={30}
			viewBox='0 0 30 30'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M13.125 23.75c5.868 0 10.625-4.757 10.625-10.625S18.993 2.5 13.125 2.5 2.5 7.257 2.5 13.125 7.257 23.75 13.125 23.75z'
				stroke='#000'
				strokeWidth={2}
				strokeLinejoin='round'
			/>
			<Path
				d='M16.66 8.964A4.987 4.987 0 0013.126 7.5a4.988 4.988 0 00-3.536 1.464m11.175 11.8l5.303 5.303'
				stroke='#000'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default SearchUserIcon
