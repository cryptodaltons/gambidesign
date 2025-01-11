import React, { useEffect, useState } from 'react'
import styles from './RotatingCoin.module.css'

interface RotatingCoinProps {
  images: string[]
  className?: string
  style?: React.CSSProperties
  /** Interval between flips (defaults to 3000 ms) */
  flipDelay?: number
  /** Time to wait before starting flips (defaults to 0 ms) */
  startDelay?: number
}

export const RotatingCoin: React.FC<RotatingCoinProps> = ({
  images,
  className = '',
  style,
  flipDelay = 3000,
  startDelay = 0,
}) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  /**
   * Whether we've waited the `startDelay` and can begin flipping.
   */
  const [shouldFlip, setShouldFlip] = useState(false)

  /**
   * 1) After mounting, wait `startDelay` ms (if any), then allow flipping.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldFlip(true)
    }, startDelay)

    return () => clearTimeout(timer)
  }, [startDelay])

  /**
   * 2) Once we shouldFlip, set an interval to run flips every `flipDelay` ms.
   */
  useEffect(() => {
    if (!shouldFlip) return

    const intervalId = setInterval(() => {
      setIsFlipping(true)

      // Mid-flip image change
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length)
      }, 150)

      // End flip
      setTimeout(() => {
        setIsFlipping(false)
      }, 300)
    }, flipDelay)

    return () => clearInterval(intervalId)
  }, [shouldFlip, images.length, flipDelay])

  return (
    <div className={`${styles.coin} ${isFlipping ? styles.flipping : ''} ${className}`} style={style}>
      <img src={images[currentImage]} alt="Rotating Coin" className={styles.image} />
    </div>
  )
}
