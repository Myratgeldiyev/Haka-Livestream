import { BackArrowIcon } from '@/components/ui/icons/chat/BackArrowIcon'
import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights } from '@/constants/typography'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	Animated,
	Dimensions,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MessageList } from '../MessageLittle'
import { StoriesRow } from '../StoriesRow'
import { INBOX_MESSAGES, MESSAGE_USERS } from '../mock-data'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const ANIMATION_DURATION = 250

interface MessageInboxSheetProps {
	visible: boolean
	onClose: () => void
}

export function MessageInboxSheet({
	visible,
	onClose,
}: MessageInboxSheetProps) {
	const insets = useSafeAreaInsets()
	const [rendered, setRendered] = useState(false)
	const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current

	const sheetHeight = useMemo(() => SCREEN_HEIGHT * 0.75, [])
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
			onClose()
		})
	}, [translateY, onClose])

	useEffect(() => {
		if (visible && !rendered) {
			setRendered(true)
			translateY.setValue(SCREEN_HEIGHT)
			setTimeout(animateIn, 10)
			return
		}
		if (!visible && rendered) {
			animateOut()
		}
	}, [visible, rendered, animateIn, animateOut, translateY])

	if (!rendered) return null

	return (
		<Modal transparent visible animationType='none' onRequestClose={animateOut}>
			<View style={styles.overlay}>
				<Pressable style={styles.backdrop} onPress={animateOut} />
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
					<Pressable onPress={() => {}} style={styles.content}>
						<View style={styles.handle} />

						<View style={styles.header}>
							<Pressable onPress={animateOut} hitSlop={10} style={styles.back}>
								<BackArrowIcon size={22} color='#000' />
							</Pressable>
							<Text style={styles.title}>Messages</Text>
							<View style={styles.rightSpacer} />
						</View>

						<StoriesRow users={MESSAGE_USERS} />
						<View style={styles.list}>
							<MessageList messages={INBOX_MESSAGES} />
						</View>
					</Pressable>
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
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	sheet: {
		backgroundColor: '#fff',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	content: {
		flex: 1,
	},
	handle: {
		width: 40,
		height: 4,
		backgroundColor: 'rgba(0,0,0,0.15)',
		borderRadius: 2,
		alignSelf: 'center',
		marginTop: spacing.sm,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.md,
		paddingBottom: spacing.sm,
	},
	back: {
		width: 28,
		height: 28,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	rightSpacer: {
		width: 28,
		height: 28,
	},
	list: {
		flex: 1,
		marginTop: spacing.sm,
	},
})
