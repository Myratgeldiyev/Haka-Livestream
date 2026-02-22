/**
 * Charm level badge images (PNG): 0, 5, 10, … 100.
 * Each asset is displayed at 63×30 so layout stays consistent.
 */
import type React from 'react'
import { Image, type ImageSourcePropType } from 'react-native'

/** Display size for charm level badges */
export const CHARM_LEVEL_SVG_WIDTH = 63
export const CHARM_LEVEL_SVG_HEIGHT = 30

const charmLevelNumbers = [
	0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
	95, 100,
] as const

type CharmLevelKey = (typeof charmLevelNumbers)[number]

const CHARM_LEVEL_PNG_SOURCES: Record<CharmLevelKey, ImageSourcePropType> = {
	0: require('@/assets/charm-levels/0.png'),
	5: require('@/assets/charm-levels/5.png'),
	10: require('@/assets/charm-levels/10.png'),
	15: require('@/assets/charm-levels/15.png'),
	20: require('@/assets/charm-levels/20.png'),
	25: require('@/assets/charm-levels/25.png'),
	30: require('@/assets/charm-levels/30.png'),
	35: require('@/assets/charm-levels/35.png'),
	40: require('@/assets/charm-levels/40.png'),
	45: require('@/assets/charm-levels/45.png'),
	50: require('@/assets/charm-levels/50.png'),
	55: require('@/assets/charm-levels/55.png'),
	60: require('@/assets/charm-levels/60.png'),
	65: require('@/assets/charm-levels/65.png'),
	70: require('@/assets/charm-levels/70.png'),
	75: require('@/assets/charm-levels/75.png'),
	80: require('@/assets/charm-levels/80.png'),
	85: require('@/assets/charm-levels/85.png'),
	90: require('@/assets/charm-levels/90.png'),
	95: require('@/assets/charm-levels/95.png'),
	100: require('@/assets/charm-levels/100.png'),
}

export type CharmLevelBadgeProps = {
	width?: number
	height?: number
}

function CharmLevelImage({
	source,
	width = CHARM_LEVEL_SVG_WIDTH,
	height = CHARM_LEVEL_SVG_HEIGHT,
}: {
	source: ImageSourcePropType
	width?: number
	height?: number
}) {
	return (
		<Image
			source={source}
			style={{ width, height }}
			resizeMode="contain"
		/>
	)
}

/** Map badge number string to charm level badge component (PNG). */
export function getCharmLevelSvgComponent(
	badgeNumber: string
): React.ComponentType<CharmLevelBadgeProps> {
	const n = parseInt(badgeNumber, 10)
	const key: CharmLevelKey = Number.isNaN(n)
		? 0
		: (Math.min(100, Math.max(0, Math.round(n / 5) * 5)) as CharmLevelKey)
	const source = CHARM_LEVEL_PNG_SOURCES[key] ?? CHARM_LEVEL_PNG_SOURCES[0]
	return (props: CharmLevelBadgeProps) => (
		<CharmLevelImage
			source={source}
			width={props.width ?? CHARM_LEVEL_SVG_WIDTH}
			height={props.height ?? CHARM_LEVEL_SVG_HEIGHT}
		/>
	)
}
