import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function HostApplicationIcon(props: any) {
	return (
		<Svg
			width={24}
			height={22}
			viewBox='0 0 24 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M18 0a3.6 3.6 0 013.594 3.389l.006.211v5.22l.713-.317c.737-.327 1.586.18 1.68.958L24 9.6v9.6a2.4 2.4 0 01-2.22 2.394l-.18.006H2.4a2.4 2.4 0 01-2.394-2.22L0 19.2V9.6c0-.806.81-1.376 1.556-1.146l.132.05.712.316V3.6A3.6 3.6 0 015.789.006L6 0h12zm0 2.4H6a1.2 1.2 0 00-1.2 1.2v6.287l7.2 3.2 7.2-3.2V3.6A1.2 1.2 0 0018 2.4zM12 6a1.2 1.2 0 01.14 2.392L12 8.4H9.6a1.2 1.2 0 01-.14-2.392L9.6 6H12z'
				fill='#FF2D55'
			/>
		</Svg>
	)
}

export default HostApplicationIcon
