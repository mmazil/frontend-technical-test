import { FC, useState } from "react";
import styles from './sendMessage.module.css';

interface Props {
  addNewMessage: (text: string) => void
}

export const SendMessage: FC<Props> = ({ addNewMessage }: Props) => {
  const [message, setMessage] = useState();

  const handleTextArea = e => setMessage(e.target.value);

  const handleSendMessage = () => addNewMessage(message);

  return (
    <div>
      <textarea 
        className={styles.input} 
        placeholder='Send a new message ...' 
        onChange={handleTextArea}
        />
        <button className={styles.button} onClick={handleSendMessage}>Send Message</button>
    </div>
  )
}