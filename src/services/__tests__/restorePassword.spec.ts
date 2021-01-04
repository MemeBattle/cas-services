import { restorePassword } from '../'
import { AxiosInstance } from 'axios'

const stubData = {
  login: 'mew',
}

describe('Restore Password Service', () => {
  test('Should return promise', () => {
    expect(restorePassword({} as AxiosInstance)(stubData) instanceof Promise).toBeTruthy()
  })
})
