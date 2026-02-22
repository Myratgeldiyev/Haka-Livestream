import type {
	AgencyHostAdmin,
	ApplyForHostRequest,
	CreateAgencyRequest,
} from '@/api/agency-host/agency-host.types'
import { agencyHostApi } from '@/api/agency-host/agency-host.api'
import { create } from 'zustand'

interface AgencyHostState {
	admins: AgencyHostAdmin[]
	isLoading: boolean
	error: string | null
	selectedAdminUserId: number | null
	setSelectedAdminUserId: (userId: number | null) => void
	fetchAdmins: () => Promise<void>
	createAgencyLoading: boolean
	createAgencyError: string | null
	createAgency: (payload: CreateAgencyRequest) => Promise<void>
	requestOtpAgencyLoading: boolean
	requestOtpAgencyError: string | null
	requestOtpAgency: (email: string) => Promise<void>
	applyForHostLoading: boolean
	applyForHostError: string | null
	applyForHost: (payload: ApplyForHostRequest) => Promise<void>
	clearApplyForHostError: () => void
}

export const useAgencyHostStore = create<AgencyHostState>((set) => ({
	admins: [],
	isLoading: false,
	error: null,
	selectedAdminUserId: null,
	setSelectedAdminUserId: (userId) => set({ selectedAdminUserId: userId }),
	createAgencyLoading: false,
	createAgencyError: null,
	requestOtpAgencyLoading: false,
	requestOtpAgencyError: null,
	applyForHostLoading: false,
	applyForHostError: null,

	fetchAdmins: async () => {
		try {
			set({ isLoading: true, error: null })
			const data = await agencyHostApi.getAdmins()
			set({ admins: data, isLoading: false })
		} catch (e: any) {
			set({ error: e?.message ?? 'Failed to fetch admins', isLoading: false })
		}
	},

	createAgency: async (payload: CreateAgencyRequest) => {
		try {
			set({ createAgencyLoading: true, createAgencyError: null })
			await agencyHostApi.createAgency(payload)
			set({ createAgencyLoading: false })
		} catch (e: any) {
			set({
				createAgencyError: e?.message ?? 'Failed to create agency',
				createAgencyLoading: false,
			})
			throw e
		}
	},

	requestOtpAgency: async (email: string) => {
		try {
			set({ requestOtpAgencyLoading: true, requestOtpAgencyError: null })
			await agencyHostApi.requestOtpAgency({ email })
			set({ requestOtpAgencyLoading: false })
		} catch (e: any) {
			set({
				requestOtpAgencyError: e?.message ?? 'Failed to request OTP',
				requestOtpAgencyLoading: false,
			})
			throw e
		}
	},

	applyForHost: async (payload: ApplyForHostRequest) => {
		try {
			set({ applyForHostLoading: true, applyForHostError: null })
			await agencyHostApi.applyForHost(payload)
			set({ applyForHostLoading: false })
		} catch (e: any) {
			const message =
				e?.response?.data?.error ?? e?.message ?? 'Failed to apply for host'
			set({
				applyForHostError: typeof message === 'string' ? message : String(message),
				applyForHostLoading: false,
			})
			throw e
		}
	},

	clearApplyForHostError: () => set({ applyForHostError: null }),
}))
