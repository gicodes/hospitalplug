'use client';

import api from '@/lib/axios';
import { FiFilter } from 'react-icons/fi';
import { GiHospital } from "react-icons/gi";
import { useRouter } from 'next/navigation';
import { MdHealthAndSafety } from 'react-icons/md';
import  React, { useState, useEffect } from 'react';
import { useAlert } from '@/contexts/alert-context';
import styles from '../../../dashboard/admin/page.module.css';
import { mockActivationRequests, mockHospitals, mockRecentActivities } from './mock-data';
import { StatCardProps, ActivationRequest, Activity, Hospital } from '@/app/dashboard/admin/types';

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
  const router = useRouter();
  const { showAlert } = useAlert();
  const [stats, setStats] = useState({
    hospitals: 0,
    subscribed: 0,
    verified: 0,
    pending: 0,
    services: 0,
  });
  const [activationRequests, setActivationRequests] = useState<ActivationRequest[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [requestStats, requestRes, activitiesRes, hospitalsRes] = await Promise.all([
          api.get('/api/hospitals/stats'),
          api.get('/api/hospitals/activation-requests'),
          api.get('/api/hospitals/recent-activities'),
          api.get('/api/hospitals'),
        ]);

        setStats(requestStats.data)
        setActivationRequests(requestRes.data || mockActivationRequests);
        setRecentActivities(activitiesRes.data || mockRecentActivities);
        setHospitals(hospitalsRes.data || mockHospitals);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchAll();
  }, []);

  const handleView = (id: string) => {
    router.push(`/hospitals/${id}`);
  };

  const handleSuspend = async (id: string) => {
    try {
      await api.patch(`/api/hospitals/${id}/suspend`);
      showAlert("success", `Hospital ${id} suspended!`);

      const hospitalsRes = await api.get('/api/hospitals');
      setHospitals(hospitalsRes.data);
    } catch (err) {
      console.error(err);
      showAlert("error", 'Failed to suspend hospital.');
    }
  };

  const filteredHospitals = hospitals.filter(hosp => {
    if (filterStatus === 'all') return true;
    return hosp.status === filterStatus;
  });

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

       <div className={styles.listGroup}>
        <div className={styles.activationRequests}>
          <h6>Activation Requests</h6>
          {activationRequests.length > 0 ? (
            activationRequests.map(req => (
              <div key={req.id} className={styles.requestItem}>
                <p><strong>{req.name}</strong> &mdash; {req.email}</p>
                <small>{new Date(req.requestedAt).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p>No activation requests</p>
          )}
        </div>
        <hr/>
        <div className={styles.recentActivities}>
          <h6>Recent Activities</h6>
          {recentActivities.length > 0 ? (
            recentActivities.map(act => (
              <div key={act.id} className={styles.activityItem}>
                <p>{act.message}</p>
                <small>{new Date(act.createdAt).toLocaleTimeString()}</small>
              </div>
            ))
          ) : (
            <p>No recent activities</p>
          )}
        </div>
      </div>

      <div className={styles.listGrid}>
        <div className={styles.listHeader}>
          <h4>Hospitals</h4>
          <div className={styles.filterGroup}>
            <select 
              value={filterStatus} 
              onChange={e => setFilterStatus(e.target.value)} 
              className={styles.filterSelect}
            >
              <option value="all">All</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <button className="btn-primary">
              <FiFilter />
            </button>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>State</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map(hosp => (
                  <tr key={hosp.id}>
                    <td>{hosp.name}</td>
                    <td>{hosp.country}</td>
                    <td>{hosp.state}</td>
                    <td>{hosp.status}</td>
                    <td className={styles.action}>
                      <button onClick={() => handleView(hosp.id)} className={styles.btnView}>View</button>
                      <button onClick={() => handleSuspend(hosp.id)} className={styles.btnSuspend}>Suspend</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No hospitals found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
