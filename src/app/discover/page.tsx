'use client';

import React from 'react';
import styles from './page.module.css';
import Geolocation from '@/app/components/discover/geolocation'; // adjust path!

const Discover = () => {
  return (
    <div className={styles.page}>
      <Geolocation />
    </div>
  );
};

export default Discover;
