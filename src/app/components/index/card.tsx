import React from 'react';
import Image from 'next/image';
import styles from "../../page.module.css";
import { IoIosStar } from "react-icons/io";
import { FaCrown } from 'react-icons/fa';

export type HospitalCard = {
  id: number | string;
  name?: string;
  type: Array<'public' | 'private' | 'teaching' | 'clinic' | 'specialist'>;
  image?: string;
  status?: string
  address?: {
    country?: string;
    state?: string;
    lga?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  bio?: string;
  rating?: number;
  review?: number;
  latitude?: unknown | number;
  longitude?: unknown | number;
  location?: unknown | unknown | undefined;
  distance?: number;
  isSubscribed?: boolean;
};

export const FeaturedCard = ({ hospital }
  : { hospital: HospitalCard}
) => {

  const types = hospital.type
  .map(t => t.charAt(0).toUpperCase() + t.slice(1))
  .join(', ');

  return (
    <div className={styles.card}>
      {hospital.isSubscribed && <div className={styles.isSubscribed} >
        <FaCrown fill='white'/>
      </div>}
      <Image 
        src={hospital?.image || ""} 
        alt={hospital.name || ""} 
        className={styles.hospitalImage} 
        width={250}
        height={150}
        objectFit='cover'
        priority
      />
      
      <div className={styles.hospitalInfo}>
        <h6>
          <a href={`/discover/${hospital.id}`}>
            {hospital.name}
          </a>
        </h6>
        <span className={styles.hospitalIndex}>
          {types}
        </span> 

        <p>{hospital?.address?.state}{hospital?.address?.lga && `, ${hospital?.address?.lga}`}</p>
        <span className={styles.hospitalIndex}>{hospital?.contact?.phone}</span>
        <div className={styles.stats}>
          <div className={styles.rating}>
            {[...Array(Math.floor(hospital?.rating || 2))].map((_, i) => (
              <IoIosStar key={i} fontSize="small" style={{ color: '#f4c150' }} />
            ))}&nbsp;
            <span>{hospital.rating}</span>
          </div>
            • 
          <p>{hospital.review} reviews</p>
        </div>
      </div>
    </div>
  )
}
