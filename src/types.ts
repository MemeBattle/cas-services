import { VerifyErrors } from 'jsonwebtoken'
import { AxiosRequestConfig } from 'axios'

export type User = {
  activated: boolean
  username: string
  _id: string
  email: string
  avatar?: string
}

export type SuccessAnswer<D> = {
  success: true
  data: D
}

export type ErrorAnswer<E extends string = '', C extends number | string = 500> = {
  success: false
  error: {
    errorCode: C
    errorMessage: E
  }
}

export type SuccessLoginData = { token: string; user: User }

export type SuccessLogin = SuccessAnswer<SuccessLoginData>

export type ErrorLogin = ErrorAnswer<'user not found'>

export type LoginCredentials = {
  login: string
  password: string
}

export type SignUpCredentials = {
  username: string
  password: string
  email: string
}

export type SuccessSignUpData = User & { partnerId: string }

export type SuccessSignUp = SuccessAnswer<SuccessSignUpData>

export type ErrorSignUp = ErrorAnswer

export type RestorePasswordCredentials = {
  login: string
}

export type CreateJWTServices = {
  publicKey: string
}

export type VerifyTokenSuccess = {
  success: true
  data: {
    _id: string
  }
}

export type VerifyTokenError = {
  success: false
  error: VerifyErrors
}

export type SuccessLoggerFunction = (
  status: number,
  data: unknown,
  headers: Record<string, string>,
  config: AxiosRequestConfig,
) => void

export type ErrorLoggerFunction = (error: unknown) => void

export type CreateCasServices = {
  casURI: string
  partnerId: string
  publicKey: string
  successLogger?: SuccessLoggerFunction
  errorLogger?: ErrorLoggerFunction
}

export type CreateFrontServices = {
  casURI: string
  partnerId: string
  successLogger?: SuccessLoggerFunction
  errorLogger?: ErrorLoggerFunction
}

export type SuccessHealthCheck = SuccessAnswer<{ commit: string }>

export type ErrorHealthCheck = ErrorAnswer<''>

export type UpdateUserProfilePayload = {
  username: string
  avatar: File
  userId: string
  token: string
}

export type SuccessUpdateUser = SuccessAnswer<User>

export type ErrorUpdateUser = ErrorAnswer

export type GetMePayload = {
  token?: string
}

export type SuccessGetMe = SuccessAnswer<User>

export type ErrorGetMe = ErrorAnswer<'user not found', 400> | ErrorAnswer<'forbidden', 403>
