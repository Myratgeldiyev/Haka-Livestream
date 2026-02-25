export const LIVE_STREAM = {
	colors: {
		overlay: 'rgba(73, 56, 88, 0.6)',
		primary: '#515FF6',
		white: '#FFFFFF',
		transparent: 'transparent',
	},
	spacing: {
		topInfoTop: 30,
		rightControlsTop: 361,
		rightControlsRight: 16,
		bottomButtonMargin: 40,
		/** Bottom offset for Live/Chat tab bar (same on live-start and chat-start). */
		bottomTabsOffset: 40,
	},
	sizes: {
		topInfoImage: {
			width: 59,
			height: 64,
		},
		bottomButton: {
			width: 300,
			height: 50,
		},
		borderRadius: 12,
	},
	tabs: ['Live', 'Chat'] as const,
}

export type LiveStreamTab = (typeof LIVE_STREAM.tabs)[number]
