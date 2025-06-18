import styles from "./page.module.css";
import Hero from "./components/index/hero";
import Features from "./components/index/features";
import AboutUs from "./components/index/about";
import Local from "./components/index/local";
import HowItWorks from "./components/index/operations";
import { FooterGrid } from "./footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section id="search">
          <Hero />
        </section>
        <section id="near-you">
          <Local />
        </section>
        <section id="explore">
          <Features />
        </section>
        <section id="get-started">          
          <HowItWorks />
        </section>
        <AboutUs />
      </main>
      
      <footer className={styles.footer}>
        <FooterGrid />
      </footer>
    </div>
  );
}
