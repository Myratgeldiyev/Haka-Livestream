import { apiClient } from '../axios'
import { ENDPOINTS } from '../endpoints'
import type {
	AgencyHostAdmin,
	ApplyForHostRequest,
	CreateAgencyRequest,
	RequestOtpAgencyRequest,
} from './agency-host.types'

export const agencyHostApi = {
	getAdmins: async (): Promise<AgencyHostAdmin[]> => {
		const response = await apiClient.get<AgencyHostAdmin[]>(
			ENDPOINTS.AGENCY_HOST.GET_ADMINS,
		)
		return response.data
	},

	createAgency: async (payload: CreateAgencyRequest): Promise<void> => {
		console.log('createAgency request', payload)
		const response = await apiClient.post(ENDPOINTS.AGENCY_HOST.CREATE_AGENCY, payload)
		console.log('createAgency response', response.data)
	},

	requestOtpAgency: async (payload: RequestOtpAgencyRequest): Promise<void> => {
		console.log('requestOtpAgency request', payload)
		const response = await apiClient.post(ENDPOINTS.AGENCY_HOST.REQUEST_OTP, payload)
		console.log('requestOtpAgency response', response.data)
	},

	applyForHost: async (payload: ApplyForHostRequest): Promise<void> => {
		await apiClient.post(ENDPOINTS.AGENCY_HOST.APPLY_HOST, payload)
	},
}
