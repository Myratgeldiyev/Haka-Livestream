import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import TransactionIcon from '../ui/icons/coin-seller/TransactionIcon'

interface TransactionCardProps {
	type: string
	userName: string
	userId: string
	userAvatar?: string
	date: string
	amount: number
	operator?: {
		name: string
		avatar?: string
	}
}

export function TransactionCard({
	type,
	userName,
	userId,
	userAvatar,
	date,
	amount,
	operator,
}: TransactionCardProps) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.type}>{type}</Text>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>
						{amount < 0 ? amount : `+${amount}`}
					</Text>
					<TransactionIcon />
				</View>
			</View>

			<View style={styles.userRow}>
				{userAvatar ? (
					<Image source={{ uri: userAvatar }} style={styles.avatar} />
				) : (
					<View style={[styles.avatar, styles.avatarPlaceholder]}>
						<Text style={styles.avatarText}>{userName.charAt(0)}</Text>
					</View>
				)}
				<View style={styles.userInfo}>
					<Text style={styles.userName}>{userName}</Text>
					<Text style={styles.userId}>{userId}</Text>
				</View>
			</View>

			<View style={styles.footer}>
				<Text style={styles.date}>{date}</Text>
				{operator && (
					<View style={styles.operatorContainer}>
						<Text style={styles.operatorLabel}>Operator:</Text>
						{operator.avatar ? (
							<Image
								source={{ uri: operator.avatar }}
								style={styles.operatorAvatar}
							/>
						) : (
							<View style={[styles.operatorAvatar, styles.avatarPlaceholder]}>
								<Text style={styles.operatorAvatarText}>
									{operator.name.charAt(0)}
								</Text>
							</View>
						)}
						<Text style={styles.operatorName}>{operator.name}</Text>
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		borderRadius: spacing.md,
		padding: spacing.md,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: spacing.sm,
	},
	type: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: '#000',
	},
	amountContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	amount: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	userRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: spacing.sm,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	avatarPlaceholder: {
		backgroundColor: '#E5E7EB',
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarText: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.semibold,
		color: '#6B7280',
	},
	userInfo: {
		marginLeft: spacing.sm,
	},
	userName: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	userId: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#6B7280',
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	date: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		color: '#6B7280',
	},
	operatorContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	operatorLabel: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		color: '#6B7280',
	},
	operatorAvatar: {
		width: 20,
		height: 20,
		borderRadius: 10,
	},
	operatorAvatarText: {
		fontSize: fontSizes.xs,
		fontWeight: fontWeights.semibold,
		color: '#6B7280',
	},
	operatorName: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		color: '#000',
	},
})
