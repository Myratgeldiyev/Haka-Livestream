import React from 'react'
import { Pressable, Text } from 'react-native'
import { PK_INVITE_COLORS, pkInviteStyles } from './pk-invite.styles'

interface PkInviteButtonProps {
	onPress: () => void
	isInvited?: boolean
}

export function PkInviteButton({ onPress, isInvited }: PkInviteButtonProps) {
	return (
		<Pressable
			style={[
				pkInviteStyles.inviteButton,
				isInvited && { backgroundColor: PK_INVITE_COLORS.textSecondary },
			]}
			onPress={onPress}
			disabled={isInvited}
		>
			<Text style={pkInviteStyles.inviteButtonText}>
				{isInvited ? 'Invited' : 'Invite'}
			</Text>
		</Pressable>
	)
}
