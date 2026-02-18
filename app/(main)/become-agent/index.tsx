import { AdminList } from '@/components/become-agent/AdminList'
import { AgentHeader } from '@/components/become-agent/AgentHeader'
import { ApplySuccess } from '@/components/become-agent/ApplySuccess'
import { FillAgentInformation } from '@/components/become-agent/FillAgentInformation'
import RightArrowIcon from '@/components/ui/icons/profile-header/right-arrow'
import React, { useState } from 'react'
import {
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native'

export interface Admin {
	id: string
	username: string
	image?: any
}

const MOCK_ADMINS: Admin[] = [
	{ username: 'Yunus', id: '3', image: '' },
	{ username: 'Maysa', id: '1', image: '' },
	{ username: 'Raj', id: '2', image: '' },
]

type Step = 'select-admin' | 'fill-agent-info' | 'loading' | 'success'

export default function BecomeAgentScreen() {
	const [step, setStep] = useState<Step>('select-admin')
	const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null)

	const handleBackPress = () => {
		if (step === 'fill-agent-info') {
			setStep('select-admin')
			setSelectedAdminId(null)
			return
		}

		if (step === 'success') {
			setStep('select-admin')
			setSelectedAdminId(null)
		}
	}

	const handleApply = (adminId: string) => {
		setSelectedAdminId(adminId)
		setStep('fill-agent-info')
	}
	const handleSubmitAgentInfo = async () => {
		setStep('loading')

		setTimeout(() => {
			setStep('success')
		}, 1500)
	}

	return (
		<View style={styles.container}>
			<AgentHeader title='Become Agent' onBackPress={handleBackPress} />

			{step === 'select-admin' && (
				<>
					<ImageBackground
						source={require('@/assets/images/haka-agency.png')}
						style={styles.imageBackground}
						imageStyle={styles.image}
						resizeMode='cover'
					>
						<View style={styles.block} />
						<View style={styles.blockWrapper}>
							<Text style={styles.heading}>Haka Agency policy</Text>
							<Text style={styles.text}>Abundant share ratio | Vast bonus</Text>
							<Pressable style={styles.button}>
								<Text style={styles.buttonTxt}>View details</Text>
								<RightArrowIcon props={8} color={'#E61662'} />
							</Pressable>
						</View>
					</ImageBackground>

					<AdminList
						title='Please select your Admin'
						imageSource={null}
						data={MOCK_ADMINS}
						onApplyPress={handleApply}
					/>
				</>
			)}

			{step === 'fill-agent-info' && selectedAdminId && (
				<FillAgentInformation
					adminId={selectedAdminId}
					onSubmit={handleSubmitAgentInfo}
				/>
			)}

			{step === 'loading' && (
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<Text style={{ fontSize: 16 }}>Submitting...</Text>
				</View>
			)}

			{step === 'success' && <ApplySuccess />}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	imageBackground: {
		flexDirection: 'row',
		height: 180,
		marginHorizontal: 16,
		marginTop: 16,
		borderRadius: 12,
		overflow: 'hidden',
	},
	image: {
		borderRadius: 12,
	},
	block: {
		width: '30%',
	},
	blockWrapper: {
		justifyContent: 'center',
	},
	heading: {
		fontSize: 28,
		fontWeight: '600',
		color: '#fff',
	},
	text: {
		fontSize: 12,
		color: '#fff',
		fontWeight: '500',
	},
	button: {
		marginTop: 10,
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	buttonTxt: {
		fontWeight: '600',
		color: '#E61662',
		fontSize: 14,
	},
})
