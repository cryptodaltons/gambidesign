import React, { useRef } from 'react';
import styles from './DashboardCard.module.css';

interface DashboardCardProps {
  userName: string;
  rewardProgress: number;
  tier: string;
  nextTier: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  userName,
  rewardProgress,
  tier,
  nextTier,
}) => {
  const cards = [
    {
      img: '/images/daily-races.png',
      title: 'Daily Races',
      description: 'Win daily prizes!',
    },
    {
      img: '/images/free-rewards.png',
      title: 'Free Rewards',
      description: 'Claim rewards!',
    },
    {
      img: '/images/instant-withdraw.png',
      title: 'Instant Withdraw',
      description: 'Crypto & fiat.',
    },
    {
      img: '/images/refer-and-earn.png',
      title: 'Refer & Earn',
      description: 'Earn 15% extra!',
    },
    {
      img: '/images/special-promo.png',
      title: 'Special Promo',
      description: 'Exclusive deals!',
    },
  ];

  // Use refs for drag-to-scroll without triggering re-renders.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = 'grabbing';
      startX.current = e.pageX - wrapperRef.current.offsetLeft;
      scrollLeft.current = wrapperRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !wrapperRef.current) return;
    e.preventDefault();
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const walk = x - startX.current;
    wrapperRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = 'grab';
    }
  };

  return (
    <div className={styles.container}>
      {/* LEFT SIDE – positions, layout, and colors unchanged */}
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeText}>
          Welcome Back, <span className={styles.userName}>{userName}</span>
        </h2>
        <div className={styles.progressWrapper}>
          <span className={styles.progressLabel}>Your reward progress</span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${rewardProgress}%` }}
            ></div>
          </div>
          <div className={styles.tierLabels}>
            <span className={styles.currentTier}>{tier}</span>
            <span className={styles.nextTier}>{nextTier}</span>
          </div>
        </div>
      </div>
      {/* RIGHT SIDE – action cards with improved interactions */}
      <div
        className={styles.actionsWrapper}
        ref={wrapperRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        <div className={styles.actions}>
          {cards.map((card, index) => (
            <div key={index} className={styles.actionCard}>
              <img
                src={card.img}
                alt={card.title}
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
