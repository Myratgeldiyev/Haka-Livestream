import { RankHeaderCity } from '@/components/rank/RankHeaderCity'
import { RankUsersList } from '@/components/rank/RankUsersList'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type CityRank = {
	id: string
	name: string
	rank: number
	score: number
}

export default function CityRankScreen() {
	return (
		<View style={styles.container}>
			<RankHeaderCity
				title='Kanpur Nagar'
				subtitle=''
				backgroundImage={require('@/assets/images/city-bg.png')}
			/>
			<RankUsersList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
