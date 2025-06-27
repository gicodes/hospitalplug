import React from 'react';
import styles from '../page.module.css';
import Login from '@/app/components/auth/login';

const AdminLogin = () => {
  return (
    <div className={styles.page}>
      
      <div className={styles.leftPane} />

      <div className={styles.rightPane}>
        <div className={styles.authHeader}>
          <h1>Welcome, Admin</h1>
          <p>Sign in and manage organizations and users</p>
        </div>
        
        <Login profile='admin' />
      </div>
    </div>
  )
}

export default AdminLogin