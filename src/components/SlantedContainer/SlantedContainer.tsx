import React from 'react'
import containerStyles from './SlantedContainer.module.css'

interface SlantedContainerProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const SlantedContainer: React.FC<SlantedContainerProps> = ({ children, className = '', style }) => {
  return (
    <div className={`${containerStyles.container} ${className}`} style={style}>
      {children}
    </div>
  )
}
