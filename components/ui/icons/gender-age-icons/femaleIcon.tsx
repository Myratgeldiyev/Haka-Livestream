import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function FemaleIcon(props: any) {
	return (
		<Svg
			width={10}
			height={10}
			viewBox='0 0 10 10'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M2.141 3.932A3.935 3.935 0 015.178.102a3.926 3.926 0 014.416 2.09A3.936 3.936 0 018.566 6.97a3.927 3.927 0 01-4.883.086l-.937.937.747.748a.524.524 0 11-.74.741l-.748-.747-1.11 1.112a.524.524 0 11-.741-.742l1.11-1.112-.735-.736a.524.524 0 11.741-.741l.735.735.938-.938a3.92 3.92 0 01-.802-2.38zm3.93-2.884a2.88 2.88 0 00-2.882 2.884 2.885 2.885 0 002.882 2.884 2.88 2.88 0 002.881-2.884 2.885 2.885 0 00-2.881-2.884z'
				fill='#fff'
			/>
		</Svg>
	)
}

export default FemaleIcon
