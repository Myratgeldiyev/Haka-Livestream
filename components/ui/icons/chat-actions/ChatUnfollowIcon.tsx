import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const RED = '#FF2D55'

function ChatUnfollowIcon(props: any) {
	return (
		<Svg
			width={30}
			height={28}
			viewBox='0 0 30 28'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			{/* Person shape (same as ChatFollowIcon, red) */}
			<Path
				d='M9.288 18.667a9.33 9.33 0 019.3 8.306.946.946 0 01-.226.728c-.168.206-.45.299-.712.299H.926a.905.905 0 01-.694-.317.931.931 0 01-.225-.728c.487-4.723 4.5-8.288 9.28-8.288zM9.374 5.6c1.492 0 2.922.59 3.977 1.64A5.588 5.588 0 0115 11.2c0 1.485-.593 2.91-1.648 3.96a5.637 5.637 0 01-3.977 1.64 5.637 5.637 0 01-3.977-1.64 5.588 5.588 0 01-1.648-3.96c0-1.485.593-2.91 1.648-3.96A5.637 5.637 0 019.374 5.6z'
				fill={RED}
			/>
			{/* Minus (horizontal line) where plus was */}
			<Path
				d='M17.81 5.6h9.38v1.4H17.81z'
				fill={RED}
			/>
		</Svg>
	)
}

export default ChatUnfollowIcon
