import { scaleWidth, screenWidth } from '@/constants/platform'
import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { useCallback, useRef, useState } from 'react'
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AudioLockIcon from '../ui/icons/chat/AudioLockIcon'
import InviteChatIcon from '../ui/icons/chat/InviteChatIcon'
import SeatLockedIcon from '../ui/icons/chat/SeatLockedIcon'
import SeatTurnOffIcon from '../ui/icons/chat/SeatTurnOffIcon'
import TakeSeatIcon from '../ui/icons/chat/TakeSeatIcon'
import AudionsIcon2 from '../ui/icons/live-stream/audionsIcon2'
import MicMutedIcon from '../ui/icons/live-stream-view/MicMutedIcon'

type SeatStatus = 'locked' | 'unlocked'

type SeatUser = {
	id: string
	username: string
	avatar: string
	isMuted?: boolean
}

type Seat = {
	status: SeatStatus
	user: SeatUser | null
	isTurnedOff?: boolean
}

type UserRole = 'owner' | 'admin' | 'user'

interface SeatItemProps {
	seatNumber: number
	seat?: Seat
	size?: 'normal' | 'large'
	itemSize?: number
	userRole?: UserRole
	iconsOnly?: boolean
	isOpen?: boolean
	onOpenChange?: (seatNumber: number | null) => void
	onLock?: (seatNumber: number) => void
	onUnlock?: (seatNumber: number) => void
	onOpenInviteMic?: (seatNumber: number) => void
	onTakeSeat?: (seatNumber: number) => void
	onTurnOff?: (seatNumber: number) => void
	onMuteUser?: (userId: string) => void
	onUnmuteUser?: (userId: string) => void
	onOccupiedSeatPress?: (user: SeatUser) => void
}

type Position = {
	x: number
	y: number
	width: number
	height: number
}

export function SeatItem({
	seatNumber,
	seat,
	size = 'normal',
	itemSize,
	userRole = 'user',
	iconsOnly = false,
	isOpen = false,
	onOpenChange,
	onLock,
	onUnlock,
	onOpenInviteMic,
	onTakeSeat,
	onTurnOff,
	onMuteUser,
	onUnmuteUser,
	onOccupiedSeatPress,
}: SeatItemProps) {
	const insets = useSafeAreaInsets()
	const wrapperRef = useRef<View>(null)
	const [position, setPosition] = useState<Position | null>(null)
	const iconSize =
		itemSize ?? (size === 'large' ? scaleWidth(48) : scaleWidth(44))
	// #region agent log
	const usernameMaxWidth = scaleWidth(80)
	React.useEffect(() => {
		if (seatNumber !== 1) return
		fetch('http://127.0.0.1:7243/ingest/5dc12a94-a263-4786-a3a6-a66ee4516557', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: 'SeatItem.tsx:size',
				message: 'SeatItem size computed (seat 1 sample)',
				data: {
					seatNumber,
					itemSize: itemSize ?? null,
					size,
					iconSize,
					usernameMaxWidth,
					screenWidth,
				},
				timestamp: Date.now(),
				hypothesisId: 'H1_H5',
			}),
		}).catch(() => {})
	}, [seatNumber, itemSize, size, iconSize, usernameMaxWidth, screenWidth])
	// #endregion
	const isOccupied = seat?.user !== null
	const isLocked = seat?.status === 'locked'
	const isOwnerOrAdmin = userRole === 'owner' || userRole === 'admin'
	const isOwner = userRole === 'owner'

	const measurePosition = useCallback(() => {
		wrapperRef.current?.measureInWindow((x, y, width, height) => {
			setPosition({ x, y, width, height })
		})
	}, [])

	const handlePress = () => {
		if (iconsOnly) {
			return
		}
		if (isLocked && !isOwnerOrAdmin) {
			return
		}
		if (isOccupied && onOccupiedSeatPress && seat?.user) {
			onOccupiedSeatPress(seat.user)
			return
		}
		if (isOpen) {
			onOpenChange?.(null)
		} else {
			measurePosition()
			onOpenChange?.(seatNumber)
		}
	}

	const handleAction = (action?: (seatNumber: number) => void) => {
		if (action) {
			action(seatNumber)
		}
		onOpenChange?.(null)
	}

	const handleUserAction = (
		action?: (userId: string) => void,
		userId?: string,
	) => {
		if (action && userId) {
			action(userId)
		}
		onOpenChange?.(null)
	}

	const isMuted = seat?.user?.isMuted ?? false
	const isTurnedOff = seat?.isTurnedOff ?? false

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
								{ width: iconSize, height: iconSize },
								isMuted && styles.iconSlotRelative,
							]}
						>
							<Image
								source={{ uri: seat?.user?.avatar ?? '' }}
								style={[styles.avatar, { width: iconSize, height: iconSize }]}
								resizeMode='cover'
							/>
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
						<View
							style={[styles.iconSlot, { width: iconSize, height: iconSize }]}
						>
							{isLocked ? (
								<AudioLockIcon width={iconSize} height={iconSize} />
							) : (
								<AudionsIcon2 width={iconSize} height={iconSize} />
							)}
						</View>
						<Text style={styles.label}>No {seatNumber}</Text>
					</>
				)}
			</Pressable>

			{!iconsOnly && (
				<Modal
					visible={isOpen && position !== null}
					transparent
					animationType='none'
					onRequestClose={() => onOpenChange?.(null)}
				>
					<Pressable
						style={styles.modalOverlay}
						onPress={() => onOpenChange?.(null)}
					>
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
												onPress={() => handleAction(onOpenInviteMic)}
											>
												<InviteChatIcon />
												<Text style={styles.actionText}>Invite mic</Text>
											</Pressable>
										)}

										{isOwner && (
											<Pressable
												style={styles.actionItem}
												onPress={() => handleAction(onTakeSeat)}
											>
												<TakeSeatIcon />
												<Text style={styles.actionText}>Take a seat</Text>
											</Pressable>
										)}

										{!isOccupied && !isLocked && !isOwner && (
											<Pressable
												style={styles.actionItem}
												onPress={() => handleAction(onTakeSeat)}
											>
												{' '}
												<TakeSeatIcon />
												<Text style={styles.actionText}>Take a seat</Text>
											</Pressable>
										)}

										{isOccupied && (
											<Pressable
												style={styles.actionItem}
												onPress={() =>
													isMuted
														? handleUserAction(onUnmuteUser, seat?.user?.id)
														: handleUserAction(onMuteUser, seat?.user?.id)
												}
											>
												<Text style={styles.actionIcon}>
													{isMuted ? <SeatTurnOffIcon /> : '🔇'}
												</Text>
												<Text style={styles.actionText}>
													{isMuted ? 'Turn on' : 'Turn off'}
												</Text>
											</Pressable>
										)}

										{!isOccupied && !isLocked && (
											<Pressable
												style={styles.actionItem}
												onPress={() => handleAction(onTurnOff)}
											>
												<Text style={styles.actionIcon}>
													{isTurnedOff ? <SeatTurnOffIcon /> : '🔇'}
												</Text>
												<Text style={styles.actionText}>
													{isTurnedOff ? 'Turn on' : 'Turn off'}
												</Text>
											</Pressable>
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
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		position: 'relative',
	},
	container: {
		alignItems: 'center',
		gap: spacing.sm,
	},
	iconSlotRelative: {
		position: 'relative',
	},
	mutedIconWrap: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconSlot: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: {
		borderRadius: 999,
		backgroundColor: '#333',
	},
	username: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#fff',
		fontWeight: fontWeights.medium,
		maxWidth: scaleWidth(80),
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: 'rgba(255, 255, 255, 0.85)',
		fontWeight: fontWeights.regular,
	},
	modalOverlay: {
		flex: 1,
	},
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
	actionIcon: {
		fontSize: 20,
	},
	actionText: {
		fontSize: fontSizes.xs,
		color: '#fff',
		fontWeight: fontWeights.medium,
	},
})
