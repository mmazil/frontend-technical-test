import { FC } from "react";
import styles from './sendMessage.module.css';

export const SendMessage: FC = () => {
  return (
    <div>
      <textarea 
        className={styles.input} 
        placeholder='Send a new message ...' />
    </div>
  )
}