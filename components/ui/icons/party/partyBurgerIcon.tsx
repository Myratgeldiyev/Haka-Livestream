import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function PartyBurgerIcon(props: any) {
	return (
		<Svg
			width={24}
			height={15}
			viewBox='0 0 24 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M21.923 11.539a1.73 1.73 0 100 3.46 1.73 1.73 0 000-3.46zm-20.768.576C.517 12.115 0 12.628 0 13.27c0 .638.513 1.154 1.155 1.154h16.152a1.153 1.153 0 100-2.308H1.154zM21.923 5.77a1.73 1.73 0 100 3.462 1.73 1.73 0 000-3.462zm-20.768.577C.517 6.346 0 6.858 0 7.5c0 .637.513 1.154 1.155 1.154h16.152A1.152 1.152 0 0018.462 7.5c0-.638-.514-1.154-1.155-1.154H1.154zM21.923 0a1.73 1.73 0 100 3.462 1.73 1.73 0 000-3.462zM1.155.577C.517.577 0 1.089 0 1.73c0 .637.513 1.154 1.155 1.154h16.152a1.152 1.152 0 001.155-1.154c0-.638-.514-1.154-1.155-1.154H1.154z'
				fill='#000'
			/>
		</Svg>
	)
}

export default PartyBurgerIcon
