import { spacing } from '@/constants/spacing'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	Animated,
	Dimensions,
	Modal,
	Pressable,
	StyleSheet,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { InviteMicHeader } from './InviteMicHeader'
import { InviteMicList } from './InviteMicList'
import { InviteMicUser } from './types'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const ANIMATION_DURATION = 250

interface InviteMicSheetProps {
	visible: boolean
	users: InviteMicUser[]
	onClose: () => void
	onInvite: (userId: string) => void
}

export function InviteMicSheet({
	visible,
	users,
	onClose,
	onInvite,
}: InviteMicSheetProps) {
	const insets = useSafeAreaInsets()
	const [rendered, setRendered] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current

	const sheetHeight = SCREEN_HEIGHT * 0.6
	const maxHeight = SCREEN_HEIGHT - insets.top - 16

	const animateIn = useCallback(() => {
		Animated.timing(translateY, {
			toValue: 0,
			duration: ANIMATION_DURATION,
			useNativeDriver: true,
		}).start()
	}, [translateY])

	const animateOut = useCallback(() => {
		Animated.timing(translateY, {
			toValue: SCREEN_HEIGHT,
			duration: ANIMATION_DURATION,
			useNativeDriver: true,
		}).start(() => {
			setRendered(false)
			setSearchValue('')
			onClose()
		})
	}, [translateY, onClose])

	useEffect(() => {
		if (visible && !rendered) {
			setRendered(true)
			translateY.setValue(SCREEN_HEIGHT)
			setTimeout(animateIn, 10)
		} else if (!visible && rendered) {
			animateOut()
		}
	}, [visible, rendered, animateIn, animateOut, translateY])

	const handleBackdropPress = useCallback(() => {
		animateOut()
	}, [animateOut])

	const handleInvite = useCallback(
		(userId: string) => {
			onInvite(userId)
			animateOut()
		},
		[onInvite, animateOut]
	)

	const filteredUsers = useMemo(() => {
		if (!searchValue.trim()) return users
		const query = searchValue.toLowerCase()
		return users.filter(
			u =>
				u.username.toLowerCase().includes(query) ||
				u.user_id.toLowerCase().includes(query)
		)
	}, [users, searchValue])

	if (!rendered) return null

	return (
		<Modal transparent visible animationType='none' onRequestClose={animateOut}>
			<View style={styles.overlay}>
				<Pressable style={styles.backdrop} onPress={handleBackdropPress} />
				<Animated.View
					style={[
						styles.sheet,
						{
							height: Math.min(sheetHeight, maxHeight),
							paddingBottom: insets.bottom,
							transform: [{ translateY }],
						},
					]}
				>
					<Pressable onPress={() => {}}>
						<View style={styles.handle} />
						<InviteMicHeader
							searchValue={searchValue}
							onSearchChange={setSearchValue}
						/>
					</Pressable>
					<InviteMicList users={filteredUsers} onInvite={handleInvite} />
				</Animated.View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	sheet: {
		backgroundColor: '#fff',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	handle: {
		width: 40,
		height: 4,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		borderRadius: 2,
		alignSelf: 'center',
		marginTop: spacing.sm,
	},
})
