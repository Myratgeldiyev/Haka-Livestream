import * as AuthSession from 'expo-auth-session'
import { Prompt } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

export function useGoogleAuth() {
	const [request, response, promptAsync] = Google.useAuthRequest({
		clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_ID!,

		scopes: ['profile', 'email'],
		prompt: Prompt.SelectAccount,
		redirectUri: AuthSession.makeRedirectUri(),
	})

	return {
		request,
		response,
		signIn: () => promptAsync(),
	}
}
