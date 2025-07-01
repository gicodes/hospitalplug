'use client';

import api from '@/lib/axios';
import { GiHospital } from "react-icons/gi";
import { MdHealthAndSafety } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import styles from '../../../dashboard/admin/page.module.css';

interface StatCardProps {
  value: number;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, title, icon, bgColor }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.iconWrapper} 
        style={{ backgroundColor: bgColor || '#2D68C4' }}
      >
        {icon}
      </div>
      <div className={styles.grid}>
        <div className={styles.value}>{value}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};


const AdminHome = () => {
  const [stats, setStats] = useState({
    hospitals: 0,
    subscribed: 0,
    verified: 0,
    pending: 0,
    services: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/api/hospitals');
        setStats(res.data);
        console.log(stats)
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.statsRow}>
        <StatCard
          value={stats.hospitals || 0}
          title="All Hospitals"
          icon={<GiHospital color="black" size={22} />}
          bgColor="whitesmoke"
        />
        <StatCard
          value={stats.pending || 0}
          title="Pending Verification"
          icon={<GiHospital color="white" size={22} />}
          bgColor="goldenrod"
        />
        <StatCard
          value={stats.verified || 0}
          title="Verified Hospitals"
          icon={<GiHospital color="white" size={22} />}
          bgColor="#2D68C4"
        />
        <StatCard
          value={stats.subscribed || 0}
          title="Subscribed Hospitals"
          icon={<GiHospital color="white" size={22} />}
          bgColor="blueviolet"
        />
        <StatCard
          value={stats.services || 0}
          title="Total Services"
          icon={<MdHealthAndSafety color="white" size={22} />}
          bgColor="forestgreen"
        />
      </div>
    </div>
  );
};

export default AdminHome;
