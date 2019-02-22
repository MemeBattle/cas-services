import axios from 'axios'
import { createLoginService, createSignUpService } from './services'

interface CreateCasServices {
  casURI: string
  partnerId: string
}

const createCasServices = ({ casURI, partnerId }: CreateCasServices) => {
  const baseRequest = axios.create({ baseURL: casURI })

  const loginService = createLoginService(baseRequest)

  const signUpService = createSignUpService(baseRequest, partnerId)

  return { loginService, signUpService }
}

export { createCasServices }
