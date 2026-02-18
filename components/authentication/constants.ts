export const AUTHENTICATION = {
	headerTitle: 'Authentication',

	// Section: My Authentication
	myAuthTitle: 'My Authentication',
	myAuthDescription:
		'In order to ensure the property safety of your account and others, we recommend you to authenticate',

	// Method cards
	faceAuth: {
		title: 'Face Authentication',
		description: 'Please complete authentication process',
		buttonLabel: 'Certified',
	},
	bindPhone: {
		title: 'Bind Phone',
		description: 'Bind your phone to secure your account',
		buttonLabel: 'Bind',
	},
	bindEmail: {
		title: 'Bind Email',
		description: 'Bind your Email to secure your account',
		buttonLabel: 'Bind',
	},

	// Colors
	primary: '#8A4ED9',
	primaryButtonText: '#fff',
	screenBg: '#F5F5F5',
	cardBg: '#fff',
	cardShadow: '#00000014',
	shieldGreen: '#22C55E',
	textPrimary: '#000',
	textSecondary: '#000',

	// Layout (use with spacing/typography for responsiveness)
	cardRadius: 16,
	iconBoxSize: 48,
	iconBoxRadius: 16,
	buttonRadius: 18,
	buttonPaddingH: 10,
	buttonPaddingV: 3,
} as const

// Face Auth (upload photo / certify) screen
export const FACE_AUTH = {
	headerTitle: 'Authentication',
	uploadInstruction: 'Please upload a clear photo of yourself first',
	tips: [
		{ iconKey: 'eye', label: 'Avoid cover' },
		{ iconKey: 'light', label: 'Keep enough light' },
		{ iconKey: 'minor', label: 'Minors are prohibited' },
	] as const,
	uploadButtonLabel: 'Upload a photo of yourself',
	startCertifyButtonLabel: 'Start to certificate',
	stepCount: 3,
	photoPlaceholderSize: 200,
	tipIconCircleSize: 48,
	tipIconSize: 24,
	buttonBorderWidth: 2,
} as const

export const FACE_AUTH_SUCCESS = {
	successTitle: 'Authentication success',
	successSubtitle:
		'Congratulations! Face authentication has been approved',
	imagePlaceholderLabel: 'Image',
	checkmarkCircleSize: 32,
	innerImageSize: 120,
} as const

export const BIND_PHONE = {
	headerTitle: 'Bind a phone',
	label: 'Phone Number',
	placeholder: 'Please enter your phone number',
	nextButtonLabel: 'Next',
	bgGradientStart: '#5F25AF',
	bgGradientEnd: '#6A5ACD',
	patternColor: 'rgba(138, 43, 226, 0.35)',
	cardRadius: 24,
	inputBorderColor: '#8A4ED9',
	buttonBg: '#5F25AF',
	headerTextColor: '#FFFFFF',
	labelColor: '#000000',
	placeholderColor: '#A9A9A9',
} as const

export const BIND_EMAIL = {
	headerTitle: 'Bind an email',
	label: 'Email',
	placeholder: 'Please enter your email',
	nextButtonLabel: 'Next',
	bgGradientStart: '#5F25AF',
	bgGradientEnd: '#6A5ACD',
	patternColor: 'rgba(138, 43, 226, 0.35)',
	cardRadius: 24,
	inputBorderColor: '#8A4ED9',
	buttonBg: '#5F25AF',
	headerTextColor: '#FFFFFF',
	labelColor: '#000000',
	placeholderColor: '#A9A9A9',
} as const
