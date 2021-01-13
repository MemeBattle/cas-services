import { CAS_ROUTES } from '../constants'
import { AxiosInstance } from 'axios'
import { SignUpCredentials, SuccessSignUp, ErrorSignUp } from '../types'

const createSignUpService = (request: AxiosInstance, partnerId: string) => (
  payload: SignUpCredentials,
) =>
  request.post<SuccessSignUp | ErrorSignUp, SuccessSignUp | ErrorSignUp>(CAS_ROUTES.emailSignUp, {
    ...payload,
    partnerId,
  })

export default createSignUpService
