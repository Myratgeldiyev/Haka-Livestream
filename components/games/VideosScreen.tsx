import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { VideoFeed } from './VideoFeed'

export default function VideosScreen() {
	return (
		<View style={styles.container}>
			<StatusBar style="light" hidden={false} translucent />
			<VideoFeed />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
})
