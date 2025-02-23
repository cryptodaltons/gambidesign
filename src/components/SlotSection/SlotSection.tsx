import React, { useRef, useState } from 'react';
import styles from './SlotSection.module.css';

interface Slot {
  title: string;
  exclusive: boolean;
  highrtp: boolean;
  image: string;
}

export const SlotSection: React.FC = () => {
  /************************************************************
   * POPULAR GAMES: DRAG-TO-SCROLL
   ************************************************************/
  const popularSliderRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingPopular, setIsDraggingPopular] = useState(false);
  const [startXPopular, setStartXPopular] = useState(0);
  const [scrollLeftPopular, setScrollLeftPopular] = useState(0);

  const handleMouseDownPopular = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!popularSliderRef.current) return;
    setIsDraggingPopular(true);
    setStartXPopular(e.pageX - popularSliderRef.current.offsetLeft);
    setScrollLeftPopular(popularSliderRef.current.scrollLeft);
  };
  const handleMouseMovePopular = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingPopular || !popularSliderRef.current) return;
    const x = e.pageX - popularSliderRef.current.offsetLeft;
    const walk = (x - startXPopular) * 1.5;
    popularSliderRef.current.scrollLeft = scrollLeftPopular - walk;
  };
  const handleMouseUpLeavePopular = () => {
    setIsDraggingPopular(false);
  };

  // Touch events for mobile drag
  const [touchStartXPopular, setTouchStartXPopular] = useState<number | null>(null);
  const [touchScrollLeftPopular, setTouchScrollLeftPopular] = useState(0);

  const handleTouchStartPopular = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!popularSliderRef.current) return;
    setIsDraggingPopular(true);
    setTouchStartXPopular(e.touches[0].clientX - popularSliderRef.current.offsetLeft);
    setTouchScrollLeftPopular(popularSliderRef.current.scrollLeft);
  };
  const handleTouchMovePopular = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingPopular || !popularSliderRef.current || touchStartXPopular === null) return;
    const x = e.touches[0].clientX - popularSliderRef.current.offsetLeft;
    const walk = (x - touchStartXPopular) * 1.5;
    popularSliderRef.current.scrollLeft = touchScrollLeftPopular - walk;
  };
  const handleTouchEndPopular = () => {
    setIsDraggingPopular(false);
    setTouchStartXPopular(null);
  };

  /************************************************************
   * NEW RELEASES: DRAG-TO-SCROLL
   ************************************************************/
  const newReleasesSliderRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingNewReleases, setIsDraggingNewReleases] = useState(false);
  const [startXNewReleases, setStartXNewReleases] = useState(0);
  const [scrollLeftNewReleases, setScrollLeftNewReleases] = useState(0);

  const handleMouseDownNewReleases = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!newReleasesSliderRef.current) return;
    setIsDraggingNewReleases(true);
    setStartXNewReleases(e.pageX - newReleasesSliderRef.current.offsetLeft);
    setScrollLeftNewReleases(newReleasesSliderRef.current.scrollLeft);
  };
  const handleMouseMoveNewReleases = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingNewReleases || !newReleasesSliderRef.current) return;
    const x = e.pageX - newReleasesSliderRef.current.offsetLeft;
    const walk = (x - startXNewReleases) * 1.5;
    newReleasesSliderRef.current.scrollLeft = scrollLeftNewReleases - walk;
  };
  const handleMouseUpLeaveNewReleases = () => {
    setIsDraggingNewReleases(false);
  };

  // Touch events for mobile drag
  const [touchStartXNew, setTouchStartXNew] = useState<number | null>(null);
  const [touchScrollLeftNew, setTouchScrollLeftNew] = useState(0);

  const handleTouchStartNew = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!newReleasesSliderRef.current) return;
    setIsDraggingNewReleases(true);
    setTouchStartXNew(e.touches[0].clientX - newReleasesSliderRef.current.offsetLeft);
    setTouchScrollLeftNew(newReleasesSliderRef.current.scrollLeft);
  };
  const handleTouchMoveNew = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingNewReleases || !newReleasesSliderRef.current || touchStartXNew === null) return;
    const x = e.touches[0].clientX - newReleasesSliderRef.current.offsetLeft;
    const walk = (x - touchStartXNew) * 1.5;
    newReleasesSliderRef.current.scrollLeft = touchScrollLeftNew - walk;
  };
  const handleTouchEndNew = () => {
    setIsDraggingNewReleases(false);
    setTouchStartXNew(null);
  };

  /************************************************************
   * EXAMPLE SLOT DATA
   ************************************************************/
  const popularSlots: Slot[] = [
    { title: "Wanted Dead or a Wild", exclusive: false, highrtp: false, image: "/images/wanted.png" },
    { title: "Sweet Bonanza", exclusive: false, highrtp: false, image: "/images/sweet-bonanza.png" },
    { title: "Sugar Rush", exclusive: false, highrtp: false, image: "/images/sugar-rush.png" },
    { title: "Sweet Bonanza 1000", exclusive: false, highrtp: false, image: "/images/sweet-bonanza-1000.png" },
    { title: "Wild West Gold", exclusive: true, highrtp: false, image: "/images/wild-west-gold.png" },
    { title: "The Dog House", exclusive: false, highrtp: false, image: "/images/the-dog-house.png" },
    { title: "Yeti Quest", exclusive: false, highrtp: false, image: "/images/yeti-quest.png" },
    { title: "Big Bass Bonanza", exclusive: false, highrtp: false, image: "/images/big-bass-bonanza.png" },
    // ...repeat or add more
  ];

  const newReleaseSlots: Slot[] = [
    { title: "Wanted Dead or a Wild", exclusive: false, highrtp: false, image: "/images/wanted.png" },
    { title: "Sweet Bonanza", exclusive: false, highrtp: false, image: "/images/sweet-bonanza.png" },
    { title: "Sugar Rush", exclusive: false, highrtp: false, image: "/images/sugar-rush.png" },
    { title: "Sweet Bonanza 1000", exclusive: false, highrtp: false, image: "/images/sweet-bonanza-1000.png" },
    { title: "Wild West Gold", exclusive: true, highrtp: false, image: "/images/wild-west-gold.png" },
    { title: "The Dog House", exclusive: false, highrtp: true, image: "/images/the-dog-house.png" },
    { title: "Yeti Quest", exclusive: false, highrtp: false, image: "/images/yeti-quest.png" },
    { title: "Big Bass Bonanza", exclusive: false, highrtp: false, image: "/images/big-bass-bonanza.png" },
    // ...repeat or add more
  ];

  return (
    <div className={styles.slotContainer}>
      
      {/* =============== POPULAR GAMES SECTION =============== */}
      <div className={styles.headerContainer}>
        <h2 className={styles.sectionTitle}>Popular Games</h2>
        <button className={styles.viewAllButton}>View All</button>
      </div>

      <div
        className={styles.slotGridContainer}
        ref={popularSliderRef}
        /* Mouse events */
        onMouseDown={handleMouseDownPopular}
        onMouseMove={handleMouseMovePopular}
        onMouseUp={handleMouseUpLeavePopular}
        onMouseLeave={handleMouseUpLeavePopular}
        /* Touch events */
        onTouchStart={handleTouchStartPopular}
        onTouchMove={handleTouchMovePopular}
        onTouchEnd={handleTouchEndPopular}
      >
        <div className={styles.slotGrid}>
          {popularSlots.map((slot, index) => (
            <div key={index} className={styles.slotCard}>
              <div className={styles.slotInner}>
                {/* BADGES */}
                <div className={styles.topBadgesContainer}>
                  {/* LEFT: Slot number */}
                  <div className={styles.leftBadgeWrapper}>
                    <span className={styles.slotNumber}>{index + 1}</span>
                  </div>
                  {/* RIGHT: Exclusive / High RTP */}
                  <div className={styles.rightBadgesWrapper}>
                    {slot.exclusive && (
                      <span className={styles.exclusiveBadge}>Exclusive</span>
                    )}
                    {slot.highrtp && (
                      <span className={styles.highrtpBadge}>High RTP</span>
                    )}
                  </div>
                </div>

                {/* SLOT IMAGE */}
                <img
                  src={slot.image}
                  alt={slot.title}
                  className={styles.slotImage}
                />

                {/* PLAY BUTTON */}
                <img
                  src="/images/play-button.png"
                  alt="Play Button"
                  className={styles.playButton}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =============== NEW RELEASES SECTION =============== */}
      <div className={styles.headerContainer}>
        <h2 className={styles.sectionTitle}>New Releases</h2>
        <button className={styles.viewAllButton}>View All</button>
      </div>

      <div
        className={styles.slotGridContainer}
        ref={newReleasesSliderRef}
        /* Mouse events */
        onMouseDown={handleMouseDownNewReleases}
        onMouseMove={handleMouseMoveNewReleases}
        onMouseUp={handleMouseUpLeaveNewReleases}
        onMouseLeave={handleMouseUpLeaveNewReleases}
        /* Touch events */
        onTouchStart={handleTouchStartNew}
        onTouchMove={handleTouchMoveNew}
        onTouchEnd={handleTouchEndNew}
      >
        <div className={styles.slotGrid}>
          {newReleaseSlots.map((slot, index) => (
            <div key={index} className={styles.slotCard}>
              <div className={styles.slotInner}>
                {/* BADGES */}
                <div className={styles.topBadgesContainer}>
                  <div className={styles.leftBadgeWrapper}>
                    <span className={styles.slotNumber}>{index + 1}</span>
                  </div>
                  <div className={styles.rightBadgesWrapper}>
                    {slot.exclusive && (
                      <span className={styles.exclusiveBadge}>Exclusive</span>
                    )}
                    {slot.highrtp && (
                      <span className={styles.highrtpBadge}>High RTP</span>
                    )}
                  </div>
                </div>

                <img
                  src={slot.image}
                  alt={slot.title}
                  className={styles.slotImage}
                />
                <img
                  src="/images/play-button.png"
                  alt="Play Button"
                  className={styles.playButton}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
