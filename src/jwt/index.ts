import { verify } from 'jsonwebtoken'
import { CreateJWTServices, VerifyTokenSuccess, VerifyTokenError } from '../types'

export const createJWTServices = ({ publicKey }: CreateJWTServices) => ({
  verifyToken(token: string): Promise<VerifyTokenSuccess | VerifyTokenError> {
    return new Promise((resolve, reject) => {
      verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded: { _id: string }) =>
        err ? reject({ success: false, error: err }) : resolve({ success: true, data: decoded }),
      )
    })
  },
})
