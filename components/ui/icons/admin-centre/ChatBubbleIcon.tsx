import * as React from 'react'
import Svg, { Defs, G, Path, Rect } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function ChatBubbleIcon(props: any) {
	return (
		<Svg
			width={43}
			height={43}
			viewBox='0 0 43 43'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<G filter='url(#filter0_d_7644_1096)'>
				<Rect
					x={3}
					width={35}
					height={35}
					rx={10}
					fill='#08F'
					shapeRendering='crispEdges'
				/>
				<Path
					d='M29.721 13.625a9.991 9.991 0 00-2.15-3.199 9.912 9.912 0 00-3.198-2.15A9.947 9.947 0 0020.5 7.5h-.045a9.973 9.973 0 00-7.064 2.955 9.932 9.932 0 00-2.125 3.188 10.025 10.025 0 00-.765 3.904 10.04 10.04 0 001.072 4.462v3.393c0 .567.46 1.027 1.026 1.027h3.396a10.032 10.032 0 004.462 1.071h.047c1.338 0 2.633-.259 3.855-.766a9.917 9.917 0 003.187-2.125 9.927 9.927 0 002.154-3.17 9.995 9.995 0 00.8-3.894c.005-1.36-.258-2.679-.777-3.92zm-13.687 4.946a1.072 1.072 0 010-2.142 1.072 1.072 0 010 2.142zm4.465 0a1.072 1.072 0 010-2.142 1.072 1.072 0 010 2.142zm4.465 0a1.072 1.072 0 010-2.142 1.072 1.072 0 010 2.142z'
					fill='#fff'
				/>
			</G>
			<Defs></Defs>
		</Svg>
	)
}

export default ChatBubbleIcon
