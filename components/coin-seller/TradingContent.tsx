import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import GoldIcon from '../ui/icons/live-stream/GoldIcon'
import RightArrowIcon from '../ui/icons/profile-header/right-arrow'

type TradingTab = 'transfer' | 'recharge' | 'exchange'
type SalesMethod = 'user' | 'coin_seller'

const COIN_PACKAGES: { coins: number; usd: number; badge?: 'coin_seller' }[] = [
	{ coins: 500000, usd: 50 },
	{ coins: 1000000, usd: 100 },
	{ coins: 2000000, usd: 200 },
	{ coins: 5000000, usd: 500 },
	{ coins: 8000000, usd: 800 },
	{ coins: 10000000, usd: 1000, badge: 'coin_seller' },
	{ coins: 15000000, usd: 1500 },
	{ coins: 20000000, usd: 2000, badge: 'coin_seller' },
	{ coins: 30000000, usd: 3000 },
]

const EXCHANGE_RATE_POINT = 10000
const EXCHANGE_RATE_COIN = 10000

interface TradingContentProps {
	availableBalance?: number
	totalBalance?: number
	securityDeposit?: number
	currentLevel?: string
	pointBalance?: number
}

export function TradingContent({
	availableBalance = 30000000,
	totalBalance = 30000000,
	securityDeposit = 0,
	currentLevel = 'Senior Seller',
	pointBalance = 30000000,
}: TradingContentProps) {
	const [activeTab, setActiveTab] = useState<TradingTab>('transfer')
	const [salesMethod, setSalesMethod] = useState<SalesMethod>('user')
	const [userId, setUserId] = useState('')
	const [amount, setAmount] = useState('')
	const [customizeAmount, setCustomizeAmount] = useState('')
	const [exchangePointInput, setExchangePointInput] = useState('')

	const exchangeCoinsResult =
		exchangePointInput.trim() === ''
			? '-'
			: Math.floor(
					(Number(exchangePointInput.replace(/,/g, '')) / EXCHANGE_RATE_POINT) *
						EXCHANGE_RATE_COIN,
				).toLocaleString()

	return (
		<View style={styles.container}>
			<View style={styles.attentionBanner}>
				<Text style={styles.attentionText}>
					Attention: Coin sellers with no sales for 15 consecutive days will be
					downgraded to Beginner coin seller.
				</Text>
			</View>

			<View style={styles.balanceCard}>
				<View style={styles.balanceHeader}>
					<Text style={styles.balanceTitle}>My Balance</Text>
					<Pressable
						style={styles.detailsButton}
						onPress={() =>
							router.push('/(main)/coin-seller/coin-seller-details')
						}
					>
						<Text style={styles.detailsText}>Details</Text>
						<RightArrowIcon color='#000' />
					</Pressable>
				</View>

				<View style={styles.balanceRow}>
					<View style={styles.balanceItem}>
						<Text style={styles.balanceLabel}>Available balance</Text>
						<View style={styles.balanceValue}>
							<GoldIcon />
							<Text style={styles.balanceAmount}>
								{availableBalance.toLocaleString()}
							</Text>
						</View>
					</View>
					<View style={styles.balanceItem}>
						<Text style={styles.balanceLabel}>Total balance</Text>
						<View style={styles.balanceValue}>
							<GoldIcon />
							<Text style={styles.balanceAmount}>
								{totalBalance.toLocaleString()}
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.depositRow}>
					<Text style={styles.depositLabel}>Security Deposit:</Text>
					<GoldIcon />
					<Text style={styles.depositAmount}>{securityDeposit}</Text>
					<HelpIcon />
				</View>
			</View>

			<View style={styles.levelBanner}>
				<Text style={styles.levelText}>Current level: {currentLevel}</Text>
			</View>

			<View style={styles.tradingCard}>
				<View style={styles.tradingTabs}>
					<Pressable
						style={[
							styles.tradingTab,
							activeTab === 'transfer' && styles.tradingTabActive,
						]}
						onPress={() => setActiveTab('transfer')}
					>
						<Text
							style={[
								styles.tradingTabText,
								activeTab === 'transfer' && styles.tradingTabTextActive,
							]}
						>
							Transfer
						</Text>
					</Pressable>
					<Pressable
						style={[
							styles.tradingTab,
							activeTab === 'recharge' && styles.tradingTabActive,
						]}
						onPress={() => setActiveTab('recharge')}
					>
						<Text
							style={[
								styles.tradingTabText,
								activeTab === 'recharge' && styles.tradingTabTextActive,
							]}
						>
							Recharge
						</Text>
					</Pressable>
					<Pressable
						style={[
							styles.tradingTab,
							activeTab === 'exchange' && styles.tradingTabActive,
						]}
						onPress={() => setActiveTab('exchange')}
					>
						<Text
							style={[
								styles.tradingTabText,
								activeTab === 'exchange' && styles.tradingTabTextActive,
							]}
						>
							Exchange
						</Text>
					</Pressable>
				</View>

				{activeTab === 'transfer' && (
					<>
						<Text style={styles.formLabel}>Sales method:</Text>
						<View style={styles.radioGroup}>
							<Pressable
								style={styles.radioItem}
								onPress={() => setSalesMethod('user')}
							>
								<View
									style={[
										styles.radio,
										salesMethod === 'user' && styles.radioSelected,
									]}
								>
									{salesMethod === 'user' && <View style={styles.radioInner} />}
								</View>
								<Text style={styles.radioLabel}>User</Text>
							</Pressable>
							<Pressable
								style={styles.radioItem}
								onPress={() => setSalesMethod('coin_seller')}
							>
								<View
									style={[
										styles.radio,
										salesMethod === 'coin_seller' && styles.radioSelected,
									]}
								>
									{salesMethod === 'coin_seller' && (
										<View style={styles.radioInner} />
									)}
								</View>
								<Text style={styles.radioLabel}>Coin seller</Text>
							</Pressable>
						</View>

						<Text style={styles.formLabel}>User ID:</Text>
						<View style={styles.inputWithButton}>
							<TextInput
								style={styles.input}
								placeholder='Please input user ID'
								placeholderTextColor='#000'
								value={userId}
								onChangeText={setUserId}
							/>
							<Pressable style={styles.checkButton}>
								<Text style={styles.checkButtonText}>Check</Text>
							</Pressable>
						</View>

						<Text style={styles.formLabel}>Amount:</Text>
						<TextInput
							style={styles.amountInput}
							placeholder='Please input amount'
							placeholderTextColor='#000'
							value={amount}
							onChangeText={setAmount}
							keyboardType='numeric'
						/>

						<Text style={styles.validationText}>Please enter a multiple of 1</Text>

						<View style={styles.receiveRow}>
							<Text style={styles.receiveText}>Will receive coins.</Text>
							<GoldIcon />
						</View>
					</>
				)}

				{activeTab === 'recharge' && (
					<>
						<View style={styles.rechargeHeaderRow}>
							<Text style={styles.rechargeSellerLabel}>
								Official <Text style={styles.rechargeSellerUnderline}>Seller</Text>
							</Text>
							<Pressable style={styles.paymentMethodRow}>
								<View style={styles.epayLogo} />
								<Text style={styles.paymentMethodText}>Epay</Text>
								<Text style={styles.chevron}>▼</Text>
							</Pressable>
						</View>
						<TextInput
							style={styles.customizeInput}
							placeholder='Customize'
							placeholderTextColor='#6B7280'
							value={customizeAmount}
							onChangeText={setCustomizeAmount}
							keyboardType='numeric'
						/>
						<View style={styles.coinGrid}>
							{COIN_PACKAGES.map((pkg, i) => (
								<Pressable
									key={i}
									style={styles.coinCard}
									onPress={() => setCustomizeAmount(String(pkg.coins))}
								>
									{pkg.badge === 'coin_seller' && (
										<View
											style={[
												styles.coinCardBadge,
												pkg.usd >= 2000 ? styles.coinCardBadgeOrange : styles.coinCardBadgePurple,
											]}
										>
											<Text style={styles.coinCardBadgeText}>coin seller</Text>
											<View style={styles.coinCardBadgeIcon} />
										</View>
									)}
									<View style={styles.coinCardIconWrap}>
										<GoldIcon />
									</View>
									<Text style={styles.coinCardAmount}>
										{pkg.coins.toLocaleString()}
									</Text>
									<Text style={styles.coinCardUsd}>${pkg.usd.toLocaleString()}</Text>
								</Pressable>
							))}
						</View>
					</>
				)}

				{activeTab === 'exchange' && (
					<>
						<View style={styles.exchangeBalanceRow}>
							<Text style={styles.exchangeBalanceLabel}>My Point:</Text>
							<View style={styles.exchangeBalanceValue}>
								<GoldIcon />
								<Text style={styles.exchangeBalanceAmount}>
									{pointBalance.toLocaleString()}
								</Text>
							</View>
						</View>
						<View style={styles.exchangeRateBar}>
							<View style={styles.exchangeRateBarLeft}>
								<GoldIcon />
								<Text style={styles.exchangeRateBarLabel}>Point</Text>
							</View>
							<Text style={styles.exchangeRateBarArrow}>&gt;&gt;</Text>
							<View style={styles.exchangeRateBarRight}>
								<GoldIcon />
								<Text style={styles.exchangeRateBarLabel}>Offline Coins</Text>
							</View>
						</View>
						<View style={styles.exchangeRateRow}>
							<Text style={styles.exchangeRateText}>Exchange rate: </Text>
							<GoldIcon />
							<Text style={styles.exchangeRateText}>
								{EXCHANGE_RATE_POINT.toLocaleString()}=
							</Text>
							<GoldIcon />
							<Text style={styles.exchangeRateText}>
								{EXCHANGE_RATE_COIN.toLocaleString()}
							</Text>
						</View>
						<View style={styles.exchangeInputRow}>
							<View style={styles.exchangeInputWrap}>
								<GoldIcon />
								<TextInput
									style={styles.exchangeInput}
									placeholder='Enter Point'
									placeholderTextColor='#9CA3AF'
									value={exchangePointInput}
									onChangeText={setExchangePointInput}
									keyboardType='numeric'
								/>
							</View>
							<View style={styles.exchangeResultWrap}>
								<GoldIcon />
								<Text style={styles.exchangeResultText}>{exchangeCoinsResult}</Text>
							</View>
						</View>
					</>
				)}
			</View>

			<Pressable
				style={styles.primaryButton}
				onPress={() => {
					/* submit by tab */
				}}
			>
				<Text style={styles.primaryButtonText}>
					{activeTab === 'transfer'
						? 'Transfer'
						: activeTab === 'recharge'
							? 'Recharge'
							: 'Exchange'}
				</Text>
			</Pressable>
		</View>
	)
}

function HelpIcon() {
	return (
		<View style={styles.helpIcon}>
			<Text style={styles.helpIconText}>?</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	attentionBanner: {
		backgroundColor: '#F2E17A',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		borderRadius: spacing.lg,
		padding: spacing.md,
	},
	attentionText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#92400E',
	},
	balanceCard: {
		backgroundColor: '#FFF',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		borderRadius: spacing.md,
		padding: spacing.lg,
	},
	balanceHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: spacing.md,
	},
	balanceTitle: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	detailsButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	detailsText: {
		fontSize: fontSizes.sm,
		color: '#6B7280',
	},
	detailsArrow: {
		fontSize: fontSizes.sm,
		color: '#6B7280',
	},
	balanceRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: spacing.md,
	},
	balanceItem: {
		flex: 1,
	},
	balanceLabel: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#6B7280',
		marginBottom: spacing.xs,
	},
	balanceValue: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	balanceAmount: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	depositRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
		borderTopWidth: 1,
		borderTopColor: '#E5E7EB',
		paddingTop: spacing.md,
	},
	depositLabel: {
		fontSize: fontSizes.sm,
		color: '#6B7280',
	},
	depositAmount: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	levelBanner: {
		backgroundColor: '#ECEBA7',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		borderRadius: spacing.sm,
		padding: spacing.md,
	},
	levelText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#727C77',
	},
	tradingCard: {
		backgroundColor: '#FFF',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		borderRadius: spacing.md,
		padding: spacing.lg,
	},
	tradingTabs: {
		flexDirection: 'row',
		backgroundColor: '#F3F4F6',
		borderRadius: 16,
		padding: 4,
		marginBottom: spacing.lg,
	},
	tradingTab: {
		flex: 1,
		paddingVertical: spacing.sm,
		alignItems: 'center',
		borderRadius: 16,
	},
	tradingTabActive: {
		backgroundColor: '#FFF',
	},
	tradingTabText: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.bold,
		color: '#6B7280',
	},
	tradingTabTextActive: {
		color: '#000',
	},
	formLabel: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.semibold,
		color: '#000',
		marginBottom: spacing.sm,
		marginTop: spacing.sm,
	},
	radioGroup: {
		flexDirection: 'row',
		gap: spacing.xl,
		marginBottom: spacing.sm,
	},
	radioItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.sm,
	},
	radio: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		fontWeight: 600,
		borderColor: '#D1D5DB',
		alignItems: 'center',
		justifyContent: 'center',
	},
	radioSelected: {
		borderColor: '#7C3AED',
	},
	radioInner: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#7C3AED',
	},
	radioLabel: {
		fontSize: fontSizes.sm,
		color: '#374151',
	},
	inputWithButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F9FAFB',
		borderRadius: spacing.sm,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		marginBottom: spacing.sm,
	},
	input: {
		flex: 1,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		fontSize: fontSizes.sm,
		color: '#000',
	},
	checkButton: {
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
	},
	checkButtonText: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.semibold,
		color: '#7C3AED',
	},
	amountInput: {
		backgroundColor: '#F9FAFB',
		borderRadius: spacing.sm,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		fontSize: fontSizes.sm,
		color: '#000',
		marginBottom: spacing.sm,
	},
	validationText: {
		fontSize: fontSizes.sm,
		color: '#EF4444',
		marginBottom: spacing.md,
	},
	receiveRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: spacing.xs,
	},
	receiveText: {
		fontSize: fontSizes.sm,
		color: '#374151',
	},
	primaryButton: {
		backgroundColor: '#7C3AED',
		marginHorizontal: spacing.lg,
		marginTop: spacing.xl,
		marginBottom: spacing.xxl,
		borderRadius: 24,
		paddingVertical: spacing.md,
		alignItems: 'center',
	},
	primaryButtonText: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.semibold,
		color: '#FFF',
	},
	// Recharge tab
	rechargeHeaderRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: spacing.md,
	},
	rechargeSellerLabel: {
		fontSize: fontSizes.sm,
		color: '#000',
	},
	rechargeSellerUnderline: {
		textDecorationLine: 'underline',
	},
	paymentMethodRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
		backgroundColor: '#F9FAFB',
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		borderRadius: spacing.sm,
	},
	epayLogo: {
		width: 20,
		height: 20,
		borderRadius: 4,
		backgroundColor: '#3B82F6',
	},
	paymentMethodText: {
		fontSize: fontSizes.sm,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	chevron: {
		fontSize: 10,
		color: '#6B7280',
	},
	customizeInput: {
		backgroundColor: '#F3F4F6',
		borderRadius: 12,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		fontSize: fontSizes.lg,
		fontWeight: fontWeights.bold,
		color: '#000',
		marginBottom: spacing.lg,
	},
	coinGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: spacing.sm,
		marginBottom: spacing.sm,
	},
	coinCard: {
		width: '31%',
		backgroundColor: '#F3F4F6',
		borderRadius: 12,
		padding: spacing.md,
		minHeight: 88,
		position: 'relative',
	},
	coinCardBadge: {
		position: 'absolute',
		top: 0,
		right: 0,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 6,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},
	coinCardBadgePurple: {
		backgroundColor: '#7C3AED',
	},
	coinCardBadgeOrange: {
		backgroundColor: '#EA580C',
	},
	coinCardBadgeText: {
		fontSize: 10,
		fontWeight: fontWeights.semibold,
		color: '#FFF',
	},
	coinCardBadgeIcon: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#FBBF24',
	},
	coinCardIconWrap: {
		marginBottom: 4,
	},
	coinCardAmount: {
		fontSize: fontSizes.md,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	coinCardUsd: {
		fontSize: fontSizes.sm,
		color: '#6B7280',
		marginTop: 2,
	},
	// Exchange tab
	exchangeBalanceRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: spacing.lg,
		gap: spacing.sm,
	},
	exchangeBalanceLabel: {
		fontSize: fontSizes.sm,
		color: '#000',
	},
	exchangeBalanceValue: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	exchangeBalanceAmount: {
		fontSize: fontSizes.xl,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	exchangeRateBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#FEF08A',
		borderRadius: 12,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.md,
	},
	exchangeRateBarLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	exchangeRateBarRight: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
	},
	exchangeRateBarLabel: {
		fontSize: fontSizes.sm,
		color: '#000',
	},
	exchangeRateBarArrow: {
		fontSize: fontSizes.sm,
		color: '#DC2626',
		fontWeight: fontWeights.bold,
	},
	exchangeRateRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
		marginBottom: spacing.md,
		flexWrap: 'wrap',
	},
	exchangeRateText: {
		fontSize: fontSizes.sm,
		color: '#374151',
	},
	exchangeInputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#F9FAFB',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		paddingHorizontal: spacing.md,
		gap: spacing.sm,
	},
	exchangeInputWrap: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
		paddingVertical: spacing.md,
	},
	exchangeInput: {
		flex: 1,
		fontSize: fontSizes.sm,
		color: '#000',
		padding: 0,
	},
	exchangeResultWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.xs,
		paddingVertical: spacing.md,
		borderLeftWidth: 1,
		borderLeftColor: '#E5E7EB',
		paddingLeft: spacing.sm,
	},
	exchangeResultText: {
		fontSize: fontSizes.sm,
		color: '#6B7280',
	},
	helpIcon: {
		width: 16,
		height: 16,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#9CA3AF',
		alignItems: 'center',
		justifyContent: 'center',
	},
	helpIconText: {
		fontSize: 10,
		color: '#9CA3AF',
	},
})
