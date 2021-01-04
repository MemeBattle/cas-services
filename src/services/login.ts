import { CAS_ROUTES } from '../constants'
import { AxiosInstance } from 'axios'

type Login = {
  login: string
  password: string
}

export const createLoginService = (request: AxiosInstance) => (credentials: Login) => {
  return request.post(CAS_ROUTES.loginRequest, credentials)
}

export default createLoginService
