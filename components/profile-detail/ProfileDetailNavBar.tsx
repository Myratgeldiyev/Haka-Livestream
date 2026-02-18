import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import EditPenIcon from '../ui/icons/profile-header/EditPenIcon'
import { PROFILE_DETAIL } from './constants'

function ThreeDotsIcon() {
	return (
		<Svg width={24} height={24} viewBox='0 0 24 24' fill='none'>
			<Circle cx={12} cy={6} r={2} fill='#fff' />
			<Circle cx={12} cy={12} r={2} fill='#fff' />
			<Circle cx={12} cy={18} r={2} fill='#fff' />
		</Svg>
	)
}

interface ProfileDetailNavBarProps {
	onBack: () => void
	/** Own profile: show edit button. Other user: show three-dots menu. */
	variant: 'own' | 'other'
	onEdit?: () => void
	onMore?: () => void
}

export function ProfileDetailNavBar({
	onBack,
	variant,
	onEdit,
	onMore,
}: ProfileDetailNavBarProps) {
	return (
		<View style={styles.container}>
			<Pressable style={styles.button} onPress={onBack} hitSlop={12}>
				<LeftArrowIcon props={{}} color='#fff' />
			</Pressable>
			{variant === 'own' ? (
				<Pressable style={styles.button} onPress={onEdit} hitSlop={12}>
					<EditPenIcon />
				</Pressable>
			) : (
				<Pressable style={styles.button} onPress={onMore} hitSlop={12}>
					<ThreeDotsIcon />
				</Pressable>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: PROFILE_DETAIL.screenPadding,
		paddingTop: 56,
		zIndex: 10,
	},
	button: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
