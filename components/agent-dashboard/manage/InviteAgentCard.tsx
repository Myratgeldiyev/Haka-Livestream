import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import {
	Pressable,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native'
import InviteAgentIcon from '../../ui/icons/agent-dashboard/InviteAgentIcon'
import { MANAGE } from './constants'
import { ManageCard } from './ManageCard'

const CARD_GAP = 12
const COLS_FOR_CARD_SIZE = 4

const NUMBER_COLOR = '#CD8D4C'
const ICON_CARD_PURPLE = '#EDE9F8'

export function InviteAgentCard() {
	const { width: screenWidth } = useWindowDimensions()
	const cardPadding = MANAGE.cardPadding * 2
	const sectionHPadding = 32
	const availableWidth = Math.max(
		240,
		screenWidth - sectionHPadding - cardPadding,
	)
	const smallCardSize =
		(availableWidth - CARD_GAP * (COLS_FOR_CARD_SIZE - 1)) / COLS_FOR_CARD_SIZE

	return (
		<ManageCard title='Invite Agent'>
			<View style={styles.contentWrap}>
				<View style={styles.row}>
					<View style={[styles.cell, { width: smallCardSize }]}>
						<View
							style={[
								styles.numberBlock,
								{ width: smallCardSize, height: smallCardSize },
							]}
						>
							<Text style={[styles.number, { color: NUMBER_COLOR }]}>27</Text>
						</View>
						<View style={styles.labelWrap}>
							<Text style={styles.label}>My Agency</Text>
						</View>
					</View>
					<View style={[styles.cell, { width: smallCardSize }]}>
						<Pressable
							style={[
								styles.smallCard,
								styles.iconCardShadow,
								{
									width: smallCardSize,
									height: smallCardSize,
									backgroundColor: ICON_CARD_PURPLE,
								},
							]}
							android_ripple={null}
						>
							<View style={styles.smallCardInner}>
								<InviteAgentIcon />
							</View>
						</Pressable>
						<View style={styles.labelWrap}>
							<Text style={styles.smallCardLabel}>Invite Agent</Text>
						</View>
					</View>
				</View>
			</View>
		</ManageCard>
	)
}

const styles = StyleSheet.create({
	contentWrap: {
		alignSelf: 'flex-start',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: CARD_GAP,
		flexWrap: 'nowrap',
	},
	cell: {
		flexShrink: 0,
		alignItems: 'flex-start',
	},
	numberBlock: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	labelWrap: {
		minHeight: 36,
		marginTop: 6,
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: '100%',
	},
	number: {
		fontSize: fontSizes.xxl,
		lineHeight: lineHeights.xxl,
		fontWeight: fontWeights.bold,
		textAlign: 'center',
	},
	label: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.medium,
		color: MANAGE.labelColor,
		textAlign: 'left',
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
		textAlign: 'left',
	},
})
