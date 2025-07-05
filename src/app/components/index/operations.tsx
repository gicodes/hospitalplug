import styles from "../../page.module.css";
import { FaSearch, FaCalendarCheck, FaPhoneAlt, FaHeartbeat } from 'react-icons/fa';

const steps = [
  {
    icon: <FaSearch />,
    title: "Search for Hospitals",
    text: "Go to Home, or scroll to the top of this page to find hospitals, clinics, and  healthcare providers near you."
  },
  {
    icon: <FaCalendarCheck />,
    title: "Register, Book Services",
    text: "Fill in the necessary details and select Save for Later or Connect Now to receive instant care or following schedule."
  },
  {
    icon: <FaPhoneAlt />,
    title: "Receive Care",
    text: "Access your Appointment Cards for details. Attend your scheduled appointments and and get tented to, either in-person or virtually."
  },
  {
    icon: <FaHeartbeat />,
    title: "Follow Up",
    text: "Stay updated with your health journey and follow up on treatments."
  }
];

const HowItWorks = () => {
  return (
    <div className={styles.howItWorks}>
      <div className='mx-auto'>
        <h4>How to use Hospital Plug</h4>
      </div>
      <div className={styles.steps}>
        { steps.map((step, index) => (
          <div className={styles.card} key={index}>
            <h6>{step.title}</h6>
            <p>{step.text}</p>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default HowItWorks;
