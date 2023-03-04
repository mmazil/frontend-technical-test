import React, { FC, useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Message } from "../../../types/message"
import { User } from "../../../types/user"
import { Item } from "../item/item"
import { SendMessage } from "../sendMessage/sendMessage"
import styles from './list.module.css'
import { getLoggedUserId } from "../../../utils/getLoggedUser"

interface Props {
  conversationId: number
}

export const List: FC<Props> = ({ conversationId }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserID] = useState<User['id']>();
  const router = useRouter();

  useEffect(() => {
    if(!localStorage.getItem('userToken')) {
      router.push('/');
    } else {
      setUserID(getLoggedUserId(localStorage.getItem('userToken')))
      fetch(`http://localhost:3005/messages/${conversationId}`)
      .then(response => {
        if(!response.ok) throw new Error('Error!', { cause: { response } });
        return response.json();
      })
      .then(data => {
        setMessages(data);
      })
      .catch(e => console.log(e.cause))
    }    
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <h1>Todo</h1>
      </div>
      <div className={styles.messages}>
        {
          messages.map((message, index) => (
            message.authorId !== userId 
            ? <Item key={index} text={message.body} />
            : <Item key={index} aligned text={message.body} />
          ))
        }
      </div>
      <SendMessage />
    </div>
  )
}