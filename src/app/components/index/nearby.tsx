import React from 'react';
import { FeaturedCard } from './card';
import styles from "../../page.module.css";
import { mockHospitals } from '../dashboard/admin/mock-data';

const Local = () => {
  // useEffect to fetch live data
  
  return (
    <div className={styles.local}>
      <h5>Top Healthcare Providers </h5>
      <p>See the best healthcare services around</p>
      
      <ul className={styles.list}>
        {mockHospitals.slice(2).map((hospital, idx) => (
          <li key={hospital.id || idx}>
            <FeaturedCard hospital={hospital} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Local;