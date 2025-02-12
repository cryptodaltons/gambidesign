import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  MouseEvent,
  ChangeEvent,
} from 'react';
import styles from './SportsSection.module.css';

/**************************************************************
 * TYPES & INTERFACES
 **************************************************************/
interface MatchOdds {
  '1X': string;
  X: string;
  '2X': string;
}

interface Stats {
  possession: string;
  shotsOnTarget: number;
  shotsOffTarget: number;
  fouls: number;
  corners: number;
  offsides: number;
}

export interface Match {
  id: number;
  teams: string;
  live: boolean;
  league: string;
  weather: string;
  score: string;
  startTime: string;  // e.g., "19:45", or "2025-01-01T19:45Z"
  duration: number;   // total minutes for the match, e.g. 90
  elapsed: number;    // how many minutes have passed (if live)
  odds: MatchOdds;
  betPlaced: boolean;
  favorite: boolean;
  stats: Stats;
}

/**************************************************************
 * COMPONENT
 **************************************************************/
export const SportsSection: React.FC = () => {
  /**************************************************************
   * STATE & REFS
   **************************************************************/
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // For toggling details of each match (collapsible)
  const [openDetails, setOpenDetails] = useState<Record<number, boolean>>({});

  // For toggling the display of completed matches
  const [showCompleted, setShowCompleted] = useState(true);

  // Simulated “favorite” or “like” toggle
  const handleToggleFavorite = (matchId: number) => {
    setMatches((prevMatches) =>
      prevMatches.map((m) =>
        m.id === matchId ? { ...m, favorite: !m.favorite } : m
      )
    );
  };

  /**************************************************************
   * Mouse / Drag Handlers
   **************************************************************/
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sliderRef.current) return;
      setIsDragging(true);
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !sliderRef.current) return;
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 1.5; // Adjust scrolling sensitivity
      sliderRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, scrollLeft, startX]
  );

  const handleMouseUpLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  /**************************************************************
   * Slider Navigation with Arrows
   **************************************************************/
  const slideLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft -= 300; // shift by ~1 card
  };

  const slideRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft += 300; // shift by ~1 card
  };

  /**************************************************************
   * MATCH DATA
   **************************************************************/
  const [matches, setMatches] = useState<Match[]>([
    {
      id: 1,
      teams: 'Real Madrid vs. Manchester City',
      league: 'UEFA Champions League',
      live: true,
      weather: '83°F',
      score: '2 - 1',
      startTime: '19:45',
      duration: 90,
      elapsed: 42,
      odds: {
        '1X': '3.56',
        X: '1.10',
        '2X': '4.23',
      },
      betPlaced: true,
      favorite: false,
      stats: {
        possession: '55% - 45%',
        shotsOnTarget: 4,
        shotsOffTarget: 6,
        fouls: 10,
        corners: 4,
        offsides: 2,
      },
    },
    {
      id: 2,
      teams: 'Napoli vs. Torino',
      league: 'Serie A',
      live: true,
      weather: '32°F',
      score: '1 - 4',
      startTime: '20:00',
      duration: 90,
      elapsed: 55,
      odds: {
        '1X': '1.56',
        X: '2.36',
        '2X': '4.23',
      },
      betPlaced: false,
      favorite: true,
      stats: {
        possession: '60% - 40%',
        shotsOnTarget: 2,
        shotsOffTarget: 8,
        fouls: 12,
        corners: 3,
        offsides: 1,
      },
    },
    {
      id: 3,
      teams: 'Mjallby AIF vs. Paris Saint-Germain',
      league: 'Friendly',
      live: true,
      weather: '75°F',
      score: '3 - 5',
      startTime: '18:30',
      duration: 90,
      elapsed: 75,
      odds: {
        '1X': '12.4',
        X: '2.37',
        '2X': '5.26',
      },
      betPlaced: true,
      favorite: false,
      stats: {
        possession: '40% - 60%',
        shotsOnTarget: 5,
        shotsOffTarget: 5,
        fouls: 14,
        corners: 4,
        offsides: 3,
      },
    },
    {
      id: 4,
      teams: 'FC Barcelona vs. Juventus',
      league: 'UEFA Champions League',
      live: false,
      weather: '65°F',
      score: '—',
      startTime: '21:00',
      duration: 90,
      elapsed: 0,
      odds: {
        '1X': '1.88',
        X: '2.01',
        '2X': '2.85',
      },
      betPlaced: false,
      favorite: false,
      stats: {
        possession: '—',
        shotsOnTarget: 0,
        shotsOffTarget: 0,
        fouls: 0,
        corners: 0,
        offsides: 0,
      },
    },
    {
      id: 5,
      teams: 'Liverpool vs. Chelsea',
      league: 'Premier League',
      live: false,
      weather: '59°F',
      score: '—',
      startTime: '19:45',
      duration: 90,
      elapsed: 0,
      odds: {
        '1X': '2.22',
        X: '2.22',
        '2X': '2.22',
      },
      betPlaced: false,
      favorite: true,
      stats: {
        possession: '—',
        shotsOnTarget: 0,
        shotsOffTarget: 0,
        fouls: 0,
        corners: 0,
        offsides: 0,
      },
    },
    {
      id: 6,
      teams: 'Bayern Munich vs. PSG',
      league: 'UEFA Champions League',
      live: true,
      weather: '70°F',
      score: '1 - 2',
      startTime: '20:30',
      duration: 90,
      elapsed: 35,
      odds: {
        '1X': '2.48',
        X: '1.98',
        '2X': '3.15',
      },
      betPlaced: true,
      favorite: false,
      stats: {
        possession: '48% - 52%',
        shotsOnTarget: 3,
        shotsOffTarget: 4,
        fouls: 8,
        corners: 5,
        offsides: 1,
      },
    },
  ]);

  /**************************************************************
   * PROGRESS BAR & MATCH TIMER SIMULATION
   * (If you want to simulate live match timeline)
   **************************************************************/
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches((prev) =>
        prev.map((match) => {
          if (match.live && match.elapsed < match.duration) {
            return {
              ...match,
              elapsed: match.elapsed + 1,
            };
          }
          return match;
        })
      );
    }, 60000); // Increase elapsed by 1 every minute
    return () => clearInterval(interval);
  }, []);

  /**************************************************************
   * Collapsible Details Toggles
   **************************************************************/
  const toggleDetails = (matchId: number) => {
    setOpenDetails((prev) => ({
      ...prev,
      [matchId]: !prev[matchId],
    }));
  };

  /**************************************************************
   * Filter "show completed" toggler
   **************************************************************/
  const handleShowCompletedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowCompleted(e.target.checked);
  };

  /**************************************************************
   * HELPER RENDER METHODS
   **************************************************************/
  const renderProgressBar = (match: Match) => {
    if (!match.live) return null;
    const percentage = Math.min(
      (match.elapsed / match.duration) * 100,
      100
    ).toFixed(0);
    return (
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  const renderElapsedOrUpcoming = (match: Match) => {
    if (match.live) {
      return (
        <span className={styles.scoreValue}>
          {match.score} 
        </span>
      );
    } else {
      return <span className={styles.upcomingText}>Upcoming</span>;
    }
  };

  /**************************************************************
   * RENDER
   **************************************************************/
  return (
    <div className={styles.sportsContainer}>
      {/* HEADER: Title & controls */}
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          {/* If you want an icon, include it here
          <img src="your-icon.png" alt="Sports Icon" />
          */}
          <h2 className={styles.sectionTitle}>Popular Matches</h2>
        </div>

        <div className={styles.headerControls}>
          {/* Optional "Show Completed" toggle switch */}
          <div className={styles.toggleContainer}>
            <label className={styles.toggleLabel} htmlFor="completedToggle">
              Show Completed
            </label>
            <input
              id="completedToggle"
              type="checkbox"
              checked={showCompleted}
              onChange={handleShowCompletedChange}
            />
          </div>

          <button className={styles.viewAllButton}>View All</button>
        </div>
      </div>

      {/* SLIDER WRAPPER */}
      <div className={styles.sliderWrapper}>
        {/* Arrows for manual left/right navigation */}
        <button className={`${styles.navArrow} ${styles.arrowLeft}`} onClick={slideLeft}>
          &lt;
        </button>
        <button className={`${styles.navArrow} ${styles.arrowRight}`} onClick={slideRight}>
          &gt;
        </button>

        {/* The slider container (drag-to-scroll) */}
        <div
          className={styles.sliderContainer}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpLeave}
          onMouseLeave={handleMouseUpLeave}
        >
          {/* The "track" that holds the match cards */}
          <div className={styles.slider}>
            {matches
              .filter((match) => {
                // If showCompleted = false, filter out any match that is NOT live but has an elapsed >= duration
                if (!showCompleted && !match.live && match.elapsed >= match.duration) {
                  return false;
                }
                return true;
              })
              .map((match) => {
                // Determine if a match is completed
                const isCompleted = !match.live && match.elapsed >= match.duration;

                return (
                  <div key={match.id} className={styles.matchCard}>
                    {/* Live indicator */}
                    {match.live && <div className={styles.liveStatus}>LIVE</div>}

                    {/* Favorite (like) icon */}
                    <div
                      className={styles.favoriteIcon}
                      onClick={() => handleToggleFavorite(match.id)}
                      title="Toggle Favorite"
                    >
                      {match.favorite ? '★' : '☆'}
                    </div>

                    {/* Weather badge */}
                    <div className={styles.weather}>{match.weather}</div>

                    {/* Teams & Score */}
                    <div className={styles.matchTeams}>{match.teams}</div>
                    <div className={styles.leagueInfo}>{match.league}</div>

                    {/* Match timer or upcoming */}
                    <div className={styles.matchTimer}>
                      {match.live
                        ? `Elapsed: ${match.elapsed}' of ${match.duration}'`
                        : `Starts at: ${match.startTime}`}
                    </div>
                    {renderProgressBar(match)}

                    {/* Score or "Upcoming" */}
                    <div className={styles.score}>
                      <span>Score:</span>
                      {renderElapsedOrUpcoming(match)}
                    </div>

                    {/* Betting odds */}
                    <div className={styles.odds}>
                      {Object.entries(match.odds).map(([label, value]) => (
                        <div key={label} className={styles.oddsItem}>
                          <div className={styles.oddsLabel}>{label}</div>
                          <div className={styles.oddsValue}>{value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bet status / button */}
                    <div className={styles.betStatus}>
                      {match.betPlaced ? (
                        <span className={styles.placedBet}>Bet Placed</span>
                      ) : (
                        <button className={styles.betButton}>Place a Bet</button>
                      )}
                    </div>

                    {/* Collapsible extra details (stats, etc.) */}
                    {!isCompleted && (
                      <button
                        className={styles.detailsToggleButton}
                        onClick={() => toggleDetails(match.id)}
                      >
                        {openDetails[match.id] ? 'Hide Details' : 'Show Details'}
                      </button>
                    )}
                    <div
                      className={`${styles.extraDetails} ${
                        openDetails[match.id] ? 'open' : ''
                      }`}
                    >
                      <div className={styles.extraDetailsContent}>
                        <h4>Match Stats</h4>
                        <table className={styles.statsTable}>
                          <tbody>
                            <tr>
                              <th>Possession</th>
                              <td>{match.stats.possession}</td>
                            </tr>
                            <tr>
                              <th>Shots on Target</th>
                              <td>{match.stats.shotsOnTarget}</td>
                            </tr>
                            <tr>
                              <th>Shots off Target</th>
                              <td>{match.stats.shotsOffTarget}</td>
                            </tr>
                            <tr>
                              <th>Fouls</th>
                              <td>{match.stats.fouls}</td>
                            </tr>
                            <tr>
                              <th>Corners</th>
                              <td>{match.stats.corners}</td>
                            </tr>
                            <tr>
                              <th>Offsides</th>
                              <td>{match.stats.offsides}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
