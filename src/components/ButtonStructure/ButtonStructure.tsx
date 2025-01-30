import React from 'react';
import styles from './ButtonStructure.module.css';

export const ButtonStructure: React.FC = () => {
  return (
    <div className={styles.buttonContainer}>
      {/* Casino Button */}
      <div
        className={styles.leftButton}
        onClick={() => window.location.href = '/casino'}
        style={{ cursor: 'pointer' }}
      >
        <h3 className={styles.buttonTitle}>
          CASINO <span className={styles.buttonTag}>8000+ Games</span>
        </h3>
        <p className={styles.buttonSubtitle}>
          Explore Gambi’s exclusive games alongside a selection of over 10,000 classic casino games.
        </p>
      </div>

      {/* Divider */}
      <div className={styles.divider}>
        &#x21C6; {/* Icon for swap */}
      </div>

      {/* Sports Button */}
      <div
        className={styles.rightButton}
        onClick={() => window.location.href = '/sports'}
        style={{ cursor: 'pointer' }}
      >
        <h3 className={styles.buttonTitle}>
          SPORTS <span className={styles.buttonTag}>50+ Sports</span>
        </h3>
        <p className={styles.buttonSubtitle}>
          Wager on the outcomes of more than 50 sporting events using our top-tier betting platform.
        </p>
      </div>
    </div>
  );
};
