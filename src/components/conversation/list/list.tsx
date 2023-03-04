import React, { FC, useEffect, useState } from 'react'
import { Conversation } from '../../../types/conversation'
import { Card } from '../card/card'
import styles from './list.module.css'

interface Props {
  loggedUserId: number
}

export const List: FC<Props> = ({ loggedUserId }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  useEffect(() => {
    fetch(`http://localhost:3005/conversations/${loggedUserId}`)
    .then(response => {
      if(!response.ok) throw new Error('Error!', { cause: { response } });
      return response.json();
    })
    .then(data => {
      setConversations(data);
    })
    .catch(e => console.log(e.cause))
  }, [])

  return (
    <div className={styles.container}>
      <h1>Chats</h1>
      {
        conversations.map((conversation, index) => <Card key={index} conversation={conversation}/>)
      }
    </div>
  )
}