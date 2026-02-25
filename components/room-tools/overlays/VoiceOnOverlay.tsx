import { useLiveChatStore } from '@/store/liveChat.store'
import { useLiveStreamStore } from '@/store/liveStream.store'
import type { VoiceOnOverlayProps } from '@/types/room-tools/room-tool.types'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'
import { ICON_SIZES, OVERLAY_HEIGHTS, sharedToolOverlayStyles } from '../styles'
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

export default function VoiceOff(props: any) {
	return (
		<Svg
			width={64}
			height={64}
			viewBox='0 0 64 64'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={64} height={64.0006} rx={32} fill='#fff' fillOpacity={0.1} />
			<Path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M23.115 25.681l2.4 2.317H22.4v4.634h3.216c.5 0 .988.151 1.394.432l6.19 4.267v-1.915l2.4 2.317v1.624c0 .234-.067.464-.193.664s-.307.363-.523.47a1.36 1.36 0 01-1.372-.097l-7.896-5.446H22.4a2.445 2.445 0 01-1.697-.678A2.277 2.277 0 0120 32.632v-4.634c0-.614.253-1.204.703-1.638a2.445 2.445 0 011.697-.679h.715zm10.398-5.444a1.362 1.362 0 011.309-.125c.21.092.392.235.527.415.136.18.22.392.244.614l.007.132v10.88l1.336 1.288a1.124 1.124 0 01.158-1.296l.106-.103c.492-.426.8-1.041.8-1.727 0-.593-.235-1.164-.658-1.594l-.142-.133a1.164 1.164 0 01-.286-.361 1.125 1.125 0 01.184-1.282c.105-.114.233-.207.377-.273a1.234 1.234 0 011.325.19c.504.434.906.967 1.182 1.562a4.498 4.498 0 010 3.782 4.645 4.645 0 01-1.182 1.562 1.241 1.241 0 01-1.208.227l-.148-.063 1.764 1.703c-.023-.185 0-.373.069-.547.068-.175.178-.331.323-.456a5.807 5.807 0 001.477-1.952c.345-.744.523-1.55.523-2.365 0-1.715-.77-3.255-2-4.317a1.164 1.164 0 01-.286-.362 1.126 1.126 0 01.184-1.281c.105-.114.233-.207.377-.273a1.236 1.236 0 011.325.19 8.128 8.128 0 012.068 2.733 7.87 7.87 0 01.732 3.31 7.87 7.87 0 01-.732 3.31 8.13 8.13 0 01-2.068 2.733c-.22.19-.506.296-.802.296l-.143-.009 1.927 1.86c.215.21.34.489.35.783.009.294-.098.58-.3.802a1.23 1.23 0 01-1.634.15l-.113-.096-18.667-18.019a1.14 1.14 0 01-.35-.782c-.009-.294.098-.58.3-.802a1.23 1.23 0 011.634-.15l.113.096 4.015 3.874 5.983-4.126v.002zm-.313 3.06l-3.95 2.725 3.95 3.813v-6.538z'
				fill='#fff'
			/>
		</Svg>
	)
}

export function VoiceOnOverlay({
	visible,
	onClose,
	onToggle,
	streamIdForMute,
}: VoiceOnOverlayProps) {
	const chatPlaybackMuted = useLiveChatStore(s => s.roomPlaybackMuted)
	const streamPlaybackMuted = useLiveStreamStore(s => s.streamPlaybackMuted)
	const isPlaybackMuted = streamIdForMute ? streamPlaybackMuted : chatPlaybackMuted
	const chatRoomId = useLiveChatStore(s => s.roomId)
	const setRoomPlaybackMuted = useLiveChatStore(s => s.setRoomPlaybackMuted)
	const setStreamPlaybackMuted = useLiveStreamStore(s => s.setStreamPlaybackMuted)

	const handleToggle = async () => {
		if (streamIdForMute) {
			await setStreamPlaybackMuted(!isPlaybackMuted)
		} else if (chatRoomId) {
			await setRoomPlaybackMuted(!isPlaybackMuted)
		}
		onToggle?.(!isPlaybackMuted)
	}

	return (
		<ToolOverlayWrapper
			visible={visible}
			onClose={onClose}
			overlayHeight={OVERLAY_HEIGHTS.small}
		>
			<View style={styles.content}>
				<View style={sharedToolOverlayStyles.header}>
					<Text style={sharedToolOverlayStyles.headerTitle}>Voice On</Text>
					<Pressable
						style={sharedToolOverlayStyles.closeButton}
						onPress={onClose}
					>
						<IconPlaceholder size={ICON_SIZES.lg} />
					</Pressable>
				</View>

				<View style={styles.body}>
					{/* Toggle Button */}
					<Pressable style={styles.toggleButton} onPress={handleToggle}>
						{/* Dynamically display mute/unmute icons */}
						{isPlaybackMuted ? <VoiceOff /> : <VoiceOff />}
						<Text style={styles.toggleText}>
							{isPlaybackMuted ? 'Unmute' : 'Mute'}
						</Text>
					</Pressable>
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
		alignItems: 'center',
		justifyContent: 'center',
	},
	toggleButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	toggleText: {
		color: '#fff',
		fontSize: 16,
		marginLeft: 8,
	},
})
