import * as React from 'react'
import { Pressable, type PressableProps } from 'react-native'
import Svg, { Rect } from 'react-native-svg'

type FollowRoomIconProps = PressableProps

function FollowRoomIcon({ onPress, ...rest }: FollowRoomIconProps) {
	return (
		<Pressable
			onPress={event => {
				console.log('[FollowRoomIcon] pressed')
				if (onPress) {
					onPress(event)
				}
			}}
			hitSlop={8}
			{...rest}
		>
			<Svg width={42} height={39} viewBox='0 0 42 39' fill='none'>
				<Rect width={42} height={39} rx={5} fill='#5F22D9' />
			</Svg>
		</Pressable>
	)
}

export default FollowRoomIcon
