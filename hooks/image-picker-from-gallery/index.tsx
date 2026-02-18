import * as ImagePicker from 'expo-image-picker'

export async function pickImageFromGallery() {
	const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

	if (!permission.granted) {
		throw new Error('Gallery permission denied')
	}

	const result = await ImagePicker.launchImageLibraryAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
		allowsEditing: true,
		quality: 0.8,
	})

	if (result.canceled) return null

	const asset = result.assets[0]

	return {
		uri: asset.uri,
		name: asset.fileName ?? 'room.jpg',
		type: asset.mimeType ?? 'image/jpeg',
	}
}
