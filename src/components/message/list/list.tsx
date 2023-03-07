import React, { FC, useEffect, useState } from "react"
import { Item } from "../item/item"
import { SendMessage } from "../sendMessage/sendMessage"
import styles from './list.module.css'
import { Conversation } from "../../../types/conversation"
import { User } from "../../../types/user"
import { getLoggedUserId } from "../../../utils/getLoggedUser"
import { useQuery } from "react-query"
import { getConversation, getMessages } from "../../api/fetch"

interface Props {
  conversationId: Conversation['id']
}

export const List: FC<Props> = ({ conversationId }: Props) => {
  const [loggedUserId, setLoggedUserId] = useState<User['id']>();

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    setLoggedUserId(getLoggedUserId(token));
  }, [])
  
  const { data: messages, error, isLoading } = useQuery(['messages', conversationId], 
  () => getMessages(conversationId))

  const { data: conversation, error: conversationError, isLoading: conversationLoading } = useQuery(
    ['conversations', conversationId], () => getConversation(conversationId))

  const addNewMessage = (text: string) => {
    const newData = {
      message: text,
      timestamp: Date.now()
    }
    fetch(`http://localhost:3005/messages/${conversationId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData)
    })
    .then(response => {
      if(!response.ok) throw new Error('Error!', { cause: { response } });
      return response.json();
    })
    .then(data => {
      const newMessage = {
        id: data.id,
        body: data.message,
        authorId: loggedUserId,
        conversationId,
        timestamp: data.timestamp
      }
      console.log('newMessage :>> ', newMessage);
    })
    .catch(e => console.log(e.cause))
  }

  if (isLoading) return <>'Loading...'</>
  if (error) return <>'An error has occurred'</>

  let recipientNickname = conversation?.recipientNickname
  if(conversationError) recipientNickname = 'Error'
  if(conversationLoading) recipientNickname = 'Loading ...'

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <h1>{recipientNickname}</h1>
      </div>
      <div className={styles.messages}>
        {
          messages 
          ? messages.map((message, index) => (
            message.authorId !== loggedUserId 
            ? <Item key={index} text={message.body} />
            : <Item key={index} aligned text={message.body} />
          ))
          : <p>No message found</p>
        }
      </div>
      <SendMessage addNewMessage={addNewMessage}/>
    </div>
  )
}