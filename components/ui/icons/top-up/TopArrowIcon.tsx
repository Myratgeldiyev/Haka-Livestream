import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function TopArrowIcon(props: any) {
	return (
		<Svg
			width={15}
			height={15}
			viewBox='0 0 15 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M14 0H1C.45 0 0 .45 0 1v13c0 .55.45 1 1 1h13c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1z'
				fill='#427687'
			/>
			<Path
				d='M13.213 0H.938A.944.944 0 000 .938v12.237c0 .525.425.938.938.938H13.2a.936.936 0 00.938-.938V.937C14.161.425 13.724 0 13.212 0z'
				fill='#8CAFBF'
			/>
			<Path
				d='M4.124 5.425l3-3c.2-.225.55-.225.75 0l3 3a.496.496 0 01-.375.825H8.75a.25.25 0 00-.25.25v5.75c0 .275-.225.5-.5.5H7a.501.501 0 01-.5-.5V6.5a.25.25 0 00-.25-.25H4.5a.496.496 0 01-.375-.825z'
				fill='#FAFAFA'
			/>
			<Path
				opacity={0.5}
				d='M4.462 1.112c0-.287-.2-.375-1.35-.337-.963.037-1.438.15-1.725.5-.288.35-.363 1.062-.375 1.912 0 .6 0 1.163.312 1.163.425 0 .425-.988.775-1.538.675-1.087 2.363-1.325 2.363-1.7z'
				fill='#B4E1ED'
			/>
		</Svg>
	)
}

export default TopArrowIcon
