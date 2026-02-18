import type { StreamSlot } from '@/store/liveStream.store'
import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { useCallback, useRef, useState } from 'react'
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AudioLockIcon from '../ui/icons/chat/AudioLockIcon'
import SeatLockedIcon from '../ui/icons/chat/SeatLockedIcon'
import SeatTurnOffIcon from '../ui/icons/chat/SeatTurnOffIcon'
import TakeSeatIcon from '../ui/icons/chat/TakeSeatIcon'
import AudionsIcon2 from '../ui/icons/live-stream/audionsIcon2'
import MicMutedIcon from '../ui/icons/live-stream-view/MicMutedIcon'

type StreamSlotUserRole = 'owner' | 'admin' | 'listener'

interface StreamSlotItemProps {
	slotNumber: number
	seat: StreamSlot | undefined
	streamId: string | undefined
	userRole: StreamSlotUserRole
	itemSize?: number
	isOpen?: boolean
	onOpenChange?: (slotNumber: number | null) => void
	onLock?: (slotNumber: number) => void
	onUnlock?: (slotNumber: number) => void
	onTakeSeat?: (slotNumber: number) => void
	onMuteUser?: (userId: string) => void
	onUnmuteUser?: (userId: string) => void
	onRemoveUser?: (userId: string) => void
}

type Position = { x: number; y: number; width: number; height: number }

const ICON_SIZE = 44

export function StreamSlotItem({
	slotNumber,
	seat,
	streamId,
	userRole = 'listener',
	itemSize = ICON_SIZE,
	isOpen = false,
	onOpenChange,
	onLock,
	onUnlock,
	onTakeSeat,
	onMuteUser,
	onUnmuteUser,
	onRemoveUser,
}: StreamSlotItemProps) {
	const insets = useSafeAreaInsets()
	const wrapperRef = useRef<View>(null)
	const [position, setPosition] = useState<Position | null>(null)

	const isOccupied = (seat?.user ?? null) !== null
	const isLocked = seat?.status === 'locked'
	const isOwnerOrAdmin = userRole === 'owner' || userRole === 'admin'
	const isMuted = seat?.user?.isMuted ?? false

	const measurePosition = useCallback(() => {
		wrapperRef.current?.measureInWindow((x, y, width, height) => {
			setPosition({ x, y, width, height })
		})
	}, [])

	const handlePress = () => {
		if (isLocked && !isOwnerOrAdmin) return
		if (isOpen) {
			onOpenChange?.(null)
		} else {
			measurePosition()
			onOpenChange?.(slotNumber)
		}
	}

	const handleAction = (action?: (n: number) => void) => {
		if (action) action(slotNumber)
		onOpenChange?.(null)
	}

	const handleUserAction = (action?: (userId: string) => void, userId?: string) => {
		if (action && userId) action(userId)
		onOpenChange?.(null)
	}

	const safeLeft = insets.left + 8
	const safeRight = insets.right + 8
	const panelTop = position ? Math.max(position.y - 8, insets.top + 8) : 0

	return (
		<View style={styles.wrapper} ref={wrapperRef}>
			<Pressable style={styles.container} onPress={handlePress}>
				{isOccupied ? (
					<>
						<View
							style={[
								styles.iconSlot,
								{ width: itemSize, height: itemSize },
								isMuted && styles.iconSlotRelative,
							]}
						>
							{seat?.user?.avatar ? (
								<Image
									source={{ uri: seat.user.avatar }}
									style={[styles.avatar, { width: itemSize, height: itemSize }]}
									resizeMode="cover"
								/>
							) : (
								<View
									style={[
										styles.avatarPlaceholder,
										{ width: itemSize, height: itemSize, borderRadius: itemSize / 2 },
									]}
								>
									<Text style={[styles.avatarPlaceholderText, { fontSize: itemSize * 0.4 }]}>
										{(seat?.user?.username ?? '?').charAt(0).toUpperCase()}
									</Text>
								</View>
							)}
							{isMuted && (
								<View style={styles.mutedIconWrap}>
									<MicMutedIcon width={20} height={20} />
								</View>
							)}
						</View>
						<Text style={styles.username} numberOfLines={1}>
							{seat?.user?.username}
						</Text>
					</>
				) : (
					<>
						<View style={[styles.iconSlot, { width: itemSize, height: itemSize }]}>
							{isLocked ? (
								<AudioLockIcon width={itemSize} height={itemSize} />
							) : (
								<AudionsIcon2 width={itemSize} height={itemSize} />
							)}
						</View>
						<Text style={styles.label}>No.{slotNumber}</Text>
					</>
				)}
			</Pressable>

			<Modal
				visible={isOpen && position !== null}
				transparent
				animationType="none"
				onRequestClose={() => onOpenChange?.(null)}
			>
				<Pressable style={styles.modalOverlay} onPress={() => onOpenChange?.(null)}>
					<Pressable
						style={[
							styles.actionPanelWrapper,
							{ top: panelTop, left: safeLeft, right: safeRight },
						]}
						onPress={() => {}}
					>
						<View style={styles.actionPanel}>
							{isOwnerOrAdmin ? (
								<>
									{!isOccupied &&
										(isLocked ? (
											<Pressable
												style={styles.actionItem}
												onPress={() => handleAction(onUnlock)}
											>
												<SeatLockedIcon />
												<Text style={styles.actionText}>Unlock</Text>
											</Pressable>
										) : (
											<Pressable
												style={styles.actionItem}
												onPress={() => handleAction(onLock)}
											>
												<SeatLockedIcon />
												<Text style={styles.actionText}>Lock</Text>
											</Pressable>
										))}
									{!isOccupied && !isLocked && (
										<Pressable
											style={styles.actionItem}
											onPress={() => handleAction(onTakeSeat)}
										>
											<TakeSeatIcon />
											<Text style={styles.actionText}>Take a seat</Text>
										</Pressable>
									)}
									{isOccupied && (
										<>
											<Pressable
												style={styles.actionItem}
												onPress={() =>
													handleUserAction(
														isMuted ? onUnmuteUser : onMuteUser,
														seat?.user?.id,
													)
												}
											>
												<Text style={styles.actionIcon}>
													{isMuted ? <SeatTurnOffIcon /> : '🔇'}
												</Text>
												<Text style={styles.actionText}>
													{isMuted ? 'Turn on' : 'Turn off'}
												</Text>
											</Pressable>
											{onRemoveUser && (
												<Pressable
													style={styles.actionItem}
													onPress={() =>
														handleUserAction(onRemoveUser, seat?.user?.id)
													}
												>
													<SeatTurnOffIcon />
													<Text style={styles.actionText}>Remove</Text>
												</Pressable>
											)}
										</>
									)}
								</>
							) : (
								<>
									{!isOccupied && !isLocked && (
										<Pressable
											style={styles.actionItem}
											onPress={() => handleAction(onTakeSeat)}
										>
											<TakeSeatIcon />
											<Text style={styles.actionText}>Take a seat</Text>
										</Pressable>
									)}
								</>
							)}
						</View>
					</Pressable>
				</Pressable>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: { position: 'relative' },
	container: { alignItems: 'center', gap: spacing.sm },
	iconSlot: { alignItems: 'center', justifyContent: 'center' },
	iconSlotRelative: { position: 'relative' },
	mutedIconWrap: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: { borderRadius: 999, backgroundColor: '#333' },
	avatarPlaceholder: {
		backgroundColor: '#515FF6',
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarPlaceholderText: {
		color: '#fff',
		fontWeight: fontWeights.semibold,
	},
	username: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#fff',
		fontWeight: fontWeights.medium,
		maxWidth: 80,
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: 'rgba(255, 255, 255, 0.85)',
		fontWeight: fontWeights.regular,
	},
	modalOverlay: { flex: 1 },
	actionPanelWrapper: {
		position: 'absolute',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	actionPanel: {
		backgroundColor: 'rgba(22, 22, 22, 0.80)',
		padding: spacing.sm,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: spacing.md,
		borderRadius: 8,
		shadowColor: 'rgba(17, 17, 17, 0.2)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		elevation: 5,
	},
	actionItem: {
		alignItems: 'center',
		gap: spacing.xs,
		paddingVertical: spacing.xs,
		paddingHorizontal: spacing.sm,
	},
	actionIcon: { fontSize: 20 },
	actionText: {
		fontSize: fontSizes.xs,
		color: '#fff',
		fontWeight: fontWeights.medium,
	},
})
