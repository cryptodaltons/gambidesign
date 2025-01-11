import React, { useEffect, useRef } from 'react'
import styles from './AdvantageBlock.module.css'
import typographyStyles from '../../../styles/Typography.module.css'

interface AdvantageBlockProps {
  title: string
  isActive: boolean
  className?: string
  iconSrc?: string
  onClick?: () => void
}

export const AdvantageBlock: React.FC<AdvantageBlockProps> = ({
  title,
  isActive,
  className = '',
  iconSrc,
  onClick,
}) => {
  const progressRef = useRef<HTMLDivElement>(null)

  // Reset & restart the progress + fade animation when this block becomes active
  useEffect(() => {
    if (progressRef.current) {
      // Remove any existing animation classes
      progressRef.current.classList.remove(styles.fillThenFade)
      void progressRef.current.offsetWidth // Force reflow

      if (isActive) {
        progressRef.current.classList.add(styles.fillThenFade)
      }
    }
  }, [isActive])

  return (
    <div className={`${styles.advantageBlock} ${className}`} onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* This div is the "background" that will fill then fade out */}
      <div ref={progressRef} className={styles.progressBackground} />

      {/* Foreground content (icon + title) */}
      <div className={styles.content}>
        {iconSrc && (
          <div className={`${styles.iconContainer} ${isActive ? styles.activeIconContainer : ''}`}>
            <img src={iconSrc} alt={`${title} Icon`} className={styles.icon} />
          </div>
        )}
        <h3 className={`${typographyStyles['functional-16']} !text-[15px] !font-medium text-center`}>{title}</h3>
      </div>
    </div>
  )
}
