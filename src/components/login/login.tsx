import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import { getLoggedUserToken } from '../../utils/getLoggedUser'
import styles from './login.module.css'
import { User } from '../../types/user'

export const Login = ():ReactElement => {
  const router = useRouter();
  const [nickname, setNickname] = useState<User['nickname']>();
  
  const handleInput = e => setNickname(e.target.value);

  const handleLogin = () => {
    const userToken = getLoggedUserToken(nickname);
    if(!userToken) return;
    localStorage.setItem('userToken', userToken);
    router.push(`/conversations/${userToken}`);
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <input 
        type='text' 
        placeholder='User Nickname' 
        className={styles.input} 
        onChange={handleInput}
      />
      <br/>
      <button 
        className={styles.button} 
        onClick={handleLogin}
        disabled={!nickname}
      >Login</button>
    </div>
  )
}