import JWT from 'jsonwebtoken'

interface SignOptions {
  algorithms: [string]
}

interface CreateJWTServices {
  publicKey: string
  signOptions: SignOptions
}

const createJWTServices = ({ publicKey, signOptions }: CreateJWTServices) => ({
  verify(token: string): Promise<object> {
    return new Promise((resolve, reject) => {
      JWT.verify(token, publicKey, { algorithms: [signOptions.algorithms] }, (err, decoded) =>
        err ? reject(err) : resolve(decoded),
      )
    })
  },
})

export default createJWTServices