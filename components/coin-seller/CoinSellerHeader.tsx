import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LeftArrowIcon from '../ui/icons/LeftArrowIcon'

type TopTab = 'seller' | 'customer'
type SellerSubTab = 'myself' | 'trading'
type CustomerSubTab = 'recommend' | 'old_customer'

interface CoinSellerHeaderProps {
	topTab: TopTab
	sellerSubTab: SellerSubTab
	customerSubTab: CustomerSubTab
	onTopTabChange: (tab: TopTab) => void
	onSellerSubTabChange: (tab: SellerSubTab) => void
	onCustomerSubTabChange: (tab: CustomerSubTab) => void
}

export function CoinSellerHeader({
	topTab,
	sellerSubTab,
	customerSubTab,
	onTopTabChange,
	onSellerSubTabChange,
	onCustomerSubTabChange,
}: CoinSellerHeaderProps) {
	const insets = useSafeAreaInsets()

	return (
		<View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
			<View style={styles.topRow}>
				<Pressable onPress={() => router.back()} style={styles.backButton}>
					<LeftArrowIcon props='' color='#000' />
				</Pressable>

				<View style={styles.topTabs}>
					<Pressable onPress={() => onTopTabChange('seller')}>
						<Text
							style={[
								styles.topTabText,
								topTab === 'seller' && styles.topTabTextActive,
							]}
						>
							Coins Seller
						</Text>
					</Pressable>
					<Pressable onPress={() => onTopTabChange('customer')}>
						<Text
							style={[
								styles.topTabText,
								topTab === 'customer' && styles.topTabTextActive,
							]}
						>
							Customer
						</Text>
					</Pressable>
				</View>

				<Pressable
					style={styles.helpButton}
					onPress={() => router.push('/(main)/coin-seller/coin-seller-details')}
				>
					<View style={styles.helpIcon}>
						<Text style={styles.helpIconText}>?</Text>
					</View>
				</Pressable>
			</View>

			<View style={styles.subTabsContainer}>
				{topTab === 'seller' ? (
					<View style={styles.subTabs}>
						<Pressable
							style={[
								styles.subTab,
								sellerSubTab === 'myself' && styles.subTabActive,
							]}
							onPress={() => onSellerSubTabChange('myself')}
						>
							<Text
								style={[
									styles.subTabText,
									sellerSubTab === 'myself' && styles.subTabTextActive,
								]}
							>
								Myself
							</Text>
						</Pressable>
						<Pressable
							style={[
								styles.subTab,
								sellerSubTab === 'trading' && styles.subTabActive,
							]}
							onPress={() => onSellerSubTabChange('trading')}
						>
							<Text
								style={[
									styles.subTabText,
									sellerSubTab === 'trading' && styles.subTabTextActive,
								]}
							>
								Trading
							</Text>
						</Pressable>
					</View>
				) : (
					<View style={styles.subTabs}>
						<Pressable
							style={[
								styles.subTab,
								customerSubTab === 'recommend' && styles.subTabActive,
							]}
							onPress={() => onCustomerSubTabChange('recommend')}
						>
							<Text
								style={[
									styles.subTabText,
									customerSubTab === 'recommend' && styles.subTabTextActive,
								]}
							>
								Recommend
							</Text>
						</Pressable>
						<Pressable
							style={[
								styles.subTab,
								customerSubTab === 'old_customer' && styles.subTabActive,
							]}
							onPress={() => onCustomerSubTabChange('old_customer')}
						>
							<Text
								style={[
									styles.subTabText,
									customerSubTab === 'old_customer' && styles.subTabTextActive,
								]}
							>
								Old customer
							</Text>
						</Pressable>
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#E4F7F4',
		paddingHorizontal: spacing.lg,
		paddingBottom: spacing.md,
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	backButton: {
		padding: spacing.sm,
	},
	topTabs: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xl,
	},
	topTabText: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.medium,
		color: '#9CA3AF',
	},
	topTabTextActive: {
		color: '#000',
		fontWeight: fontWeights.bold,
	},
	helpButton: {
		padding: spacing.sm,
	},
	helpIcon: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
	},
	helpIconText: {
		fontSize: fontSizes.md,
		color: '#000',
		fontWeight: fontWeights.semibold,
	},
	subTabsContainer: {
		alignItems: 'center',
		marginTop: spacing.md,
	},
	subTabs: {
		flexDirection: 'row',
		backgroundColor: '#CDDEDD',
		borderRadius: 20,
	},
	subTab: {
		paddingHorizontal: spacing.xl,
		paddingVertical: spacing.sm,
		borderRadius: 18,
	},
	subTabActive: {
		backgroundColor: '#FFF',
	},
	subTabText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: '#FFF',
	},
	subTabTextActive: {
		color: '#000',
	},
})
