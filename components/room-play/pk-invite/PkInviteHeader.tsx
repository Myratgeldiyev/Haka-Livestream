import React from 'react'
import { Pressable, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { PK_INVITE_COLORS, pkInviteStyles } from './pk-invite.styles'

interface PkInviteHeaderProps {
	onBack: () => void
	topInset?: number
}

function BackArrowIcon() {
	return (
		<Svg width={24} height={24} viewBox='0 0 24 24' fill='none'>
			<Path
				d='M15 18L9 12L15 6'
				stroke={PK_INVITE_COLORS.textPrimary}
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

export function PkInviteHeader({ onBack, topInset = 0 }: PkInviteHeaderProps) {
	return (
		<View style={[pkInviteStyles.header, { paddingTop: topInset + 12 }]}>
			<Pressable
				style={pkInviteStyles.backButton}
				onPress={onBack}
				hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
			>
				<BackArrowIcon />
			</Pressable>
			<Text style={pkInviteStyles.headerTitle}>Invite</Text>
		</View>
	)
}
