import * as React from 'react'
import Svg, { Defs, Image, Path, Pattern, Use } from 'react-native-svg'

function PlaylistIcon(props: any) {
	return (
		<Svg
			width={31}
			height={31}
			viewBox='0 0 31 31'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			{...props}
		>
			<Path fill='url(#pattern0_7232_713)' d='M0 0H31V31H0z' />
			<Defs>
				<Pattern
					id='pattern0_7232_713'
					patternContentUnits='objectBoundingBox'
					width={1}
					height={1}
				>
					<Use xlinkHref='#image0_7232_713' transform='scale(.04167)' />
				</Pattern>
				<Image
					id='image0_7232_713'
					width={24}
					height={24}
					preserveAspectRatio='none'
					xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAACFUlEQVRIDa1Vv0scQRSe2du7Xc7Y+QOFs/EgYGEX0EJQ/BPEwsLCvyAGiQQRDiQprO2EoAiiYCNoo9iaWIraiUVAEIMgGPayt6v3/Ia7kbe6s57nLsy9N9/7NfO+mTlJRC2iUukUjXyOcy2l9Lgr4luB/eNYRKcguMCgBsc5D6YwnEWchyJdHOe6jcl3jAEOJui/IjaiAuZ5EYbfID9HbGlMsPql+s4fICfjclpxYBOYyrOCls2hXRken1YBlTMjiH6gXQfked26iIWtHdW32QjRUQ50lqgcFtnsMXJ+UrCNqnsi6ZjxYKJDPk3Q22HbRbv6bOk4pQTH95g6RBBMp8XBTexKpBxLpwDRENqs7sL9s0I9NshYB/jyohFtoH3zzwLip0ShzGYXqVL5g0IbzMlTOyAGcNWEc5+IjgVtAvjJwFOmv13F7ms32fd7dTT5/kd27L+kw4HOrqTj/MWvj3GH+7CqHrt0vyAYBQ8uks7gGb+1QcwCgMGYKlsyl1vWOJXLBaxoChezD5haobrVH7T9SeZy2zj//eCj1n/06zfrGX8u1nQQFjEBn/8GP0LfnzjQMVpKrZgkgovCss5gd0w+olotSte9iLO/TrJljSQmV1mJqnHJFdZIgUtTcB33hOtemXxeL5DJ7OMQ7JgSAP+K06JIb/7Ds5vHv1UJJF/XiVZ/kScgf7z5rIZIFGtTBQ3mF/AjNQtfmrwllvcAAAAASUVORK5CYII='
				/>
			</Defs>
		</Svg>
	)
}

export default PlaylistIcon
