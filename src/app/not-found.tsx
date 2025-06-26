import styles from './page.module.css';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>Page Not Found</h1>
      <p>Oops! We couldn&lsquo;t find the page you're looking for.</p>

      <div className={styles.notFoundAction}>
        <Link href="/">
          <button className="btn-primary">Go Home</button>
        </Link>
      </div>
    </div>
  );
}
