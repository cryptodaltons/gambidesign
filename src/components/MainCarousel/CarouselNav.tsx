import React from "react";
import navStyles from "./CarouselNav.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CarouselNavProps {
  currentIndex: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onDotClick: (index: number) => void;
}

export const CarouselNav: React.FC<CarouselNavProps> = ({
  currentIndex,
  totalSlides,
  onNext,
  onPrev,
  onDotClick,
}) => {
  return (
    <div className={navStyles.navContainer}>
      {/* Left arrow */}
      <button
        onClick={onPrev}
        className={navStyles.arrowBtn}
        aria-label="Previous Slide"
      >
        <FiChevronLeft size={24} />
      </button>

      {/* Dots */}
      <div className={navStyles.dotsContainer}>
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <button
            key={idx}
            className={`${navStyles.dot} ${idx === currentIndex ? navStyles.activeDot : ""}`}
            onClick={() => onDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={onNext}
        className={navStyles.arrowBtn}
        aria-label="Next Slide"
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
};
