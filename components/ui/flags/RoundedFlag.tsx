import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function RoundedFlag(props: any) {
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
				d='M11.961 0c-5.2 0-9.64 3.36-11.28 8h22.64c-1.68-4.64-6.12-8-11.36-8z'
				fill='#F2B200'
			/>
			<Path
				d='M11.961 24c5.24 0 9.68-3.32 11.32-8H.681c1.64 4.68 6.08 8 11.28 8z'
				fill='#83BF4F'
			/>
			<Path
				d='M.68 8C.24 9.24 0 10.6 0 12s.24 2.76.68 4h22.64c.44-1.24.68-2.6.68-4s-.24-2.76-.68-4H.68z'
				fill='#fff'
			/>
			<Path
				d='M11.96 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z'
				fill='#428BC1'
			/>
			<Path d='M11.96 14.8a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6z' fill='#fff' />
		</Svg>
	)
}

export default RoundedFlag
