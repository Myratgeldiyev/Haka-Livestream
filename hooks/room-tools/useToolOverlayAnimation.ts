import { useCallback, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { ANIMATION_DURATION } from '@/components/room-tools/styles'
import type {
	UseToolOverlayAnimationConfig,
	UseToolOverlayAnimationReturn,
} from '@/types/room-tools/room-tool.types'

export function useToolOverlayAnimation(
	config: UseToolOverlayAnimationConfig,
): UseToolOverlayAnimationReturn {
	const { overlayHeight, animationDuration = ANIMATION_DURATION } = config

	const translateY = useRef(new Animated.Value(overlayHeight)).current
	const overlayOpacity = useRef(new Animated.Value(0)).current

	const animateOpen = useCallback(() => {
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: 0,
				duration: animationDuration,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.timing(overlayOpacity, {
				toValue: 1,
				duration: animationDuration,
				useNativeDriver: true,
			}),
		]).start()
	}, [translateY, overlayOpacity, animationDuration])

	const animateClose = useCallback(
		(onComplete: () => void) => {
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: overlayHeight,
					duration: animationDuration,
					easing: Easing.in(Easing.cubic),
					useNativeDriver: true,
				}),
				Animated.timing(overlayOpacity, {
					toValue: 0,
					duration: animationDuration,
					useNativeDriver: true,
				}),
			]).start(() => {
				onComplete()
			})
		},
		[translateY, overlayOpacity, overlayHeight, animationDuration],
	)

	const resetAnimation = useCallback(() => {
		translateY.setValue(overlayHeight)
		overlayOpacity.setValue(0)
	}, [translateY, overlayOpacity, overlayHeight])

	return {
		translateY,
		overlayOpacity,
		animateOpen,
		animateClose,
		resetAnimation,
	}
}
