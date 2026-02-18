import type { ImageSourcePropType } from 'react-native'

export type ActivityCentreTabId =
	| 'ongoing'
	| 'closed'
	| 'activity_rewards'

export interface ActivityCentreItem {
	id: string
	imageSource: ImageSourcePropType
	overlayText: string
	title: string
	statusLabel: string
}
