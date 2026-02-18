import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import {
	Pressable,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native'
import AddHostIcon from '../../ui/icons/agent-dashboard/AddHostIcon'
import HostApplicationIcon from '../../ui/icons/agent-dashboard/HostApplicationIcon'
import { MANAGE } from './constants'
import { ManageCard } from './ManageCard'

const CARD_GAP = 12
const COLS = 4

const HOST_NUMBER_COLOR = '#CD8D4C'
const ICON_CARD_PINK = '#FCE9E9'
const ICON_CARD_PURPLE = '#EDE9F8'

export function HostManagementCard() {
	const { width: screenWidth } = useWindowDimensions()
	const cardPadding = MANAGE.cardPadding * 2
	const sectionHPadding = 32
	const availableWidth = Math.max(
		240,
		screenWidth - sectionHPadding - cardPadding,
	)
	const cellWidth = (availableWidth - CARD_GAP * (COLS - 1)) / COLS

	return (
		<ManageCard title="Host Management">
			<View style={styles.row}>
				<View style={[styles.cell, { width: cellWidth }]}>
					<View style={[styles.numberBlock, { width: cellWidth, height: cellWidth }]}>
						<Text style={[styles.number, { color: HOST_NUMBER_COLOR }]}>11</Text>
					</View>
					<View style={styles.labelWrap}>
						<Text style={styles.label}>My Host</Text>
					</View>
				</View>
				<View style={[styles.cell, { width: cellWidth }]}>
					<View style={[styles.numberBlock, { width: cellWidth, height: cellWidth }]}>
						<Text style={[styles.number, { color: HOST_NUMBER_COLOR }]}>11</Text>
					</View>
					<View style={styles.labelWrap}>
						<Text style={styles.label}>Base Salary{'\n'}Host</Text>
					</View>
				</View>
				<View style={[styles.cell, { width: cellWidth }]}>
					<Pressable
						style={[
							styles.smallCard,
							styles.iconCardShadow,
							{
								width: cellWidth,
								height: cellWidth,
								backgroundColor: ICON_CARD_PINK,
							},
						]}
						android_ripple={null}
					>
						<View style={styles.smallCardInner}>
							<HostApplicationIcon />
						</View>
					</Pressable>
					<View style={styles.labelWrap}>
						<Text style={styles.smallCardLabel}>Host{'\n'}Application</Text>
					</View>
				</View>
				<View style={[styles.cell, { width: cellWidth }]}>
					<Pressable
						style={[
							styles.smallCard,
							styles.iconCardShadow,
							{
								width: cellWidth,
								height: cellWidth,
								backgroundColor: ICON_CARD_PURPLE,
							},
						]}
						android_ripple={null}
					>
						<View style={styles.smallCardInner}>
							<AddHostIcon />
						</View>
					</Pressable>
					<View style={styles.labelWrap}>
						<Text style={styles.smallCardLabel}>Add Host</Text>
					</View>
				</View>
			</View>
		</ManageCard>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: CARD_GAP,
		flexWrap: 'nowrap',
	},
	cell: {
		flexShrink: 0,
		alignItems: 'center',
	},
	numberBlock: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	labelWrap: {
		minHeight: 36,
		marginTop: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	number: {
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
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
	iconCardShadow: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.08,
		shadowRadius: 4,
		elevation: 2,
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
		textAlign: 'center',
	},
})
