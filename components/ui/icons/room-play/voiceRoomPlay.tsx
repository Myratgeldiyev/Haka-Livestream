import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { G, Mask, Path } from 'react-native-svg'

type VoiceRoomPlayProps = {
	active?: boolean
}

function VoiceRoomPlay({ active = true, ...props }: VoiceRoomPlayProps & any) {
	return (
		<View style={styles.container}>
			<Svg
				width={24}
				height={24}
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				{...props}
			>
				<Mask
					id='a'
					style={{
						maskType: 'luminance',
					}}
					maskUnits='userSpaceOnUse'
					x={0}
					y={0}
					width={24}
					height={24}
				>
					<Path d='M0 0h24v24H0V0z' fill='#fff' />
				</Mask>
				<G mask='url(#a)'>
					<Path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M7.59 14.91A2.25 2.25 0 006 14.25H3a.75.75 0 01-.75-.75v-3A.75.75 0 013 9.75h3a2.25 2.25 0 001.59-.66l3.725-3.723a.402.402 0 01.685.285v12.695a.402.402 0 01-.685.285L7.59 14.91zM3 7.5h3l3.723-3.723a2.652 2.652 0 014.527 1.875v12.695a2.652 2.652 0 01-4.527 1.875L6 16.5H3a3 3 0 01-3-3v-3a3 3 0 013-3zm18.243 12.154c-.397.479-1.114.474-1.554.036-.438-.44-.432-1.149-.047-1.635a9.705 9.705 0 002.108-6.056 9.705 9.705 0 00-2.108-6.055c-.385-.486-.391-1.195.047-1.635.44-.438 1.157-.441 1.554.036A11.955 11.955 0 0124 11.999c0 2.91-1.035 5.577-2.757 7.655zm-3.207-3.203c-.369.5-1.089.495-1.529.056-.439-.44-.426-1.146-.09-1.67a5.25 5.25 0 000-5.675c-.336-.522-.349-1.23.09-1.67.44-.44 1.16-.444 1.53.056a7.482 7.482 0 011.463 4.451 7.47 7.47 0 01-1.464 4.452z'
						fill='#fff'
					/>
				</G>
			</Svg>
			<View
				style={[styles.toggle, active ? styles.toggleOn : styles.toggleOff]}
			>
				<View style={[styles.knob, active ? styles.knobOn : styles.knobOff]} />
			</View>
		</View>
	)
}

export default VoiceRoomPlay

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
