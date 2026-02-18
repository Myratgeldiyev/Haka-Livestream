import DatePicker from '@/components/ui/date-select'
import { GenderDropdown } from '@/components/ui/gender-dropdown'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	ActivityIndicator,
	Animated,
	Easing,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'
import { Gender } from '../../api/auth/auth.types'
import { useCompleteSignup } from '../../hooks/useCompleteSignup'
import {
	calculateAge,
	DateValue,
	formatDate,
	isValidAge,
	MIN_AGE,
} from '../../utils/age.utils'
const ArrowDown = () => (
	<Svg width={17} height={13} viewBox='0 0 17 13' fill='none'>
		<Path
			d='M16.5239 4.14009L8.24392 12.8161L-7.9155e-05 4.14009V8.69036e-05L8.24392 8.71209L16.5239 8.69036e-05V4.14009Z'
			fill='#000'
		/>
	</Svg>
)
const NameIcon = () => (
	<Svg width={17} height={17} viewBox='0 0 17 17' fill='none'>
		<Path
			d='M0.5 14.5C0.5 13.4391 0.921427 12.4217 1.67157 11.6716C2.42172 10.9214 3.43913 10.5 4.5 10.5H12.5C13.5609 10.5 14.5783 10.9214 15.3284 11.6716C16.0786 12.4217 16.5 13.4391 16.5 14.5C16.5 15.0304 16.2893 15.5391 15.9142 15.9142C15.5391 16.2893 15.0304 16.5 14.5 16.5H2.5C1.96957 16.5 1.46086 16.2893 1.08579 15.9142C0.710714 15.5391 0.5 15.0304 0.5 14.5Z'
			stroke='#000'
			strokeLinejoin='round'
		/>
		<Path
			d='M8.5 6.5C10.1569 6.5 11.5 5.15685 11.5 3.5C11.5 1.84315 10.1569 0.5 8.5 0.5C6.84315 0.5 5.5 1.84315 5.5 3.5C5.5 5.15685 6.84315 6.5 8.5 6.5Z'
			stroke='#000'
		/>
	</Svg>
)

const CountryIcon = () => (
	<Svg width={20} height={20} viewBox='0 0 20 20' fill='none'>
		<Path
			d='M10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88334 18.6867 3.825 17.9743 2.925 17.075C2.025 16.1757 1.31267 15.1173 0.788001 13.9C0.263335 12.6827 0.000667933 11.3827 1.26582e-06 10C-0.000665401 8.61733 0.262001 7.31733 0.788001 6.1C1.314 4.88267 2.02633 3.82433 2.925 2.925C3.82367 2.02567 4.882 1.31333 6.1 0.788C7.318 0.262667 8.618 0 10 0C11.382 0 12.682 0.262667 13.9 0.788C15.118 1.31333 16.1763 2.02567 17.075 2.925C17.9737 3.82433 18.6863 4.88267 19.213 6.1C19.7397 7.31733 20.002 8.61733 20 10C19.998 11.3827 19.7353 12.6827 19.212 13.9C18.6887 15.1173 17.9763 16.1757 17.075 17.075C16.1737 17.9743 15.1153 18.687 13.9 19.213C12.6847 19.739 11.3847 20.0013 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 9.88333 17.996 9.76233 17.988 9.637C17.98 9.51167 17.9757 9.40767 17.975 9.325C17.8917 9.80833 17.6667 10.2083 17.3 10.525C16.9333 10.8417 16.5 11 16 11H14C13.45 11 12.9793 10.8043 12.588 10.413C12.1967 10.0217 12.0007 9.55067 12 9V8H8V6C8 5.45 8.196 4.97933 8.588 4.588C8.98 4.19667 9.45067 4.00067 10 4H11C11 3.61667 11.1043 3.27933 11.313 2.988C11.5217 2.69667 11.7757 2.459 12.075 2.275C11.7417 2.19167 11.4043 2.125 11.063 2.075C10.7217 2.025 10.3673 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10H7C8.1 10 9.04167 10.3917 9.825 11.175C10.6083 11.9583 11 12.9 11 14V15H8V17.75C8.33333 17.8333 8.66267 17.896 8.988 17.938C9.31333 17.98 9.65067 18.0007 10 18Z'
			fill='#000'
		/>
	</Svg>
)
const GenderIcon = () => (
	<Svg width={22} height={24} viewBox='0 0 22 24' fill='none'>
		<Path
			d='M21.498 2.24562e-05H17.593C17.4987 -0.000898863 17.4064 0.0265487 17.3279 0.0787996C17.2494 0.131051 17.1885 0.20569 17.153 0.293022C17.1151 0.38065 17.1041 0.4776 17.1216 0.571477C17.139 0.665353 17.1841 0.75189 17.251 0.820022L18.159 1.72802C18.259 1.82402 18.259 1.98302 18.159 2.07902L16.138 4.13902C16.0942 4.17157 16.0411 4.18915 15.9865 4.18915C15.9319 4.18915 15.8788 4.17157 15.835 4.13902C14.5664 3.33292 13.0583 2.98986 11.5659 3.1679C10.0734 3.34593 8.68835 4.03413 7.645 5.11602C3.645 4.46802 0.014 7.54702 0 11.598C0.00197299 13.0005 0.456132 14.365 1.29506 15.4889C2.13399 16.6128 3.31297 17.4363 4.657 17.837C4.761 17.867 4.832 17.963 4.832 18.071V18.842C4.832 18.9067 4.80629 18.9688 4.76053 19.0146C4.71478 19.0603 4.65271 19.086 4.588 19.086H4.158C3.9856 19.0596 3.80952 19.0707 3.64182 19.1186C3.47413 19.1666 3.31878 19.2502 3.18642 19.3638C3.05407 19.4774 2.94784 19.6183 2.87501 19.7768C2.80218 19.9353 2.76447 20.1076 2.76447 20.282C2.76447 20.4564 2.80218 20.6288 2.87501 20.7873C2.94784 20.9458 3.05407 21.0866 3.18642 21.2002C3.31878 21.3138 3.47413 21.3975 3.64182 21.4454C3.80952 21.4933 3.9856 21.5045 4.158 21.478H4.638C4.772 21.478 4.881 21.588 4.881 21.722V22.201C4.86742 22.3677 4.88851 22.5353 4.94296 22.6934C4.9974 22.8514 5.08401 22.9965 5.19732 23.1194C5.31064 23.2424 5.44819 23.3405 5.60132 23.4076C5.75444 23.4747 5.91982 23.5093 6.087 23.5093C6.25418 23.5093 6.41956 23.4747 6.57268 23.4076C6.72581 23.3405 6.86336 23.2424 6.97668 23.1194C7.08999 22.9965 7.1766 22.8514 7.23104 22.6934C7.28549 22.5353 7.30658 22.3677 7.293 22.201V21.722C7.29184 21.665 7.31071 21.6093 7.34634 21.5647C7.38197 21.5202 7.43209 21.4895 7.488 21.478H7.976C8.27774 21.4519 8.55872 21.3136 8.76344 21.0904C8.96816 20.8672 9.08174 20.5754 9.08174 20.2725C9.08174 19.9697 8.96816 19.6778 8.76344 19.4546C8.55872 19.2314 8.27774 19.0931 7.976 19.067H7.488C7.42408 19.0646 7.36344 19.0381 7.3182 18.9928C7.27297 18.9476 7.24647 18.8869 7.244 18.823V18.266C7.24598 18.2078 7.26875 18.1521 7.30818 18.1092C7.34762 18.0663 7.40112 18.0389 7.459 18.032C8.857 17.8216 10.1505 17.1679 11.149 16.167C15.143 16.765 18.747 13.703 18.803 9.66502C18.818 8.42477 18.4795 7.20589 17.827 6.15102C17.7936 6.10948 17.7755 6.0578 17.7755 6.00452C17.7755 5.95125 17.7936 5.89957 17.827 5.85802L19.887 3.79802C19.9094 3.77358 19.9365 3.75403 19.9668 3.7406C19.9971 3.72718 20.0299 3.72017 20.063 3.72002C20.129 3.72302 20.192 3.75002 20.238 3.79802L21.136 4.69602C21.2042 4.76305 21.2906 4.80856 21.3845 4.8269C21.4783 4.84523 21.5755 4.83558 21.664 4.79915C21.7524 4.76271 21.8281 4.7011 21.8818 4.62196C21.9355 4.54282 21.9648 4.44965 21.966 4.35402V0.450022C21.9583 0.330212 21.9059 0.217645 21.8193 0.134527C21.7327 0.0514089 21.618 0.00377533 21.498 0.00102246M12.711 13.757C13.0077 12.914 13.1287 12.0192 13.0666 11.1277C13.0045 10.2362 12.7606 9.36677 12.35 8.57302C12.2773 8.43013 12.177 8.30308 12.0549 8.19921C11.9328 8.09535 11.7913 8.01675 11.6386 7.96795C11.4859 7.91916 11.325 7.90114 11.1653 7.91495C11.0056 7.92875 10.8502 7.9741 10.7081 8.04838C10.5661 8.12265 10.4402 8.22437 10.3377 8.34764C10.2352 8.47092 10.1582 8.6133 10.1111 8.76654C10.064 8.91978 10.0478 9.08084 10.0634 9.24039C10.079 9.39993 10.1261 9.5548 10.202 9.69602C10.522 10.296 10.682 10.968 10.671 11.648C10.667 14.812 7.24 16.786 4.501 15.201C1.762 13.616 1.767 9.66102 4.509 8.08102C5.03275 7.7795 5.61668 7.59749 6.219 7.54802C5.96005 8.22514 5.81803 8.94133 5.799 9.66602C5.79792 10.952 6.1783 12.2093 6.892 13.279C7.07768 13.5258 7.35072 13.6923 7.65518 13.7443C7.95964 13.7964 8.27246 13.73 8.52955 13.5588C8.78665 13.3876 8.96854 13.1246 9.03798 12.8236C9.10741 12.5227 9.05912 12.2065 8.903 11.94C7.149 9.30702 8.903 5.76202 12.06 5.55902C15.217 5.35602 17.41 8.64702 16.008 11.483C15.6945 12.1169 15.2227 12.6591 14.6383 13.0573C14.0539 13.4555 13.3766 13.6962 12.672 13.756L12.711 13.757Z'
			fill='#000'
		/>
	</Svg>
)
const DateIcon = () => (
	<Svg width={24} height={24} viewBox='0 0 24 24' fill='none'>
		<G clipPath='url(#clip0_3296_5193)'>
			<Path
				d='M21.4998 4H19.3332V5.33333H21.3332V20H2.66651V5.33333H4.66651V4H2.49985C2.344 4.0026 2.1902 4.03588 2.04722 4.09794C1.90425 4.15999 1.77489 4.24961 1.66655 4.36166C1.55821 4.47371 1.47301 4.60601 1.41581 4.751C1.35861 4.89599 1.33053 5.05083 1.33318 5.20667V20.1267C1.33053 20.2825 1.35861 20.4373 1.41581 20.5823C1.47301 20.7273 1.55821 20.8596 1.66655 20.9717C1.77489 21.0837 1.90425 21.1733 2.04722 21.2354C2.1902 21.2974 2.344 21.3307 2.49985 21.3333H21.4998C21.6557 21.3307 21.8095 21.2974 21.9525 21.2354C22.0954 21.1733 22.2248 21.0837 22.3331 20.9717C22.4415 20.8596 22.5267 20.7273 22.5839 20.5823C22.6411 20.4373 22.6692 20.2825 22.6665 20.1267V5.20667C22.6692 5.05083 22.6411 4.89599 22.5839 4.751C22.5267 4.60601 22.4415 4.47371 22.3331 4.36166C22.2248 4.24961 22.0954 4.15999 21.9525 4.09794C21.8095 4.03588 21.6557 4.0026 21.4998 4Z'
				fill='#000'
			/>

			<Path d='M5.33301 9.33325H6.66634V10.6666H5.33301V9.33325Z' fill='#000' />
			<Path d='M9.33301 9.33325H10.6663V10.6666H9.33301V9.33325Z' fill='#000' />
			<Path d='M13.333 9.33325H14.6663V10.6666H13.333V9.33325Z' fill='#000' />
			<Path d='M17.333 9.33325H18.6663V10.6666H17.333V9.33325Z' fill='#000' />

			<Path d='M5.33301 12.6667H6.66634V14.0001H5.33301V12.6667Z' fill='#000' />
			<Path d='M9.33301 12.6667H10.6663V14.0001H9.33301V12.6667Z' fill='#000' />
			<Path d='M13.333 12.6667H14.6663V14.0001H13.333V12.6667Z' fill='#000' />
			<Path d='M17.333 12.6667H18.6663V14.0001H17.333V12.6667Z' fill='#000' />

			<Path d='M5.33301 16H6.66634V17.3333H5.33301V16Z' fill='#000' />
			<Path d='M9.33301 16H10.6663V17.3333H9.33301V16Z' fill='#000' />
			<Path d='M13.333 16H14.6663V17.3333H13.333V16Z' fill='#000' />
			<Path d='M17.333 16H18.6663V17.3333H17.333V16Z' fill='#000' />

			<Path
				d='M6.66667 6.66659C6.84348 6.66659 7.01305 6.59635 7.13807 6.47132C7.2631 6.3463 7.33333 6.17673 7.33333 5.99992V1.99992C7.33333 1.82311 7.2631 1.65354 7.13807 1.52851C7.01305 1.40349 6.84348 1.33325 6.66667 1.33325C6.48986 1.33325 6.32029 1.40349 6.19526 1.52851C6.07024 1.65354 6 1.82311 6 1.99992V5.99992C6 6.17673 6.07024 6.3463 6.19526 6.47132C6.32029 6.59635 6.48986 6.66659 6.66667 6.66659Z'
				fill='#000'
			/>

			<Path
				d='M17.3337 6.66659C17.5105 6.66659 17.68 6.59635 17.8051 6.47132C17.9301 6.3463 18.0003 6.17673 18.0003 5.99992V1.99992C18.0003 1.82311 17.9301 1.65354 17.8051 1.52851C17.68 1.40349 17.5105 1.33325 17.3337 1.33325C17.1568 1.33325 16.9873 1.40349 16.8623 1.52851C16.7372 1.65354 16.667 1.82311 16.667 1.99992V5.99992C16.667 6.17673 16.7372 6.3463 16.8623 6.47132C16.9873 6.59635 17.1568 6.66659 17.3337 6.66659Z'
				fill='#000'
			/>

			<Path d='M8.66699 4H15.3337V5.33333H8.66699V4Z' fill='#000' />
		</G>

		<Defs>
			<ClipPath id='clip0_3296_5193'>
				<Rect width={24} height={24} fill='#000' />
			</ClipPath>
		</Defs>
	</Svg>
)

const RequiredLabel = ({ text }: { text: string }) => (
	<View style={styles.labelRow}>
		<Text style={styles.label}>{text}</Text>
		<Text style={styles.required}> *</Text>
		<Text style={styles.note}> Not be alter once set</Text>
	</View>
)

const GENDER_MAP: Record<string, Gender> = {
	Male: 'male',
	Female: 'female',
	Other: 'not to prefer',
}

export default function RegisterScreen() {
	const [username, setUsername] = useState('')
	const [gender, setGender] = useState<string | null>(null)
	const [genderOpen, setGenderOpen] = useState(false)

	const [country, setCountry] = useState<string | null>(null)
	const [countryOpen, setCountryOpen] = useState(false)

	const [date, setDate] = useState<DateValue | null>(null)
	const [open, setOpen] = useState(false)

	const { completeSignup, loading, error, success, reset } = useCompleteSignup()

	const ageError = useMemo(() => {
		if (!date) return null
		if (!isValidAge(date)) {
			return `You must be at least ${MIN_AGE} years old to register`
		}
		return null
	}, [date])

	const isFormValid =
		username.trim().length >= 2 && gender && country && date && !ageError

	const isButtonDisabled = loading || !isFormValid

	const handleSubmit = useCallback(async () => {
		if (isButtonDisabled || !gender || !country || !date || ageError) return

		const mappedGender = GENDER_MAP[gender] || 'not to prefer'
		const age = String(calculateAge(date))

		await completeSignup(username.trim(), age, mappedGender, country)
	}, [
		username,
		gender,
		country,
		date,
		completeSignup,
		isButtonDisabled,
		ageError,
	])

	useEffect(() => {
		if (success) {
			router.replace('/live')
			reset()
		}
	}, [success, reset])

	const rotateAnim = useRef(new Animated.Value(0)).current
	const rotate = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '180deg'],
	})

	const dropdownAnim = useRef(new Animated.Value(0)).current
	const dropdownTranslateY = dropdownAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [-20, 0],
	})

	const dropdownOpacity = dropdownAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
	})

	function useArrowAnimation(open: boolean) {
		const anim = useRef(new Animated.Value(0)).current

		const rotate = anim.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '180deg'],
		})

		useEffect(() => {
			Animated.timing(anim, {
				toValue: open ? 1 : 0,
				duration: 200,
				easing: Easing.out(Easing.ease),
				useNativeDriver: true,
			}).start()
		}, [open])

		return rotate
	}
	const genderRotate = useArrowAnimation(genderOpen)
	const countryRotate = useArrowAnimation(countryOpen)
	const dateRotate = useArrowAnimation(open)
	useEffect(() => {
		Animated.timing(dropdownAnim, {
			toValue: genderOpen ? 1 : 0,
			duration: 220,
			useNativeDriver: true,
		}).start()
	}, [genderOpen])
	return (
		<LinearGradient colors={['#FFDDEC', '#FFFFFF']} style={styles.background}>
			<View style={styles.topBar}>
				<Pressable onPress={() => router.back()}>
					<Svg width={13} height={17} viewBox='0 0 13 17' fill='none'>
						<Path
							d='M8.67559 16.5239L-0.000413835 8.24392L8.67559 -7.9155e-05H12.8156L4.10359 8.24392L12.8156 16.5239H8.67559Z'
							fill='black'
						/>
					</Svg>
				</Pressable>

				<Text style={styles.headerTitle}>Register your account</Text>

				<View style={{ width: 13 }} />
			</View>

			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			>
				<View style={styles.centerBlock}>
					<View style={styles.inputBlock}>
						<View style={{ alignItems: 'center' }}>
							<View
								style={{
									width: 60,
									height: 60,
									backgroundColor: '#f9f9f9',
									borderRadius: 40,
								}}
							/>
							<Text style={{ fontSize: 12, fontWeight: '600', color: '#000' }}>
								Upload your profile picture
							</Text>
						</View>
						<Text style={styles.label}>Name</Text>
						<View style={styles.inputWrapper}>
							<NameIcon />
							<TextInput
								placeholder='Enter your name'
								placeholderTextColor='#000'
								style={styles.input}
								value={username}
								onChangeText={setUsername}
								editable={!loading}
							/>
						</View>

						{error && <Text style={styles.errorText}>{error}</Text>}

						<RequiredLabel text='Country' />
						<Pressable
							style={styles.inputWrapper}
							onPress={() => setCountryOpen(true)}
						>
							<CountryIcon />
							<Text style={styles.input}>
								{country ? country : 'Select country'}
							</Text>
							<Animated.View style={{ transform: [{ rotate: countryRotate }] }}>
								<ArrowDown />
							</Animated.View>
						</Pressable>

						<RequiredLabel text='Gender' />
						<Pressable
							style={styles.inputWrapper}
							onPress={() => setGenderOpen(true)}
						>
							<GenderIcon />

							<Text style={styles.input}>
								{gender ? gender : 'Select gender'}
							</Text>
							<Animated.View style={{ transform: [{ rotate: genderRotate }] }}>
								<ArrowDown />
							</Animated.View>
						</Pressable>

						<Text style={styles.label}>Date of Birth</Text>
						<Pressable
							style={[styles.inputWrapper, ageError && styles.inputError]}
							onPress={() => setOpen(true)}
						>
							<DateIcon />
							<Text style={styles.input}>
								{date ? formatDate(date) : 'Select date'}
							</Text>
							<Animated.View style={{ transform: [{ rotate: dateRotate }] }}>
								<ArrowDown />
							</Animated.View>
						</Pressable>
						{ageError && <Text style={styles.ageErrorText}>{ageError}</Text>}
					</View>
					<View style={styles.bottomButtonWrapper}>
						<Pressable onPress={handleSubmit} disabled={isButtonDisabled}>
							<View
								style={[
									styles.button,
									isButtonDisabled && styles.buttonDisabled,
								]}
							>
								{loading ? (
									<ActivityIndicator color='#800080' />
								) : (
									<Text style={styles.buttonText}>SUBMIT</Text>
								)}
							</View>
						</Pressable>
					</View>
				</View>

				{genderOpen && (
					<>
						<Pressable
							style={styles.overlay}
							onPress={() => setGenderOpen(false)}
						/>
						<Animated.View
							style={[
								styles.dropdownOverlay,
								{
									backgroundColor: '#fff',
									paddingBottom: 30,
									opacity: dropdownOpacity,
									transform: [{ translateY: dropdownTranslateY }],
								},
							]}
						>
							<GenderDropdown
								value={gender}
								onSelect={v => {
									setGender(v)
									setGenderOpen(false)
								}}
							/>
						</Animated.View>
					</>
				)}
				{open && (
					<DatePicker
						value={date}
						onChange={setDate}
						onClose={() => setOpen(false)}
						isOpen={open}
					/>
				)}
			</KeyboardAvoidingView>
			{/* COUNTRY DROPDOWN */}
			{countryOpen && (
				<>
					<Pressable
						style={styles.overlay}
						onPress={() => setCountryOpen(false)}
					/>

					<Animated.View style={styles.dropdownOverlay}>
						<View style={{ backgroundColor: '#fff', padding: 20 }}>
							{['China', 'Turkey', 'Turkmenistan', 'Russia', 'USA'].map(
								item => (
									<Pressable
										key={item}
										onPress={() => {
											setCountry(item)
											setCountryOpen(false)
										}}
										style={{ paddingVertical: 12 }}
									>
										<Text style={{ fontSize: 16 }}>{item}</Text>
									</Pressable>
								)
							)}
						</View>
					</Animated.View>
				</>
			)}
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
	},

	centerBlock: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 20,
		gap: 20,
		marginTop: 80,
	},
	dropdownOverlay: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 300,
		backgroundColor: '#fff',
		zIndex: 99,
	},

	inputBlock: {
		width: 380,
		gap: 10,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'transparent',
		zIndex: 98,
	},

	inputWrapper: {
		width: 380,
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderColor: '#2CC53E',
		borderRadius: 10,
		fontSize: 16,
		backgroundColor: 'transparent',
	},

	labelRow: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		color: '#000',
	},

	label: {
		fontSize: 14,
		fontWeight: '600',
		color: '#000',
	},

	required: {
		color: 'red',
		fontSize: 14,
		fontWeight: '600',
	},

	note: {
		color: '#000',
		fontSize: 12,
		marginLeft: 4,
		opacity: 0.8,
	},

	input: {
		flex: 1,
		fontSize: 14,
		color: '#000',
		backgroundColor: 'transparent',
	},

	inputIcon: {
		width: 20,
		height: 20,
		marginRight: 5,
	},

	topBar: {
		marginTop: 77,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	headerTitle: {
		fontWeight: '600',
		fontSize: 20,
		color: '#000',
	},
	bottomButtonWrapper: {
		left: 0,
		right: 0,
		alignItems: 'center',
	},

	button: {
		width: 380,
		height: 55,
		borderRadius: 10,
		backgroundColor: '#5F22D9',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},

	buttonDisabled: {
		opacity: 0.6,
	},

	buttonText: {
		fontSize: 16,
		color: '#800080',
	},

	errorText: {
		fontFamily: 'Poppins-Light',
		fontSize: 12,
		color: '#ff6b6b',
		marginTop: 4,
	},

	ageErrorText: {
		fontFamily: 'Poppins-Light',
		fontSize: 12,
		color: '#ff6b6b',
		marginTop: 6,
	},

	inputError: {
		borderColor: '#ff6b6b',
	},

	bottom: {
		paddingBottom: 30,
		alignItems: 'center',
	},

	bottomText: {
		fontSize: 12,
		color: '#fff',
	},
})
