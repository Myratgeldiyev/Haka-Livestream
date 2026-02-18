import * as React from 'react'
import Svg, { Defs, Image, Path, Pattern, Use } from 'react-native-svg'

function CleanRoomPlay(props: any) {
	return (
		<Svg
			width={12}
			height={15}
			viewBox='0 0 12 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			{...props}
		>
			<Path
				d='M6.5 1H1.833c-.22 0-.433.114-.589.317A1.267 1.267 0 001 2.083v10.834c0 .287.088.563.244.766.156.203.368.317.59.317h8.333c.22 0 .433-.114.589-.317.156-.204.244-.479.244-.766V10'
				stroke='#fff'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<Path
				d='M3.222 6.85h4.445v.365H3.222V6.85zM3.222 8.8h4.445v.366H3.222v-.365zM4 8h5v.5H4V8z'
				fill='#fff'
			/>
			<Path fill='url(#pattern0_0_1)' d='M7 2H12V7H7z' />
			<Defs>
				<Pattern
					id='pattern0_0_1'
					patternContentUnits='objectBoundingBox'
					width={1}
					height={1}
				>
					<Use xlinkHref='#image0_0_1' transform='scale(.04167)' />
				</Pattern>
				<Image
					id='image0_0_1'
					width={24}
					height={24}
					preserveAspectRatio='none'
					xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAABPUlEQVRIDe1UzUrEMBCe6aYsuPsEHvegHvegTyg+iydPPoKsIAoigg+gHvTobnsoyXb8ghan+VEqCLoYCJ3MfN98k0kaot80nKsWmGc/VpNztfg5RKAYAv4O9l/gy65tcIusrY+sraruaurrqX3ArIA9zPWKU4GmqeajEV+nYjnfei3z8Xh6E8aTZ1AUtC0YITi39ljPycX/tj95BnjQLol4f9jW5MqY6UHIiQTQzhK3pGbmMgR/tgbPGjOZgGc1LnHIy9nQ5D7hG2c508m9HQk4Z3ZDUGqNO/aCqh90LMWNBJhlT5NyNjP55Oc6nuJGAiLc2wEqXWE+6UTv9j3a0hMIuR4XCaCKnX4yeUa10V8N0ce2pYXGgtsrLimAKu46Enrc4vhOiOQYdqP8NXynZbmFp0EuPvx029mb830FRCKXrNKWbyUAAAAASUVORK5CYII='
				/>
			</Defs>
		</Svg>
	)
}

export default CleanRoomPlay
