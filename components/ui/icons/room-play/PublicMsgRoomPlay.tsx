import Lock from '@/assets/svg/lock.svg'
import Unlocked from '@/assets/svg/unlocked.svg'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

type PublicMsgRoomPlayProps = {
	enabled?: boolean
}

function PublicMsgRoomPlay({
	enabled = true,
	...props
}: PublicMsgRoomPlayProps & any) {
	return (
		<View style={styles.container}>
			<Svg
				width={18}
				height={20}
				viewBox='0 0 18 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				{...props}
			>
				<Path
					d='M16 2h-1V0h-2v2H5V0H3v2H2C.9 2 0 2.9 0 4v14a2 2 0 002 2h14c1.11 0 2-.89 2-2V4a2 2 0 00-2-2zm0 16H2V8h14v10zM2 6V4h14v2H2zm2 4h10v2H4v-2zm0 4h7v2H4v-2z'
					fill='#fff'
				/>
			</Svg>
			<View style={styles.badge}>
				{enabled ? (
					<Unlocked width={12} height={12} />
				) : (
					<Lock width={12} height={12} />
				)}
			</View>
		</View>
	)
}

export default PublicMsgRoomPlay

const styles = StyleSheet.create({
	container: {
		position: 'relative',
	},
	badge: {
		position: 'absolute',
		top: -4,
		right: -6,
	},
})
