import request from './request'
import { createLoginService, createSignUpService } from './services'

interface CreateCasServices {
  casURI: string
  partnerId: string
}

const createCasServices = ({ casURI, partnerId }: CreateCasServices) => {
  const baseRequest = request.create({ baseURL: casURI })

  const loginService = createLoginService(baseRequest)

  const signUpService = createSignUpService(baseRequest, partnerId)

  return { loginService, signUpService }
}

export default createCasServices
