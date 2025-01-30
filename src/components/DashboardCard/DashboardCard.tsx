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

  const wrapperRef = useRef<HTMLDivElement>(null);
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging = true;
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = 'grabbing';
      startX = e.pageX - wrapperRef.current.offsetLeft;
      scrollLeft = wrapperRef.current.scrollLeft;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !wrapperRef.current) return;
    e.preventDefault();
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const walk = x - startX;
    wrapperRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging = false;
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = 'grab';
    }
  };

  return (
    <div className={styles.container}>
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
              <img src={card.img} alt={card.title} />
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
