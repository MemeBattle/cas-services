import './scripts/init-partner'
import request from './request'
import { createLoginService, createSignUpService } from './services'

type CreateCasServices = {
  casURI: string
  partnerId: string
}

export const createCasServices = ({ casURI, partnerId }: CreateCasServices) => {
  const baseRequest = request.create({ baseURL: casURI })

  const loginService = createLoginService(baseRequest)

  const signUpService = createSignUpService(baseRequest, partnerId)

  return { loginService, signUpService }
}

export default createCasServices
