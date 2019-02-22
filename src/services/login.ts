import { CAS_ROUTES } from '../constants'

interface Login {
  login: string
  password: string
}

const createLoginService = request => (credentials: Login) => {
  return request.post(CAS_ROUTES, credentials)
}

export default createLoginService
