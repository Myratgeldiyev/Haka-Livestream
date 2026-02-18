import { useCallback } from 'react'
import {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

export function usePKStartOverlayAnimation() {
	const scale = useSharedValue(1)
	const opacity = useSharedValue(1)
	const contentOpacity = useSharedValue(1)

	const mountStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}))

	const contentOpacityStyle = useAnimatedStyle(() => ({
		opacity: contentOpacity.value,
	}))

	const animateMount = useCallback(() => {
		scale.value = 1
		opacity.value = 1
	}, [scale, opacity])

	const animateToExpanded = useCallback(
		(onComplete: () => void) => {
			contentOpacity.value = withTiming(0, { duration: 120 }, finished => {
				if (finished) {
					runOnJS(onComplete)()
					contentOpacity.value = withTiming(1, { duration: 180 })
				}
			})
		},
		[contentOpacity]
	)

	const animateToMini = useCallback(
		(onComplete: () => void) => {
			contentOpacity.value = withTiming(0, { duration: 120 }, finished => {
				if (finished) {
					runOnJS(onComplete)()
					contentOpacity.value = withTiming(1, { duration: 180 })
				}
			})
		},
		[contentOpacity]
	)

	const animateExpandFromMini = useCallback(
		(onComplete: () => void) => {
			contentOpacity.value = withTiming(0, { duration: 100 }, finished => {
				if (finished) {
					runOnJS(onComplete)()
					contentOpacity.value = withTiming(1, { duration: 200 })
				}
			})
		},
		[contentOpacity]
	)

	return {
		mountStyle,
		contentOpacityStyle,
		animateMount,
		animateToExpanded,
		animateToMini,
		animateExpandFromMini,
	}
}
