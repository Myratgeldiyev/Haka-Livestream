import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AGENT_DASHBOARD } from './constants'

export type PromoTagType = 'original' | 'beginner'

interface PromoItem {
	id: string
	title: string
	description: string
	metric1: string
	metric2: string
	tag: PromoTagType
}

const DEFAULT_ITEMS: PromoItem[] = [
	{
		id: '1',
		title: 'TikTok Posting to Attract Users',
		description: 'Guide users to whatsapp groups',
		metric1: '30',
		metric2: '867',
		tag: 'original',
	},
	{
		id: '2',
		title: 'Facebook Ad Leasing',
		description: 'Promote via Facebook ads',
		metric1: '12',
		metric2: '445',
		tag: 'original',
	},
	{
		id: '3',
		title: 'Reward hosts with super funds',
		description: 'Incentivize host activity',
		metric1: '8',
		metric2: '220',
		tag: 'original',
	},
	{
		id: '4',
		title: 'Street Advertising Effectiveness',
		description: 'Outdoor campaign metrics',
		metric1: '5',
		metric2: '110',
		tag: 'beginner',
	},
	{
		id: '5',
		title: 'TikTok Posting to Attract Users',
		description: 'Guide users to whatsapp groups',
		metric1: '30',
		metric2: '867',
		tag: 'beginner',
	},
]

interface AgentDashboardPromoListProps {
	items?: PromoItem[]
	onItemPress?: (id: string) => void
}

export function AgentDashboardPromoList({
	items = DEFAULT_ITEMS,
	onItemPress,
}: AgentDashboardPromoListProps) {
	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Earn Money - Learn Promotion</Text>
			<View style={styles.list}>
				{items.map((item, index) => (
					<Pressable
						key={item.id}
						style={[styles.row, index > 0 && styles.rowBorder]}
						onPress={() => onItemPress?.(item.id)}
						android_ripple={null}
					>
						<View style={styles.rowIcon} />
						<View style={styles.rowContent}>
							<Text style={styles.rowTitle}>{item.title}</Text>
							<Text style={styles.rowDescription}>{item.description}</Text>
							<View style={styles.metricsRow}>
								<Text style={styles.metricText}>{item.metric1}</Text>
								<Text style={styles.metricText}>{item.metric2}</Text>
							</View>
						</View>
						<View
							style={[
								styles.tag,
								item.tag === 'original'
									? styles.tagOriginal
									: styles.tagBeginner,
							]}
						>
							<Text
								style={[
									styles.tagText,
									item.tag === 'original'
										? styles.tagTextOriginal
										: styles.tagTextBeginner,
								]}
							>
								{item.tag === 'original' ? 'Original' : 'Beginner'}
							</Text>
						</View>
					</Pressable>
				))}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
		marginBottom: AGENT_DASHBOARD.sectionGap,
		paddingHorizontal: AGENT_DASHBOARD.screenPadding,
	},
	sectionTitle: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: AGENT_DASHBOARD.sectionTitleColor,
		marginBottom: 12,
	},
	list: {
		backgroundColor: AGENT_DASHBOARD.cardBg,
		overflow: 'hidden',
		shadowColor: AGENT_DASHBOARD.cardShadowColor,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.06,
		shadowRadius: 4,
		elevation: 2,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: AGENT_DASHBOARD.cardPadding,
	},
	rowBorder: {
		borderTopColor: AGENT_DASHBOARD.promoRowBorderColor,
	},
	rowIcon: {
		width: 48,
		height: 48,
		borderRadius: 10,
		backgroundColor: '#1A1A1A',
		marginRight: 12,
	},
	rowContent: {
		flex: 1,
	},
	rowTitle: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.semibold,
		color: AGENT_DASHBOARD.sectionTitleColor,
		marginBottom: 2,
	},
	rowDescription: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: AGENT_DASHBOARD.labelColor,
		marginBottom: 4,
	},
	metricsRow: {
		flexDirection: 'row',
		gap: 16,
	},
	metricText: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		color: AGENT_DASHBOARD.labelColor,
	},
	tag: {
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 6,
		marginLeft: 8,
	},
	tagOriginal: {
		backgroundColor: AGENT_DASHBOARD.promoTagOriginalBg,
	},
	tagBeginner: {
		backgroundColor: AGENT_DASHBOARD.promoTagBeginnerBg,
	},
	tagText: {
		fontSize: fontSizes.xs,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.semibold,
	},
	tagTextOriginal: {
		color: AGENT_DASHBOARD.promoTagOriginalText,
	},
	tagTextBeginner: {
		color: AGENT_DASHBOARD.promoTagBeginnerText,
	},
})
