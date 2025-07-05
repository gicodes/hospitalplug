import React from 'react';
import Image from 'next/image';
import styles from "../../page.module.css";
import { IoIosStar } from "react-icons/io";
import { mockHospitals } from '../dashboard/admin/mock-data';
// nearby will eventually fetch from server: hospitals/nearby

const Local = () => {
  // useEffect to fetch live data
  
  return (
    <div className={styles.local}>
      <h5>Top Healthcare Providers </h5>
      <p>Find the best healthcare providers around your area</p>
      
      <ul className={styles.list}>
        {mockHospitals.map((hospital, idx) => (
          <li key={hospital.id || idx}>
            <div className={styles.card}>
              <Image 
                src={hospital.image} 
                alt={hospital.name} 
                className={styles.hospitalImage} 
                width={250}
                height={150}
                objectFit='cover'
                priority
              />
              
              <div className={styles.hospitalInfo}>
                <span className={styles.hospitalIndex}>{hospital.type}</span> 
                <h6>{hospital.name}</h6>
                <p>{hospital.address.country}</p>
                <p>{hospital?.address?.state} {hospital?.address?.lga && `, ${hospital?.address?.lga}`}</p>
                <br/>
                <span className={styles.hospitalIndex}>{hospital.contact.phone}</span>
                <div className={styles.ratingContainer}>
                  <span>
                    <IoIosStar fontSize="small" style={{ color: '#f4c150' }} />
                  </span>
                  <span className={styles.ratingText}>{hospital.rating} • {hospital.reviews} reviews</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Local;