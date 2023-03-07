import React, { FC, useEffect, useState } from "react"
import { Message } from "../../../types/message"
import { Item } from "../item/item"
import { SendMessage } from "../sendMessage/sendMessage"
import styles from './list.module.css'
import { useFetchData } from "../../hooks/useFetchData"
import { Conversation } from "../../../types/conversation"
import { User } from "../../../types/user"

interface Props {
  conversationId: Conversation['id'],
  loggedUserId: User['id']
}

export const List: FC<Props> = ({ conversationId, loggedUserId }: Props) => {
  const messages_url = `http://localhost:3005/messages/${conversationId}`;
  const { data, error } = useFetchData(messages_url);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(data);
  }, [data])

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
      setMessages(prev => [...prev, newMessage]);
    })
    .catch(e => console.log(e.cause))
  }

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <h1>Todo</h1>
      </div>
      {error}
      <div className={styles.messages}>
        {
          !!messages.length 
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