import buttonStyles from './Button.module.css'
import typographyStyles from '../../styles/Typography.module.css'
import { useSidebarContext } from '../../context/SidebarContext/useSidebarContext'
import { useState, useEffect } from 'react'

interface ButtonProps {
  label: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  style?: React.CSSProperties
}

export const Button = ({ label, onClick, variant = 'primary', className = '', style }: ButtonProps) => {
  const sidebarContext = useSidebarContext()
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    const chatSidebar = document.querySelector('.chatSidebar') // Detect chat sidebar open state
    setIsChatOpen(chatSidebar?.classList.contains('open') ?? false)
  }, [])

  const leftSidebarOpen = sidebarContext.isOpen
  const chatSidebarOpen = isChatOpen

  return (
    <button
      className={`${buttonStyles.button} ${variant === 'secondary' ? buttonStyles.secondary : ''} ${
        typographyStyles['functional-12']
      } ${className}`}
      onClick={onClick}
      style={{
        ...style,
        width: leftSidebarOpen || chatSidebarOpen ? '120px' : '150px', // Resize instead of move
        minWidth: '100px', // Prevent excessive shrinking
        maxWidth: '150px', // Keep it readable
      }}
    >
      {label}
    </button>
  )
}
