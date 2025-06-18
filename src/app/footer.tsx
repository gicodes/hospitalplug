import { RiCodeAiFill, RiVercelFill } from 'react-icons/ri';
import styles from './page.module.css';
import { FcGoogle } from 'react-icons/fc';
import { TbPaywall } from 'react-icons/tb';

export const FooterGrid = () => {
  return (
    <div className={styles.footerGrid}>
        <div>
          <h4 className={styles.footerTitle}>Hospital Plug</h4>
          <a href="/about" className={styles.footerLink}>About Us</a>
          <a href="/contact" className={styles.footerLink}>Contact</a>
          <a href="/terms" className={styles.footerLink}>Terms of Use</a>
          <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
        </div>

        <div>
          <h4 className={styles.footerTitle}>Services</h4>
          <a href="/search" className={styles.footerLink}>Find Hospitals</a>
          <a href="/bookings" className={styles.footerLink}>Book Appointments</a>
          <a href="/emergency" className={styles.footerLink}>Emergency Help</a>
          <a href="/register" className={styles.footerLink}>Register a Hospital</a>
        </div>

        <div>
          <h4 className={styles.footerTitle}>Opportunities</h4>
          <a href="/collaborate" className={styles.footerLink}>Partner With Us</a>
          <a href="/careers" className={styles.footerLink}> healthcare Jobs</a>
          <a href="/ngo" className={styles.footerLink}>NGOs & Charity</a>
        </div>

        <div>
          <h4 className={styles.footerTitle}>Powered By</h4>
          <a href="https://google.com" target="_blank" rel="noopener" className={styles.footerLink}><FcGoogle /> google </a>
          <a href="https://vercel.com" target="_blank" rel="noopener" className={styles.footerLink}><RiVercelFill color='#132257' /> vercel</a>
          <a href="https://paystack.com" target="_blank" rel="noopener" className={styles.footerLink}><TbPaywall /> paystack</a>
          <a href="https://gicodes.vercel.app" target="_blank" rel="noopener" className={styles.footerLink}><RiCodeAiFill /> gi_codes</a>
        </div>
      </div>
  )
}

export default function Footer() {
  return (
    <footer className={styles.footerBottom}>
      © {new Date().getFullYear()} Hospital Plug. All rights reserved.
    </footer>
  );
}
