import { Admin } from '@/app/(main)/become-agent'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { AdminListItem } from './AdminListItem'

interface AdminListProps {
	title: string
	imageSource: any
	data: Admin[]
	onApplyPress: (adminId: string) => void
}

export function AdminList({
	title,
	imageSource,
	data,
	onApplyPress,
}: AdminListProps) {
	return (
		<FlatList
			data={data}
			keyExtractor={item => item.id}
			ListHeaderComponent={
				<View>
					{/* <TopImage source={imageSource} /> */}
					<Text style={styles.title}>{title}</Text>
				</View>
			}
			contentContainerStyle={styles.content}
			renderItem={({ item }) => (
				<AdminListItem
					username={item.username}
					id={item.id}
					image={item.image}
					onApplyPress={() => onApplyPress(item.id)}
				/>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	content: {
		paddingBottom: 24,
	},
	title: {
		marginTop: 16,
		marginHorizontal: 16,
		fontSize: 18,
		fontWeight: '600',
		color: '#000000',
	},
})
