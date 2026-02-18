import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native'
import SuperRankIcon from '../../ui/icons/agent-dashboard/SuperRankIcon'
import SuperSalaryIcon from '../../ui/icons/agent-dashboard/SuperSalaryIcon'
import { MANAGE } from './constants'
import { ManageCard } from './ManageCard'

const CARD_GAP = 12
const COLS = 4

export function HostIncentiveCard() {
	const { width: screenWidth } = useWindowDimensions()
	const cardPadding = MANAGE.cardPadding * 2
	const sectionHPadding = 32
	const availableWidth = Math.max(
		240,
		screenWidth - sectionHPadding - cardPadding,
	)
	const cellWidth = (availableWidth - CARD_GAP * (COLS - 1)) / COLS

	return (
		<ManageCard title='Host incentive tools' showAccent accentFullBorder>
			<View style={styles.row}>
				<View style={[styles.cell, styles.leftSection, { width: cellWidth }]}>
					<Text style={styles.number}>19.000</Text>
					<Text style={styles.label}>Super Funds Management</Text>
				</View>
				<View style={[styles.cell, styles.cardWithLabel, { width: cellWidth }]}>
					<Pressable
						style={[
							styles.smallCard,
							{
								width: cellWidth,
								height: cellWidth,
								backgroundColor: MANAGE.iconBgLightBlue,
							},
						]}
						android_ripple={null}
					>
						<View style={styles.smallCardInner}>
							<SuperSalaryIcon />
						</View>
					</Pressable>
					<Text style={styles.smallCardLabel}>Super Salary</Text>
				</View>
				<View style={[styles.cell, styles.cardWithLabel, { width: cellWidth }]}>
					<Pressable
						style={[
							styles.smallCard,
							{
								width: cellWidth,
								height: cellWidth,
								backgroundColor: MANAGE.iconBgLightPink,
							},
						]}
						android_ripple={null}
					>
						<View style={styles.smallCardInner}>
							<SuperRankIcon />
						</View>
					</Pressable>
					<Text style={styles.smallCardLabel}>Super Rank</Text>
				</View>
				<View style={[styles.cell, styles.cardWithLabel, { width: cellWidth }]}>
					<Pressable
						style={[
							styles.smallCard,
							{
								width: cellWidth,
								height: cellWidth,
								backgroundColor: MANAGE.iconBgLightPurple,
							},
						]}
						android_ripple={null}
					>
						<View style={styles.smallCardInner}>
							<Image
								style={{ width: 25, height: 25 }}
								source={require('../../../assets/images/super-party.png')}
							/>
						</View>
					</Pressable>
					<Text style={styles.smallCardLabel}>Super Party</Text>
				</View>
			</View>
		</ManageCard>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: CARD_GAP,
		flexWrap: 'nowrap',
	},
	cell: {
		flexShrink: 0,
	},
	cardWithLabel: {
		alignItems: 'center',
	},
	leftSection: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	number: {
		marginTop: 25,
		fontSize: fontSizes.xl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		color: '#D1723A',
		marginBottom: 4,
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: MANAGE.labelColor,
		textAlign: 'center',
	},
	smallCard: {
		borderRadius: MANAGE.iconBorderRadius,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	smallCardInner: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 6,
	},
	smallCardLabel: {
		fontSize: 11,
		lineHeight: 14,
		fontWeight: fontWeights.medium,
		color: MANAGE.labelColor,
		marginTop: 6,
		textAlign: 'center',
	},
})
