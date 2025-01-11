import { Button } from '../../components/Button/Button'
import { GridLayout } from '../../components/layout/GridLayout'
import { MainCarousel } from '../../components/MainCarousel/MainCarousel'
import { SocialMediaButton } from '../../components/SocialMediaButton/SocialMediaButton'
import { ProvidersCarousel } from '../../components/ProvidersCarousel/ProvidersCarousel'

import typographyStyles from '../../styles/Typography.module.css'
import scrollAnimations from '../../styles/ScrollAnimation.module.css'

import { FaGoogle, FaFacebook, FaTelegram, FaTwitch, FaExpand } from 'react-icons/fa'
import { ColoredContainer } from '../../components/ColoredContainer/ColoredContainer'
import { FeatureBlock } from '../../components/ColoredContainer/FeatureBlock/FeatureBlock'
import { SlantedContainer } from '../../components/SlantedContainer/SlantedContainer'
import { RotatingCoin } from '../../components/RotatingCoin/RotatingCoin'
import { useSidebarContext } from '../../context/SidebarContext/useSidebarContext'
import { AdvantagesSection } from '../../components/AdvantagesSection/AdvantagesSection'

export const Home = () => {
  const slides = ['/images/flair1.jpg', '/images/flair2.jpg', '/images/flair3.jpg']
  const sidebarContext = useSidebarContext()

  // List of providers for the carousel
  const providers = [
    '/providers/alg.svg',
    '/providers/booming.svg',
    '/providers/egt.svg',
    '/providers/endorphina.svg',
    '/providers/evolution.svg',
    '/providers/ezugi.svg',
    '/providers/popiplay.svg',
    '/providers/quickspin.svg',
    '/providers/sexy.svg',
    '/providers/thunderkick.svg',
  ]

  const currencies = [
    '/currency_icons/btc.svg',
    '/currency_icons/eth.svg',
    '/currency_icons/usdt.svg',
    '/currency_icons/ltc.svg',
    '/currency_icons/usd.svg',
    '/currency_icons/eur.svg',
    '/currency_icons/try.svg',
    '/currency_icons/jpy.svg',
  ]

  return (
    <GridLayout>
      {/* Left Column: Text */}
      <div className="col-span-6 text-left">
        <h1
          className="text-[52px] font-semibold leading-relaxed whitespace-nowrap animate-fadeDown"
          style={{ animationDuration: '0.8s' }}
        >
          Unparalleled
          <br />
          online casino and
          <br />
          sports betting
        </h1>

        <div className="mt-8 flex items-center space-x-4">
          {/* Sign Up Button */}
          <Button style={{ width: 90 }} label="Sign Up" onClick={() => console.log('Register clicked')} />

          {/* Text between */}
          <p className="text-[#9b9b9b] font-semibold text-[14px] whitespace-nowrap">or continue with...</p>

          {/* Social Media Buttons */}
          <div className="flex space-x-4">
            <SocialMediaButton icon={<FaGoogle size={24} />} onClick={() => console.log('Google clicked')} />
            <SocialMediaButton icon={<FaFacebook size={24} />} onClick={() => console.log('Facebook clicked')} />
            <SocialMediaButton icon={<FaTelegram size={24} />} onClick={() => console.log('Telegram clicked')} />
            <SocialMediaButton icon={<FaTwitch size={24} />} onClick={() => console.log('Twitch clicked')} />
          </div>
        </div>
      </div>

      {/* Right Column: Carousel */}
      <div
        className="col-span-6 -mt-4 flex justify-end translate-x-[-11%] items-center animate-fadeDown"
        style={{ animationDuration: '1.2s' }}
      >
        <MainCarousel slides={slides} />
      </div>

      {/* Providers Carousel */}
      <div className="col-span-12 mt-12">
        <ProvidersCarousel providers={providers} />
      </div>

      {/* To add scroll-based animations */}
      <div className="view col-span-12">
        {/* Casino and Sportsbook */}
        <div className="col-span-12 mt-12">
          <ColoredContainer colorScheme="blue" className={`h-[235px] -mx-12`}>
            <div>
              <div
                className={`text-[32px] font-semibold leading-relaxed whitespace-nowrap mb-4 ${scrollAnimations['appear-opacity']}`}
              >
                Play thousands of games <br />
                from 40+ trusted providers <br />
              </div>
              <div className={`${typographyStyles['functional-16']} mb-4 ${scrollAnimations['appear-opacity-scale']}`}>
                We’ve collected all of your favorite games in one <br /> place to maximize fun and diversity! It’s time
                to win! <br />
                Click here to try our{' '}
                <a href="/casino" className="text-attention underline">
                  casino
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[18px]">
              <FeatureBlock iconSrc="/language_icons/tr.svg" label="Slots" className={`w-[144px]`} />
              <FeatureBlock iconSrc="/language_icons/tr.svg" label="Live casino" className={`w-[144px]`} />
              <FeatureBlock iconSrc="/language_icons/tr.svg" label="Newest games" className={`w-[144px]`} />
              <FeatureBlock iconSrc="/language_icons/tr.svg" label="Table games" className={`w-[144px]`} />
            </div>
            <img
              src="/images/girl_casino.png"
              className={`h-[140%] relative -top-[40px] rotate-[-8deg] drop-shadow-[0_0_1rem_#50A7F266] ${scrollAnimations['appear-opacity']}`}
            />
          </ColoredContainer>
        </div>

        <div className="col-span-12 mt-12 mb-12">
          <ColoredContainer
            colorScheme="orange"
            className="h-[235px] -mx-12 grid grid-cols-[minmax(0,1fr),max-content,max-content] justify-end"
          >
            <div>
              <div
                className={`text-[32px] font-semibold leading-relaxed whitespace-nowrap mb-4 ${scrollAnimations['appear-opacity']}`}
              >
                Betting on your favorite <br />
                sports was never easier! <br />
              </div>
              <div className={`${typographyStyles['functional-16']} mb-4 ${scrollAnimations['appear-opacity-scale']}`}>
                We made sure you stay connected with all the latest <br />
                sporting events. Bet on real-time matches and <br />
                enjoy an up-to-date experience with our{' '}
                <a href="/sportsbook" className="text-[#FF661F] underline">
                  sportsbook
                </a>{' '}
                <br />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[18px]">
              <FeatureBlock
                iconSrc="/language_icons/tr.svg"
                label="Sports"
                className={`w-[144px]`}
                colorScheme="orange"
              />
              <FeatureBlock
                iconSrc="/language_icons/tr.svg"
                label="eSports"
                className={`w-[144px]`}
                colorScheme="orange"
              />
              <FeatureBlock
                iconSrc="/language_icons/tr.svg"
                label="Live matches"
                className={`w-[144px]`}
                colorScheme="orange"
              />
              <FeatureBlock
                iconSrc="/language_icons/tr.svg"
                label="Horse racing"
                className={`w-[144px]`}
                colorScheme="orange"
              />
            </div>
            <img
              src="/images/basketball_player.png"
              className={`h-[140%] relative -top-[40px] rotate-[4deg] drop-shadow-[0_0_1rem_#F95C188C] ${scrollAnimations['appear-opacity']}`}
            />
          </ColoredContainer>
        </div>
      </div>
      {/* Cryptos */}
      <div className="flex flex-row justify-between">
        {/* Container for all texts */}
        <div className="col-span-5 mt-12">
          <div
            className={`text-[32px] font-semibold leading-relaxed whitespace-nowrap mb-4 ${scrollAnimations['appear-opacity']}`}
          >
            Flexible fund management across <br />
            crypto and fiat currencies <br />
          </div>
          {/* Container for smaller texts */}
          <div className="ml-8 mt-8">
            <div className={`${typographyStyles['functional-16']} mb-4 ${scrollAnimations['appear-opacity-scale']}`}>
              Enjoy secure deposits and instant withdrawals with 10+ <br />
              cryptocurrencies and 7 local currencies. <br />
              <br />
            </div>
            <div className={`${typographyStyles['functional-16']} mb-4 ${scrollAnimations['appear-opacity-scale']}`}>
              No minimum limits, flexible payment options, and a safe online <br />
              vault, your transactions are always smooth and secure.
              <br />
            </div>
          </div>
        </div>
        {/* Container for slanted cryptos */}
        <div
          className={`flex ml-${sidebarContext.isOpen ? 24 : 36} gap-5 col-span-7 mb-24 mt-4 scale-${
            sidebarContext.isOpen ? '75' : '100'
          } transition-all duration-300`}
        >
          <div className={scrollAnimations['appear-move-skewed-up']}>
            <div className="transform translate-y-0 translate-x-0">
              <SlantedContainer className="w-[120%] min-w-[60px] h-[362px]">
                <RotatingCoin images={[currencies[0], currencies[4]]} startDelay={0} />
              </SlantedContainer>
            </div>
          </div>
          <div className={scrollAnimations['appear-move-skewed-down']}>
            <div className="transform translate-y-[30px] translate-x-[4.5px]">
              <SlantedContainer className="w-[120%] min-w-[60px] h-[362px]">
                <RotatingCoin images={[currencies[1], currencies[5]]} startDelay={100} />
              </SlantedContainer>
            </div>
          </div>
          <div className={scrollAnimations['appear-move-skewed-up']}>
            <div className="transform translate-y-[-10px] translate-x-[28px]">
              <SlantedContainer className="w-[120%] min-w-[60px] h-[362px]">
                <RotatingCoin images={[currencies[2], currencies[6]]} startDelay={200} />
              </SlantedContainer>
            </div>
          </div>
          <div className={scrollAnimations['appear-move-skewed-down']}>
            <div className="transform translate-y-[15px] translate-x-[35px]">
              <SlantedContainer className="w-[120%] min-w-[60px] h-[362px]">
                <RotatingCoin images={[currencies[3], currencies[7]]} startDelay={300} />
              </SlantedContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Advantages Section */}
      <div className="col-span-12">
        <AdvantagesSection />
      </div>
    </GridLayout>
  )
}
