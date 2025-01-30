import React from 'react'
import subtleContainerStyles from './SubtleContainer.module.css'

interface SubtleContainerProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const SubtleContainer: React.FC<SubtleContainerProps> = ({ children, className = '', style }) => {
  return (
    <div className={`${subtleContainerStyles.container} ${className}`} style={style}>
      {children}
    </div>
  )
}
