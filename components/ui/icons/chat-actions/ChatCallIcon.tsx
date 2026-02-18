import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function ChatCallIcon(props: any) {
	return (
		<Svg
			width={22}
			height={22}
			viewBox='0 0 22 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Path
				d='M16.018.261L15.053 0l-.523 1.93.966.262a5 5 0 013.521 3.524l.26.965 1.931-.521-.26-.965a7 7 0 00-4.93-4.934zm-.914 3.378l-.965-.261-.523 1.93.966.262a1.5 1.5 0 011.056 1.057l.26.965 1.931-.52-.26-.966a3.5 3.5 0 00-2.465-2.467z'
				fill='#FE3BA4'
			/>
			<Path
				d='M8.58.213H0v1a19.9 19.9 0 003.196 10.85 20.1 20.1 0 005.954 5.954A19.9 19.9 0 0020 21.213h1v-8.58l-6.69-1.487-1.86 1.86a14.1 14.1 0 01-4.242-4.243l1.859-1.86L8.58.213z'
				fill='#FE3BA4'
			/>
		</Svg>
	)
}

export default ChatCallIcon
