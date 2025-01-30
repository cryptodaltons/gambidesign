import React, { useEffect, useState } from 'react';
import { PostBetRow } from './PostBetRow';
import styles from './PostBetDisplay.module.css';

interface Bet {
  game: string;
  user: string;
  time: string;
  betAmount: string;
  multiplier: string;
  payout: string;
  type: 'casino' | 'sports';
}

// List of casino games
const casinoGames = [
  'Blackjack',
  'Roulette',
  'Slots',
  'Baccarat',
  'Crash',
  'Poker',
  'Crazy Time',
];

// List of sports games
const sportsGames = [
  'Football',
  'Basketball',
  'Tennis',
  'Cricket',
  'Baseball',
  'Hockey',
  'Esports',
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

// Initialize some sample bets
const initialBets: Bet[] = [
  { game: 'Blackjack', user: 'Hidden', time: '12:15 AM', betAmount: '0.81243748', multiplier: '2.50×', payout: '2.03109370', type: 'casino' },
  { game: 'Football', user: 'Hidden', time: '12:15 AM', betAmount: '255.12409468', multiplier: '2.62×', payout: '667.62729258', type: 'sports' },
  { game: 'Roulette', user: 'Hidden', time: '12:15 AM', betAmount: '0.02430000', multiplier: '0.15×', payout: '-0.02065500', type: 'casino' },
  { game: 'Basketball', user: 'Hidden', time: '12:15 AM', betAmount: '0.00213181', multiplier: '5.00×', payout: '0.01065905', type: 'sports' },
  { game: 'Blackjack', user: 'Hidden', time: '12:15 AM', betAmount: '0.81243748', multiplier: '2.50×', payout: '2.03109370', type: 'casino' },
  { game: 'Football', user: 'Hidden', time: '12:15 AM', betAmount: '255.12409468', multiplier: '2.62×', payout: '667.62729258', type: 'sports' },
  { game: 'Roulette', user: 'Hidden', time: '12:15 AM', betAmount: '0.02430000', multiplier: '0.15×', payout: '-0.02065500', type: 'casino' },
  { game: 'Basketball', user: 'Hidden', time: '12:15 AM', betAmount: '0.00213181', multiplier: '5.00×', payout: '0.01065905', type: 'sports' },
  { game: 'Blackjack', user: 'Hidden', time: '12:15 AM', betAmount: '0.81243748', multiplier: '2.50×', payout: '2.03109370', type: 'casino' },
  { game: 'Football', user: 'Hidden', time: '12:15 AM', betAmount: '255.12409468', multiplier: '2.62×', payout: '667.62729258', type: 'sports' },
  { game: 'Roulette', user: 'Hidden', time: '12:15 AM', betAmount: '0.02430000', multiplier: '0.15×', payout: '-0.02065500', type: 'casino' },
  { game: 'Basketball', user: 'Hidden', time: '12:15 AM', betAmount: '0.00213181', multiplier: '5.00×', payout: '0.01065905', type: 'sports' },
  { game: 'Blackjack', user: 'Hidden', time: '12:15 AM', betAmount: '0.81243748', multiplier: '2.50×', payout: '2.03109370', type: 'casino' },
  { game: 'Football', user: 'Hidden', time: '12:15 AM', betAmount: '255.12409468', multiplier: '2.62×', payout: '667.62729258', type: 'sports' },
  { game: 'Roulette', user: 'Hidden', time: '12:15 AM', betAmount: '0.02430000', multiplier: '0.15×', payout: '-0.02065500', type: 'casino' },
  { game: 'Basketball', user: 'Hidden', time: '12:15 AM', betAmount: '0.00213181', multiplier: '5.00×', payout: '0.01065905', type: 'sports' },
];

export const PostBetDisplay: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>(initialBets);
  const [activeTab, setActiveTab] = useState<'casino' | 'sports'>('casino');

  /* useEffect(() => {
    const interval = setInterval(() => {
      const isCasino = Math.random() > 0.5; // Randomly decide between casino and sports
      const newBet: Bet = {
        game: isCasino
          ? casinoGames[Math.floor(Math.random() * casinoGames.length)] // Random casino game
          : sportsGames[Math.floor(Math.random() * sportsGames.length)], // Random sports game
        user: usernames[Math.floor(Math.random() * usernames.length)], // Random username
        time: new Date().toLocaleTimeString(),
        betAmount: (Math.random() * 100).toFixed(8), // Random bet amount
        multiplier: `${(Math.random() * 10).toFixed(2)}×`, // Random multiplier
        payout: (Math.random() > 0.5 ? '' : '-') + (Math.random() * 1000).toFixed(8), // Random payout
        type: isCasino ? 'casino' : 'sports', // Set type based on game category
      };
      setBets((prevBets) => [newBet, ...prevBets.slice(0, 9)]); // Show the latest 10 bets
    }, 2000);

    return () => clearInterval(interval);
  }, []); */

  const filteredBets = bets.filter((bet) => bet.type === activeTab);

  return (
    <div className={styles.betDisplay}>
      <div className={styles.tabs}>
        <button
          className={activeTab === 'casino' ? styles.activeTab : ''}
          onClick={() => setActiveTab('casino')}
        >
          Casino Bets
        </button>
        <button
          className={activeTab === 'sports' ? styles.activeTab : ''}
          onClick={() => setActiveTab('sports')}
        >
          Sportsbook Bets
        </button>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Game</span>
          <span>User</span>
          <span>Time</span>
          <span>Bet Amount</span>
          <span>Multiplier</span>
          <span>Payout</span>
        </div>
        {filteredBets.map((bet, index) => (
          <PostBetRow key={index} {...bet} />
        ))}
      </div>
    </div>
  );
};

