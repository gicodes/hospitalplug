import React from 'react';
import styles from '../page.module.css';
import Login from '@/app/components/auth/login';

const UserLogin = () => {

  return (
    <div className={styles.page}>
      <div className={styles.leftPane}>
        <div className={styles.leftPaneText}>
          <h4>User Sign in</h4>
          <p> Wonder why you should sign in?</p>
          <p>💠 See your history </p>
          <p>💠 Manage your bookings</p>
          <p>💠 Save payments and invoices </p>
        </div>   
      </div>

      <div className={styles.rightPane}>
        <Login profile='user' />
      </div>
    </div>
  )
}

export default UserLogin