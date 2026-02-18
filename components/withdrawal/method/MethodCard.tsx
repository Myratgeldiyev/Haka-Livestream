import React from 'react'
import type { ImageSourcePropType } from 'react-native'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import type { PaymentMethodItem } from './types'

const BIND_BG = '#5F22D9'

interface MethodCardProps {
	item: PaymentMethodItem
	onBind?: (id: string) => void
	icon?: React.ReactNode
}

export function MethodCard({ item, onBind, icon }: MethodCardProps) {
	const iconContent =
		icon !== undefined ? (
			icon
		) : item.icon !== undefined && item.icon !== null ? (
			React.isValidElement(item.icon) ? (
				item.icon
			) : (
				<Image
					source={item.icon as ImageSourcePropType}
					style={styles.icon}
					resizeMode='contain'
				/>
			)
		) : (
			<View style={styles.iconPlaceholderInner} />
		)

	return (
		<View style={styles.card}>
			<View style={styles.iconPlaceholder}>{iconContent}</View>
			<View style={styles.content}>
				<Text style={styles.name} numberOfLines={1}>
					{item.name}
				</Text>
				<View style={styles.tags}>
					<View style={styles.tag}>
						<Text style={styles.tagText}>{item.feeLabel}</Text>
					</View>
					<View style={styles.tag}>
						<Text style={styles.tagText}>{item.arrivalLabel}</Text>
					</View>
				</View>
			</View>
			<Pressable style={styles.bindButton} onPress={() => onBind?.(item.id)}>
				<Text style={styles.bindText}>Bind</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 14,
		marginBottom: 12,
	},
	iconPlaceholder: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#E0DEE4',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
		overflow: 'hidden',
	},
	iconPlaceholderInner: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: '#D0CED4',
	},
	icon: {
		width: 48,
		height: 48,
	},
	content: {
		flex: 1,
		minWidth: 0,
	},
	name: {
		fontSize: 16,
		fontWeight: '700',
		color: '#000000',
		marginBottom: 6,
	},
	tags: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 6,
	},
	tag: {
		backgroundColor: '#DDDDFF',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
	},
	tagText: {
		fontSize: 11,
		color: '#A68BEE',
		fontWeight: '500',
	},
	bindButton: {
		backgroundColor: BIND_BG,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 14,
		marginLeft: 8,
	},
	bindText: {
		fontSize: 10,
		fontWeight: '500',
		color: '#FFFFFF',
	},
})
