import type { SocialUser, UserListProps } from '@/types/social/social.types'
import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { COLORS, sharedSocialStyles } from './styles'
import { UserListItem } from './UserListItem'

function EmptyState({
	message,
	subMessage,
}: {
	message: string
	subMessage?: string
}) {
	return (
		<View style={sharedSocialStyles.emptyContainer}>
			<Text style={sharedSocialStyles.emptyText}>{message}</Text>
			{subMessage && (
				<Text style={sharedSocialStyles.emptySubText}>{subMessage}</Text>
			)}
		</View>
	)
}

function ListFooter({
	isLoading,
	hasMore,
}: {
	isLoading: boolean
	hasMore: boolean
}) {
	if (isLoading) {
		return (
			<View style={sharedSocialStyles.footerLoader}>
				<ActivityIndicator size="small" color={COLORS.primary} />
			</View>
		)
	}

	if (!hasMore) {
		return (
			<View style={sharedSocialStyles.footerLoader}>
				<Text style={sharedSocialStyles.footerText}>No more data</Text>
			</View>
		)
	}

	return null
}

export function UserList({
	users,
	variant,
	isLoading,
	hasMore,
	onLoadMore,
	emptyMessage,
	emptySubMessage,
}: UserListProps) {
	const renderItem = ({ item }: { item: SocialUser }) => (
		<UserListItem user={item} variant={variant} />
	)

	const keyExtractor = (item: SocialUser) => item.id

	const handleEndReached = () => {
		if (!isLoading && hasMore) {
			onLoadMore()
		}
	}

	if (users.length === 0 && !isLoading) {
		return <EmptyState message={emptyMessage} subMessage={emptySubMessage} />
	}

	return (
		<FlatList
			data={users}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
			ListFooterComponent={
				users.length > 0 ? (
					<ListFooter isLoading={isLoading} hasMore={hasMore} />
				) : null
			}
			showsVerticalScrollIndicator={false}
		/>
	)
}
