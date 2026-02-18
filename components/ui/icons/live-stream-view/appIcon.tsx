import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function AppIcon(props: any) {
	return (
		<Svg
			width={40}
			height={40}
			viewBox='0 0 40 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={40} height={40} rx={20} fill='#000' fillOpacity={0.2} />
			<Path
				d='M9 17.999a1 1 0 01-1-1V9a1 1 0 011-1h8a1 1 0 011 1V17a1 1 0 01-1 1H9zm14.001 0a1 1 0 01-1-1V9a1 1 0 011-1H31a1 1 0 011 1V17a1 1 0 01-1 1H23zM9.001 32A1 1 0 018 31v-8a1 1 0 011-1h8a1 1 0 011 1v8a1 1 0 01-1 1H9zm14 0a1 1 0 01-1-1v-8a1 1 0 011-1H31a1 1 0 011 1v8a1 1 0 01-1 1H23z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default AppIcon
