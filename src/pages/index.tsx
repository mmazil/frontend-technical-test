import { ReactElement } from 'react'
import { List } from '../components/conversation';
import { getLoggedUserId } from '../utils/getLoggedUserId'

const Home = ():ReactElement => {
  const loggedUserId = getLoggedUserId();

  return (
    <List loggedUserId={loggedUserId}/>
  )
}

export default Home