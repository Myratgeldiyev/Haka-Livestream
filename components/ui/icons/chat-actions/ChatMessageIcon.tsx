import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ChatMessageIcon(props: any) {
	return (
		<Svg
			width={25}
			height={25}
			viewBox='0 0 25 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M0 12.5C0 5.596 5.596 0 12.5 0S25 5.596 25 12.5 19.404 25 12.5 25a12.5 12.5 0 01-5.327-1.189L1.5 24.974a1.25 1.25 0 01-1.475-1.475l1.163-5.671A12.5 12.5 0 010 12.5zm6.875-1.875A1.875 1.875 0 005 12.5v.012a1.875 1.875 0 001.875 1.875h.013a1.875 1.875 0 001.874-1.875V12.5a1.875 1.875 0 00-1.875-1.875h-.012zm5.625 0a1.875 1.875 0 00-1.875 1.875v.012a1.875 1.875 0 001.875 1.875h.012a1.875 1.875 0 001.875-1.875V12.5a1.875 1.875 0 00-1.875-1.875H12.5zm3.75 1.875a1.875 1.875 0 011.875-1.875h.012a1.875 1.875 0 011.875 1.875v.012a1.875 1.875 0 01-1.875 1.875h-.012a1.875 1.875 0 01-1.875-1.875V12.5z'
				fill='#0D99FF'
			/>
		</Svg>
	)
}

export default ChatMessageIcon
