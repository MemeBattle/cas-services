import JWT from 'jsonwebtoken'

type SignOptions = {
  algorithms: [string]
}

type CreateJWTServices = {
  publicKey: string
  signOptions: SignOptions
}

const createJWTServices = ({ publicKey, signOptions }: CreateJWTServices) => ({
  verify(token: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      JWT.verify(token, publicKey, { algorithms: [signOptions.algorithms] }, (err, decoded) =>
        err ? reject(err) : resolve(decoded),
      )
    })
  },
})

export default createJWTServices
