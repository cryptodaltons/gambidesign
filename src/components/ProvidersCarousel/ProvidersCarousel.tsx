import React, { useMemo } from 'react'
import Marquee from 'react-fast-marquee'
import styles from './ProvidersCarousel.module.css'

interface ProvidersCarouselProps {
  providers: string[]
}

const shuffleArray = (array: string[]) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)
}

export const ProvidersCarousel: React.FC<ProvidersCarouselProps> = ({ providers }) => {
  const randomizedProviders = useMemo(() => shuffleArray(providers), [providers])

  return (
    <div className={styles.carouselContainer}>
      <Marquee
        gradient={false}
        speed={50}
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
