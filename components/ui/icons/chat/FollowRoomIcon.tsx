import * as React from 'react'
import { Image, Pressable, type PressableProps } from 'react-native'

type FollowRoomIconProps = PressableProps

const ICON_SIZE = { width: 42, height: 39 }

function FollowRoomIcon({ onPress, style, ...rest }: FollowRoomIconProps) {
	const resolvedStyle = typeof style === 'function' ? undefined : style
	return (
		<Pressable
			style={[ICON_SIZE, resolvedStyle]}
			onPress={event => {
				if (onPress) onPress(event)
			}}
			hitSlop={8}
			{...rest}
		>
			<Image
				source={require('@/assets/images/follow-room.png')}
				style={ICON_SIZE}
				resizeMode="contain"
			/>
		</Pressable>
	)
}

export default FollowRoomIcon
