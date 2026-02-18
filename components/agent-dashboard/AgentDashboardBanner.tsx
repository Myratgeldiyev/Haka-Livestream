import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export function AgentDashboardBanner() {
	return (
		<View style={styles.banner}>
			<Image
				source={require('@/assets/images/agency-center-banner.png')}
				style={styles.bannerImage}
				resizeMode="cover"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	banner: {
		width: '100%',
		marginBottom: 20,
	},
	bannerImage: {
		width: '100%',
		height: 140,
	},
})
