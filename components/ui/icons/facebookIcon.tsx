import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function FacebookIcon(props: any) {
	return (
		<Svg
			width={50}
			height={50}
			viewBox='0 0 50 50'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				clipRule='evenodd'
				d='M14.152 37A1.155 1.155 0 0113 35.842V14.158c0-.64.516-1.158 1.152-1.158h21.697c.635 0 1.151.518 1.151 1.158v21.684c0 .64-.516 1.158-1.151 1.158H14.152z'
				stroke='#5F22D9'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M28.056 17.249h4.691v4.167h-2.405c-.875 0-1.584.709-1.584 1.583v2.917h3.95l-.51 3.499h-3.44v7.335h-3.886v-7.335H21.25v-3.499h3.572l.003-.246.047-3.796v-.006l-.014-1.36a3.229 3.229 0 013.032-3.253l.166-.006z'
				fill='#5F22D9'
				stroke='#5F22D9'
				strokeWidth={0.5}
			/>
		</Svg>
	)
}

export default FacebookIcon
