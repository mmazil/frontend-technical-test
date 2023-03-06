import React, { FC, useEffect, useState } from 'react'
import { Conversation } from '../../../types/conversation'
import { useFetchData } from '../../hooks/useFetchData'
import { Card } from '../card/card'
import styles from './list.module.css'

interface Props {
  loggedUserId: number
}

export const List: FC<Props> = ({ loggedUserId }) => {
  const url = `http://localhost:3005/conversations/${loggedUserId}`;
  const { data, error } = useFetchData(url);

  return (
    <div className={styles.container}>
      <h1>Chats</h1>
      {error}
      {
        !!data.length 
        ? data.map((conv, index) => <Card key={index} conversation={conv}/>)
        : <p>No Conversation Found</p>
      }
    </div>
  )
}