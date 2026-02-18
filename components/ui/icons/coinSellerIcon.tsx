import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function CoinSellerIcon(props: any) {
	return (
		<Svg
			width={50}
			height={49}
			viewBox='0 0 50 49'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M28.65 25.834a6.415 6.415 0 004.742-10.867 6.415 6.415 0 00-9.073-.17 6.417 6.417 0 004.331 11.037z'
				fill='#FFEF5E'
			/>
			<Path
				d='M28.652 13a6.412 6.412 0 00-4.602 10.883l9.067-9.068A6.393 6.393 0 0028.652 13z'
				fill='#FFF9BF'
			/>
			<Path
				d='M33.87 29.696l-4.613 1.534h-.011a1.05 1.05 0 00-1.115-1.534H25a6.873 6.873 0 00-4.695-2.087h-3.131L13 29.696v6.261l4.174-2.61C28.369 37.082 24.24 37.118 37 30.74a2.88 2.88 0 00-3.13-1.044z'
				fill='#FFDDA1'
			/>
			<Path
				d='M28.65 16.13v-1.044m0 10.748a6.415 6.415 0 004.742-10.867 6.415 6.415 0 00-9.073-.17 6.417 6.417 0 004.331 11.037z'
				stroke='#191919'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M30.217 16.13H28.1a1.4 1.4 0 00-.522 2.7l2.153.862a1.4 1.4 0 01-.521 2.7h-2.123m1.565 1.044v-1.044m.605 8.838l4.612-1.534A2.88 2.88 0 0137 30.74c-12.76 6.379-8.631 6.342-19.826 2.609L13 35.958'
				stroke='#191919'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M22.392 31.783h5.738a1.059 1.059 0 100-2.087H25a6.873 6.873 0 00-4.695-2.087h-3.131L13 29.696'
				stroke='#191919'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export default CoinSellerIcon
