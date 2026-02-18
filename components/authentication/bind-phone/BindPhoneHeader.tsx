import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'
import { spacing } from '@/constants/spacing'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { BIND_PHONE } from '../constants'

interface BindPhoneHeaderProps {
	onBack?: () => void
}

export function BindPhoneHeader({ onBack }: BindPhoneHeaderProps) {
	return (
		<View style={styles.container}>
			{onBack ? (
				<Pressable style={styles.backButton} onPress={onBack} hitSlop={12}>
					<LeftArrowIcon props={{}} color={BIND_PHONE.headerTextColor} />
				</Pressable>
			) : (
				<View style={styles.backPlaceholder} />
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: spacing.screen.horizontal,
		paddingTop: spacing.md,
		paddingBottom: spacing.lg,
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backPlaceholder: { width: 40, height: 40 },
})
