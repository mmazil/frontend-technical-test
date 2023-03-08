import React, { FC, useEffect, useState } from "react"
import { Item } from "../item/item"
import { SendMessage } from "../sendMessage/sendMessage"
import styles from './list.module.css'
import { Conversation } from "../../../types/conversation"
import { User } from "../../../types/user"
import { getLoggedUserId } from "../../../utils/getLoggedUser"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { addMessage, getConversation, getMessages } from "../../api/calls"
import { useRouter } from "next/router"

interface Props {
  conversationId: Conversation['id']
}

export const List: FC<Props> = ({ conversationId }: Props) => {
  const [loggedUserId, setLoggedUserId] = useState<User['id']>();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if(!token) router.push(`/`);
    setLoggedUserId(getLoggedUserId(token));
  }, [])
  
  const { data: messages, error, isLoading } = useQuery(['messages', conversationId], 
  () => getMessages(conversationId))

  const { data: conversation, error: conversationError, isLoading: conversationLoading } = useQuery(
    ['conversations', conversationId], () => getConversation(conversationId))

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addMessage,
    onSuccess: newMessage => {
      queryClient.setQueryData(['messages', newMessage.id], newMessage)
    }
  })

  const addNewMessage = (text: string) => {
    const data = {
      conversationId: Number(conversationId),
      timestamp: Date.now(),
      authorId: loggedUserId,
      body: text
    }

    mutate({conversationId, data})
  }

  let recipientNickname = conversation?.recipientNickname
  if(conversationError) recipientNickname = 'Error'
  if(conversationLoading) recipientNickname = 'Loading ...'

  return (
    <div className={styles.container}>
      {error && 'Error !'}
      {isLoading && 'Loading ...'}
      <div className={styles.name}>
        {!error && !isLoading && <h1>{recipientNickname}</h1>}
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