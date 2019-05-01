import { restorePassword } from '../'

const stubData = {
  login: 'mew',
}

describe('Restore Password Service', () => {
  test('Should return promise', () => {
    expect(restorePassword({})(stubData) instanceof Promise).toBeTruthy()
  })
})
