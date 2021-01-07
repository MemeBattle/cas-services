import request from './request'
import { createJWTServices } from './jwt'
import { createLoginService, createSignUpService } from './services'
export * from './types'

type CreateCasServices = {
  casURI: string
  partnerId: string
  publicKey: string
}

export const createCasServices = ({ casURI, partnerId, publicKey }: CreateCasServices) => {
  const baseRequest = request.create({ baseURL: casURI })

  const loginService = createLoginService(baseRequest)

  const signUpService = createSignUpService(baseRequest, partnerId)

  const { verifyToken } = createJWTServices({ publicKey })

  return { loginService, signUpService, verifyToken }
}

export default createCasServices
