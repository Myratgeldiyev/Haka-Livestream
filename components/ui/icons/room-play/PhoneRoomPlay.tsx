import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
interface P {
	color?: string
	active?: boolean
	props?: any
}
function PhoneRoomPlay({ color = '#fff', active = true, props }: P) {
	return (
		<View style={styles.container}>
			<Svg
				width={20}
				height={20}
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				{...props}
			>
				<Path
					d='M15.72 9.198a5.06 5.06 0 00-5.06-5.059m8.527 4.705A8.094 8.094 0 0011.092.75M10.5 18.217c-.3-.137-.599-.274-.898-.437a18.6 18.6 0 01-4.005-3.044 17.6 17.6 0 01-3.743-5.078 11 11 0 01-.998-3.243 5.8 5.8 0 01.362-3.381 6.2 6.2 0 011.01-1.248 1.76 1.76 0 011.25-.586c.492.074.94.332 1.247.723.674.749 1.397 1.423 2.108 2.134.28.24.455.58.487.948-.012.31-.13.605-.337.836-.237.3-.524.574-.798.86a1.5 1.5 0 00-.45 1.248c.172.535.467 1.023.861 1.423.473.645.968 1.273 1.485 1.883a13.3 13.3 0 003.38 2.795 1.25 1.25 0 001.25.15c.422-.237.8-.55 1.11-.923a1.64 1.64 0 011.072-.587c.374.02.726.18.986.45.336.286.623.623.935.935.312.312.562.537.824.823a10 10 0 01.885.886c.214.277.317.625.287.973a2.05 2.05 0 01-.686 1.06 4.67 4.67 0 01-3.668 1.423 10.405 10.405 0 01-3.956-1.023z'
					stroke={color}
					strokeWidth={1.5}
					strokeMiterlimit={10}
					strokeLinecap='round'
				/>
			</Svg>
			<View
				style={[styles.toggle, active ? styles.toggleOn : styles.toggleOff]}
			>
				<View style={[styles.knob, active ? styles.knobOn : styles.knobOff]} />
			</View>
		</View>
	)
}

export default PhoneRoomPlay

const styles = StyleSheet.create({
	container: {
		position: 'relative',
	},
	toggle: {
		position: 'absolute',
		left: '20%',
		top: '80%',
		width: 18,
		height: 10,
		borderRadius: 10,
		transform: [{ translateX: -9 }, { translateY: -5 }],
		justifyContent: 'center',
		paddingHorizontal: 1,
	},
	toggleOn: {
		backgroundColor: '#22C55E',
	},
	toggleOff: {
		backgroundColor: 'rgba(255, 255, 255, 0.28)',
	},
	knob: {
		width: 8,
		height: 8,
		borderRadius: 999,
		backgroundColor: '#fff',
	},
	knobOn: {
		alignSelf: 'flex-end',
	},
	knobOff: {
		alignSelf: 'flex-start',
	},
})
