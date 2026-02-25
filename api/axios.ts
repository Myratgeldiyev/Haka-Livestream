import axios, {
	AxiosError,
	AxiosHeaders,
	AxiosInstance,
	InternalAxiosRequestConfig,
} from 'axios'
import { tokenService } from '../services/token.service'
import { API_CONFIG } from './endpoints'

let memoryToken: string | null = null

export const setAuthToken = (token: string | null) => {
	memoryToken = token
}

export const getAuthToken = () => memoryToken

export const initializeAuth = async (): Promise<string | null> => {
	const token = await tokenService.getToken()
	if (token) {
		memoryToken = token
	}
	return token
}

const createAxiosInstance = (): AxiosInstance => {
	const instance = axios.create({
		baseURL: API_CONFIG.BASE_URL,
		timeout: API_CONFIG.TIMEOUT,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})

	instance.interceptors.request.use(
		async (config: InternalAxiosRequestConfig) => {
			// Avoid double slash: baseURL ends with / and url starts with /
			const baseURL = config.baseURL ?? ''
			const url = config.url ?? ''
			if (baseURL.endsWith('/') && url.startsWith('/')) {
				config.url = url.replace(/^\/+/, '')
			}

			const token = memoryToken ?? (await tokenService.getToken())

			if (token) {
				if (!(config.headers instanceof AxiosHeaders)) {
					config.headers = new AxiosHeaders(config.headers)
				}

				config.headers.set('Authorization', `Bearer ${token}`)
			}

			return config
		},
		(error: AxiosError) => Promise.reject(error)
	)

	instance.interceptors.response.use(
		response => response,
		async (error: AxiosError) => {
			const status = error.response?.status
			const baseURL = error.config?.baseURL ?? ''
			const url = error.config?.url ?? ''
			const method = (error.config?.method ?? 'GET').toUpperCase()
			const fullURL = `${baseURL.replace(/\/+$/, '')}/${url.replace(/^\//, '')}`

			if (status === 404) {
				console.error('[API] 404 ERROR:', {
					method,
					fullURL,
					status,
					statusText: error.response?.statusText,
					data: error.response?.data,
				})
			}
			if (status === 500) {
				const hasAuth = !!error.config?.headers?.Authorization
				console.error('[API] 500 ERROR:', {
					method,
					fullURL,
					status,
					statusText: error.response?.statusText,
					data: error.response?.data,
					requestHeaders: {
						Accept: error.config?.headers?.Accept,
						'Content-Type': error.config?.headers?.['Content-Type'],
						Authorization: hasAuth ? 'Bearer ***' : undefined,
					},
				})
			}
			if (status === 401) {
				memoryToken = null
				await tokenService.clearAuth()
			}
			return Promise.reject(error)
		}
	)

	return instance
}

export const apiClient = createAxiosInstance()
