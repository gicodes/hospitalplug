import React from 'react';
import styles from './page.module.css'
import Header from '@/app/components/dashboard/admin/header';
import Menu from '@/app/components/dashboard/admin/menu';
import Views from '@/app/components/dashboard/admin/view';

const AdminConsole = () => {
  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.console}>
        <Menu />
        <Views/>
      </div>   
    </div>
  )
}

export default AdminConsole