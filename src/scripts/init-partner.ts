import * as fs from 'fs'
import axios from 'axios'
import * as readline from 'readline'
import chalk from 'chalk'
import * as chalkAnimation from 'chalk-animation'

const tokenHard =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzM4ZjZlZTMxZDRjMjAxOTMxZDgyOTgiLCJwZXJtaXNzaW9ucyI6eyJDQVMiOlsiZnVsbCJdfSwiaWF0IjoxNTUwODU5NTc2LCJleHAiOjE1NTEwMzIzNzZ9.oJIDxxwlan0r1tolRRvDPCaNIMFeohjzC-d3-n6HogcC9OP4WCL4ELs6tkSIfdf-pfd0CDOp3xN5z3i6BX8K8DtI36tyXbOV3GQHq39Q-ZeoCRPWEpEqOmQVXQz0tUFSmJ2pfxdrzkr69sQ2mnIPuE_xXf8AFKc_cPOY5mfIlOT35c6my9YDG1r_Dp7y5aAa4D8BkNSCiIZK0oEtH-AfEFbpByP3Q6IbbLyIFizWhrL6MP2LUeTTSjktMGqLfMm_t7qFJXvIurLrIGH1y5afLlYJxHUoHJRYpyLEBoUtVq3TrDP9n3330uHUBKmcPtLviL12_xirY8atCnzMg8aF9w'
const CAS_BASE_URI = 'https://cas.mems.fun'
const DEFAULT_KEY_PATH = './key.pem'

const createCasRoutes = (casURI = CAS_BASE_URI) => ({
  createPartner: `${casURI}/partners`,
  loginRequest: `${casURI}/auth/login`,
  getPartnerKey: partnerId => `${casURI}/partners/${partnerId}/key`,
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const styles = {
  defaultString: chalk.underline.blue,
  endLine: chalk.underline.bold.yellow,
  helper: chalk.underline.gray,
  success: chalk.green.bold,
}

function decorateObjectMethods<O>(obj: O, decorator: (func: () => Promise<void>) => () => void): O {
  return Object.entries(obj).reduce(
    (decoratedObject: O, [key, prop]): O => ({ ...decoratedObject, [key]: decorator(prop) }),
    {} as O,
  )
}

const createQuestion = (questionText: string, defaultValue: string = ''): Promise<string> =>
  new Promise(resolve =>
    rl.question(questionText, answer => {
      resolve(answer || defaultValue)
    }),
  )

const checkNotEmptyString = (inputString: string, errorMessage: string = ''): boolean => {
  if (!inputString.length && errorMessage) {
    throw new Error(errorMessage)
  }
  return inputString.length > 0
}

type ShowLoader = (func: (...rest: any[]) => Promise<any>) => () => void

const showLoader: ShowLoader = asyncFunc => async (...args) => {
  const loader = chalkAnimation.rainbow('Wait CAS answer...')
  const answer = await asyncFunc(...args)
  loader.stop()
  return answer
}

interface Credentials {
  login: string
  password: string
}

interface CreatePartner {
  email: string
  password: string
  username: string
}

interface User {
  username: string
  email: string
  token: string
  _id: string
}

interface SuccessAnswer {
  success: true
}

interface UserAnswer extends SuccessAnswer {
  user: User
  token: string
}

const createRequests = CAS_URI => {
  const CAS_ROUTES = createCasRoutes(CAS_URI)

  return {
    loginRequest: async (credentials: Credentials): Promise<UserAnswer> => {
      const answer = await axios.post(CAS_ROUTES.loginRequest, credentials)
      return answer.data.data
    },

    createPartner: async (userData: CreatePartner, token: string): Promise<UserAnswer> => {
      const answer = await axios.post(CAS_ROUTES.createPartner, userData, {
        headers: { Authorization: token },
      })
      return answer.data.data
    },

    getKey: async (partnerId: string, token: string): Promise<string> => {
      const answer = await axios.get(CAS_ROUTES.getPartnerKey(partnerId), {
        headers: { Authorization: token },
      })
      return answer.data
    },
  }
}

const partnerSignUp = async (user, createPartner, token): Promise<string> => {
  const partnerUsername = await createQuestion(
    `Partner username (${styles.defaultString(user.username)}): `,
    user.username,
  )
  checkNotEmptyString(partnerUsername, 'Username must be not empty')

  const partnerEmail = await createQuestion(`Partner email (${styles.defaultString(user.email)}): `)
  checkNotEmptyString(partnerUsername, 'Partner email must be not empty')

  const partnerPassword = await createQuestion(`Partner password: `)
  checkNotEmptyString(partnerUsername, 'Password must be not empty')

  const answer = await createPartner(
    {
      email: partnerEmail,
      username: partnerUsername,
      password: partnerPassword,
    },
    token,
  )

  return answer._id
}

const initPartner = async () => {
  try {
    const CAS_URI = await createQuestion(
      `CAS uri (${styles.defaultString(CAS_BASE_URI)}): `,
      CAS_BASE_URI,
    )

    const { loginRequest, createPartner, getKey } = decorateObjectMethods(
      createRequests(CAS_URI),
      showLoader,
    )

    const username = await createQuestion(`username: `)
    checkNotEmptyString(username, 'Username must be not empty')

    const password = await createQuestion('password: ')
    checkNotEmptyString(password, 'Password must be not empty')

    const { token, user } = await loginRequest({ login: username, password })

    console.log(styles.success(`Hello, ${user.username}`)) // tslint:disable-line:no-console

    const partnerId = await createQuestion(
      `partnerId (${styles.helper('blank field to create new')}): `,
    )

    const newPartnerId = (partnerId as string) || (await partnerSignUp(user, createPartner, token))

    const key = await getKey(newPartnerId, token)

    console.log('key: ', key) // tslint:disable-line:no-console

    const keyPath = await createQuestion(
      `Path to save a key (${styles.defaultString(DEFAULT_KEY_PATH)}): `,
      DEFAULT_KEY_PATH,
    )

    fs.writeFileSync(keyPath, key, { flag: 'w+' })
  } catch (e) {
    console.error(e) // tslint:disable-line:no-console
  } finally {
    console.log(styles.endLine('Good luck :)') + '\n') // tslint:disable-line:no-console
    rl.close()
  }
}

initPartner()
