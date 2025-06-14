'use client';

import { useState } from "react";
import styles from "../../page.module.css";

const features = [
  {
    bgImage: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWxzfGVufDB8fDB8fHww",
    title: "Explore",
    link: "/discover/hospitals",
    description: "Find top and trusted healthcare services with ease",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1580281657702-257584239a55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvc3BpdGFsc3xlbnwwfHwwfHx8MA==",
    title: "Bookings",
    link: "/explore/bookings",
    description: "Schedule appointments seamlessly with top facilities",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1635247187021-ad5ab658bc5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZW1lcmdlbmN5fGVufDB8fDB8fHww",
    title: "Emergencies",
    link: "/discover/hospitals/emergencies",
    description: "Access emergency support quickly and reliably",
  },
  {
    bgImage: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zcGl0YWxzfGVufDB8fDB8fHww",
    title: "Register a hospital",
    link: "/staff/register",
    description: "Get your hospital listed on Hospital Plug",
  },
];

export default function FeatureDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const slideRight = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  return (
    <div className={styles.featureDeck}>
      <h4 className="text-center">Discover The Latest </h4>

      <div className={styles.sliderContainer}>
        <button onClick={slideLeft} className={styles.navButton}>‹</button>
        <div className={styles.features}>
          {features.map((feature, index) => {
            const position =
              index === currentIndex
                ? styles.activeCard
                : index === (currentIndex - 1 + features.length) % features.length
                ? styles.leftCard
                : index === (currentIndex + 1) % features.length
                ? styles.rightCard
                : styles.hiddenCard;

            return (
              <div 
                key={feature.title} 
                className={`${styles.card} ${position}`}
              >
                <div
                  className={styles.bgImage}
                  style={{
                    backgroundImage: `url(${feature.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100%",
                    width: "100%",
                  }}
                />
                <div className={styles.cardContent}>
                  <a href={feature.link}>
                    <h3>{feature.title}</h3>
                  </a>
                  <p>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={slideRight} className={styles.navButton}>›</button>
      </div>
    </div>
  );
}
