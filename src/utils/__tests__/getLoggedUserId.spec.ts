import { getLoggedUserId } from '../getLoggedUser'

describe('getLoggedUserId', () => {
  it('should return logged user id', () => {
    const userToken = '456'
    const expected = 1

    expect(getLoggedUserId(userToken)).toEqual(expected)
  })
})