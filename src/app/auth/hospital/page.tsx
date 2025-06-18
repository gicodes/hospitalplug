import React from 'react';
import styles from '../page.module.css';
import Login from '@/app/components/auth/login';

const HospitalLogin = () => {
  const handleHospitalLogin = ({ email, password }: { email: string; password: string }) => {
    // Custom logic for hospital auth
    console.log('Hospital login credentials:', email, password);
  };

  return (
    <div className={styles.page}>
      <div className={styles.authHeader}>
        <h1>Hospital Sign in</h1>
        <p>Registered healthcare institutions can sign in to manage operations</p>
      </div>
      
      <Login profile='hospital' />
    </div>
  )
}

export default HospitalLogin