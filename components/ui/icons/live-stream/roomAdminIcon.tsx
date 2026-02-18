import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function RoomAdminIcon(props: any) {
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
				d='M20.636 21.41a5.455 5.455 0 100-10.91 5.455 5.455 0 000 10.91zm0 0c2.196 0 4.115.828 5.48 2.206m-5.48-2.207c-4.363 0-7.636 3.273-7.636 7.637V34.5h7.636M37 25.773L33.727 22.5l-6.545 6.546M31 25.227l3.273 3.273m-11.455 2.182a2.728 2.728 0 105.456-.002 2.728 2.728 0 00-5.456.002z'
				stroke='#fff'
				strokeWidth={2}
			/>
		</Svg>
	)
}

export default RoomAdminIcon
