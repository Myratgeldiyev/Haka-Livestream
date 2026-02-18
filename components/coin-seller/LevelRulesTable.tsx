import { spacing } from '@/constants/spacing'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'

type CellValue = 'check' | 'cross' | 'empty' | 'senior-badge' | 'seller-badge'

interface TableRow {
	feature: React.ReactNode
	seniorSeller: CellValue
	standardSeller: CellValue
}

interface TableSection {
	title: string
	rows: TableRow[]
}

export function LevelRulesTable() {
	const sections: TableSection[] = [
		{
			title: 'Exchange Recharge',
			rows: [
				{
					feature: (
						<View>
							<Text style={styles.featureText}>Exchange</Text>
							<View style={styles.featureSubRow}>
								<CoinIcon />
								<Text style={styles.featureSubText}>xxxx = </Text>
								<CoinIcon />
								<Text style={styles.featureSubText}>xxxxx from </Text>
								<CoinIcon />
								<Text style={styles.featureSubText}>xxxxx</Text>
							</View>
						</View>
					),
					seniorSeller: 'check',
					standardSeller: 'check',
				},
				{
					feature: (
						<View>
							<Text style={styles.featureText}>Recharge</Text>
							<View style={styles.featureSubRow}>
								<Text style={styles.featureSubText}>$x = </Text>
								<CoinIcon />
								<Text style={styles.featureSubText}>xxxx from $xxx</Text>
							</View>
						</View>
					),
					seniorSeller: 'check',
					standardSeller: 'cross',
				},
			],
		},
		{
			title: 'Sale Methods',
			rows: [
				{
					feature: (
						<Text style={styles.featureText}>Coins seller {'  →  '} User</Text>
					),
					seniorSeller: 'check',
					standardSeller: 'empty',
				},
				{
					feature: (
						<Text style={styles.featureText}>
							Coins seller {'  →  '} Coins seller
						</Text>
					),
					seniorSeller: 'check',
					standardSeller: 'check',
				},
			],
		},
		{
			title: 'Privilege',
			rows: [
				{
					feature: <Text style={styles.featureText}>Seller List</Text>,
					seniorSeller: 'check',
					standardSeller: 'empty',
				},
				{
					feature: (
						<Text style={styles.featureText}>Customer{'\n'}Recommend list</Text>
					),
					seniorSeller: 'check',
					standardSeller: 'check',
				},
				{
					feature: <Text style={styles.featureText}>Coins selling list</Text>,
					seniorSeller: 'check',
					standardSeller: 'cross',
				},
				{
					feature: <Text style={styles.featureText}>Seller Tag</Text>,
					seniorSeller: 'senior-badge',
					standardSeller: 'seller-badge',
				},
			],
		},
	]

	const renderCellContent = (value: CellValue) => {
		switch (value) {
			case 'check':
				return <CheckIcon />
			case 'cross':
				return <CrossIcon />
			case 'senior-badge':
				return <SeniorSellerBadge />
			case 'seller-badge':
				return <SellerBadge />
			case 'empty':
			default:
				return null
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Level Rules</Text>
			<View style={styles.table}>
				{sections.map((section, sectionIndex) => (
					<View key={sectionIndex}>
						<View style={styles.sectionHeader}>
							<Text style={styles.sectionHeaderText}>{section.title}</Text>
						</View>

						{section.rows.map((row, rowIndex) => (
							<View key={rowIndex} style={styles.dataRow}>
								<View style={styles.featureCell}>{row.feature}</View>
								<View style={styles.levelCell}>
									{renderCellContent(row.seniorSeller)}
								</View>
								<View style={styles.levelCell}>
									{renderCellContent(row.standardSeller)}
								</View>
							</View>
						))}
					</View>
				))}
			</View>

			<View style={styles.bottomNote}>
				<Text style={styles.bulletPoint}>• </Text>
				<Text style={styles.noteText}>
					Recharge with USDT: $x = xxxx from $xxx
				</Text>
				<View style={styles.noteIcon}>
					<CoinIcon size={16} />
				</View>
			</View>
		</View>
	)
}

function CoinIcon({ size = 14 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
			<Circle cx={12} cy={12} r={10} fill='#FFB800' />
			<Text
				style={{
					position: 'absolute',
					fontSize: size * 0.6,
					color: '#FFF',
					fontWeight: '700',
				}}
			>
				$
			</Text>
			<Path
				d='M12 6v1.5M12 16.5V18M9.5 8.5c0-.83.67-1.5 1.5-1.5h1c1.1 0 2 .9 2 2s-.9 2-2 2h-1c-1.1 0-2 .9-2 2s.9 2 2 2h1c.83 0 1.5-.67 1.5-1.5'
				stroke='#FFF'
				strokeWidth={1.5}
				strokeLinecap='round'
			/>
		</Svg>
	)
}

function CheckIcon() {
	return (
		<View style={styles.checkIconContainer}>
			<Svg width={14} height={14} viewBox='0 0 24 24' fill='#7C3AED'>
				<Circle cx={12} cy={12} r={11} stroke='' strokeWidth={2} />
				<Path
					d='M7 12l3 3 7-7'
					stroke='#fff'
					strokeWidth={2.5}
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</Svg>
		</View>
	)
}

function CrossIcon() {
	return (
		<View style={styles.crossIconContainer}>
			<Svg width={14} height={14} viewBox='0 0 24 24' fill='none'>
				<Circle cx={12} cy={12} r={11} stroke='#9CA3AF' strokeWidth={2} />
				<Path
					d='M8 8l8 8M16 8l-8 8'
					stroke='#9CA3AF'
					strokeWidth={2}
					strokeLinecap='round'
				/>
			</Svg>
		</View>
	)
}

function SeniorSellerBadge() {
	return (
		<View style={styles.seniorBadge}>
			<Text style={styles.seniorBadgeText}>Senior Seller</Text>
		</View>
	)
}

function SellerBadge() {
	return (
		<View style={styles.sellerBadge}>
			<CoinIcon size={12} />
			<Text style={styles.sellerBadgeText}>Seller</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		marginHorizontal: spacing.lg,
		marginTop: spacing.md,
		borderRadius: spacing.md,
		padding: spacing.lg,
	},
	title: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: '#000',
		marginBottom: spacing.md,
	},
	table: {
		borderRadius: spacing.sm,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#000',
	},
	sectionHeader: {
		backgroundColor: '#7C3AED',
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
	},
	sectionHeaderText: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.medium,
		color: '#FFF',
	},
	dataRow: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#000',
		minHeight: 36,
	},
	featureCell: {
		flex: 1.8,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		justifyContent: 'center',
		borderRightWidth: 1,
		borderRightColor: '#000',
	},
	levelCell: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: 1,
		borderRightColor: '#000',
		paddingVertical: spacing.sm,
	},
	featureText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#000',
	},
	featureSubRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 4,
		flexWrap: 'wrap',
	},
	featureSubText: {
		fontSize: fontSizes.xs,
		color: '#000',
		marginHorizontal: 2,
	},
	checkIconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	crossIconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	seniorBadge: {
		backgroundColor: '#FBBF24',
		borderRadius: 12,
		paddingHorizontal: spacing.sm,
		paddingVertical: 4,
	},
	seniorBadgeText: {
		fontSize: fontSizes.xs,
		fontWeight: fontWeights.semibold,
		color: '#000',
	},
	sellerBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FEF3C7',
		borderRadius: 12,
		paddingHorizontal: spacing.sm,
		paddingVertical: 4,
		gap: 4,
	},
	sellerBadgeText: {
		fontSize: fontSizes.xs,
		fontWeight: fontWeights.semibold,
		color: '#92400E',
	},
	bottomNote: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: spacing.md,
		paddingHorizontal: spacing.sm,
	},
	bulletPoint: {
		fontSize: fontSizes.md,
		color: '#000',
	},
	noteText: {
		fontSize: fontSizes.sm,
		color: '#000',
	},
	noteIcon: {
		marginLeft: spacing.sm,
	},
})
