import React from 'react'
import styles from './FeatureBlock.module.css'
import typographyStyles from '../../../styles/Typography.module.css'

interface FeatureBlockProps {
  label: string
  iconSrc: string
  colorScheme?: 'blue' | 'orange'
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const FeatureBlock: React.FC<FeatureBlockProps> = ({
  label,
  iconSrc,
  colorScheme = 'blue',
  children,
  className = '',
  style,
}) => {
  return (
    <div
      className={`${styles.featureBlock} ${
        colorScheme === 'orange' ? styles.orangeBlock : styles.blueBlock
      } ${className}`}
      style={style}
    >
      <div className={`${styles.iconContainer} ${colorScheme === 'orange' ? styles.orangeIcon : styles.blueIcon}`}>
        <img src={iconSrc} alt="Feature Icon" className={styles.icon} />
      </div>
      <div className="flex justify-center items-center">
        <span className={`${typographyStyles['functional-16']} !text-[14.5px] ${styles.label}`}>{label}</span>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
