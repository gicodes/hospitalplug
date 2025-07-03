'use client';

import React, { useState } from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import styles from '../../dashboard/page.module.css';

interface HeaderProps {
  role: 'admin' | 'hospital' | 'doctor' | 'user';
  name: string;
  notifications?: number;
}

const Header: React.FC<HeaderProps> = ({
  role,
  name,
  notifications = 0,
}) => {
  const [search, setSearch] = useState('');

  const getSearchPlaceholder = () => {
    switch (role) {
      case 'admin':
        return 'Search hospitals, users, services...';
      case 'hospital':
        return 'Search doctors, patients...';
      case 'doctor':
        return 'Search patients, appointments...';
      case 'user':
        return 'Search appointments, doctors...';
      default:
        return 'Search...';
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.welcomeNote}>
        Welcome, {name}
      </div>

      <div className={styles.actionArea}>
        <div className={styles.search}>
          <span><FaSearch /></span>
          <input
            type="text"
            placeholder={getSearchPlaceholder()}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.notifications}>
          <span><FaBell /></span>
          {notifications > 0 && (
            <span className={styles.notificationBadge}>
              {notifications}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
