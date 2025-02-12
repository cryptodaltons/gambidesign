import React, { useEffect, useState, MouseEvent } from 'react';
import styles from './RacesRafflesSection.module.css';

/**************************************************************
 * TYPES
 **************************************************************/
interface CircularTimerProps {
  totalSeconds: number;
  endTimestamp: number;
  progressColor?: string;
  bgColor?: string;
}

interface RaceCardProps {
  title: string;
  description: string;
  prize: string;
  userHasBet: boolean;         
  onOpenLeaderboard: () => void;
  totalSeconds: number;
  endTimestamp: number;
}

interface RaffleCardProps {
  title: string;
  description: string;
  userTickets: number;
  onBuyTicketsClick: () => void;
  totalSeconds: number;
  endTimestamp: number;
}

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userHasBet: boolean;
}

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (ticketCount: number) => void;
}

/**************************************************************
 * CIRCULAR TIMER COMPONENT (No flashing effect under 1 hour)
 **************************************************************/
const CircularTimer: React.FC<CircularTimerProps> = ({
  totalSeconds,
  endTimestamp,
  progressColor = '#07e942',
  bgColor = '#6b6b6b',
}) => {
  const radius = 70;
  const stroke = 8;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;

  // State for current time left (in seconds)
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  // Update time left in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((endTimestamp - now) / 1000); // seconds
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [endTimestamp]);

  // Calculate progress
  const progress = (timeLeft / totalSeconds) * 100;
  const strokeDashoffset = circumference - (Math.max(progress, 0) / 100) * circumference;

  // Format time => "2d 03h 15m"
  const formatTimeLabel = (seconds: number) => {
    if (seconds <= 0) return 'Ended';
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (d > 0) {
      return `${d}d ${h}h ${m}m`;
    } else if (h > 0) {
      return `${h}h ${m}m ${s}s`;
    } else {
      return `${m}m ${s}s`;
    }
  };

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className={styles.circularTimer}
    >
      {/* Background Circle */}
      <circle
        stroke={bgColor}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Progress Circle */}
      <circle
        stroke={progressColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.3s ease' }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Centered Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        transform="rotate(90 70 70)"
      >
        <tspan x="50%" dy="-6" className={styles.timerSubText}>
          Ends in
        </tspan>
        <tspan
          x="50%"
          dy="20"
          className={styles.timerText}
        >
          {formatTimeLabel(timeLeft)}
        </tspan>
      </text>
    </svg>
  );
};

/**************************************************************
 * RACE CARD COMPONENT
 **************************************************************/
const RaceCard: React.FC<RaceCardProps> = ({
  title,
  description,
  prize,
  userHasBet,
  onOpenLeaderboard,
  totalSeconds,
  endTimestamp,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <p className={styles.cardDescription}>{description}</p>

      <div className={styles.actionRow}>
        {/* Always show Leaderboard button */}
        <button className={styles.cardButton} onClick={onOpenLeaderboard}>
          Leaderboard
        </button>
        <div className={styles.infoIcon} title="Race info">
          i
        </div>
      </div>

      <div className={styles.timerContainer}>
        <CircularTimer totalSeconds={totalSeconds} endTimestamp={endTimestamp} />
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.entryStatus}>
          {userHasBet ? `You've placed a bet! Prize: ${prize}` : 'Not entered yet'}
        </div>
      </div>
    </div>
  );
};

/**************************************************************
 * RAFFLE CARD COMPONENT
 **************************************************************/
const RaffleCard: React.FC<RaffleCardProps> = ({
  title,
  description,
  userTickets,
  onBuyTicketsClick,
  totalSeconds,
  endTimestamp,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <p className={styles.cardDescription}>{description}</p>

      <div className={styles.actionRow}>
        <button
          className={styles.cardButton}
          onClick={onBuyTicketsClick}
          disabled={userTickets === 0}
        >
          {userTickets} Tickets
        </button>
        <div className={styles.infoIcon} title="Raffle info">
          i
        </div>
      </div>

      <div className={styles.timerContainer}>
        <CircularTimer totalSeconds={totalSeconds} endTimestamp={endTimestamp} />
      </div>

      <div className={styles.cardFooter}>
        {/* Additional text if needed */}
      </div>
    </div>
  );
};

/**************************************************************
 * LEADERBOARD MODAL
 **************************************************************/
const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  userHasBet,
}) => {
  if (!isOpen) return null;

  // Sample top 10
  const top10 = [
    { rank: 1, name: 'Hidden', volume: '$63,326,035.12', prize: '$25,000.00' },
    { rank: 2, name: 'Hidden', volume: '$7,234,110.16', prize: '$12,000.00' },
    { rank: 3, name: 'Hidden', volume: '$5,561,502.14', prize: '$8,000.00' },
    { rank: 4, name: 'Hidden', volume: '$3,436,484.34', prize: '$6,000.00' },
    { rank: 5, name: 'Hidden', volume: '$3,145,237.78', prize: '$5,000.00' },
    { rank: 6, name: 'Hidden', volume: '$1,325,027.45', prize: '$3,500.00' },
    { rank: 7, name: 'Hidden', volume: '$856,554.20', prize: '$2,500.00' },
    { rank: 8, name: 'Hidden', volume: '$844,692.89', prize: '$2,000.00' },
    { rank: 9, name: 'Hidden', volume: '$831,036.34', prize: '$1,500.00' },
    { rank: 10, name: 'Hidden', volume: '$678,028.70', prize: '$1,000.00' },
  ];

  // Example user row
  const user = {
    rank: '-',
    name: 'cryptodaltons',
    volume: userHasBet ? '$0.00' : 'Place a bet to enter the leaderboard',
    prize: userHasBet ? '—' : '',
  };

  // Helper for coloring top ranks
  const rankColorClass = (rank: number) => {
    if (rank === 1) return styles.lbGold;
    if (rank === 2) return styles.lbSilver;
    if (rank === 3) return styles.lbBronze;
    return '';
  };

  // Click outside the modal content => close
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalContentContainer}>
          <div className={styles.modalTitle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              viewBox="0 0 24 24"
              width="20px"
              height="20px"
            >
              <path d="M12 2C6.488 2 2 6.488 2 12s4.488 10 10 10 10-4.488 10-10S17.512 2 12 2zm0 2c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8z" />
              <path d="M13 6h-2v6.051l4.627 2.666 1-1.732-3.627-2.098z" />
            </svg>
            Leaderboard
          </div>
          <div className={styles.modalClose} onClick={onClose}>
            &times;
          </div>

          <div className={styles.leaderboardList}>
            {top10.map((entry) => (
              <div key={entry.rank} className={styles.lbRow}>
                <div className={styles.lbLeft}>
                  <div className={`${styles.lbRank} ${rankColorClass(entry.rank)}`}>
                    {entry.rank === 1
                      ? '1st'
                      : entry.rank === 2
                      ? '2nd'
                      : entry.rank === 3
                      ? '3rd'
                      : `${entry.rank}th`}
                  </div>
                  <div className={styles.lbName}>{entry.name}</div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div className={styles.lbVolume}>{entry.volume}</div>
                  <div className={styles.lbPrize}>{entry.prize}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard footer: just the dots, centered */}
          <div className={styles.leaderboardFooter}>
            <div className={styles.leaderboardPagination}>...</div>
          </div>

          {/* User Row */}
          <div className={`${styles.lbRow} ${userHasBet ? styles.lbMe : ''}`}>
            <div className={styles.lbLeft}>
              <div className={styles.lbRank}>{user.rank}</div>
              <div className={styles.lbName}>{user.name}</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className={styles.lbVolume}>{user.volume}</div>
              {userHasBet && <div className={styles.lbPrize}>{user.prize}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**************************************************************
 * TICKET PURCHASE MODAL
 **************************************************************/
const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [ticketCount, setTicketCount] = useState(0);

  if (!isOpen) return null;

  // Click on overlay => close
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketCount(parseInt(e.target.value, 10) || 0);
  };

  const handleConfirm = () => {
    onConfirm(ticketCount);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalContentContainer}>
          <div className={styles.modalTitle}>Buy Tickets</div>
          <div className={styles.modalClose} onClick={onClose}>
            &times;
          </div>
          <input
            type="number"
            min="0"
            className={styles.ticketInput}
            placeholder="Number of tickets"
            value={ticketCount || ''}
            onChange={handleChange}
          />
          <button className={styles.ticketButton} onClick={handleConfirm}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

/**************************************************************
 * MAIN RACES & RAFFLES SECTION
 **************************************************************/
export const RacesRafflesSection: React.FC = () => {
  // Race
  const [hasPlacedBet, setHasPlacedBet] = useState(false); // userHasBet for the race
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  // Raffle
  const [userTickets, setUserTickets] = useState(0);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Example countdown times. Let's do partial timers for demonstration.
  const totalSecondsForRace = 5000; // ~83 minutes total
  const raceEndTimestamp = Date.now() + 3000 * 1000; // 3000 remain => partial progress

  const totalSecondsForRaffle = 8000; // ~133 minutes
  const raffleEndTimestamp = Date.now() + 4800 * 1000; // 4800 remain => partial progress

  // Handlers
  const handleOpenLeaderboard = () => setIsLeaderboardOpen(true);
  const handleCloseLeaderboard = () => setIsLeaderboardOpen(false);

  const handleOpenTicketModal = () => setIsTicketModalOpen(true);
  const handleCloseTicketModal = () => setIsTicketModalOpen(false);

  const handleConfirmTicketPurchase = (count: number) => {
    setUserTickets((prev) => prev + count);
  };

  return (
    <div className={styles.sectionContainer}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.headerIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            viewBox="0 0 24 24"
            width="28px"
            height="28px"
          >
            <path d="M12 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-6C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
            <path d="M12 6a1 1 0 0 0-1 1v5.586l-2.293 2.293a1 1 0 0 0 1.414 1.414L12 14.414l2.879 2.879a1 1 0 0 0 1.414-1.414L13 12.586V7a1 1 0 0 0-1-1z"/>
          </svg>
        </div>
        <h2 className={styles.sectionTitle}>Races &amp; Raffles</h2>
      </div>

      {/* Cards Container */}
      <div className={styles.cardsContainer}>
        {/* Race Card */}
        <RaceCard
          title="$100K Race"
          description="Compete on the leaderboard to claim your share of $100K!"
          prize="$100K"
          userHasBet={hasPlacedBet}
          onOpenLeaderboard={handleOpenLeaderboard}
          totalSeconds={totalSecondsForRace}
          endTimestamp={raceEndTimestamp}
        />

        {/* Raffle Card */}
        <RaffleCard
          title="$75K Weekly Raffle"
          description="Earn tickets to increase your chances of winning!"
          userTickets={userTickets}
          onBuyTicketsClick={handleOpenTicketModal}
          totalSeconds={totalSecondsForRaffle}
          endTimestamp={raffleEndTimestamp}
        />
      </div>

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={handleCloseLeaderboard}
        userHasBet={hasPlacedBet}
      />

      {/* Ticket Purchase Modal */}
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={handleCloseTicketModal}
        onConfirm={handleConfirmTicketPurchase}
      />
    </div>
  );
};
