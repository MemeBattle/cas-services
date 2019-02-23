import * as fs from 'fs'
import axios from 'axios'
import * as readline from 'readline'
import chalk from 'chalk'

const CAS_BASE_URI = 'https://cas.mems.fun'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const styles = {
  defaultString: chalk.underline.blue,
  endLine: chalk.underline.bold.yellow,
}

const createQuestion = (questionText: string, defaultValue: string = ''): Promise<string> =>
  new Promise(resolve =>
    rl.question(questionText, answer => {
      resolve(answer || defaultValue)
    }),
  )

const checkNotEmptyString = (inputString: string): boolean => {
  return inputString.length > 0
}

const initPartner = async () => {
  try {
    const CAS_URI = await createQuestion(
      `CAS uri: ${styles.defaultString(CAS_BASE_URI)}`,
      CAS_BASE_URI,
    )
    const login = await createQuestion(`login: `)
    if (!checkNotEmptyString(login)) {
      throw Error('Login must be not empty')
    }
    const password = await createQuestion('password: ')
    if (!checkNotEmptyString(password)) {
      throw Error('Password must be not empty')
    }
    const partnerId = await createQuestion('passwordId: ')
  } catch (e) {
    console.error(e) // tslint:disable-line:no-console
  } finally {
    console.log(styles.endLine`Good buy :)`) // tslint:disable-line:no-console
    rl.close()
  }
}

initPartner()
