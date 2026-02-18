import React from 'react'
import { useWindowDimensions } from 'react-native'
import AgentPrizeIcon from '../../ui/icons/agent-dashboard/AgentPrizeIcon'
import AgentRankIcon from '../../ui/icons/agent-dashboard/AgentRankIcon'
import { MANAGE } from './constants'
import { ManageCard } from './ManageCard'
import { getItemWidth, ManageGrid } from './ManageGrid'
import { ManageGridItem } from './ManageGridItem'

const COLS = 3

export function PlatformRewardCard() {
	const { width: screenWidth } = useWindowDimensions()
	const itemWidth = getItemWidth(screenWidth, COLS)

	return (
		<ManageCard title="Platform reward">
			<ManageGrid>
				<ManageGridItem
					variant="icon"
					label="Ranking"
					icon={<AgentRankIcon />}
					iconBg={MANAGE.iconBgLightPurple}
					width={itemWidth}
				/>
				<ManageGridItem
					variant="icon"
					label="Reward"
					icon={<AgentPrizeIcon />}
					iconBg={MANAGE.iconBgLightPurple}
					width={itemWidth}
				/>
				<ManageGridItem
					variant="icon"
					label="Activity Centre"
					icon={<AgentPrizeIcon />}
					iconBg={MANAGE.iconBgLightPurple}
					width={itemWidth}
				/>
			</ManageGrid>
		</ManageCard>
	)
}
