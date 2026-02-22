import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Animated,
	Dimensions,
	Easing,
	FlatList,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native'
import CountryIcon from '../ui/icons/CountryIcon'
import { COUNTRIES } from './countries'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const DROPDOWN_MAX_HEIGHT = Math.min(SCREEN_HEIGHT * 0.5, 320)
const ANIM_DURATION = 250

const scale = (v: number, w: number) => Math.round((v * w) / 390)

interface CountrySelectProps {
	value: string | null
	onSelect: (country: string) => void
	placeholder?: string
	editable?: boolean
}

export function CountrySelect({
	value,
	onSelect,
	placeholder = 'Country',
	editable = true,
}: CountrySelectProps) {
	const { width } = useWindowDimensions()
	const [open, setOpen] = useState(false)
	const translateY = useRef(new Animated.Value(DROPDOWN_MAX_HEIGHT)).current
	const opacity = useRef(new Animated.Value(0)).current
	const triggerHeight = Math.max(44, scale(55, width))
	const triggerFontSize = Math.min(16, scale(14, width))

	const openDropdown = useCallback(() => {
		if (!editable) return
		setOpen(true)
	}, [editable])

	useEffect(() => {
		if (!open) return
		translateY.setValue(DROPDOWN_MAX_HEIGHT)
		opacity.setValue(0)
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: 0,
				duration: ANIM_DURATION,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: 1,
				duration: ANIM_DURATION,
				useNativeDriver: true,
			}),
		]).start()
	}, [open, translateY, opacity])

	const closeDropdown = useCallback(() => {
		Animated.parallel([
			Animated.timing(translateY, {
				toValue: DROPDOWN_MAX_HEIGHT,
				duration: ANIM_DURATION,
				easing: Easing.in(Easing.cubic),
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: 0,
				duration: ANIM_DURATION,
				useNativeDriver: true,
			}),
		]).start(() => {
			setOpen(false)
			translateY.setValue(DROPDOWN_MAX_HEIGHT)
			opacity.setValue(0)
		})
	}, [translateY, opacity])

	const handleSelect = useCallback(
		(country: string) => {
			onSelect(country)
			closeDropdown()
		},
		[onSelect, closeDropdown],
	)

	return (
		<View style={styles.wrap}>
			<Pressable
				style={[styles.trigger, { height: triggerHeight, minHeight: triggerHeight }]}
				onPress={openDropdown}
				disabled={!editable}
			>
				<CountryIcon />
				<Text
					style={[
						styles.triggerText,
						{ marginLeft: scale(8, width), fontSize: triggerFontSize },
						!value && styles.placeholder,
					]}
					numberOfLines={1}
				>
					{value ?? placeholder}
				</Text>
			</Pressable>

			<Modal
				visible={open}
				transparent
				animationType="none"
				onRequestClose={closeDropdown}
			>
				<Pressable style={styles.backdrop} onPress={closeDropdown}>
					<Animated.View
						style={[
							styles.dropdown,
							{
								maxHeight: DROPDOWN_MAX_HEIGHT,
								opacity,
								transform: [{ translateY }],
							},
					 ]}
					>
						<Pressable onPress={e => e.stopPropagation()}>
							<FlatList
								data={COUNTRIES}
								keyExtractor={item => item}
								style={styles.list}
								contentContainerStyle={styles.listContent}
								renderItem={({ item }) => (
									<Pressable
										style={[
											styles.option,
											value === item && styles.optionSelected,
										]}
										onPress={() => handleSelect(item)}
									>
										<Text
											style={styles.optionText}
											numberOfLines={1}
										>
											{item}
										</Text>
									</Pressable>
								)}
							/>
						</Pressable>
					</Animated.View>
				</Pressable>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	wrap: {
		width: '100%',
	},
	trigger: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#898483',
		borderRadius: 12,
		paddingHorizontal: 12,
	},
	triggerText: {
		flex: 1,
		color: '#000',
	},
	placeholder: {
		color: '#999',
	},
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
		justifyContent: 'flex-end',
		paddingHorizontal: 16,
		paddingBottom: 0,
	},
	dropdown: {
		backgroundColor: '#fff',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		overflow: 'hidden',
	},
	list: {
		maxHeight: DROPDOWN_MAX_HEIGHT,
	},
	listContent: {
		paddingVertical: 8,
	},
	option: {
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	optionSelected: {
		backgroundColor: 'rgba(29, 53, 235, 0.12)',
	},
	optionText: {
		fontSize: 14,
		color: '#000',
	},
})
