import React from 'react';
import styles from './PostBetDisplay.module.css';

interface PostBetRowProps {
  game: string;
  user: string;
  time: string;
  betAmount: string;
  multiplier: string;
  payout: string;
}

export const PostBetRow: React.FC<PostBetRowProps> = ({ game, user, time, betAmount, multiplier, payout }) => {
  const isPositive = parseFloat(payout.replace(/[^\d.-]/g, '')) > 0;

  return (
    <div className={styles.row}>
      <span>{game}</span>
      <span>{user}</span>
      <span>{time}</span>
      <span>{betAmount}</span>
      <span>{multiplier}</span>
      <span style={{ color: isPositive ? '#10b981' : '#ef4444' }}>{payout}</span>
    </div>
  );
};
