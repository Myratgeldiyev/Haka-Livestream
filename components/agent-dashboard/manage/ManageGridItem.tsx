import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React, { ReactNode } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MANAGE } from './constants'

interface ManageGridItemNumberProps {
	variant: 'number'
	value: string
	label: string
	width: number
	onPress?: () => void
}

interface ManageGridItemIconProps {
	variant: 'icon'
	label: string
	icon: ReactNode
	iconBg: string
	width: number
	onPress?: () => void
}

type ManageGridItemProps = ManageGridItemNumberProps | ManageGridItemIconProps

export function ManageGridItem(props: ManageGridItemProps) {
	if (props.variant === 'number') {
		return (
			<Pressable
				style={[styles.cell, { width: props.width }]}
				onPress={props.onPress}
				android_ripple={null}
			>
				<Text style={styles.number}>{props.value}</Text>
				<Text style={styles.label}>{props.label}</Text>
			</Pressable>
		)
	}
	return (
		<Pressable
			style={[styles.cell, { width: props.width }]}
			onPress={props.onPress}
			android_ripple={null}
		>
			<View
				style={[
					styles.iconWrap,
					{ width: props.width, height: props.width, backgroundColor: props.iconBg },
				]}
			>
				{props.icon}
			</View>
			<Text style={styles.label}>{props.label}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	cell: {
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	number: {
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		color: MANAGE.numberColor,
		marginBottom: 4,
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: MANAGE.labelColor,
		textAlign: 'center',
	},
	iconWrap: {
		borderRadius: MANAGE.iconBorderRadius,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 8,
		overflow: 'hidden',
	},
})
