import styles from "../../page.module.css";
import { FaSearch, FaCalendarCheck, FaPhoneAlt, FaHeartbeat } from 'react-icons/fa';

const steps = [
  {
    icon: <FaSearch />,
    title: "Search for Hospitals",
    text: "Need a Service? Scroll to the top (Home) to search for healthcare providers or navigate to Discover page for advanced filters"
  },
  {
    icon: <FaHeartbeat />,
    title: "Book A Service",
    text: "Found somewhere? Good! Start a service by filing a service/ appointment card. You can submit, book for others or save for later"
  },
  {
    icon: <FaPhoneAlt />,
    title: "Connect instantly",
    text: "Got the mail? Great! Visit the center with the appointment details from the e-mail, or contact the provider for more info"
  },
  {
    icon: <FaCalendarCheck />,
    title: "Follow Up, Recommendations",
    text: "Share your experience with us! And stay updated with your health journey or follow up on treatments, if needed. Goodluck !!"
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
