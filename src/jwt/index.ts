import { verify } from 'jsonwebtoken'

type CreateJWTServices = {
  publicKey: string
}

export const createJWTServices = ({ publicKey }: CreateJWTServices) => ({
  verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) =>
        err ? reject(err) : resolve(decoded),
      )
    })
  },
})
