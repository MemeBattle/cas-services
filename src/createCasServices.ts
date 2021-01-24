import request from './request'
import { createLoginService, createSignUpService } from './services'
import { createJWTServices } from './jwt'
import { CreateCasServices } from './types'

export const createCasServices = ({
  casURI,
  partnerId,
  publicKey,
  successLogger,
  errorLogger,
}: CreateCasServices) => {
  const baseRequest = request.create({
    baseURL: casURI,
    validateStatus: status => status >= 200 && status < 500,
  })
  baseRequest.interceptors.response.use(
    response => {
      if (successLogger) {
        successLogger(response.status, response.data, response.headers, response.config)
      }
      return response.data
    },
    error => {
      if (errorLogger) {
        errorLogger(error)
      }
      return { success: false, error: error.toJSON(), errorCode: error.code || 500 }
    },
  )

  const loginService = createLoginService(baseRequest)

  const signUpService = createSignUpService(baseRequest, partnerId)

  const { verifyToken } = createJWTServices({ publicKey })

  return { loginService, signUpService, verifyToken }
}
