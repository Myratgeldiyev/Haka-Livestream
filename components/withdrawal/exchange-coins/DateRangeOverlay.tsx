import DateIcon from '@/components/ui/icons/withdrawal/DateIcon'
import React, { useEffect, useRef, useState } from 'react'
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
import { DATE_RANGE_OPTIONS } from './dateRangeOptions'
import { DateRangeOverlayContent } from './DateRangeOverlayContent'

const ANIM_DURATION = 280

export type AnchorLayout = {
	x: number
	y: number
	width: number
	height: number
}

interface DateRangeOverlayProps {
	visible: boolean
	selectedValue: string
	onSelect: (value: string) => void
	onClose: () => void
	anchorLayout?: AnchorLayout | null
}

export function DateRangeOverlay({
	visible,
	selectedValue,
	onSelect,
	onClose,
}: DateRangeOverlayProps) {
	const insets = useSafeAreaInsets()
	const [isExiting, setIsExiting] = useState(false)
	const backdropOpacity = useRef(new Animated.Value(0)).current
	const slideY = useRef(
		new Animated.Value(Dimensions.get('window').height)
	).current

	useEffect(() => {
		if (visible) {
			setIsExiting(false)
			slideY.setValue(Dimensions.get('window').height)
			Animated.parallel([
				Animated.timing(backdropOpacity, {
					toValue: 1,
					duration: ANIM_DURATION,
					useNativeDriver: true,
				}),
				Animated.timing(slideY, {
					toValue: 0,
					duration: ANIM_DURATION,
					useNativeDriver: true,
				}),
			]).start()
		} else {
			setIsExiting(true)
			Animated.parallel([
				Animated.timing(backdropOpacity, {
					toValue: 0,
					duration: ANIM_DURATION,
					useNativeDriver: true,
				}),
				Animated.timing(slideY, {
					toValue: Dimensions.get('window').height,
					duration: ANIM_DURATION,
					useNativeDriver: true,
				}),
			]).start(() => setIsExiting(false))
		}
	}, [visible, backdropOpacity, slideY])

	const handleSelect = (value: string) => {
		onSelect(value)
		onClose()
	}

	const modalVisible = visible || isExiting

	if (!modalVisible) return null

	return (
		<Modal
			visible={modalVisible}
			transparent
			animationType='none'
			statusBarTranslucent
			onRequestClose={onClose}
		>
			<Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
				<Animated.View
					style={[styles.backdrop, { opacity: backdropOpacity }]}
				/>
			</Pressable>
			<View style={styles.contentWrap} pointerEvents='box-none'>
				<Animated.View
					style={[
						styles.content,
						{
							paddingBottom: insets.bottom + 16,
							transform: [{ translateY: slideY }],
						},
					]}
				>
					<View style={styles.header}>
						<Text style={styles.headerTitle}>Income</Text>
						<View style={styles.headerRight}>
							<DateIcon />
							<Text style={styles.headerDate}>{selectedValue}</Text>
							<Text style={styles.headerChevron}>▼</Text>
						</View>
					</View>
					<DateRangeOverlayContent
						options={DATE_RANGE_OPTIONS}
						selectedValue={selectedValue}
						onSelect={handleSelect}
					/>
				</Animated.View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	contentWrap: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	content: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 8,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 12,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#E5E7EB',
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#111111',
	},
	headerRight: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	headerDate: {
		fontSize: 14,
		color: '#374151',
		fontWeight: '500',
	},
	headerChevron: {
		fontSize: 10,
		color: '#374151',
	},
})
