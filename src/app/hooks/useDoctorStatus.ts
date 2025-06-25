'use client';

import { useEffect, useState } from 'react';

export const useDoctorStatus = (doctorId: string) => {
  const [online, setOnline] = useState<boolean>(false);

  useEffect(() => {
    if (!doctorId) return;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/doctors/${doctorId}/status`);
        const data = await res.json();
        setOnline(data.online);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Every 5s

    return () => clearInterval(interval);
  }, [doctorId]);

  return online;
};