import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function CopyPasteIcon(props: any) {
	return (
		<Svg
			width={14}
			height={16}
			viewBox='0 0 14 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M4 4.111v-1H3v1h1zm9 0h1v-1h-1v1zM10 2a1 1 0 100-2v2zM1 1V0a1 1 0 00-1 1h1zM0 11.111a1 1 0 102 0H0zm4-7v1h9v-2H4v1zm9 0h-1v9.333h2V4.111h-1zm0 9.333h-1a.586.586 0 01-.16.406l.72.694.72.694c.465-.481.72-1.127.72-1.794h-1zm-.44 1.1l-.72-.694c-.096.1-.22.15-.34.15v2c.675 0 1.315-.278 1.78-.761l-.72-.695zM11.5 15v-1h-6v2h6v-1zm-6 0v-1a.474.474 0 01-.34-.15l-.72.694-.72.694A2.473 2.473 0 005.5 16v-1zm-1.06-.456l.72-.694a.586.586 0 01-.16-.406H3c0 .667.255 1.313.72 1.794l.72-.694zm-.44-1.1h1V4.111H3v9.333h1zM10 1V0H1v2h9V1zM1 1H0v10.111h2V1H1z'
				fill='#000'
			/>
		</Svg>
	)
}

export default CopyPasteIcon
