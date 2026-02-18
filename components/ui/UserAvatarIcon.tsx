import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function UserAvatarIcon(props: any) {
	return (
		<Svg
			width={17}
			height={17}
			viewBox='0 0 17 17'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M.5 14.5a4 4 0 014-4h8a4 4 0 014 4 2 2 0 01-2 2h-12a2 2 0 01-2-2z'
				stroke='#000'
				strokeLinejoin='round'
			/>
			<Path d='M8.5 6.5a3 3 0 100-6 3 3 0 000 6z' stroke='#000' />
		</Svg>
	)
}

export default UserAvatarIcon
