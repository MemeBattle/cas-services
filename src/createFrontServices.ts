import { createBaseRequest } from './request'
import { createLoginService, createSignUpService, createUpdateUserProfileService } from './services'
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

  const updateUserProfileService = createUpdateUserProfileService(baseRequest)

  return { loginService, signUpService, updateUserProfileService }
}
