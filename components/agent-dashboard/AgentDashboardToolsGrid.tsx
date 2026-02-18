import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import React from 'react'
import {
	Pressable,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native'
import AddHostIcon from '../ui/icons/agent-dashboard/AddHostIcon'
import AgentPrizeIcon from '../ui/icons/agent-dashboard/AgentPrizeIcon'
import AgentRankIcon from '../ui/icons/agent-dashboard/AgentRankIcon'
import CoinTradingIcon from '../ui/icons/agent-dashboard/CoinTradingIcon'
import InviteAgentIcon from '../ui/icons/agent-dashboard/InviteAgentIcon'
import { AGENT_DASHBOARD } from './constants'

const GAP = 16
const COLS = 4
const SECTION_H_PADDING = AGENT_DASHBOARD.screenPadding * 2
const CARD_H_PADDING = 20 * 2

function getToolWidth(screenWidth: number) {
	const gridWidth = screenWidth - SECTION_H_PADDING - CARD_H_PADDING
	return (gridWidth - GAP * (COLS - 1)) / COLS
}

const TOOLS = [
	{ id: 'add_host', label: 'Add Host', bg: '#FDE9EA', icon: <AddHostIcon /> },
	{
		id: 'invite_agent',
		label: 'Invite Agent',
		bg: '#E4F1FD',
		icon: <InviteAgentIcon />,
	},
	{
		id: 'coin_trading',
		label: 'Coin Trading',
		bg: '#FDE9EA',
		icon: <CoinTradingIcon />,
	},
	{ id: 'ranking', label: 'Ranking', bg: '#EDE7F9', icon: <AgentRankIcon /> },
	{ id: 'reward', label: 'Reward', bg: '#EDE7F9', icon: <AgentPrizeIcon /> },
] as const

interface AgentDashboardToolsGridProps {
	onToolPress?: (id: string) => void
}

export function AgentDashboardToolsGrid({
	onToolPress,
}: AgentDashboardToolsGridProps) {
	const { width: screenWidth } = useWindowDimensions()
	const toolWidth = getToolWidth(screenWidth)

	return (
		<View style={styles.section}>
			<View style={styles.card}>
				<Text style={styles.sectionTitle}>Money - Making Tools</Text>
				<View style={styles.grid}>
					{TOOLS.map(tool => (
						<Pressable
							key={tool.id}
							style={[styles.toolCard, { width: toolWidth }]}
							onPress={() => onToolPress?.(tool.id)}
							android_ripple={null}
						>
							<View
								style={[
									styles.toolIcon,
									{
										backgroundColor: tool.bg,
										width: toolWidth,
										height: toolWidth,
									},
								]}
							>
								{tool.icon}
							</View>
							<Text style={styles.toolLabel} numberOfLines={1}>
								{tool.label}
							</Text>
						</Pressable>
					))}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	section: {
		marginBottom: AGENT_DASHBOARD.sectionGap,
		paddingHorizontal: AGENT_DASHBOARD.screenPadding,
	},
	card: {},
	sectionTitle: {
		fontSize: fontSizes.lg,
		lineHeight: lineHeights.lg,
		fontWeight: fontWeights.bold,
		color: '#000000',
		marginBottom: 16,
	},
	grid: {
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		flexDirection: 'row',
		paddingHorizontal: 10,
		flexWrap: 'wrap',
		gap: GAP,
	},
	toolCard: {
		borderRadius: 14,
		paddingVertical: 12,
		paddingHorizontal: 6,
		alignItems: 'center',
		justifyContent: 'center',
	},
	toolIcon: {
		width: 40,
		height: 40,
		borderRadius: 14,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 8,
		overflow: 'hidden',
	},
	toolLabel: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.xs,
		fontWeight: fontWeights.medium,
		color: '#000000',
		textAlign: 'center',
	},
})
