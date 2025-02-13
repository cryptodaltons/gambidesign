import React, { useRef, useState } from 'react';
import styles from './SlotSection.module.css';

export const SlotSection: React.FC = () => {
  /************************************************************
   * STATE & REFS FOR POPULAR GAMES
   ************************************************************/
  const popularSliderRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingPopular, setIsDraggingPopular] = useState(false);
  const [startXPopular, setStartXPopular] = useState(0);
  const [scrollLeftPopular, setScrollLeftPopular] = useState(0);

  /************************************************************
   * STATE & REFS FOR NEW RELEASES
   ************************************************************/
  const newReleasesSliderRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingNewReleases, setIsDraggingNewReleases] = useState(false);
  const [startXNewReleases, setStartXNewReleases] = useState(0);
  const [scrollLeftNewReleases, setScrollLeftNewReleases] = useState(0);

  /************************************************************
   * DRAG HANDLERS FOR POPULAR GAMES
   ************************************************************/
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

  /************************************************************
   * DRAG HANDLERS FOR NEW RELEASES
   ************************************************************/
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

  /************************************************************
   * SLOT DATA
   ************************************************************/
  const popularSlots = [
    { title: "Wanted Dead or a Wild", exclusive: false, highrtp: false, image: "/images/wanted.png" },
    { title: "Sweet Bonanza", exclusive: false, highrtp: false, image: "/images/sweet-bonanza.png" },
    { title: "Sugar Rush", exclusive: false, highrtp: false, image: "/images/sugar-rush.png" },
    { title: "Sweet Bonanza 1000", exclusive: false, highrtp: false, image: "/images/sweet-bonanza-1000.png" },
    { title: "Wild West Gold", exclusive: true, highrtp: false, image: "/images/wild-west-gold.png" },
    { title: "The Dog House", exclusive: false, highrtp: false, image: "/images/the-dog-house.png" },
    { title: "Yeti Quest", exclusive: false, highrtp: false, image: "/images/yeti-quest.png" },
    { title: "Big Bass Bonanza", exclusive: false, highrtp: false, image: "/images/big-bass-bonanza.png" },
    { title: "Wanted Dead or a Wild", exclusive: false, highrtp: false, image: "/images/wanted.png" },
    { title: "Sweet Bonanza", exclusive: false, highrtp: false, image: "/images/sweet-bonanza.png" },
    { title: "Sugar Rush", exclusive: false, highrtp: false, image: "/images/sugar-rush.png" },
    { title: "Sweet Bonanza 1000", exclusive: false, highrtp: false, image: "/images/sweet-bonanza-1000.png" },
    { title: "Wild West Gold", exclusive: true, highrtp: false, image: "/images/wild-west-gold.png" },
    { title: "The Dog House", exclusive: false, highrtp: true, image: "/images/the-dog-house.png" },
    { title: "Yeti Quest", exclusive: false, highrtp: false, image: "/images/yeti-quest.png" },
    { title: "Big Bass Bonanza", exclusive: false, highrtp: false, image: "/images/big-bass-bonanza.png" },
  ];

  const newReleaseSlots = [
    { title: "Wanted Dead or a Wild", exclusive: false, highrtp: false, image: "/images/wanted.png" },
    { title: "Sweet Bonanza", exclusive: false, highrtp: false, image: "/images/sweet-bonanza.png" },
    { title: "Sugar Rush", exclusive: false, highrtp: false, image: "/images/sugar-rush.png" },
    { title: "Sweet Bonanza 1000", exclusive: false, highrtp: false, image: "/images/sweet-bonanza-1000.png" },
    { title: "Wild West Gold", exclusive: true, highrtp: false, image: "/images/wild-west-gold.png" },
    { title: "The Dog House", exclusive: false, highrtp: false, image: "/images/the-dog-house.png" },
    { title: "Yeti Quest", exclusive: false, highrtp: false, image: "/images/yeti-quest.png" },
    { title: "Big Bass Bonanza", exclusive: false, highrtp: false, image: "/images/big-bass-bonanza.png" },
    { title: "Wanted Dead or a Wild", exclusive: false, highrtp: false, image: "/images/wanted.png" },
    { title: "Sweet Bonanza", exclusive: false, highrtp: false, image: "/images/sweet-bonanza.png" },
    { title: "Sugar Rush", exclusive: false, highrtp: false, image: "/images/sugar-rush.png" },
    { title: "Sweet Bonanza 1000", exclusive: false, highrtp: false, image: "/images/sweet-bonanza-1000.png" },
    { title: "Wild West Gold", exclusive: true, highrtp: false, image: "/images/wild-west-gold.png" },
    { title: "The Dog House", exclusive: false, highrtp: true, image: "/images/the-dog-house.png" },
    { title: "Yeti Quest", exclusive: false, highrtp: false, image: "/images/yeti-quest.png" },
    { title: "Big Bass Bonanza", exclusive: false, highrtp: false, image: "/images/big-bass-bonanza.png" },
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
        ref={popularSliderRef}
        onMouseDown={handleMouseDownPopular}
        onMouseMove={handleMouseMovePopular}
        onMouseUp={handleMouseUpLeavePopular}
        onMouseLeave={handleMouseUpLeavePopular}
      >
        <div className={styles.slotGrid}>
          {popularSlots.map((slot, index) => (
            <div key={index} className={styles.slotCard}>
              <div className={styles.slotInner}>
                {/* Number Label (1..N) */}
                <div className={styles.slotNumber}>
                  {index + 1}
                </div>

                {/* Exclusive / High RTP Badges */}
                {slot.exclusive && (
                  <span className={styles.exclusiveBadge}>Exclusive</span>
                )}
                {slot.highrtp && (
                  <span className={styles.highrtpBadge}>High RTP</span>
                )}

                {/* Slot Image */}
                <img
                  src={slot.image}
                  alt={slot.title}
                  className={styles.slotImage}
                />

                {/* Play Button */}
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

      {/* New Releases Section */}
      <div className={styles.headerContainer}>
        <h2 className={styles.sectionTitle}>New Releases</h2>
        <button className={styles.viewAllButton}>View All</button>
      </div>

      <div
        className={styles.slotGridContainer}
        ref={newReleasesSliderRef}
        onMouseDown={handleMouseDownNewReleases}
        onMouseMove={handleMouseMoveNewReleases}
        onMouseUp={handleMouseUpLeaveNewReleases}
        onMouseLeave={handleMouseUpLeaveNewReleases}
      >
        <div className={styles.slotGrid}>
          {newReleaseSlots.map((slot, index) => (
            <div key={index} className={styles.slotCard}>
              <div className={styles.slotInner}>
                {/* Number Label (1..N) */}
                <div className={styles.slotNumber}>
                  {index + 1}
                </div>

                {/* Exclusive / High RTP Badges */}
                {slot.exclusive && (
                  <span className={styles.exclusiveBadge}>Exclusive</span>
                )}
                {slot.highrtp && (
                  <span className={styles.highrtpBadge}>High RTP</span>
                )}

                {/* Slot Image */}
                <img
                  src={slot.image}
                  alt={slot.title}
                  className={styles.slotImage}
                />

                {/* Play Button */}
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
