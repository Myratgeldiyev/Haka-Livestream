export const ROUTES = {
	AUTH: {
		SIGN_UP: '/(auth)/sign-up',
		LOGIN_PHONE: '/(auth)/login-phone',
		PHONE_VERIFICATION: '/(auth)/phone-verification',
		REGISTER: '/(auth)/register',
	},
	TABS: {
		LIVE: '/(tabs)/live',
		GAME: '/(tabs)/game',
		PARTY: '/(tabs)/party',
		MESSAGES: '/(tabs)/messages',
		PROFILE: '/(tabs)/profile',
	},
	ONBOARDING: '/onboarding',
} as const

export type AppRoute =
	| typeof ROUTES.AUTH[keyof typeof ROUTES.AUTH]
	| typeof ROUTES.TABS[keyof typeof ROUTES.TABS]
	| typeof ROUTES.ONBOARDING
