import { ReactElement} from 'react'
import { List } from '../components/conversation'
import { Login } from '../components/login/login'
import { getLoggedUserId } from '../utils/getLoggedUser'

const Home = ():ReactElement => {
  const loggedUserId = getLoggedUserId()

  return (
    <List loggedUserId={loggedUserId}/>
  )
}

export default Home