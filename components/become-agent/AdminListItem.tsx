import { resolveImageUrl } from '@/utils/imageUrl'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

interface AdminListItemProps {
	username: string
	id: string
	image?: string | null
	onApplyPress: () => void
}
export function AdminListItem({
	username,
	id,
	image,
	onApplyPress,
}: AdminListItemProps) {
	const avatarUri = image ? resolveImageUrl(image) : null
	return (
		<View style={styles.container}>
			{avatarUri ? (
				<Image
					source={{ uri: avatarUri }}
					style={styles.avatarImage}
				/>
			) : (
				<View style={styles.imagePlaceholder} />
			)}
			<View style={styles.infoContainer}>
				<Text style={styles.username}>{username}</Text>
				<Text style={styles.id}>ID: {id}</Text>
			</View>
			<Pressable style={styles.button} onPress={onApplyPress}>
				<Text style={styles.buttonText}>Apply</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		marginHorizontal: 16,
		marginTop: 12,
		padding: 12,
		borderRadius: 12,
	},
	imagePlaceholder: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#D9D9D9',
	},
	avatarImage: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#D9D9D9',
	},
	infoContainer: {
		flex: 1,
		marginLeft: 12,
	},
	username: {
		fontSize: 14,
		fontWeight: '600',
		color: '#000000',
	},
	id: {
		marginTop: 4,
		fontSize: 12,
		color: '#777777',
	},
	button: {
		backgroundColor: '#3822D9',
		paddingHorizontal: 26,
		paddingVertical: 8,
		borderRadius: 12,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 12,
		fontWeight: '400',
	},
})
