'use client'

import React, { useState } from 'react'
import { FaSearch, FaBell } from 'react-icons/fa';
import styles from '../../../dashboard/admin/page.module.css'

const Header = () => {
  let adminName = "Gi codes";
  let notificationBadge = 3;
  const [search, setSearch] = useState('')

  return (
    <div className={styles.header}>
      <div className={styles.welcomeNote}>
        Welcome, {adminName}
      </div>
      <div className={styles.actionArea}>
        <div className={styles.search}>
          <span><FaSearch /></span>
          <input 
            type='text'
            placeholder='Search for hospitals and users'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        
        <div className={styles.notifications}>
          <span><FaBell /></span>
          <span className={styles.notificationBadge}>
            {notificationBadge}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Header