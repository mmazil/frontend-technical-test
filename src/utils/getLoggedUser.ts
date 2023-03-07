const db = require(`../server/db.json`)
import type { User } from '../types/user'

// Default way to use a logged user
// Feel free to update the user ID for your tests
// or enhance it with better data source, or better user management
export const getLoggedUserId = (userToken: User['token']): User['id'] => {
  const result = db?.users?.filter(user => user.token == userToken)[0];
  return result?.id || undefined;
}

export const getLoggedUserToken = (nickname: User['nickname']): User['token'] => {
  const result = db?.users?.filter(user => user.nickname === nickname)[0];
  return result?.token || undefined;
}

