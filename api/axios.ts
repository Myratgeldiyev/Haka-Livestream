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
			if (error.response?.status === 404) {
				const baseURL = error.config?.baseURL || 'N/A'
				const url = error.config?.url || 'N/A'
				const method = error.config?.method?.toUpperCase() || 'N/A'
				const fullURL = `${baseURL}${url}`
				console.error('404 ERROR:', {
					method,
					baseURL,
					url,
					fullURL,
					status: error.response.status,
					statusText: error.response.statusText,
					data: error.response.data,
				})
			}
			if (error.response?.status === 401) {
				memoryToken = null
				await tokenService.clearAuth()
			}
			return Promise.reject(error)
		}
	)

	return instance
}

export const apiClient = createAxiosInstance()
