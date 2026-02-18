import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { PublicMsgOverlayProps } from '@/types/room-tools/room-tool.types'
import {
	ICON_SIZES,
	OVERLAY_HEIGHTS,
	sharedToolOverlayStyles,
} from '../styles'
import { ToolOverlayWrapper } from './ToolOverlayWrapper'

function IconPlaceholder({ size }: { size: number }) {
	return (
		<View
			style={[
				sharedToolOverlayStyles.iconPlaceholder,
				{ width: size, height: size },
			]}
		/>
	)
}

export function PublicMsgOverlay({
	visible,
	onClose,
	onSend,
}: PublicMsgOverlayProps) {
	return (
		<ToolOverlayWrapper
			visible={visible}
			onClose={onClose}
			overlayHeight={OVERLAY_HEIGHTS.medium}
		>
			<View style={styles.content}>
				<View style={sharedToolOverlayStyles.header}>
					<Text style={sharedToolOverlayStyles.headerTitle}>Public Msg</Text>
					<Pressable
						style={sharedToolOverlayStyles.closeButton}
						onPress={onClose}
					>
						<IconPlaceholder size={ICON_SIZES.lg} />
					</Pressable>
				</View>

				<View style={styles.body}>
					{/* Content will be added after reference images */}
				</View>
			</View>
		</ToolOverlayWrapper>
	)
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
	},
	body: {
		flex: 1,
	},
})
