import React, { useRef, useState } from 'react';
import styles from './SlotSection.module.css';

export const SlotSection: React.FC = () => {
  // State and ref for Popular Games
  const popularSliderRef = useRef<HTMLDivElement>(null);
  const [isDraggingPopular, setIsDraggingPopular] = useState(false);
  const [startXPopular, setStartXPopular] = useState(0);
  const [scrollLeftPopular, setScrollLeftPopular] = useState(0);

  // State and ref for New Releases
  const newReleasesSliderRef = useRef<HTMLDivElement>(null);
  const [isDraggingNewReleases, setIsDraggingNewReleases] = useState(false);
  const [startXNewReleases, setStartXNewReleases] = useState(0);
  const [scrollLeftNewReleases, setScrollLeftNewReleases] = useState(0);

  // Handlers for Popular Games
  const handleMouseDownPopular = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!popularSliderRef.current) return;
    setIsDraggingPopular(true);
    setStartXPopular(e.pageX - popularSliderRef.current.offsetLeft);
    setScrollLeftPopular(popularSliderRef.current.scrollLeft);
  };

  const handleMouseMovePopular = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingPopular || !popularSliderRef.current) return;
    const x = e.pageX - popularSliderRef.current.offsetLeft;
    const walk = (x - startXPopular) * 1.5; // Adjust sensitivity
    popularSliderRef.current.scrollLeft = scrollLeftPopular - walk;
  };

  const handleMouseUpLeavePopular = () => setIsDraggingPopular(false);

  // Handlers for New Releases
  const handleMouseDownNewReleases = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!newReleasesSliderRef.current) return;
    setIsDraggingNewReleases(true);
    setStartXNewReleases(e.pageX - newReleasesSliderRef.current.offsetLeft);
    setScrollLeftNewReleases(newReleasesSliderRef.current.scrollLeft);
  };

  const handleMouseMoveNewReleases = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingNewReleases || !newReleasesSliderRef.current) return;
    const x = e.pageX - newReleasesSliderRef.current.offsetLeft;
    const walk = (x - startXNewReleases) * 1.5; // Adjust sensitivity
    newReleasesSliderRef.current.scrollLeft = scrollLeftNewReleases - walk;
  };

  const handleMouseUpLeaveNewReleases = () => setIsDraggingNewReleases(false);

  // Slot Data
  const popularSlots = [
    { title: "Wanted Dead or a Wild", provider: "Hacksaw Gaming", image: "/images/wanted.png" },
    { title: "Sweet Bonanza", provider: "Pragmatic Play", image: "/images/sweet-bonanza.png" },
    { title: "Sugar Rush", provider: "Pragmatic Play", image: "/images/sugar-rush.png" },
    { title: "Sweet Bonanza 1000", provider: "Pragmatic Play", image: "/images/sweet-bonanza-1000.png" },
    { title: "Wild West Gold", provider: "Pragmatic Play", exclusive: true, image: "/images/wild-west-gold.png" },
    { title: "The Dog House", provider: "Pragmatic Play", image: "/images/the-dog-house.png" },
    { title: "Yeti Quest", provider: "Pragmatic Play", image: "/images/yeti-quest.png" },
    { title: "Big Bass Bonanza", provider: "Pragmatic Play", image: "/images/big-bass-bonanza.png" },
    { title: "Wanted Dead or a Wild", provider: "Hacksaw Gaming", image: "/images/wanted.png" },
    { title: "Sweet Bonanza", provider: "Pragmatic Play", image: "/images/sweet-bonanza.png" },
    { title: "Sugar Rush", provider: "Pragmatic Play", image: "/images/sugar-rush.png" },
    { title: "Sweet Bonanza 1000", provider: "Pragmatic Play", image: "/images/sweet-bonanza-1000.png" },
    { title: "Wild West Gold", provider: "Pragmatic Play", exclusive: true, image: "/images/wild-west-gold.png" },
    { title: "The Dog House", provider: "Pragmatic Play", highrtp: true, image: "/images/the-dog-house.png" },
    { title: "Yeti Quest", provider: "Pragmatic Play", image: "/images/yeti-quest.png" },
    { title: "Big Bass Bonanza", provider: "Pragmatic Play", image: "/images/big-bass-bonanza.png" },
  ];

  const newReleaseSlots = [
    { title: "Wanted Dead or a Wild", provider: "Hacksaw Gaming", image: "/images/wanted.png" },
    { title: "Sweet Bonanza", provider: "Pragmatic Play", image: "/images/sweet-bonanza.png" },
    { title: "Sugar Rush", provider: "Pragmatic Play", image: "/images/sugar-rush.png" },
    { title: "Sweet Bonanza 1000", provider: "Pragmatic Play", image: "/images/sweet-bonanza-1000.png" },
    { title: "Wild West Gold", provider: "Pragmatic Play", exclusive: true, image: "/images/wild-west-gold.png" },
    { title: "The Dog House", provider: "Pragmatic Play", image: "/images/the-dog-house.png" },
    { title: "Yeti Quest", provider: "Pragmatic Play", image: "/images/yeti-quest.png" },
    { title: "Big Bass Bonanza", provider: "Pragmatic Play", image: "/images/big-bass-bonanza.png" },
    { title: "Wanted Dead or a Wild", provider: "Hacksaw Gaming", image: "/images/wanted.png" },
    { title: "Sweet Bonanza", provider: "Pragmatic Play", image: "/images/sweet-bonanza.png" },
    { title: "Sugar Rush", provider: "Pragmatic Play", image: "/images/sugar-rush.png" },
    { title: "Sweet Bonanza 1000", provider: "Pragmatic Play", image: "/images/sweet-bonanza-1000.png" },
    { title: "Wild West Gold", provider: "Pragmatic Play", exclusive: true, image: "/images/wild-west-gold.png" },
    { title: "The Dog House", provider: "Pragmatic Play", highrtp: true, image: "/images/the-dog-house.png" },
    { title: "Yeti Quest", provider: "Pragmatic Play", image: "/images/yeti-quest.png" },
    { title: "Big Bass Bonanza", provider: "Pragmatic Play", image: "/images/big-bass-bonanza.png" },
  ];

  return (
    <div className={styles.slotContainer}>
      {/* Popular Games Section */}
      <div className={styles.headerContainer}>
        <h2 className={styles.sectionTitle}>Popular Games</h2>
        <button className={styles.viewAllButton}>View All</button>
      </div>
      <div
        className={styles.slotGridContainer}
        onMouseDown={handleMouseDownPopular}
        onMouseMove={handleMouseMovePopular}
        onMouseUp={handleMouseUpLeavePopular}
        onMouseLeave={handleMouseUpLeavePopular}
        ref={popularSliderRef}
      >
        <div className={styles.slotGrid}>
          {popularSlots.map((slot, index) => (
            <div key={index} className={styles.slotCard}>
              <img src={slot.image} alt={slot.title} className={styles.slotImage} />
              <div className={styles.slotContent}>
                {slot.exclusive && <span className={styles.exclusiveBadge}>Exclusive</span>}
                <p className={styles.slotProvider}>{slot.provider}</p>
              </div>
              {/* Play Button */}
              <img
                src="/images/play-button.png"
                alt="Play Button"
                className={styles.playButton}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Spacing Between Sections */}
      <div style={{ height: "32px" }}></div>

      {/* New Releases Section */}
      <div className={styles.headerContainer}>
        <h2 className={styles.sectionTitle}>New Releases</h2>
        <button className={styles.viewAllButton}>View All</button>
      </div>
      <div
        className={styles.slotGridContainer}
        onMouseDown={handleMouseDownNewReleases}
        onMouseMove={handleMouseMoveNewReleases}
        onMouseUp={handleMouseUpLeaveNewReleases}
        onMouseLeave={handleMouseUpLeaveNewReleases}
        ref={newReleasesSliderRef}
      >
        <div className={styles.slotGrid}>
          {newReleaseSlots.map((slot, index) => (
            <div key={index} className={styles.slotCard}>
              <img src={slot.image} alt={slot.title} className={styles.slotImage} />
              <div className={styles.slotContent}>
                {slot.exclusive && <span className={styles.exclusiveBadge}>Exclusive</span>}
                <p className={styles.slotProvider}>{slot.provider}</p>
              </div>
              {/* Play Button */}
              <img
                src="/images/play-button.png"
                alt="Play Button"
                className={styles.playButton}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
