import React, { useEffect, useState } from 'react'
import styles from './RotatingCoin.module.css'

interface RotatingCoinProps {
  images: string[]
  className?: string
  style?: React.CSSProperties
  flipDelay?: number
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
  const [shouldFlip, setShouldFlip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldFlip(true)
    }, startDelay)

    return () => clearTimeout(timer)
  }, [startDelay])

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
