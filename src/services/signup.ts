import { CAS_ROUTES } from '../constants'

const createSignUpService = (request, partnerId) => payload =>
  request.post(CAS_ROUTES.emailSignUp, { ...payload, partnerId })

export default createSignUpService
