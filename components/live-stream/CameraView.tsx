import { CameraView as ExpoCameraView, useCameraPermissions } from 'expo-camera'
import * as Linking from 'expo-linking'
import React, { useCallback } from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'

interface CameraViewProps {
	children?: React.ReactNode
}

export function CameraView({ children }: CameraViewProps) {
	const [permission, requestPermission] = useCameraPermissions()

	const handleRequestPermission = useCallback(async () => {
		const result = await requestPermission()

		if (!result.granted && !result.canAskAgain) {
			if (Platform.OS === 'ios') {
				Linking.openURL('app-settings:')
			} else {
				Linking.openSettings()
			}
		}
	}, [requestPermission])

	const handleOpenSettings = useCallback(() => {
		if (Platform.OS === 'ios') {
			Linking.openURL('app-settings:')
		} else {
			Linking.openSettings()
		}
	}, [])

	if (!permission) {
		return (
			<View style={styles.container}>
				<View style={styles.loadingContainer}>
					<Text style={styles.loadingText}>Loading camera...</Text>
				</View>
			</View>
		)
	}

	if (!permission.granted) {
		const canAskAgain = permission.canAskAgain

		return (
			<View style={styles.container}>
				<View style={styles.permissionContainer}>
					<Text style={styles.permissionTitle}>Camera Permission Required</Text>
					<Text style={styles.permissionText}>
						{canAskAgain
							? 'We need your permission to show the camera for live streaming.'
							: 'Camera permission was denied. Please enable it in settings to use live streaming.'}
					</Text>
					<Pressable
						style={({ pressed }) => [
							styles.permissionButton,
							pressed && styles.permissionButtonPressed,
						]}
						onPress={canAskAgain ? handleRequestPermission : handleOpenSettings}
					>
						<Text style={styles.permissionButtonText}>
							{canAskAgain ? 'Grant Permission' : 'Open Settings'}
						</Text>
					</Pressable>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<ExpoCameraView style={styles.camera} facing='front'>
				{children}
			</ExpoCameraView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		backgroundColor: 'transparent',
	},
	camera: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
	},
	loadingText: {
		color: '#FFFFFF',
		fontSize: 16,
	},
	permissionContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
		paddingHorizontal: 32,
	},
	permissionTitle: {
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 12,
		textAlign: 'center',
	},
	permissionText: {
		color: 'rgba(255, 255, 255, 0.7)',
		fontSize: 14,
		textAlign: 'center',
		marginBottom: 24,
		lineHeight: 20,
	},
	permissionButton: {
		backgroundColor: '#515FF6',
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 12,
	},
	permissionButtonPressed: {
		opacity: 0.8,
	},
	permissionButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
})
