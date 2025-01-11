import React, { useEffect, useState } from 'react'
import styles from './MainCarousel.module.css'
import { CarouselNav } from './CarouselNav'
import { useSidebarContext } from '../../context/SidebarContext/useSidebarContext'

interface MainCarouselProps {
  slides: string[]
}

export const MainCarousel: React.FC<MainCarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { isOpen: isSidebarOpen } = useSidebarContext()
  const [manualInteraction, setManualInteraction] = useState({})

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        return (prev + 1) % slides.length
      })
    }, 5000)
    return () => {
      clearInterval(id)
    }
  }, [manualInteraction])

  // Click handlers
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
    setManualInteraction({})
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
    setManualInteraction({})
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div
      className={`${
        isSidebarOpen ? 'w-[378px] h-[314px] min-w-[378px] min-h-[314px]' : styles.carouselContainer
      } relative transition-all duration-300`}
    >
      {slides.map((url, index) => {
        let className = styles.hiddenSlide

        // Determine position relative to currentIndex
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length
        const nextIndex = (currentIndex + 1) % slides.length

        if (index === currentIndex) {
          className = styles.currentSlide
        } else if (index === prevIndex) {
          className = styles.slideLeft
        } else if (index === nextIndex) {
          className = styles.slideRight
        }

        return (
          <div key={index} className={`${styles.slide} ${className}`} style={{ backgroundImage: `url(${url})` }}></div>
        )
      })}

      {/* Navigation (arrows and dots) */}
      <CarouselNav
        currentIndex={currentIndex}
        totalSlides={slides.length}
        onNext={handleNext}
        onPrev={handlePrev}
        onDotClick={handleDotClick}
      />
    </div>
  )
}
