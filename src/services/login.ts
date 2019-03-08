import { CAS_ROUTES } from '../constants'

type Login = {
  login: string
  password: string
}

const createLoginService = request => (credentials: Login) => {
  return request.post(CAS_ROUTES.loginRequest, credentials)
}

export default createLoginService
