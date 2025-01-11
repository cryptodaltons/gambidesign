import React from 'react'
import containerStyles from './ColoredContainer.module.css'

interface ColoredContainerProps {
  colorScheme: 'orange' | 'blue'
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const ColoredContainer: React.FC<ColoredContainerProps> = ({ colorScheme, children, className = '', style }) => {
  return (
    <div
      className={`${containerStyles.container} ${
        colorScheme === 'orange' ? containerStyles.orange : containerStyles.blue
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
