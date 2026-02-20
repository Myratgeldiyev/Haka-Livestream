import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import CoinIcon from '../ui/icons/withdrawal/CoinIcon'
import RankLeftArrow from '../ui/icons/rank/RankLeftArrowIcon'

type RankStateButtonProps = {
	onPress?: () => void
}

export const RankStateButton: React.FC<RankStateButtonProps> = ({
	onPress,
}) => {
	return (
		<Pressable onPress={onPress} style={styles.wrapper}>
			<LinearGradient
				colors={['#FEE36A', '#FDAD14']}
				start={{ x: 0.5, y: 1 }}
				end={{ x: 0.5, y: 0 }}
				style={styles.container}
			>
				<View style={styles.contentRow}>
					<View style={styles.leftBlock}>
						<RankLeftArrow />
					</View>

					<View style={styles.rightBlock}>
						<Text style={styles.todayText}>Today</Text>

						<View style={styles.bottomRow}>
							<CoinIcon />
							<Text style={styles.valueText}>12,323,33</Text>
						</View>
					</View>
				</View>
			</LinearGradient>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		marginTop: 35,
		width: '100%',
		alignItems: 'center',
	},

	container: {
		width: '65%',
		height: 72,
		borderRadius: 38,
		justifyContent: 'center',
	},

	contentRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 12,
	},

	leftBlock: {
		width: 44,
		height: 44,

		justifyContent: 'center',
		alignItems: 'center',
	},

	iconPlaceholder: {
		width: 20,
		height: 20,
		borderRadius: 6,
		backgroundColor: 'rgba(0,0,0,0.25)',
	},

	rightBlock: {
		alignItems: 'center',
		justifyContent: 'center',
	},

	todayText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#5B0F00',
		marginBottom: 4,
	},

	bottomRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},

	smallIconPlaceholder: {
		width: 14,
		height: 14,
		borderRadius: 4,
		backgroundColor: 'rgba(0,0,0,0.35)',
	},

	valueText: {
		fontSize: 16,

		color: '#3A2A00',
	},
})
