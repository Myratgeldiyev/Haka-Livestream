import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function SettingTopUserIcon(props: any) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={24} height={24} rx={2} fill='#fff' fillOpacity={0.1} />
			<Path
				d='M12 .846l9.66 5.578v11.154L12 23.156l-9.66-5.578V6.424L12 .846zm0 2.31L4.34 7.578v8.846L12 20.846l7.66-4.422V7.578L12 3.156zM12 9a3 3 0 100 6 3 3 0 000-6zm-5 3a5 5 0 1110 0 5 5 0 01-10 0z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default SettingTopUserIcon
