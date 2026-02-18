/**
 * Invite Friends screen – design tokens and layout constants.
 * Responsive: values scale with screen width where needed.
 */

import { Dimensions } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export const INVITE_FRIENDS = {
	screenBg: '#FEF2B8',
	headerTitle: 'Invite Friends',

	// Hero
	handImage: require('@/assets/images/game-rewad-hand.png'),
	heroOverlayOrange: '#E85D04',
	heroOverlayPurple: '#7C3AED',
	heroSlogan: 'Invite Friends to Play Games',
	gameRewardText: 'GAME REWARD',
	upgradeText: 'UPGRADE',

	// Global Shareholder Bonus card (inv-fri-card.png)
	sectionTitle: 'Global Shareholder Bonus',
	cardBackgroundImage: require('@/assets/images/inv-fri-card.png'),
	shareholderSubtitle: 'share the following point bonus',
	shareholderAmount: '123,456,789',
	shareholderDetailValue: '12345',
	shareholderUserName: 'Jonah',
	shareholderDivided: 'Divided',
	rankButtonText: 'Rank >',

	// Game Rebate card
	gameRebateTitle: 'Game Rebate',
	gameRebateDesc1: 'Up to 0.5% of 2 tier',
	gameRebateDesc2: 'Invitee bets',
	gameRebateRewardLabel: 'Reward 1',
	rebateTextImage: require('@/assets/images/rebate-text.png'),
	/** Radial-like: darker edges, brighter center (left → center → right) */
	gameRebateGradient: ['#FFDAB9', '#FFE8D0', '#FFF5E6', '#FFE8D0', '#FFDAB9'] as const,
	gameRebateGlow: '#FFFDE7',
	gameRebateBorder: '#FFFACD',
	gameRebateTagBg: '#FFE4C4',
	gameRebateTagText: '#E07C3C',

	// CTA
	inviteCtaText: 'Invite Friends',
	ctaGradient: ['#6366F1', '#8B5CF6'] as const,

	// Bonus detail card
	tabShareholderBonus: 'Shareholder Bonus',
	tabGameRebate: 'Game Rebate',
	dateRange: '22/09/2025 - 30/09/2025',
	currentRebateLabel: 'Current Rebate:',
	currentRebateValue: '0.5%',
	historicalMax: '(Historical Max 0.5)',
	progressLabels: ['0.1%', '0.2%', '0.3%', '0.4%', '0.5%'],
	progressValues: ['0', '10M', '100M', '400M', '1000M'],
	validBetsLabel: 'Valid bets in the Past 30 days:',
	validBetsValue: '123456',
	needToProgressLabel: 'Need',
	needToProgressSuffix: 'to progress to the next level',

	// Income Commission card
	incomeCommissionTitle: 'Real-Time Income Commission',
	incomeCommissionAmount: '0',
	collectButtonText: 'Collect',

	// Reward Data card
	rewardDataTitle: 'Reward Data',
	rewardDataDetails: 'Details >',
	totalReward: 'Total Reward',
	shareholderBonusLabel: 'Shareholder Bonus',
	tier1Rebate: 'Tier 1 Game Rebate',
	tier2Rebate: 'Tier 2 Game Rebate',
	rewardAmountPlaceholder: '123456',

	// Footer
	myInvitationText: 'My Invitation >',

	// UI
	orangeIcon: '#E85D04',
	yellowHighlight: '#EAB308',
	yellowProgressTrack: '#F5D547',
	yellowProgressDotBorder: '#F5E6A3',
	cardBgLight: '#FFFBF0',
	redHighlight: '#DC2626',
	validBetsBoxBg: '#FFE4C4',
	incomeCardBg: '#FFE4C4',
	collectButtonBg: '#FFD699',
} as const

/** Hand image: full screen width, height 306-based responsive (design base 375px width) */
const HAND_IMAGE_BASE_WIDTH = 375
const HAND_IMAGE_HEIGHT_DESIGN = 306
export const HAND_IMAGE_WIDTH = SCREEN_WIDTH
export const HAND_IMAGE_HEIGHT = Math.round(
	HAND_IMAGE_HEIGHT_DESIGN * (SCREEN_WIDTH / HAND_IMAGE_BASE_WIDTH),
)

export const CARD_MARGIN_H = Math.max(20, SCREEN_WIDTH * 0.06)
export const CARD_MAX_WIDTH = Math.min(400, SCREEN_WIDTH - CARD_MARGIN_H * 2)
