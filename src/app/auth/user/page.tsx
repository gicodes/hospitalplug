import React from 'react';
import styles from '../page.module.css';
import Login from '@/app/components/auth/login';

const UserLogin = () => {

  return (
    <div className={styles.page}>
      <div className={styles.authHeader}>
        <h1>Sign in</h1>
        <p>Registered users can sign in to view profile</p>
      </div>
      
      <Login profile='user' />
    </div>
  )
}

export default UserLogin