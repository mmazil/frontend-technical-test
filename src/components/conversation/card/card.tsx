import React, { FC } from 'react'
import Image from 'next/image'
import profileImage from '../../../assets/profile-image.jpeg'
import styles from './card.module.css'
import { Conversation } from '../../../types/conversation'
import Link from 'next/link'

interface Props {
  conversation: Conversation
}

export const Card: FC<Props> = ({ conversation }: Props) => {
  const dateFormat = new Date(conversation.lastMessageTimestamp);

  return (
    <Link href={`/messages/${conversation.id}`}>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image src={profileImage} alt='profile image'/>
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{conversation.recipientNickname}</h3>
          <p className={styles.date}>{dateFormat.toDateString()}</p>
        </div>
      </div>
    </Link>
  )
}