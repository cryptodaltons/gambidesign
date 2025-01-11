import React from 'react'
import typographyStyles from '../../../styles/Typography.module.css'
import { IconType } from 'react-icons'
import { useSidebarContext } from '../../../context/SidebarContext/useSidebarContext'

interface SidebarButtonProps {
  icon: IconType | string
  label: string
  onClick?: () => void
  index?: number
  isTextAnimated?: boolean
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  onClick,
  index = 0,
  isTextAnimated = true,
}) => {
  const sidebarContext = useSidebarContext()

  // Determine if the icon is a string (image) or an IconType
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <img src={icon} alt={`${label} icon`} width={20} height={20} className="text-white" />
    } else {
      const IconComponent = icon
      return <IconComponent size={20} />
    }
  }

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center
        w-full
        bg-secondaryMedium
        hover:bg-secondaryLighter
        text-white
        rounded-md
        px-3 py-3
        transition-colors
        duration-150
      `}
    >
      <div className="flex justify-center items-center w-5 h-5">{renderIcon()}</div>

      <span
        style={{
          animationDelay: `${index * 0.04}s`,
          transitionDelay: `${sidebarContext.isOpen ? index * 0.04 : 0}s`,
        }}
        className={`
          ${typographyStyles['functional-13']}
          ${sidebarContext.isOpen && isTextAnimated ? 'animate-sidebarButtonTextFadein' : ''}
          ml-3
          whitespace-nowrap
          overflow-hidden
          transition-[max-width,opacity]
          duration-${isTextAnimated ? 300 : 0}
          ease-in-out
          ${sidebarContext.isOpen && isTextAnimated ? 'opacity-100 max-w-[160px]' : 'opacity-0 max-w-0'}
          ${sidebarContext.isOpen && isTextAnimated ? '-translate-x-[20px]' : ''}
          ${isTextAnimated ? '' : 'opacity-100 max-w-[160px]'}
        `}
      >
        {label}
      </span>
    </button>
  )
}
