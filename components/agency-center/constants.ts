export const AGENCY_CENTER = {
	screenPadding: 16,
	headerTitle: 'My Agency',

	// Colors from design
	cardBorder: '#7C4DFF',
	cardBorderWidth: 12,
	cardBorderRadius: 12,
	methodBadgeBg: '#FFE580',
	methodBadgeText: '#B45309',
	highlightText: '#7C4DFF',
	subtitleText: '#B45309',
	primaryButtonBg: '#5F22D9',
	primaryButtonText: '#fff',

	method1ButtonHeight: 30,
	method1ButtonBorderRadius: 15,
	method1ButtonPaddingHorizontal: 14,
	method1ButtonBackground: '#3495FF',
	method1ButtonTextColor: '#FFFFFF',
	method1ButtonFontSize: 13,
	method1ButtonFontWeight: '600' as const,
	infoBoxBg: '#FFF3E0',
	infoBoxBorder: '#D1723A',
	infoBoxBorderRadius: 8,
	inputBorder: '#E0E0E0',
	inputPlaceholder: '#9E9E9E',

	// Copy
	chooseTitle: 'Choose',
	chooseSubtitle: 'Method 1 or Method 2',
	method1Label: 'Method 1',
	method1Title: 'Join agent',
	method1Description: 'Agent ID will be provided by the agent',
	method1Placeholder: "Please enter agent's ID",
	method1Button: 'Continue',
	method2Label: 'Method 2',
	method2Title: 'Waiting for agent verification',
	method2Description:
		'You are requested to provide the agent with your ID and host code',
	noteTitle: 'Note',
	noteItems: [
		'After joining the agency, host cannot leave agency without valid reason.',
		'Host cannot join multiple agents.',
		'Agent cannot join other agents.',
	] as const,
} as const
