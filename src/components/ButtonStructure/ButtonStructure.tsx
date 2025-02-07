import React from 'react';
import styles from './ButtonStructure.module.css';

export const ButtonStructure: React.FC = () => {
  return (
    <div className={styles.buttonContainer}>
      {/* Casino Button */}
      <a 
        href="/casino" 
        className={styles.leftButton} 
        aria-label="Navigate to Casino: 8000+ Games"
      >
        <h3 className={styles.buttonTitle}>
          CASINO <span className={styles.buttonTag}>8000+ Games</span>
        </h3>
        <p className={styles.buttonSubtitle}>
          Explore Gambi’s exclusive games alongside a selection of over 10,000 classic casino games.
        </p>
      </a>

      {/* Divider */}
      <div className={styles.divider} aria-hidden="true">
        &#x21C6;
      </div>

      {/* Sports Button */}
      <a 
        href="/sports" 
        className={styles.rightButton} 
        aria-label="Navigate to Sports: 50+ Sports"
      >
        <h3 className={styles.buttonTitle}>
          SPORTS <span className={styles.buttonTag}>50+ Sports</span>
        </h3>
        <p className={styles.buttonSubtitle}>
          Wager on the outcomes of more than 50 sporting events using our top-tier betting platform.
        </p>
      </a>
    </div>
  );
};
