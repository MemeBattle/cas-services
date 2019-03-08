declare type Login = {
  login: string
  password: string
}
declare const createLoginService: (request: any) => (credentials: Login) => any
export default createLoginService
