import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
interface P {
	props?: any
	color?: string
}
function AdminMicIcon({ props, color = '#000' }: P) {
	return (
		<Svg
			width={16}
			height={19}
			viewBox='0 0 16 19'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M7.301 6.569a3 3 0 103.716-4.71 3 3 0 00-3.716 4.71z'
				fill={color}
				stroke={color}
				strokeWidth={2}
			/>
			<Path
				d='M6.04 4.938l-4.561 6.59 4.562-6.59zm3.142 2.478l-5.348 5.97 5.348-5.97zm-7.703 4.111l2.355 1.859-2.355-1.858z'
				fill={color}
			/>
			<Path
				d='M6.04 4.938l-4.561 6.59 2.355 1.857 5.348-5.97'
				stroke={color}
				strokeWidth={2}
				strokeLinecap='round'
			/>
			<Path
				d='M7.113 1.963l.821 1.25a5 5 0 002.483 1.959l1.407.507'
				fill='#fff'
			/>
			<Path
				d='M7.113 1.963l.821 1.25a5 5 0 002.483 1.959l1.407.507'
				stroke={color}
				strokeWidth={1.5}
			/>
			<Path
				d='M2.197 13.096s-1.034 1.328-1.158 2c-.144.774.135 1.287.514 1.586.379.299 1.21.388 1.993.299 2.134-.245 3.423-3.438 5.35-4.385 1.487-.73 1.384-.632 3-1 1.373-.313 2.698-.547 2.698-.547'
				fill='#fff'
			/>
			<Path
				d='M2.197 13.096s-1.034 1.328-1.158 2c-.144.774.135 1.287.514 1.586.379.299 1.21.388 1.993.299 2.134-.245 3.423-3.438 5.35-4.385 1.487-.73 1.384-.632 3-1 1.373-.313 2.698-.547 2.698-.547'
				stroke={color}
				strokeWidth={2}
				strokeLinecap='round'
			/>
		</Svg>
	)
}

export default AdminMicIcon
