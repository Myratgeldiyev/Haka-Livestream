import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function AdminIconMen(props: any) {
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
				d='M4.773 6.818a3.41 3.41 0 100-6.818 3.41 3.41 0 000 6.818zm3.425 1.38c-.853-.862-2.053-1.38-3.425-1.38C2.045 6.818 0 8.864 0 11.591V15h4.773m1.363-2.386a1.705 1.705 0 103.41-.002 1.705 1.705 0 00-3.41.002zM15 9.545L12.954 7.5l-4.09 4.09'
				fill='#DDF'
			/>
		</Svg>
	)
}

export default AdminIconMen
