import { CAS_ROUTES } from '../constants'
import { AxiosInstance } from 'axios'

export type SignUpPayload = {
  username: string
  password: string
  email: string
}

export type SignUpResponse =
  | {
      success: true
      data: {
        activated: boolean
        username: string
        _id: string
        email: string
        partnerId: string
      }
    }
  | { success: false }

const createSignUpService = (request: AxiosInstance, partnerId: string) => (
  payload: SignUpPayload,
) => request.post<SignUpResponse>(CAS_ROUTES.emailSignUp, { ...payload, partnerId })

export default createSignUpService
