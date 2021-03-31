import { AxiosInstance } from 'axios'

type RestorePasswordPayload = {
  login: string
}

export const restorePassword = (request: AxiosInstance) => (payload: RestorePasswordPayload) =>
  new Promise(() => {})
