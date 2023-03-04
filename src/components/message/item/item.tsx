import React, { FC } from "react"
import styles from './item.module.css'

interface Props {
  aligned?: boolean,
  text: string
}

export const Item: FC<Props> = ({ aligned, text }: Props) => {
    return (
      <div className={`${styles.message} ${aligned && styles.sent}`}>
        <span>{text}</span>
      </div>
    )
}