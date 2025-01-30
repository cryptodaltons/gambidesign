import React, { useState, useEffect } from 'react';
import styles from './LatestBigWins.module.css';

interface WinItem {
  id: number;
  img: string;
  user: string;
  game: string;
  amount: string;
}

export const LatestBigWins: React.FC = () => {
  const [wins, setWins] = useState<WinItem[]>([
    { id: 1, img: '/images/burning_hot.jpg', user: 'frizique', game: 'Pistol X', amount: '0.30' },
    { id: 2, img: '/images/burning_hot.jpg', user: 'Just Big Boss', game: 'Rain AK', amount: '0.01' },
    { id: 3, img: '/images/burning_hot.jpg', user: 'KaRL', game: 'Golden Knife', amount: '0.17' },
  ]);

  const [recentWinId, setRecentWinId] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newWin: WinItem = {
        id: Date.now(),
        img: '/images/burning_hot.jpg',
        user: `User${Math.floor(Math.random() * 1000)}`,
        game: `Game${Math.floor(Math.random() * 10)}`,
        amount: (Math.random() * 100).toFixed(2),
      };

      setWins((prevWins) => {
        const updatedWins = [newWin, ...prevWins];
        return updatedWins.slice(0, 50);
      });

      setRecentWinId(newWin.id);

      setTimeout(() => setRecentWinId(null), 500); // Matches transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.winsWrapper}>
        {wins.map((win) => (
          <div
            key={win.id}
            className={`${styles.winCard} ${
              recentWinId === win.id ? styles.highlight : ''
            }`}
          >
            <img src={win.img} alt={win.game} className={styles.image} />
            <div className={styles.details}>
              <span className={styles.user}>{win.user}</span>
              <span className={styles.game}>{win.game}</span>
              <span className={styles.amount}>${win.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
