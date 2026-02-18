import { useEffect } from 'react'
import { BackHandler } from 'react-native'

interface UseToolOverlayBackHandlerConfig {
	enabled: boolean
	onBack: () => void
}

export function useToolOverlayBackHandler(
	config: UseToolOverlayBackHandlerConfig,
): void {
	const { enabled, onBack } = config

	useEffect(() => {
		if (!enabled) return

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				onBack()
				return true
			},
		)

		return () => backHandler.remove()
	}, [enabled, onBack])
}
