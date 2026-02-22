import { useMyProfile } from '@/hooks/profile/useMyProfile'
import { useAgencyHostStore } from '@/store/agency-host.store'
import { resolveImageUrl } from '@/utils/imageUrl'
import React, { useCallback, useEffect, useState } from 'react'
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
	useWindowDimensions,
} from 'react-native'
import UserAvatarIcon from '../ui/UserAvatarIcon'
import { CountrySelect } from './CountrySelect'

interface FillAgentInformationProps {
	adminId: string
	onSubmit: () => void
}

const scale = (size: number, width: number) => Math.round((size * width) / 390)
const scaleMax = (size: number, width: number, max: number) =>
	Math.min(scale(size, width), max)

const isValidEmail = (e: string) =>
	e.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())

export function FillAgentInformation({
	adminId,
	onSubmit,
}: FillAgentInformationProps) {
	const { width } = useWindowDimensions()
	const [agencyName, setAgencyName] = useState('')
	const [email, setEmail] = useState('')
	const [otpCode, setOtpCode] = useState('')
	const [country, setCountry] = useState<string | null>(null)
	const [emailError, setEmailError] = useState<string | null>(null)
	const [otpCountdown, setOtpCountdown] = useState(0)
	const requestOtpAgency = useAgencyHostStore(s => s.requestOtpAgency)
	const requestOtpAgencyLoading = useAgencyHostStore(s => s.requestOtpAgencyLoading)
	const createAgency = useAgencyHostStore(s => s.createAgency)
	const createAgencyLoading = useAgencyHostStore(s => s.createAgencyLoading)
	const createAgencyError = useAgencyHostStore(s => s.createAgencyError)
	const { data, isLoading, error } = useMyProfile()

	const handleEmailChange = useCallback((text: string) => {
		setEmail(text)
		if (text.trim().length === 0) {
			setEmailError(null)
			return
		}
		setEmailError(isValidEmail(text) ? null : 'Enter a valid email address')
	}, [])

	useEffect(() => {
		if (otpCountdown <= 0) return
		const t = setInterval(() => {
			setOtpCountdown(prev => (prev <= 1 ? 0 : prev - 1))
		}, 1000)
		return () => clearInterval(t)
	}, [otpCountdown])

	const handleGetOtp = useCallback(async () => {
		if (!isValidEmail(email) || otpCountdown > 0 || requestOtpAgencyLoading) return
		try {
			await requestOtpAgency(email.trim())
			setOtpCountdown(60)
		} catch {
			setOtpCountdown(60)
		}
	}, [email, otpCountdown, requestOtpAgencyLoading, requestOtpAgency])

	const handleSubmit = useCallback(async () => {
		const trimmedName = agencyName.trim()
		const trimmedEmail = email.trim()
		const trimmedOtp = otpCode.trim()
		if (!trimmedName || !isValidEmail(trimmedEmail) || !country || !trimmedOtp) return
		if (createAgencyLoading) return
		try {
			await createAgency({
				name: trimmedName,
				admin_id: adminId,
				email: trimmedEmail,
				country,
				otp_code: trimmedOtp,
			})
			onSubmit()
		} catch {
			// createAgencyError set in store
		}
	}, [
		agencyName,
		email,
		country,
		otpCode,
		adminId,
		createAgencyLoading,
		createAgency,
		onSubmit,
	])

	const displayUsername = isLoading ? '...' : (error ? '—' : (data?.username ?? ''))
	const displayUserId = isLoading ? '...' : (error ? '—' : (data?.user_id != null ? String(data.user_id) : ''))

	const px = scale(16, width)
	const mt24 = scale(24, width)
	const mt20 = scale(20, width)
	const mt40 = scale(40, width)
	const mb50 = scale(50, width)
	const avatarSize = scaleMax(48, width, 56)
	const fs18 = scaleMax(18, width, 22)
	const fs14 = scaleMax(14, width, 18)
	const fs12 = scaleMax(12, width, 16)
	const inputHeight = scaleMax(55, width, 64)
	const submitHeight = scaleMax(48, width, 56)
	const gap = scale(6, width)
	const inputPad = scale(12, width)
	const btnPadH = scale(12, width)
	const radius = scale(12, width)

	return (
		<View style={[styles.container, { marginTop: mt24, paddingHorizontal: px }]}>
			<View style={styles.containerWrapper}>
				{data?.profile_picture ? (
					<Image
						source={{ uri: resolveImageUrl(data.profile_picture) }}
						style={[
							styles.avatarImage,
							{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 },
						]}
					/>
				) : (
					<View
						style={[
							styles.imagePlaceholder,
							{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 },
						]}
					/>
				)}
				<View style={[styles.infoContainer, { marginLeft: scale(12, width) }]}>
					<Text style={[styles.username, { fontSize: fs18 }]}>{displayUsername}</Text>
					<Text style={[styles.id, { marginTop: gap, fontSize: fs12 }]}>
						ID: {displayUserId}
					</Text>
				</View>
			</View>

			<Text
				style={[
					styles.infoText,
					{ marginTop: mt24, marginBottom: mb50, fontSize: fs14 },
				]}
			>
				Describe your agent information
			</Text>

			<View style={[styles.field, { marginTop: mt20 }]}>
				<Text style={[styles.label, { fontSize: fs14, marginBottom: scale(8, width) }]}>
					Agency Name
				</Text>
				<View
					style={[
						styles.inputWrapper,
						{
							borderRadius: radius,
							paddingHorizontal: inputPad,
							height: inputHeight,
							minHeight: inputHeight,
						},
					]}
				>
					<UserAvatarIcon />
					<TextInput
						placeholder='Input the Agency Name'
						placeholderTextColor='#999'
						value={agencyName}
						onChangeText={setAgencyName}
						style={[styles.input, { fontSize: fs14, marginLeft: scale(5, width) }]}
					/>
				</View>
			</View>

			<View style={[styles.field, { marginTop: mt20 }]}>
				<Text style={[styles.label, { fontSize: fs14, marginBottom: scale(8, width) }]}>
					Email
				</Text>
				<View
					style={[
						styles.inputWrapper,
						{
							borderRadius: radius,
							paddingHorizontal: inputPad,
							height: inputHeight,
							minHeight: inputHeight,
						},
					]}
				>
					<View style={[styles.emailIcon, { marginRight: scale(10, width) }]}>
						<Text style={{ fontSize: fs14, color: '#000' }}>@</Text>
					</View>
					<TextInput
						placeholder='Enter your email'
						placeholderTextColor='#999'
						keyboardType='email-address'
						autoCapitalize='none'
						autoCorrect={false}
						value={email}
						onChangeText={handleEmailChange}
						style={[styles.input, { flex: 1, fontSize: fs14 }]}
					/>
					<Pressable
						style={[
							styles.otpButton,
							{
								marginLeft: scale(8, width),
								paddingHorizontal: btnPadH,
								height: scale(32, width),
								borderRadius: scale(8, width),
							},
							(!isValidEmail(email) || otpCountdown > 0 || requestOtpAgencyLoading) &&
								styles.otpButtonDisabled,
						]}
						onPress={handleGetOtp}
						disabled={
							!isValidEmail(email) || otpCountdown > 0 || requestOtpAgencyLoading
						}
					>
						<Text style={[styles.otpText, { fontSize: fs12 }]}>
							{otpCountdown > 0 ? `${otpCountdown}` : 'Get OTP'}
						</Text>
					</Pressable>
				</View>
				{emailError ? (
					<Text style={[styles.emailError, { fontSize: fs12, marginTop: scale(4, width) }]}>
						{emailError}
					</Text>
				) : null}
			</View>

			<View style={[styles.field, { marginTop: mt20 }]}>
				<View style={[styles.labelRow, { gap }]}>
					<Text style={[styles.label, { fontSize: fs14 }]}>Country</Text>
					<Text style={[styles.required, { fontSize: fs12 }]}>
						* Not be alter set once.
					</Text>
				</View>
				<CountrySelect
					value={country}
					onSelect={setCountry}
					placeholder='Country'
				/>
			</View>

			<View style={[styles.field, { marginTop: mt20 }]}>
				<Text style={[styles.label, { fontSize: fs14, marginBottom: scale(8, width) }]}>
					OTP
				</Text>
				<View
					style={[
						styles.inputWrapper,
						{
							borderRadius: radius,
							paddingHorizontal: inputPad,
							height: inputHeight,
							minHeight: inputHeight,
						},
					]}
				>
					<TextInput
						placeholder='Enter OTP'
						placeholderTextColor='#999'
						keyboardType='number-pad'
						value={otpCode}
						onChangeText={setOtpCode}
						style={[styles.input, { flex: 1, fontSize: fs14 }]}
					/>
				</View>
			</View>
			{createAgencyError ? (
				<Text style={[styles.emailError, { marginTop: scale(8, width), fontSize: fs12 }]}>
					{createAgencyError}
				</Text>
			) : null}
			<Pressable
				style={[
					styles.submitButton,
					{ marginTop: mt40, borderRadius: radius, height: submitHeight },
				]}
				onPress={handleSubmit}
				disabled={createAgencyLoading}
			>
				<Text style={[styles.submitText, { fontSize: fs14 }]}>
					{createAgencyLoading ? 'Submitting...' : 'Submit'}
				</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
	containerWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 4,
	},
	imagePlaceholder: {
		backgroundColor: '#D9D9D9',
	},
	avatarImage: {
		backgroundColor: '#D9D9D9',
	},
	infoContainer: {},
	username: {
		fontWeight: '600',
		color: '#000',
	},
	id: {
		color: '#777',
	},
	infoText: {
		fontWeight: '600',
		color: '#000',
	},
	field: {},
	label: {
		fontWeight: '400',
		color: '#000',
	},
	labelRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	required: {
		color: 'red',
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#898483',
	},
	emailIcon: {
		width: 24,
		height: 24,
		borderRadius: 4,
		backgroundColor: '#E8E8E8',
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		paddingVertical: 0,
		color: '#000',
	},
	otpButton: {
		backgroundColor: '#1D35EB',
		justifyContent: 'center',
		alignItems: 'center',
	},
	otpButtonDisabled: {
		opacity: 0.6,
	},
	emailError: {
		color: '#c00',
	},
	otpText: {
		color: '#fff',
		fontWeight: '600',
	},
	submitButton: {
		backgroundColor: '#1D35EB',
		justifyContent: 'center',
		alignItems: 'center',
	},
	submitText: {
		color: '#fff',
		fontWeight: '600',
	},
})
