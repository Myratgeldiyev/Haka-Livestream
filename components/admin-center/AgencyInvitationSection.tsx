import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import AgencyInvIcon from '../ui/icons/admin-centre/AgencyInvIcon'
import { AgencyFilterBar } from './AgencyFilterBar'
import { ADMIN_CENTER } from './constants'

interface AgencyInvitationSectionProps {
	onInvite?: () => void
	onPrevPeriod?: () => void
	onNextPeriod?: () => void
	onFilterPress?: () => void
	onSortPress?: () => void
	periodLabel?: string
	sortLabel?: string
}

export function AgencyInvitationSection({
	onInvite,
	onPrevPeriod,
	onNextPeriod,
	onFilterPress,
	onSortPress,
	periodLabel = 'This Week',
	sortLabel = 'Join Time',
}: AgencyInvitationSectionProps) {
	return (
		<View style={styles.section}>
			<View style={styles.titleRow}>
				<View style={styles.titleBlock}>
					<AgencyInvIcon />
					<Text style={styles.title}>Agency Invitation</Text>
				</View>
				<Pressable
					style={({ pressed }) => [
						styles.inviteBtn,
						pressed && styles.inviteBtnPressed,
					]}
					onPress={onInvite}
					accessibilityRole='button'
					accessibilityLabel='Invite'
				>
					<Text style={styles.inviteBtnText}>Invite</Text>
				</Pressable>
			</View>
			<View style={styles.filterWrap}>
				<AgencyFilterBar
					periodLabel={periodLabel}
					onPrevPeriod={onPrevPeriod}
					onNextPeriod={onNextPeriod}
					onFilterPress={onFilterPress}
					onSortPress={onSortPress}
					sortLabel={sortLabel}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
		paddingHorizontal: ADMIN_CENTER.screenPadding,
		marginBottom: 16,
		gap: 10,
	},
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 8,
	},
	titleBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		flex: 1,
		minWidth: 0,
	},
	title: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: ADMIN_CENTER.valueColor,
	},
	inviteBtn: {
		backgroundColor: ADMIN_CENTER.inviteButtonBg,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 10,
	},
	inviteBtnPressed: {
		opacity: 0.9,
	},
	inviteBtnText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: ADMIN_CENTER.inviteButtonText,
	},
	filterWrap: {},
})
