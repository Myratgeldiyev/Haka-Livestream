import { useCallback } from 'react'
import {
	Easing,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import type {
	UseChatActionAnimationConfig,
	UseChatActionAnimationReturn,
} from '@/types/chat-actions/chat-action.types'

const DEFAULT_ANIMATION_DURATION = 300

export function useChatActionAnimation(
	config: UseChatActionAnimationConfig,
): UseChatActionAnimationReturn {
	const { overlayHeight, animationDuration = DEFAULT_ANIMATION_DURATION } =
		config

	const translateY = useSharedValue(overlayHeight)
	const overlayOpacity = useSharedValue(0)

	const animatedSheetStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
	}))

	const animatedOverlayStyle = useAnimatedStyle(() => ({
		opacity: overlayOpacity.value,
	}))

	const animateOpen = useCallback(() => {
		translateY.value = withTiming(0, {
			duration: animationDuration,
			easing: Easing.out(Easing.cubic),
		})
		overlayOpacity.value = withTiming(1, {
			duration: animationDuration,
		})
	}, [translateY, overlayOpacity, animationDuration])

	const animateClose = useCallback(
		(onComplete: () => void) => {
			translateY.value = withTiming(
				overlayHeight,
				{
					duration: animationDuration,
					easing: Easing.in(Easing.cubic),
				},
				finished => {
					if (finished) {
						runOnJS(onComplete)()
					}
				},
			)
			overlayOpacity.value = withTiming(0, {
				duration: animationDuration,
			})
		},
		[translateY, overlayOpacity, overlayHeight, animationDuration],
	)

	return {
		translateY,
		overlayOpacity,
		animatedSheetStyle,
		animatedOverlayStyle,
		animateOpen,
		animateClose,
	}
}
