import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AGENT_DASHBOARD } from '../constants'
import { HostIncentiveCard } from './HostIncentiveCard'
import { HostManagementCard } from './HostManagementCard'
import { InviteAgentCard } from './InviteAgentCard'
import { MoneyMakingToolsCard } from './MoneyMakingToolsCard'
import { PlatformRewardCard } from './PlatformRewardCard'

export function ManageContent() {
	return (
		<View style={styles.container}>
			<HostIncentiveCard />
			<HostManagementCard />
			<InviteAgentCard />
			<PlatformRewardCard />
			<MoneyMakingToolsCard />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: AGENT_DASHBOARD.screenPadding,
		paddingBottom: 24,
		gap: AGENT_DASHBOARD.sectionGap,
	},
})
