import { truncate } from 'fs'
import { VerifyErrors } from 'jsonwebtoken'

export type User = {
  activated: boolean
  username: string
  _id: string
  email: string
}

export type SuccessAnswer<D> = {
  success: true
  data: D
}

export type ErrorAnswer<E extends string = ''> = {
  success: false
  error: {
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
