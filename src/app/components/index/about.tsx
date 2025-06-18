import styles from "../../page.module.css"

export default function AboutPage() {
  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.container}>
        <h3 className={styles.title}>About Hospital Plug</h3>

        <p className={styles.paragraph}>
          <strong>Hospital Plug</strong> is a modern  healthcare gateway built to connect people and hospitals quickly and efficiently — whether from your home, office, or mobile phone.
        </p>

        <p className={styles.paragraph}>
          We believe access to  healthcare shouldn&#39;t be difficult. That&#39;s why we&#39;ve built a platform that supports everything from hospital discovery, online booking, virtual consultations, emergency services, to at-home care.
        </p>

        <p className={styles.paragraph}>
          The identity of our founder remains anonymous, but the mission is clear: 
          <em> “To save lives, one user at a time.”</em>
        </p>

        <hr className={styles.divider} />

        <h5 className={styles.subheading}>What We Offer</h5>

        <p className={styles.paragraph}>
          Hospital Plug is not just for patients — it&#39;s a business platform for  healthcare providers, institutions, and professionals looking to serve and scale.
          We welcome partnerships, collaborations, and innovations from every industry to improve  healthcare delivery and emergency responsiveness.
        </p>

        <p className={styles.paragraph}>
          Whether you&#39;re a user in need, a hospital seeking reach, or a professional ready to serve — Hospital Plug is your reliable, secure, and human-centered  healthcare ally.
        </p>
      </div>
    </div>
  );
}
