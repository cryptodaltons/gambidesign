import React from 'react'
import styles from './BNWImageButton.module.css'
import typographyStyles from '../../styles/Typography.module.css'

interface BNWImageButtonProps {
  src: string
  alt: string
  label?: string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  imageStyle?: React.CSSProperties
  labelStyle?: React.CSSProperties
  bwLightness?: number
}

export const BNWImageButton: React.FC<BNWImageButtonProps> = ({
  src,
  alt,
  label,
  onClick,
  className = '',
  style,
  imageStyle,
  labelStyle,
  bwLightness = 100,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-secondaryLighter rounded-md overflow-hidden relative flex items-center justify-center ${className}`}
      style={style}
    >
      <div className={styles.imageWrapper} style={{ '--bw-lightness': `${bwLightness}%` } as React.CSSProperties}>
        <img src={src} alt={alt} className={styles.image} style={imageStyle} />
      </div>
      {label && (
        <span className={`absolute text-white ${typographyStyles['functional-16']} ${styles.label}`} style={labelStyle}>
          {label}
        </span>
      )}
    </button>
  )
}
