import React from 'react';
import Image from 'next/image';
import Hospital from '@/model/hospital';
import { IoIosStar } from "react-icons/io";
import styles from '../../discover/page.module.css';
import { FaLocationDot } from 'react-icons/fa6';

export const DiscoCard = ({ hospital, flag }: {
  hospital: Hospital, flag?: string | undefined
}) => {
  return (
    <div className={styles.card}>
      <Image
        src={hospital.image || ""}
        alt={hospital.name || "Hospital profile photo"}
        className={styles.hospitalImage}
        width={250}
        height={150}
        objectFit="cover"
        priority
      />

      <div className={styles.main}>
        <h6>{hospital.name}</h6>
        <div className={styles.hospitalInfo}>
          <div className={styles.left}>
            <span>{hospital.type}</span>
            <p>{hospital?.address?.country} &nbsp;{flag}</p>
          </div>
          
          <div className={styles.right}>
            <div className={styles.distance}>
              <p>
              {hospital.distance !== undefined
                ? `${Math.round(hospital.distance)} meters away`
                : 'Distance unavailable'}
            </p>
            </div>
            
            <div className='flex gap-1'>
              <FaLocationDot /><p>{hospital?.address?.state}{hospital?.address?.lga && `, ${hospital?.address.lga}`}</p>
            </div>
          </div>
        </div>

        <div className={styles.about}>
          <p>{hospital.bio}</p>          
          <div className={styles.rating}>
            {[...Array(Math.floor(hospital?.rating || 2))].map((_, i) => (
              <IoIosStar key={i} fontSize="small" style={{ color: '#f4c150' }} />
            ))}
            <span>{hospital.rating}</span> • 
            <p>{hospital.reviews} reviews</p>
          </div>
        </div>
      </div>

      <div className={styles.btnGroup}>
        <button className={'btn-primary'}>Book for Self</button>
        <button className={'btn-secondary'}>Book for Other</button>
      </div>
    </div>
  )
}