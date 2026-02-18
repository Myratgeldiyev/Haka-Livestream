import { router } from 'expo-router'
import { ROUTES } from '../constants/routes'

export const navigationService = {
	handlePostOtpRequest(isNewUser: boolean | undefined): void {
		if (isNewUser === false) {
			router.replace(ROUTES.TABS.LIVE)
		} else {
			router.push(ROUTES.AUTH.PHONE_VERIFICATION)
		}
	},

	handlePostOtpVerify(isNewUser: boolean): void {
		if (isNewUser) {
			router.replace(ROUTES.AUTH.REGISTER)
		} else {
			router.replace(ROUTES.TABS.LIVE)
		}
	},

	handlePostSignup(): void {
		router.replace(ROUTES.TABS.LIVE)
	},

	goToSignUp(): void {
		router.replace(ROUTES.AUTH.SIGN_UP)
	},

	goToLive(): void {
		router.replace(ROUTES.TABS.LIVE)
	},

	goToRegister(): void {
		router.replace(ROUTES.AUTH.REGISTER)
	},

	goToOnboarding(): void {
		router.replace(ROUTES.ONBOARDING)
	},
}
