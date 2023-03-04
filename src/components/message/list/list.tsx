import React, { FC, useEffect, useState } from "react"
import { Message } from "../../../types/message"
import { Item } from "../item/item"
import { SendMessage } from "../sendMessage/sendMessage"
import styles from './list.module.css'
import { getLoggedUserId } from "../../../utils/getLoggedUser"
import { User } from "../../../types/user"

interface Props {
  conversationId: number,
  loggedUserId: number
}

export const List: FC<Props> = ({ conversationId, loggedUserId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {    
    fetch(`http://localhost:3005/messages/${conversationId}`)
    .then(response => {
      if(!response.ok) throw new Error('Error!', { cause: { response } });
      return response.json();
    })
    .then(data => {
      setMessages(data);
    })
    .catch(e => console.log(e.cause))
  }, [])

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
      setMessages([...messages, newMessage])
    })
    .catch(e => console.log(e.cause))
  }

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <h1>Todo</h1>
      </div>
      <div className={styles.messages}>
        {
          messages.map((message, index) => (
            message.authorId !== loggedUserId 
            ? <Item key={index} text={message.body} />
            : <Item key={index} aligned text={message.body} />
          ))
        }
      </div>
      <SendMessage addNewMessage={addNewMessage}/>
    </div>
  )
}