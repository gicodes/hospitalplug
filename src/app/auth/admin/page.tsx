import React from 'react';
import styles from '../page.module.css';
import Login from '@/app/components/auth/login';

const AdminLogin = () => {
  return (
    <div className={styles.page}>
      <div className={styles.authHeader}>
        <h1>Welcome, Admin</h1>
        <p>Admin or Moderators are allowed to sign in and manage Hospitals and Users</p>
      </div>
      
      <Login profile='Admin@hospitalplug.com' />
    </div>
  )
}

export default AdminLogin