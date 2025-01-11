import React, { useMemo } from 'react'
import Marquee from 'react-fast-marquee'
import styles from './ProvidersCarousel.module.css'

interface ProvidersCarouselProps {
  providers: string[]
}

// Utility function to shuffle an array
const shuffleArray = (array: string[]) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)
}

export const ProvidersCarousel: React.FC<ProvidersCarouselProps> = ({ providers }) => {
  // Shuffle providers once using useMemo to prevent re-shuffling on re-renders
  const randomizedProviders = useMemo(() => shuffleArray(providers), [providers])

  return (
    <div className={styles.carouselContainer}>
      <Marquee
        gradient={false} // Disable gradient for a clean look
        speed={50} // Set marquee speed
        pauseOnHover={false}
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        {randomizedProviders.map((provider, idx) => (
          <div key={idx} className={styles.carouselItem}>
            <img className={styles.providerImage} src={provider} alt={`Provider ${idx}`} />
          </div>
        ))}
      </Marquee>
    </div>
  )
}
