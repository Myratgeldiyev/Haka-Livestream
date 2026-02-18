import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function PasswordUserIcon(props: any) {
	return (
		<Svg
			width={50}
			height={45}
			viewBox='0 0 50 45'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={50} height={45} rx={22.5} fill='#fff' fillOpacity={0.1} />
			<Path
				d='M32.2 16.1a4.8 4.8 0 014.8 4.8v12.8a4.8 4.8 0 01-4.8 4.8H17.8a4.8 4.8 0 01-4.8-4.8V20.9a4.8 4.8 0 014.8-4.8v-2.4c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2v2.4zm-14.4 1.6a3.2 3.2 0 00-3.2 3.2v12.8a3.2 3.2 0 003.2 3.2h14.4a3.2 3.2 0 003.2-3.2V20.9a3.2 3.2 0 00-3.2-3.2H17.8zm12.8-1.6v-2.4a5.6 5.6 0 00-11.2 0v2.4h11.2zM25 25.7a2.4 2.4 0 100 4.801 2.4 2.4 0 000-4.801zm0-1.6a4 4 0 110 8 4 4 0 010-8z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default PasswordUserIcon
