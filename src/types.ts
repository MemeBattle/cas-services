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

export type SuccessLogin = SuccessAnswer<{ token: string; user: User }>

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

export type SuccessSignUp = SuccessAnswer<User & { partnerId: string }>

export type ErrorSignUp = ErrorAnswer

export type RestorePasswordCredentials = {
  login: string
}
