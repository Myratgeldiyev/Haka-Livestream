import { spacing } from '@/constants/spacing'
import type { ActivityCentreTabId } from './types'

export const ACTIVITY_CENTRE = {
	headerTitle: 'Activity Centre',
	screenPadding: spacing.screen.horizontal,
	cardBorderRadius: 12,
	cardImageHeight: 93,
	statusBadgeBg: '#7C4DFF',
	statusBadgeText: '#fff',
	statusBadgePaddingH: 10,
	statusBadgePaddingV: 4,
	statusBadgeBorderRadius: 8,
	overlayTextColor: '#FFFDE7',
	overlayTextShadow: true,
} as const

export const ACTIVITY_CENTRE_TABS: {
	id: ActivityCentreTabId
	label: string
}[] = [
	{ id: 'ongoing', label: 'Ongoing' },
	{ id: 'closed', label: 'Closed' },
	{ id: 'activity_rewards', label: 'Activity rewards' },
]
