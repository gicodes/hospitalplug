import React from 'react';
import styles from '../page.module.css';
import Login from '@/app/components/auth/login';

const HospitalLogin = () => {

  return (
    <div className={styles.page}>
      <div className={styles.leftPane}>
        <div className={styles.leftPaneText}>
          <h4> Hi, Hospital Admin? </h4>
          <p>➡︎ Login with credentials</p>
          <p>📇&nbsp; Manage staff and operations</p>
          <p>⛑️  Save lives and families</p>
        </div>
      </div>

      <div className={styles.rightPane}>
        <div className={styles.authHeader}>
          <h1>Hospital Sign in</h1>
          <p>Registered healthcare institutions can sign in to manage operations</p>
        </div>
        
        <Login profile='hospital' />
      </div>
    </div>
  )
}

export default HospitalLogin