"use client";

import React from 'react';
import styles from '../../page.module.css';
import Header from '@/app/components/dashboard/header';
import Menu from '@/app/components/dashboard/menu';
import Views from '@/app/components/dashboard/views';
import { DashboardProvider } from '@/contexts/dashboard-context';

export default function AdminDashboard() {
  return (
    <DashboardProvider role="admin">
      <div className={styles.page}>
        <Header 
          role="admin"
          name="Gi codes"
          notifications={3}
        />
        <div className={styles.console}>
          <Menu />
          <div className={styles.views}>
            <Views />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
