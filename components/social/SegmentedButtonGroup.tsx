import type { SegmentedButtonGroupProps } from '@/types/social/social.types'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { sharedSocialStyles } from './styles'

export function SegmentedButtonGroup<T extends string>({
	segments,
	activeSegment,
	onSegmentChange,
}: SegmentedButtonGroupProps<T>) {
	return (
		<View style={sharedSocialStyles.segmentedContainer}>
			{segments.map(segment => {
				const isActive = activeSegment === segment.key
				return (
					<Pressable
						key={segment.key}
						style={[
							sharedSocialStyles.segmentButton,
							isActive && sharedSocialStyles.segmentButtonActive,
						]}
						onPress={() => onSegmentChange(segment.key)}
					>
						<Text
							style={[
								sharedSocialStyles.segmentText,
								isActive && sharedSocialStyles.segmentTextActive,
							]}
						>
							{segment.label}
						</Text>
					</Pressable>
				)
			})}
		</View>
	)
}
