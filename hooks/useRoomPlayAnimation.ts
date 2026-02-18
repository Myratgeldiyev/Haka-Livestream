import { useCallback, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { ANIMATION_DURATION, OVERLAY_HEIGHT } from '../components/room-play/room-play-styles'
import type { UseRoomPlayAnimationReturn } from '../components/room-play/room-play.types'

export function useRoomPlayAnimation(): UseRoomPlayAnimationReturn {
	const translateY = useRef(new Animated.Value(OVERLAY_HEIGHT)).current
	const overlayOpacity = useRef(new Animated.Value(0)).current

	const animateOpen = useCallback(() => {
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: 0,
				duration: ANIMATION_DURATION,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.timing(overlayOpacity, {
				toValue: 1,
				duration: ANIMATION_DURATION,
				useNativeDriver: true,
			}),
		]).start()
	}, [translateY, overlayOpacity])

	const animateClose = useCallback(
		(onComplete: () => void) => {
			Animated.parallel([
				Animated.timing(translateY, {
					toValue: OVERLAY_HEIGHT,
					duration: ANIMATION_DURATION,
					easing: Easing.in(Easing.cubic),
					useNativeDriver: true,
				}),
				Animated.timing(overlayOpacity, {
					toValue: 0,
					duration: ANIMATION_DURATION,
					useNativeDriver: true,
				}),
			]).start(() => {
				onComplete()
			})
		},
		[translateY, overlayOpacity],
	)

	const resetAnimation = useCallback(() => {
		translateY.setValue(OVERLAY_HEIGHT)
		overlayOpacity.setValue(0)
	}, [translateY, overlayOpacity])

	return {
		translateY,
		overlayOpacity,
		animateOpen,
		animateClose,
		resetAnimation,
	}
}
