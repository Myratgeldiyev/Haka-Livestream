import { useLiveChatStore } from '@/store/liveChat.store'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { PkInviteRoomScreen } from '../room-play/pk-invite'
import PkInvitationIcon from '../ui/icons/room-play/PkInvitationIcon'
import RoomPlayInfo from '../ui/icons/room-play/RoomPlayInfo'
import {
	BORDER_RADIUS,
	BUTTON_HEIGHT,
	COLORS,
	FONT_SIZES,
	OVERLAY_HEIGHTS,
	SPACING,
	TIME_OPTION,
	sharedOverlayStyles,
} from './item-overlay.styles'
import type { RoomPKOverlayProps, TimeOption } from './item-overlay.types'
import { ItemOverlayWrapper } from './ItemOverlayWrapper'

const TIME_OPTIONS: TimeOption[] = [
	{ id: 'time-5', label: '5 mins', value: 5 },
	{ id: 'time-10', label: '10 mins', value: 10 },
	{ id: 'time-30', label: '30 mins', value: 30 },
]

function IconPlaceholder({ size }: { size: number }) {
	return (
		<View
			style={[
				sharedOverlayStyles.iconPlaceholder,
				{ width: size, height: size },
			]}
		/>
	)
}

function TimeOptionButton({
	option,
	isSelected,
	onSelect,
}: {
	option: TimeOption
	isSelected: boolean
	onSelect: () => void
}) {
	return (
		<Pressable
			style={[
				styles.timeOption,
				isSelected ? styles.timeOptionSelected : styles.timeOptionDefault,
			]}
			onPress={onSelect}
		>
			<Text
				style={[
					styles.timeOptionText,
					isSelected
						? styles.timeOptionTextSelected
						: styles.timeOptionTextDefault,
				]}
			>
				{option.label}
			</Text>
		</Pressable>
	)
}

export function RoomPKOverlay({
	visible,
	onClose,
	onRandomMatch,
}: RoomPKOverlayProps) {
	const [selectedTime, setSelectedTime] = useState<number>(5)
	const [inviteVisible, setInviteVisible] = useState(false)

	const myRoomId = useLiveChatStore(s => s.roomId)
	const pkInvitedRoomId = useLiveChatStore(s => s.pkInvitedRoomId)
	const startPkBattle = useLiveChatStore(s => s.startPkBattle)

	const handleRandomMatch = async () => {
		// API devre dışı – sadece overlay açılsın
		onRandomMatch?.(selectedTime)

		// TODO: API kullanılacak zaman aşağıdaki blok açılacak
		// if (!myRoomId) {
		// 	Alert.alert('Error', 'No active room')
		// 	return
		// }
		// if (!pkInvitedRoomId) {
		// 	Alert.alert('Error', 'Please invite a room first')
		// 	return
		// }
		// try {
		// 	await startPkBattle({
		// 		room1_id: myRoomId,
		// 		room2_id: pkInvitedRoomId,
		// 		duration: String(selectedTime),
		// 	})
		// 	onRandomMatch?.(selectedTime)
		// } catch (e: any) {
		// 	Alert.alert('Error', e.message || 'Failed to start PK battle')
		// }
	}

	const handleOpenInvite = () => {
		setInviteVisible(true)
	}

	const handleBackFromInvite = () => {
		setInviteVisible(false)
	}

	if (inviteVisible) {
		return <PkInviteRoomScreen onBack={handleBackFromInvite} />
	}

	return (
		<ItemOverlayWrapper
			visible={visible}
			onClose={onClose}
			overlayHeight={OVERLAY_HEIGHTS.roomPK}
		>
			<View style={styles.content}>
				<View style={sharedOverlayStyles.header}>
					<Text style={sharedOverlayStyles.headerTitle}>Room PK</Text>
					<View style={sharedOverlayStyles.headerRight}>
						<PkInvitationIcon />
						<Text style={sharedOverlayStyles.headerRightText}>Invitation</Text>
						<RoomPlayInfo />
					</View>
				</View>

				<View style={styles.timeSection}>
					<Text style={sharedOverlayStyles.sectionTitle}>Time</Text>
					<View style={styles.timeOptionsRow}>
						{TIME_OPTIONS.map(option => (
							<TimeOptionButton
								key={option.id}
								option={option}
								isSelected={selectedTime === option.value}
								onSelect={() => setSelectedTime(option.value!)}
							/>
						))}
					</View>
				</View>

				<View style={styles.buttonsContainer}>
					<Pressable
						style={styles.randomMatchButton}
						onPress={handleRandomMatch}
					>
						<LinearGradient
							colors={[COLORS.gradientStart, COLORS.gradientEnd]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={styles.gradientButton}
						>
							<Text style={styles.randomMatchText}>Random Match</Text>
							<Text style={styles.randomMatchSubtext}>{selectedTime} min</Text>
						</LinearGradient>
					</Pressable>

					<Pressable style={styles.inviteRoomButton} onPress={handleOpenInvite}>
						<Text style={styles.inviteRoomText}>Invite a room</Text>
					</Pressable>
				</View>
			</View>
		</ItemOverlayWrapper>
	)
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	timeSection: {
		marginBottom: SPACING.xxl,
	},
	timeOptionsRow: {
		flexDirection: 'row',
		gap: SPACING.md,
	},
	timeOption: {
		flex: 1,
		height: TIME_OPTION.height,
		borderRadius: TIME_OPTION.borderRadius,
		justifyContent: 'center',
		alignItems: 'center',
	},
	timeOptionDefault: {
		backgroundColor: COLORS.timeOptionDefault,
	},
	timeOptionSelected: {
		backgroundColor: COLORS.timeOptionSelected,
	},
	timeOptionText: {
		fontSize: FONT_SIZES.lg,
		fontWeight: '600',
	},
	timeOptionTextDefault: {
		color: COLORS.textPrimary,
	},
	timeOptionTextSelected: {
		color: COLORS.textPrimary,
	},
	buttonsContainer: {
		flexDirection: 'row',
		gap: SPACING.md,
		marginTop: 'auto',
	},
	randomMatchButton: {
		flex: 1,
		borderRadius: BORDER_RADIUS.pill,
		overflow: 'hidden',
	},
	gradientButton: {
		height: BUTTON_HEIGHT.lg,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: SPACING.sm,
	},
	randomMatchText: {
		fontSize: FONT_SIZES.xl,
		fontWeight: '700',
		color: COLORS.textPrimary,
	},
	randomMatchSubtext: {
		fontSize: FONT_SIZES.sm,
		color: COLORS.textSecondary,
		marginTop: SPACING.xs,
	},
	inviteRoomButton: {
		flex: 1,
		height: BUTTON_HEIGHT.lg,
		borderRadius: BORDER_RADIUS.pill,
		borderWidth: 2,
		borderColor: COLORS.buttonOutlineBorder,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inviteRoomText: {
		fontSize: FONT_SIZES.xl,
		fontWeight: '600',
		color: COLORS.textMuted,
	},
})
