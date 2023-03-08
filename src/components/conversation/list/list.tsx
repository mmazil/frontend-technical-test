import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { User } from '../../../types/user'
import { getLoggedUserId } from '../../../utils/getLoggedUser'
import { getConversations } from '../../api/calls'
import { Card } from '../card/card'
import { NewConversation } from '../newConversation/newConversation'
import styles from './list.module.css'

export const List: FC = () => {
  const [userToken, setUserToken] = useState<User['token']>();
  const [loggedUserId, setLoggedUserId] = useState<User['id']>();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if(!token) router.push(`/`);
    setUserToken(token);
    setLoggedUserId(getLoggedUserId(token));
  }, [])

  const { data: conversations, error, isLoading } = useQuery(['conversations', loggedUserId], 
  () => getConversations(loggedUserId, userToken))

  return (
    <div className={styles.container}>
      {error && 'Error !'}
      {isLoading && 'Loading ...'}
      {!error && !isLoading && <h1>Chats</h1>}
      {
        conversations && conversations.map((conv, index) => <Card key={index} conversation={conv}/>)
      }

      <NewConversation loggedUserId={loggedUserId}/>
    </div>
  )
}