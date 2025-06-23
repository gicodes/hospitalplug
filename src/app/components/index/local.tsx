import React from 'react';
import Image from 'next/image';
import styles from "../../page.module.css";
import { IoIosStar } from "react-icons/io";

const localHospitals = [
  { 
    id: 1, 
    name: "Phoenix Medicals",
    type: "Hospital", 
    address: "Enugu, Enugu", 
    phone: "0801-234-5678",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9zcGl0YWxzfGVufDB8fDB8fHww",
    rating: 4.5,
    reviews: 120
  },
  { 
    id: 2, 
    name: "General Care Center", 
    type: "Care Center",
    address: "Maitama, Abuja", 
    phone: "0803-0123-4567",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zcGl0YWxzfGVufDB8fDB8fHww",
    rating: 4.8,
    reviews: 87
  },
  { 
    id: 3, 
    name: "City Hospital",
    type: "Hospital", 
    address: "Victoria Island, Lagos", 
    phone: "0815-175-2112",
    image: "https://images.unsplash.com/photo-1670665352618-49ae2ae914ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGhvc3BpdGFsc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.7,
    reviews: 145
  },
  {
    id: 4, 
    name: "HealthPlus Clinic",
    type: "Clinic", 
    address: "GRA, Port Harcourt, Rivers", 
    phone: "0802-345-6789",
    image: "https://images.unsplash.com/photo-1580281657702-257584239a55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvc3BpdGFsc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.3,
    reviews: 200
  },
  { 
    id: 5, 
    name: "Wellness Hospital",
    type: "Hospital", 
    address: "Apo, Abuja", 
    phone: "0701-234-5678",
    image: "https://images.unsplash.com/photo-1584451049700-ec9b394f3805?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvc3BpdGFsc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.6,
    reviews: 95
  },
  { 
    id: 6, 
    name: "Carepoint Clinic",
    type: "Clinic", 
    address: "Ikeja, Lagos", 
    phone: "0804-567-8901",
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D",
    rating: 4.4,
    reviews: 110
  }
];

const Local = () => {
  return (
    <div className={styles.local}>
      <h5>Healthcare Centers Near You</h5>
      <p>Find the best  healthcare providers in your area</p>
      
      <ul className={styles.list}>
        {localHospitals.map((hospital, idx) => (
          <li key={hospital.id || idx}>
            <div className={styles.card}>
              <Image 
                src={hospital.image} 
                alt={hospital.name} 
                className={styles.hospitalImage} 
                width={250}
                height={250}
                objectFit='cover'
                priority
              />
              
              <div className={styles.hospitalInfo}>
                <span className={styles.hospitalIndex}>{hospital.type}</span> 
                <h6>{hospital.name}</h6>
                <p>{hospital.address}</p>
                <span className={styles.hospitalIndex}>{hospital.phone}</span>
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