import React, { useEffect, useState } from 'react';
import { BetRow } from './BetRow';
import styles from './BetDisplay.module.css';

interface Bet {
  game: string;
  user: string;
  time: string;
  betAmount: string;
  multiplier: string;
  payout: string;
}

const initialBets: Bet[] = [
  { game: 'Blackjack', user: 'Hidden', time: '12:15 AM', betAmount: '0.81243748', multiplier: '2.50×', payout: '2.03109370' },
  { game: 'Crash', user: 'Hidden', time: '12:15 AM', betAmount: '255.12409468', multiplier: '2.62×', payout: '667.62729258' },
  { game: 'Mental', user: 'Hidden', time: '12:15 AM', betAmount: '0.02430000', multiplier: '0.15×', payout: '-0.02065500' },
  { game: 'Great Rhino Megaways', user: 'Hidden', time: '12:15 AM', betAmount: '0.00213181', multiplier: '5.00×', payout: '0.01065905' },
];

// List of realistic games
const games = [
  'Blackjack',
  'Crash',
  'Mental',
  'Gates of Olympus',
  'Sweet Bonanza',
  'The Dog House',
  'Crazy Time',
  'Roulette',
  'Keno',
  'Jammin\' Jars',
  'Book of Dead',
  'Bonanza Megaways',
  'Limbo',
];

// List of random usernames
const usernames = [
  'AceGambler',
  'LuckyStreak',
  'BetKing123',
  'QueenOfSlots',
  'CryptoRoller',
  'JackpotHunter',
  'SpinMaster',
  'BigWinDude',
  'FortuneSeeker',
  'SlotWizard',
  'RiskyPlayer',
  'HighRoller77',
  'DiamondSpinner',
];

export const BetDisplay: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>(initialBets);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBet: Bet = {
        game: games[Math.floor(Math.random() * games.length)], // Random game
        user: usernames[Math.floor(Math.random() * usernames.length)], // Random username
        time: new Date().toLocaleTimeString(),
        betAmount: (Math.random() * 100).toFixed(8), // Random bet amount
        multiplier: `${(Math.random() * 10).toFixed(2)}×`, // Random multiplier
        payout: (Math.random() > 0.5 ? '' : '-') + (Math.random() * 1000).toFixed(8), // Random payout
      };
      setBets((prevBets) => [newBet, ...prevBets.slice(0, 9)]); // Show the latest 10 bets
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.betDisplay}>
      <h2 className={styles.title}>Watch the betting action happening right now</h2>
      <p className={styles.subtitle}>Check out the live bets on popular Casino games and Sports to discover how much you could win.</p>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Game</span>
          <span>User</span>
          <span>Time</span>
          <span>Bet Amount</span>
          <span>Multiplier</span>
          <span>Payout</span>
        </div>
        {bets.map((bet, index) => (
          <BetRow key={index} {...bet} />
        ))}
      </div>
    </div>
  );
};
