import * as React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

function ChatMessageIcon(props: any) {
	return (
		<Svg
			width={40}
			height={40}
			viewBox='0 0 40 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={40} height={40} rx={20} fill='#000' fillOpacity={0.2} />
			<Path
				d='M28.3 16.512a8.991 8.991 0 00-1.935-2.878 8.922 8.922 0 00-2.88-1.935A8.954 8.954 0 0020 11h-.04a8.974 8.974 0 00-6.358 2.66 8.938 8.938 0 00-1.912 2.869A9.02 9.02 0 0011 20.042a9.037 9.037 0 00.964 4.016v3.054c0 .51.415.924.925.924h3.056A9.028 9.028 0 0019.96 29h.042a9 9 0 003.469-.69 8.921 8.921 0 002.868-1.912 8.933 8.933 0 001.94-2.852A8.997 8.997 0 0029 20.04a9.021 9.021 0 00-.7-3.527zm-12.32 4.452a.965.965 0 11.002-1.93.965.965 0 01-.001 1.93zm4.02 0a.965.965 0 110-1.93.965.965 0 010 1.93zm4.017 0a.965.965 0 11.002-1.93.965.965 0 01-.002 1.93z'
				fill='#DFDFDF'
			/>
		</Svg>
	)
}

export default ChatMessageIcon
