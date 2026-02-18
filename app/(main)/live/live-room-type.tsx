import {
	ApplyModeToggle,
	ApplySettingsButton,
	GameGrid,
	type GameId,
	MicCountSelector,
	RoomTypeSelector,
	SeatSelectionGrid,
} from '@/components/room-type'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RoomTypeScreen() {
	const [selectedSeat, setSelectedSeat] = useState<string>('No. 1')
	const [roomType, setRoomType] = useState<'live' | 'chat'>('chat')
	const [selectedMic, setSelectedMic] = useState<
		'5 Mic' | '10 Mic' | '15 Mic' | '20 Mic'
	>('10 Mic')
	const [applyMode, setApplyMode] = useState(true)
	const [selectedGame, setSelectedGame] = useState<GameId>('none')

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<SeatSelectionGrid
					selectedSeat={selectedSeat}
					onSeatSelect={setSelectedSeat}
				/>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Room Type</Text>
					<RoomTypeSelector
						selectedType={roomType}
						onTypeSelect={setRoomType}
					/>
				</View>

				<MicCountSelector
					selectedMic={selectedMic}
					onMicSelect={setSelectedMic}
				/>

				<ApplyModeToggle isEnabled={applyMode} onToggle={setApplyMode} />

				<GameGrid selectedGame={selectedGame} onGameSelect={setSelectedGame} />

				<ApplySettingsButton />
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25203C',
	},
	scrollView: {
		flex: 1,
	},
	content: {
		padding: 16,
		gap: 24,
		paddingBottom: 40,
	},
	section: {
		gap: 12,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#FFFFFF',
	},
})
