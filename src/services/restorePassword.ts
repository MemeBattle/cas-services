import { AxiosInstance } from 'axios'

type RestorePasswordPayload = {
  login: string
}

const restorePassword = (request: AxiosInstance) => (payload: RestorePasswordPayload) =>
  new Promise(() => {})

export default restorePassword
