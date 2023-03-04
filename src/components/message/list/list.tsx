import React, { FC, useEffect, useState } from "react"
import { Message } from "../../../types/message"
import { Item } from "../item/item"
import styles from './list.module.css'

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

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <h1>Mohammed</h1>
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
    </div>
  )
}