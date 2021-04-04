import { createBaseRequest } from './request'
import { createLoginService, createSignUpService } from './services'
import { CreateFrontServices } from './types'

export const createFrontServices = ({
  casURI,
  partnerId,
  successLogger,
  errorLogger,
}: CreateFrontServices) => {
  const baseRequest = createBaseRequest({ casURI, successLogger, errorLogger })

  const loginService = createLoginService(baseRequest)

  const signUpService = createSignUpService(baseRequest, partnerId)

  return { loginService, signUpService }
}
