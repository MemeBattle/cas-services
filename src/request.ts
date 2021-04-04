import axios from 'axios'
import { ErrorLoggerFunction, SuccessLoggerFunction } from './types'

export const createBaseRequest = ({
  casURI,
  errorLogger,
  successLogger,
}: {
  casURI: string
  successLogger?: SuccessLoggerFunction
  errorLogger?: ErrorLoggerFunction
}) => {
  const baseRequest = axios.create({
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
  return baseRequest
}
