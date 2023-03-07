import React, { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { User } from '../../../types/user'
import { getLoggedUserId } from '../../../utils/getLoggedUser'
import { Card } from '../card/card'
import styles from './list.module.css'

export const List: FC = () => {
  const [userToken, setUserToken] = useState<User['token']>();
  const [loggedUserId, setLoggedUserId] = useState<User['id']>();

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    setUserToken(token);
    setLoggedUserId(getLoggedUserId(token));
  }, [])

  const url = `http://localhost:3005/conversations/${loggedUserId}`;
  
  const fetchConversations = fetch(url, { 
    headers: { 'Authorization': userToken }
  }).then(res => res.json());

  const { data=[], error, isLoading } = useQuery(['conversations', loggedUserId], 
  () => fetchConversations)

  if (isLoading) return 'Loading...'
 
  if (error) return 'An error has occurred'

  return (
    <div className={styles.container}>
      <h1>Chats</h1>
      {
        !!data.length 
        ? data.map((conv, index) => <Card key={index} conversation={conv}/>)
        : <p>No Conversation Found</p>
      }
    </div>
  )
}