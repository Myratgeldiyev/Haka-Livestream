import BinanceIcon from '@/components/ui/icons/coin-seller/binanceIcon'
import EpayIcon from '@/components/ui/icons/coin-seller/epayIcon'
import UsdtIcon from '@/components/ui/icons/coin-seller/usdtIcon'
import WhatsappCoinIcon from '@/components/ui/icons/coin-seller/WhatsappCoinIcon'
import UpiIcon from '@/components/ui/icons/top-up/UpiIcon'
import { fontSizes, fontWeights, lineHeights } from '@/constants/typography'
import * as Clipboard from 'expo-clipboard'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'
import GoldIcon from '../ui/icons/live-stream/GoldIcon'
import { TOP_UP_COINS } from './constants'

export type AgentSellerPaymentId = 'upi' | 'epay' | 'binance' | 'usdt'

interface TopUpAgentSellerCardProps {
	avatarUri?: string
	name: string
	userId: string
	paymentMethods: AgentSellerPaymentId[]
	onPricePress?: () => void
	onChatPress?: () => void
	onWhatsAppPress?: () => void
}

function CopyIcon() {
	return (
		<View style={cardStyles.copyIcon}>
			<View style={cardStyles.copyIconInner} />
			<View style={cardStyles.copyIconOuter} />
		</View>
	)
}

function ChevronRightIcon({ size = 14 }: { size?: number }) {
	return (
		<Svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
			<Path
				d='M10 6l6 6-6 6'
				stroke='#9CA3AF'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</Svg>
	)
}

function ChatBubbleIcon({ size = 20, props }: { size?: number; props: any }) {
	return (
		<Svg
			width={40}
			height={40}
			viewBox='0 0 40 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<Rect width={40} height={40} rx={20} fill='#08F' />
			<Path
				d='M20 10c-5.523 0-10 4.477-10 10s4.477 10 10 10a9.95 9.95 0 005.168-1.438l3.032.892a1.01 1.01 0 001.254-1.254l-.892-3.032A9.96 9.96 0 0030 20c0-5.523-4.477-10-10-10zm0 2a8 8 0 016.759 12.282 1.512 1.512 0 00-.177 1.24l.441 1.501-1.501-.441a1.512 1.512 0 00-1.24.177A8 8 0 1120 12zm3.5 6.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z'
				fill='#fff'
			/>
		</Svg>
	)
}

function renderPaymentIcon(id: AgentSellerPaymentId, size: number) {
	const s = String(size)
	switch (id) {
		case 'upi':
			return <UpiIcon />
		case 'epay':
			return <EpayIcon size={s} props={{}} />
		case 'binance':
			return <BinanceIcon size={s} props={{}} />
		case 'usdt':
			return <UsdtIcon size={s} props={{}} />
		default:
			return null
	}
}

export function TopUpAgentSellerCard({
	avatarUri,
	name,
	userId,
	paymentMethods,
	onPricePress,
	onChatPress,
	onWhatsAppPress,
}: TopUpAgentSellerCardProps) {
	const handleCopyId = async () => {
		await Clipboard.setStringAsync(userId)
	}

	const getInitials = (n: string) => n.charAt(0).toUpperCase()

	return (
		<View style={cardStyles.card}>
			<View style={cardStyles.profileSection}>
				<View style={cardStyles.avatarWrap}>
					{avatarUri ? (
						<Image source={{ uri: avatarUri }} style={cardStyles.avatar} />
					) : (
						<View style={[cardStyles.avatar, cardStyles.avatarPlaceholder]}>
							<Text style={cardStyles.avatarInitial}>{getInitials(name)}</Text>
						</View>
					)}
					<LinearGradient
						colors={['#250664', '#5416D0']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={cardStyles.badge}
					>
						<GoldIcon width={12} height={12} />
						<Text style={cardStyles.badgeText}>Coin Seller</Text>
					</LinearGradient>
				</View>
			</View>

			<View style={cardStyles.infoSection}>
				<Text style={cardStyles.name}>{name}</Text>
				<Pressable style={cardStyles.idRow} onPress={handleCopyId}>
					<Text style={cardStyles.idText}>ID: {userId}</Text>
					<CopyIcon />
				</Pressable>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={cardStyles.paymentRow}
					style={cardStyles.paymentScroll}
				>
					{paymentMethods.map(id => (
						<View key={id} style={cardStyles.paymentIconWrap}>
							{renderPaymentIcon(id, 28)}
						</View>
					))}
					<View style={cardStyles.chevronWrap}>
						<ChevronRightIcon size={16} />
					</View>
				</ScrollView>
			</View>

			<View style={cardStyles.actionsSection}>
				<Pressable
					style={cardStyles.priceButton}
					onPress={onPricePress}
					android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
				>
					<Text style={cardStyles.priceButtonText}>Price</Text>
				</Pressable>
				<View style={cardStyles.chatIcons}>
					<Pressable
						style={[cardStyles.chatIcon, cardStyles.chatIconBlue]}
						onPress={onChatPress}
					>
						<ChatBubbleIcon size={48} props />
					</Pressable>

					<WhatsappCoinIcon width={40} height={40} />
				</View>
			</View>
		</View>
	)
}

const cardStyles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: TOP_UP_COINS.cardBorderRadius,
		padding: 12,
		marginBottom: TOP_UP_COINS.gridGap,
	},
	profileSection: {
		marginRight: 12,
	},
	avatarWrap: {
		position: 'relative',
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: '#E5E7EB',
	},
	avatarPlaceholder: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#10B981',
	},
	avatarInitial: {
		fontSize: fontSizes.xl,
		fontWeight: fontWeights.bold,
		color: '#fff',
	},
	badge: {
		position: 'absolute',
		bottom: -4,
		left: 0,
		right: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 2,

		borderRadius: 10,
		gap: 4,
	},
	badgeText: {
		fontSize: 9,
		fontWeight: fontWeights.semibold,
		color: '#fff',
	},
	infoSection: {
		flex: 1,
		minWidth: 0,
	},
	name: {
		fontSize: fontSizes.md,
		lineHeight: lineHeights.md,
		fontWeight: fontWeights.bold,
		color: '#000',
	},
	idRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 2,
		gap: 4,
	},
	idText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		color: '#6B7280',
	},
	paymentRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 2,
		gap: 6,
	},
	paymentScroll: {
		maxWidth: 140,
		marginHorizontal: -4,
	},
	paymentIconWrap: {
		width: 28,
		height: 28,
		borderRadius: 14,
		overflow: 'hidden',
	},
	chevronWrap: {
		paddingLeft: 4,
		justifyContent: 'center',
	},
	actionsSection: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 5,
		marginLeft: 8,
	},
	priceButton: {
		backgroundColor: TOP_UP_COINS.packageCardBorder,
		paddingVertical: 2,
		paddingHorizontal: 12,
		borderRadius: 16,
	},
	priceButtonText: {
		fontSize: fontSizes.sm,
		lineHeight: lineHeights.sm,
		fontWeight: fontWeights.semibold,
		color: '#fff',
	},
	chatIcons: {
		flexDirection: 'column',
		gap: 8,
		marginTop: 8,
	},
	chatIcon: {
		width: 36,
		height: 36,
		borderRadius: 18,
		alignItems: 'center',
		justifyContent: 'center',
	},
	chatIconBlue: {
		backgroundColor: '#2196F3',
	},
	chatIconGreen: {
		backgroundColor: '#25D366',
	},
	copyIcon: {
		width: 14,
		height: 14,
		position: 'relative',
	},
	copyIconInner: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: 10,
		height: 10,
		borderWidth: 1.5,
		borderColor: '#9CA3AF',
		borderRadius: 2,
		backgroundColor: '#FFF',
	},
	copyIconOuter: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: 10,
		height: 10,
		borderWidth: 1.5,
		borderColor: '#9CA3AF',
		borderRadius: 2,
		backgroundColor: '#FFF',
	},
})
