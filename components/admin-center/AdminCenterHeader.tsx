import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { ADMIN_CENTER } from './constants'

interface AdminCenterHeaderProps {
	onBack?: () => void
}

export function AdminCenterHeader({ onBack }: AdminCenterHeaderProps) {
	return (
		<LinearGradient
			colors={[
				ADMIN_CENTER.headerGradientStart,
				ADMIN_CENTER.headerGradientEnd,
			]}
			locations={[0, 1]}
			style={styles.gradient}
		>
			<View style={styles.row}>
				<View style={styles.side}>
					<Pressable
						onPress={onBack}
						style={styles.backButton}
						hitSlop={12}
						accessibilityLabel='Go back'
						accessibilityRole='button'
					>
						<LeftArrowIcon props='' color='#000' />
					</Pressable>
				</View>
				<Text style={styles.title}>Admin Center</Text>
				<View style={styles.side} />
			</View>
			<View style={styles.briefcaseWrap} pointerEvents='none'>
				<Image
					source={require('@/assets/images/admin-bag.png')}
					style={styles.briefcaseImage}
					resizeMode='contain'
				/>
			</View>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	gradient: {
		paddingHorizontal: ADMIN_CENTER.screenPadding,
		paddingTop: 8,
		paddingBottom: 20,
		position: 'relative',
		overflow: 'hidden',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	side: {
		width: 40,
		alignItems: 'flex-start',
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	title: {
		flex: 1,
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xl,
		fontWeight: fontWeights.bold,
		color: ADMIN_CENTER.valueColor,
		textAlign: 'center',
	},
	briefcaseWrap: {
		position: 'absolute',
		right: ADMIN_CENTER.screenPadding,
		top: -13,
		opacity: 0.9,
	},
	briefcaseImage: {
		width: 130,
		height: 130,
	},
})
