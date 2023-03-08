import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "../../../types/user";
import { getConversations, getUsers, newConversation } from "../../api/calls";
import styles from './newConversation.module.css';

interface Props {
  loggedUserId: User['id']
}

export const NewConversation: FC<Props> = ({ loggedUserId }: Props) => {
  const [userToken, setUserToken] = useState<User['token']>();
  const [recipientId, setRecipientId] = useState<User['id']>();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if(!token) router.push(`/`);
    setUserToken(token);
  }, [])

  const { data: users, error, isLoading } = useQuery(['users'], 
  () => getUsers())
  
  
  const { mutate } = useMutation({
    mutationFn: newConversation,
    onSuccess: newConv => {
      queryClient.setQueryData(['conversations', newConv.id], newConv)
      router.push(`/messages/${newConv.id}`)
    }
  })

  const { data: conversations } = useQuery(['conversations', loggedUserId],  
  () => getConversations(loggedUserId, userToken))

  const handleSelectUser = e => setRecipientId(e.target.value);
  const handleNewConversation = () => {
    const conversation = conversations.filter(conv => conv.recipientId == recipientId)[0]
    if(conversation) {
      router.push(`/messages/${conversation.id}`)
    } else {
      const recipientNickname = users.filter(user => user.id == recipientId)[0]?.nickname || ''
      const senderNickname = users.filter(user => user.id == loggedUserId)[0]?.nickname || ''
  
      const data = {
        recipientId: Number(recipientId),
        recipientNickname: recipientNickname,
        senderId: loggedUserId,
        senderNickname: senderNickname,
        lastMessageTimestamp: Date.now()
      }
  
      mutate({userId: loggedUserId, data})
    }
 
  }

  return (
    <div className={styles.container}>
      {error && 'Error !'}
      {isLoading && 'Loading ...'}
      {!error && !isLoading && <h1>New Conversation</h1>}
      <div>
        <select className={styles.select} onChange={handleSelectUser}>
          <option disabled selected></option>
          {
            users && users.map((user, index) => 
            <option key={index} value={user.id}>{user.nickname}</option>)
          }
        </select>
      </div>
      <div>
        <button className={styles.button} onClick={handleNewConversation} disabled={!recipientId}>Create Conversation</button>
      </div>
    </div>
  )
}