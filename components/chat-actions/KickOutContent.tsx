import { useLiveChatStore } from '@/store/liveChat.store'
import type {
	KickOutReason,
	KickOutReasonOption,
} from '@/types/chat-actions/chat-action.types'
import React, { useState } from 'react'
import {
	ActivityIndicator,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import {
	AVATAR_SIZES,
	BORDER_RADIUS,
	COLORS,
	FONT_SIZES,
	FONT_WEIGHTS,
	SPACING,
	sharedChatActionStyles,
} from './styles'

const KICK_OUT_REASONS: KickOutReasonOption[] = [
	{ id: 'abusing', label: 'Abusing on mic/text' },
	{ id: 'nude-picture', label: 'Nude picture send in room' },
	{ id: 'political', label: 'Religious?Political Comment' },
	{ id: 'promote-app', label: 'Promote other application' },
	{ id: 'illegal-profile', label: 'Illegal profile photo/name' },
	{ id: 'argument', label: 'Argument' },
]

function RadioButton({ selected }: { selected: boolean }) {
	return (
		<View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
			{selected && <View style={styles.radioInner} />}
		</View>
	)
}

function ReasonItem({
	option,
	selected,
	onSelect,
}: {
	option: KickOutReasonOption
	selected: boolean
	onSelect: () => void
}) {
	return (
		<Pressable style={styles.reasonItem} onPress={onSelect}>
			<RadioButton selected={selected} />
			<Text style={styles.reasonLabel}>{option.label}</Text>
		</Pressable>
	)
}

export function KickOutContent({
	user,
	onKickOut,
	roomId,
}: KickOutContentProp) {
	const [selectedReason, setSelectedReason] = useState<KickOutReason | null>(
		null,
	)
	const [isLoading, setIsLoading] = useState(false)
	const { kickOutUser } = useLiveChatStore() // roomId'yi store'dan almıyoruz artık

	const handleKickOut = async () => {
		if (!selectedReason) return

		if (!roomId) {
			console.error('No active room')
			return
		}

		try {
			setIsLoading(true)
			await kickOutUser(roomId, user?.id)

			onKickOut(selectedReason)
		} catch (error) {
			console.error('Failed to kick out user:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={sharedChatActionStyles.title}>Kick out</Text>

			<View style={styles.userInfoRow}>
				<Text style={styles.infoText}>Sure to kick out</Text>
				{user.avatarUri ? (
					<Image source={{ uri: user.avatarUri }} style={styles.smallAvatar} />
				) : user.avatarSource ? (
					<Image source={user.avatarSource} style={styles.smallAvatar} />
				) : (
					<View style={styles.smallAvatar} />
				)}
				<Text style={styles.userNameHighlight}>
					{user.name}| ID:{user.id}
				</Text>
				<Text style={styles.infoText}>from the room?</Text>
			</View>

			<Text style={styles.reasonTitle}>Reason</Text>

			<ScrollView
				style={styles.reasonsList}
				showsVerticalScrollIndicator={false}
			>
				{KICK_OUT_REASONS.map(option => (
					<ReasonItem
						key={option.id}
						option={option}
						selected={selectedReason === option.id}
						onSelect={() => setSelectedReason(option.id)}
					/>
				))}
			</ScrollView>

			<Pressable
				style={[
					styles.kickOutButton,
					(!selectedReason || isLoading) && styles.kickOutButtonDisabled,
				]}
				onPress={handleKickOut}
				disabled={!selectedReason || isLoading}
			>
				{isLoading ? (
					<ActivityIndicator color={COLORS.buttonPrimaryText} />
				) : (
					<Text style={styles.kickOutButtonText}>Kick out</Text>
				)}
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	userInfoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
		gap: SPACING.sm,
		marginBottom: SPACING.xl,
	},
	infoText: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textPrimary,
	},
	smallAvatar: {
		width: AVATAR_SIZES.sm,
		height: AVATAR_SIZES.sm,
		borderRadius: AVATAR_SIZES.sm / 2,
		backgroundColor: COLORS.iconBackground,
	},
	userNameHighlight: {
		fontSize: FONT_SIZES.md,
		color: COLORS.textHighlight,
		fontWeight: FONT_WEIGHTS.medium,
	},
	reasonTitle: {
		fontSize: FONT_SIZES.lg,
		fontWeight: FONT_WEIGHTS.bold,
		color: COLORS.textPrimary,
		marginBottom: SPACING.lg,
	},
	reasonsList: {
		flex: 1,
		marginBottom: SPACING.xl,
	},
	reasonItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: SPACING.lg,
	},
	radioOuter: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: COLORS.radioUnselected,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: SPACING.md,
	},
	radioOuterSelected: {
		borderColor: COLORS.radioSelected,
	},
	radioInner: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: COLORS.radioSelected,
	},
	reasonLabel: {
		fontSize: FONT_SIZES.lg,
		color: COLORS.textPrimary,
	},
	kickOutButton: {
		height: 56,
		borderRadius: BORDER_RADIUS.pill,
		backgroundColor: COLORS.buttonPrimary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	kickOutButtonDisabled: {
		opacity: 0.6,
	},
	kickOutButtonText: {
		fontSize: FONT_SIZES.xl,
		fontWeight: FONT_WEIGHTS.bold,
		color: COLORS.buttonPrimaryText,
	},
})
