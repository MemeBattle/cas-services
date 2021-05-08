import { AxiosInstance } from 'axios'
import { CAS_ROUTES } from '../constants'
import { SuccessGetUsers, GetUsersPayload } from '../types'

export const createGetUsersService = (request: AxiosInstance) => (params?: GetUsersPayload) => {
  return request.get<SuccessGetUsers, SuccessGetUsers>(`${CAS_ROUTES.users}`, {
    params,
  })
}
