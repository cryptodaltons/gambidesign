import React, { useRef, useEffect } from 'react'
import { FaChevronUp } from 'react-icons/fa'
import typographyStyles from '../../../styles/Typography.module.css'
import styles from './QuestionBlock.module.css'

interface QuestionBlockProps {
  label: string
  content: string
  isExpanded?: boolean
  onToggle: () => void
  className?: string
}

export const QuestionBlock: React.FC<QuestionBlockProps> = ({
  label,
  content,
  isExpanded = false,
  onToggle,
  className = '',
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`
    } else if (contentRef.current) {
      contentRef.current.style.height = '0px'
    }
  }, [isExpanded, content])

  return (
    <div className={`${styles.questionBlock} ${className}`}>
      <div
        className={styles.header}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onToggle()
          }
        }}
        aria-expanded={isExpanded}
        aria-controls={`question-body-${label.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className={`${typographyStyles['functional-16']} text-white`}>{label}</span>
        <FaChevronUp
          className={styles.icon}
          style={{
            transform: `rotate(${isExpanded ? 180 : 270}deg)`,
          }}
        />
      </div>
      <div
        className={styles.divider}
        style={{
          opacity: isExpanded ? 1 : 0,
          transition: 'opacity 300ms ease',
        }}
      ></div>
      <div
        ref={contentRef}
        className={styles.body}
        id={`question-body-${label.replace(/\s+/g, '-').toLowerCase()}`}
        style={{
          height: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px',
          transition: 'height 0.3s ease',
        }}
        aria-hidden={!isExpanded}
      >
        <div className="px-3 py-2">
          <p className={`${typographyStyles['informational-13']} text-white`}>{content}</p>
        </div>
      </div>
    </div>
  )
}
