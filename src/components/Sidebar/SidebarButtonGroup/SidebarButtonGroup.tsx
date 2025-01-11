import React, { useRef, useState, useEffect } from 'react'
import { IconType } from 'react-icons'
import { FaChevronUp } from 'react-icons/fa'
import typographyStyles from '../../../styles/Typography.module.css'
import { useSidebarContext } from '../../../context/SidebarContext/useSidebarContext'

interface SidebarButtonGroupProps {
  isExpandable?: boolean
  icon?: IconType | string
  label?: string
  children: React.ReactNode
}

export const SidebarButtonGroup: React.FC<SidebarButtonGroupProps> = ({
  isExpandable = false,
  icon,
  label = '',
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  // Access sidebar context
  const { isOpen: isSidebarOpen } = useSidebarContext()

  // Automatically collapse expandable groups when the sidebar is closed
  useEffect(() => {
    if (isExpandable && !isSidebarOpen) {
      setIsExpanded(false)
    }
  }, [isExpandable, isSidebarOpen])

  const toggleExpand = () => {
    if (isSidebarOpen) {
      setIsExpanded((prev) => !prev)
    }
  }

  // Determine if the icon is a string (image) or an IconType
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <img src={icon} alt={`${label} icon`} width={20} height={20} className="text-white" />
    } else if (icon) {
      const IconComponent = icon
      return <IconComponent size={20} className="text-white" />
    }
    return null
  }

  return (
    <div
      className={`
        bg-secondaryMedium
        rounded-lg
        overflow-hidden
        flex flex-col
        shadow-inner
      `}
    >
      {isExpandable && (
        <div
          className="flex items-center justify-between cursor-pointer px-3 py-3 hover:bg-secondaryLighter"
          onClick={toggleExpand}
        >
          <div className="flex items-center">
            {renderIcon()}
            <span className={`${typographyStyles['functional-13']} ml-3`}>{label}</span>
          </div>
          <FaChevronUp
            className={`
              text-white
              size-3
              transition-transform
              duration-300
            `}
            style={{
              transform: `rotate(${isExpanded ? 180 : 270}deg)`,
            }}
          />
        </div>
      )}
      {/* Divider */}
      {isExpandable && (
        <div
          className="border-t-[1.5px] border-[#83aef947]"
          style={{
            margin: '0 12px',
            opacity: isExpanded ? 1 : 0,
            transition: 'opacity 300ms ease',
          }}
        ></div>
      )}
      <div
        ref={contentRef}
        style={{
          height: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px',
          transition: 'height 0.3s ease',
        }}
        className="flex flex-col overflow-hidden"
      >
        {children}
      </div>
    </div>
  )
}
