import React, { useState, useEffect, useRef } from 'react'
import { ColoredContainer } from '../ColoredContainer/ColoredContainer'
import { AdvantageBlock } from './AdvantageBlock/AdvantageBlock'
import typographyStyles from '../../styles/Typography.module.css'
import scrollAnimations from '../../styles/ScrollAnimation.module.css'
import { useSidebarContext } from '../../context/SidebarContext/useSidebarContext'

interface Advantage {
  title: string
  header: string
  description: string
  iconSrc: string
}

const ADVANTAGES: Advantage[] = [
  {
    title: 'Secure payouts',
    header: 'Receive your winnings fast — no delays, no worries.',
    description:
      'Our fast and reliable payout system ensures you get your winnings quickly, without any unnecessary delays.<br /><br />With advanced encryption technology and seamless processing, you can have peace of mind knowing that your funds are handled securely and efficiently every time you win.',
    iconSrc: '/advantages_icons/secure_payouts.png',
  },
  {
    title: 'Variety of games',
    header: 'All your favorite games come together in one place.',
    description:
      'From thrilling slot machines with captivating themes to immersive live dealer experiences that bring the casino floor to your screen, our extensive library offers something for everyone.<br /><br />Whether you enjoy classic games or are looking for the latest releases, you’re sure to find the perfect game tailored to your preferences.',
    iconSrc: '/advantages_icons/newest_games.png',
  },
  {
    title: 'Exclusive bonuses',
    header: 'Supercharge your play with our unmatched bonus offers.',
    description:
      'Boost your bankroll and maximize your gaming experience with our unique promotions and bonus offers. <br /><br />From generous welcome bonuses to exciting ongoing promotions, we provide you with endless opportunities to extend your playtime, try new games, and increase your chances of winning big.',
    iconSrc: '/advantages_icons/exclusive_bonuses.png',
  },
  {
    title: 'Generous RTP',
    header: 'Spin, deal, and bet with confidence — higher returns await.',
    description:
      'Our games feature higher Return-to-Player (RTP) percentages, meaning more frequent wins and better long-term returns for players.<br /><br />Enjoy games designed to offer fairness and rewarding experiences, giving you the opportunity to make the most of every spin, deal, or bet.',
    iconSrc: '/advantages_icons/generous_rtp.png',
  },
]

export const AdvantagesSection: React.FC = () => {
  /**
   * currentIndex: The "logical" index that controls the left blocks' active fill,
   *               updated by the 12s timer or manual clicks.
   * displayIndex: The index that's currently shown on the right side text,
   *               changes *after* we fade out.
   */
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0) // controls which advantage is *actually* displayed
  const [isFadingOut, setIsFadingOut] = useState(false)

  // For resetting the timer on manual interaction
  const [manualInteraction, setManualInteraction] = useState({})
  const intervalRef = useRef<number | null>(null)

  const sidebarContext = useSidebarContext()

  // Set up the 12-second auto-cycle, reset when manualInteraction changes
  useEffect(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
    }
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ADVANTAGES.length)
    }, 12000)
    intervalRef.current = id

    return () => clearInterval(id)
  }, [manualInteraction])

  // Handle clicks on the left blocks => pick advantage & reset timer
  const handleBlockClick = (index: number) => {
    setCurrentIndex(index)
    setManualInteraction({})
  }

  useEffect(() => {
    if (currentIndex === displayIndex) return

    setIsFadingOut(true)
    const t = setTimeout(() => {
      setDisplayIndex(currentIndex)
      setIsFadingOut(false)
    }, 300)

    return () => clearTimeout(t)
  }, [currentIndex, displayIndex])

  const shownAdvantage = ADVANTAGES[displayIndex]

  return (
    <div className="flex flex-col items-center mb-24">
      {/* Title */}
      <h1
        className={`text-center mb-8 translate-y-8 ${scrollAnimations['appear-opacity']}`}
        style={{
          fontFamily: "'Lily Script One', cursive",
          fontSize: '65px',
        }}
      >
        Why gambi.com?
      </h1>

      {/* Main Advantages Grid */}
      <div className="grid grid-cols-12 gap-6 w-full">
        {/* Left container with AdvantageBlocks */}
        <div className="col-span-12 md:col-span-3">
          <ColoredContainer
            className="!p-3 !px-6 !items-center !justify-center box-border w-full h-full"
            colorScheme="blue"
          >
            <div className="flex flex-col space-y-5 w-full whitespace-nowrap">
              {ADVANTAGES.map((advantage, index) => (
                <AdvantageBlock
                  key={index}
                  title={advantage.title}
                  iconSrc={advantage.iconSrc}
                  isActive={index === currentIndex}
                  className="w-full"
                  onClick={() => handleBlockClick(index)}
                />
              ))}
            </div>
          </ColoredContainer>
        </div>

        <div className="col-span-12 md:col-span-9" style={{ width: 'calc(100% + 25px)' }}>
          <ColoredContainer className="!p-3 w-full h-[285px] translate-y-[22px]" colorScheme="blue">
            <div className="flex flex-col translate-y-[22px] p-4">
              <div className={`transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
                {/* The displayed advantage's header */}
                <h2
                  className={`${typographyStyles['functional-16']} !font-bold mb-6 !text-[${
                    sidebarContext.isOpen ? 14 : 18
                  }px] transition-all duration-300`}
                >
                  {shownAdvantage.header}
                </h2>

                <div className="flex flex-row gap-2">
                  {/* The displayed advantage's description */}
                  <p
                    dangerouslySetInnerHTML={{ __html: shownAdvantage.description }}
                    className={`${typographyStyles['functional-16']} !font-semibold mb-4 flex-1`}
                  ></p>

                  {/* Placeholder for promotional video */}
                  <div className="w-[280px] h-[280px] flex-shrink-0 -translate-y-[78px] translate-x-2 rounded-xl rotate-6 bg-gray-700 flex items-center justify-center text-white">
                    Video Placeholder
                  </div>
                </div>
              </div>
            </div>
          </ColoredContainer>
        </div>
      </div>
    </div>
  )
}
