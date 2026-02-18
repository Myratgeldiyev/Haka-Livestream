import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import UserAvatarIcon from '../ui/UserAvatarIcon'
import CountryIcon from '../ui/icons/CountryIcon'
import PhoneRoomPlay from '../ui/icons/room-play/PhoneRoomPlay'

interface FillAgentInformationProps {
	adminId: string
	onSubmit: () => void
}

export function FillAgentInformation({
	adminId,
	onSubmit,
}: FillAgentInformationProps) {
	return (
		<View style={styles.container}>
			<View style={styles.containerWrapper}>
				<View style={styles.imagePlaceholder} />
				<View style={styles.infoContainer}>
					<Text style={styles.username}>Samir</Text>
					<Text style={styles.id}>ID: {adminId}</Text>
				</View>
			</View>

			<Text style={styles.infoText}>Describe your agent information</Text>

			<View style={styles.field}>
				<Text style={styles.label}>Agency Name</Text>
				<View style={styles.inputWrapper}>
					<UserAvatarIcon />
					<TextInput
						placeholder='Input the Agency Name'
						placeholderTextColor='#999'
						style={styles.input}
					/>
				</View>
			</View>

			<View style={styles.field}>
				<Text style={styles.label}>Phone</Text>
				<View style={styles.inputWrapper}>
					<PhoneRoomPlay color='#000' />
					<TextInput
						placeholder='Enter your phone number'
						placeholderTextColor='#999'
						style={styles.input}
					/>
					<Pressable style={styles.otpButton}>
						<Text style={styles.otpText}>Get OTP</Text>
					</Pressable>
				</View>
			</View>

			<View style={styles.field}>
				<View style={styles.labelRow}>
					<Text style={styles.label}>Country</Text>
					<Text style={styles.required}>* Not be alter set once.</Text>
				</View>
				<View style={styles.inputWrapper}>
					<CountryIcon />
					<TextInput
						placeholder='Country'
						placeholderTextColor='#999'
						style={styles.input}
						editable={false}
					/>
				</View>
			</View>

			<View style={styles.field}>
				<Text style={styles.label}>OTP</Text>
				<View style={styles.inputWrapper}>
					<TextInput
						placeholder='Enter OTP'
						placeholderTextColor='#999'
						style={styles.input}
					/>
				</View>
			</View>
			<Pressable style={styles.submitButton} onPress={onSubmit}>
				<Text style={styles.submitText}>Submit</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 24,
		paddingHorizontal: 16,
	},
	containerWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 4,
	},
	imagePlaceholder: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: '#D9D9D9',
	},
	infoContainer: {
		marginLeft: 12,
	},
	username: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
	},
	id: {
		marginTop: 4,
		fontSize: 12,
		color: '#777',
	},
	infoText: {
		marginTop: 24,
		marginBottom: 50,
		fontSize: 14,
		fontWeight: '600',
		color: '#000',
	},

	field: {
		marginTop: 20,
	},
	label: {
		fontSize: 14,
		fontWeight: '400',
		color: '#000',
		marginBottom: 8,
	},
	labelRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	required: {
		fontSize: 12,
		color: 'red',
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#898483',
		borderRadius: 12,
		paddingHorizontal: 12,

		height: 55,
	},
	iconPlaceholder: {
		width: 20,
		height: 20,
		borderRadius: 4,
		backgroundColor: '#E0E0E0',
		marginRight: 10,
	},
	input: {
		flex: 1,
		fontSize: 14,
		color: '#000',
		marginLeft: 5,
		paddingVertical: 5,
	},
	otpButton: {
		marginLeft: 8,
		backgroundColor: '#1D35EB',
		paddingHorizontal: 12,
		height: 32,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	otpText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: '600',
	},
	submitButton: {
		marginTop: 40,
		backgroundColor: '#1D35EB',
		height: 48,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	submitText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
})
