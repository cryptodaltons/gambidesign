import { Button } from '../../components/Button/Button'
import { GridLayout } from '../../components/layout/GridLayout'
import { MainCarousel } from '../../components/MainCarousel/MainCarousel'
import { SocialMediaButton } from '../../components/SocialMediaButton/SocialMediaButton'
import { ProvidersCarousel } from '../../components/ProvidersCarousel/ProvidersCarousel'
import typographyStyles from '../../styles/Typography.module.css'
import scrollAnimations from '../../styles/ScrollAnimation.module.css'
import { FaGoogle, FaFacebook, FaTelegram, FaTwitch } from 'react-icons/fa'
import { ColoredContainer } from '../../components/ColoredContainer/ColoredContainer'
import { FeatureBlock } from '../../components/ColoredContainer/FeatureBlock/FeatureBlock'
import { SlantedContainer } from '../../components/SlantedContainer/SlantedContainer'
import { RotatingCoin } from '../../components/RotatingCoin/RotatingCoin'
import { useSidebarContext } from '../../context/SidebarContext/useSidebarContext'
import { AdvantagesSection } from '../../components/AdvantagesSection/AdvantagesSection'
import { SubtleContainer } from '../../components/SubtleContainer/SubtleContainer'
import { QuestionsSection } from '../../components/QuestionsSection/QuestionsSection'
import { BetDisplay } from '../../components/BetRows/BetDisplay'



export const Home = () => {
  const slides = ['/images/flair1.jpg', '/images/flair2.jpg', '/images/flair3.jpg']
  const sidebarContext = useSidebarContext()

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
      <div className="col-span-12 flex flex-wrap justify-center xl:justify-between">
        <div className="text-left min-w-[600px]">
          <h1
            className="text-[32px] sm:text-[52px] font-semibold leading-relaxed whitespace-nowrap animate-fadeDown text-center xl:text-left"
            style={{ animationDuration: '0.8s' }}
          >
            Unparalleled
            <br />
            online casino and
            <br />
            sports betting
          </h1>
          <div className="mt-8 flex items-center space-x-4 mb-8 justify-center xl:justify-start scale-75 sm:scale-100">
            <Button style={{ width: 90 }} label="Sign Up" onClick={() => console.log('Register clicked')} />
            <p className="text-[#9b9b9b] font-semibold text-[14px] whitespace-nowrap">or continue with...</p>
            <div className="flex space-x-4 justify-center">
              <SocialMediaButton icon={<FaGoogle size={24} />} onClick={() => console.log('Google clicked')} />
              <SocialMediaButton icon={<FaFacebook size={24} />} onClick={() => console.log('Facebook clicked')} />
              <SocialMediaButton icon={<FaTelegram size={24} />} onClick={() => console.log('Telegram clicked')} />
              <SocialMediaButton icon={<FaTwitch size={24} />} onClick={() => console.log('Twitch clicked')} />
            </div>
          </div>
        </div>
        <div
          className="
          flex
          items-center
          animate-fadeDown
          col-span-12
          xl:mr-16
          justify-center
          xl:justify-start
          scale-[60%]
          sm:scale-75
          xl:scale-100
        "
          style={{ animationDuration: '1.2s' }}
        >
          <MainCarousel slides={slides} />
        </div>
      </div>
      <div className="col-span-12 mt-12">
        <ProvidersCarousel providers={providers} />
      </div>
      <div className="col-span-12 view">
        <div className="col-span-12 mt-12">
          <ColoredContainer
            colorScheme="blue"
            className="h-[235px]
              mx-4
              px-4
              sm:-mx-12 px-12
              grid-cols-[minmax(0,1fr),max-content,max-content]
              justify-end
              hidden
              sm:grid"
          >
            <div>
              <div
                className={`text-[20px] sm:text-[32px] text-center sm:text-left font-semibold leading-relaxed whitespace-nowrap mb-4 ${scrollAnimations['appear-opacity']}`}
              >
                Play thousands of games <br />
                from 40+ trusted providers <br />
              </div>
              <div
                className={`${typographyStyles['functional-16']} mb-4 ${scrollAnimations['appear-opacity-scale']} flex flex-col !text-[13px] !sm:text-[16px]`}
              >
                We’ve collected all of your favorite games in one <br /> place to maximize fun and diversity! It’s time
                to win! <br />
                <div>
                  Click here to try our{' '}
                  <a href="/casino" className="text-attention underline">
                    casino
                  </a>
                </div>
              </div>
            </div>
            <div className="grid-cols-2 gap-[18px] hidden [@media(min-width:1060px)]:grid">
              <FeatureBlock iconSrc="/block_icons/slots.png" label="Slots" className="w-[144px]" />
              <FeatureBlock iconSrc="/block_icons/live_casino.png" label="Live casino" className="w-[144px]" />
              <FeatureBlock iconSrc="/block_icons/newest_games.png" label="Newest games" className="w-[144px]" />
              <FeatureBlock iconSrc="/block_icons/table_games.png" label="Table games" className="w-[144px]" />
            </div>
            <img
              src="/images/girl_casino.png"
              className={`
                hidden
                [@media(min-width:1430px)]:block
                h-[140%]
                relative
                -top-[40px]
                rotate-[-8deg]
                drop-shadow-[0_0_1rem_#50A7F266]
                ${scrollAnimations['appear-opacity']}
              `}
            />
          </ColoredContainer>
        </div>
        <div className="col-span-12 mt-12 mb-0 sm:mb-12">
          <ColoredContainer
            colorScheme="orange"
            className="
              h-[235px]
              mx-4
              px-4
              !sm:px-12
              sm:-mx-12
              grid-cols-[minmax(0,1fr),max-content,max-content]
              justify-end
              hidden
              sm:grid
            "
          >
            <div>
              <div
                className={`text-[20px] sm:text-[32px] text-center sm:text-left font-semibold leading-relaxed whitespace-nowrap mb-4 ${scrollAnimations['appear-opacity']}`}
              >
                Betting on your favorite <br />
                sports was never easier! <br />
              </div>
              <div
                className={`${typographyStyles['functional-16']} mb-4 ${scrollAnimations['appear-opacity-scale']} text-[13px] !sm:text-[16px]`}
              >
                We made sure you stay connected with all the latest <br />
                sporting events. Bet on real-time matches and <br />
                enjoy an up-to-date experience with our{' '}
                <a href="/sportsbook" className="text-[#FF661F] underline">
                  sportsbook
                </a>
                <br />
              </div>
            </div>
            <div className="grid-cols-2 gap-[18px] hidden [@media(min-width:1060px)]:grid">
              <FeatureBlock
                iconSrc="/block_icons/sports.png"
                label="Sports"
                className="w-[144px]"
                colorScheme="orange"
              />
              <FeatureBlock
                iconSrc="/block_icons/esports.png"
                label="eSports"
                className="w-[144px]"
                colorScheme="orange"
              />
              <FeatureBlock
                iconSrc="/block_icons/live_matches.png"
                label="Live matches"
                className="w-[144px]"
                colorScheme="orange"
              />
              <FeatureBlock
                iconSrc="/block_icons/horse_racing.png"
                label="Horse racing"
                className="w-[144px]"
                colorScheme="orange"
              />
            </div>
            <img
              src="/images/basketball_player.png"
              className={`
                hidden
                [@media(min-width:1430px)]:block
                h-[140%]
                relative
                -top-[40px]
                rotate-[4deg]
                drop-shadow-[0_0_1rem_#F95C188C]
                ${scrollAnimations['appear-opacity']}
              `}
            />
          </ColoredContainer>
        </div>
      </div>
      {/* Cryptos */}
      <div
        className={`flex flex-row justify-start items-center col-span-5 gap-${
          sidebarContext.isOpen ? 4 : 16
        } transition-all duration-300 sm:col-span-12 scale-75 sm:scale-100 ${
          sidebarContext.isOpen ? '-translate-x-8' : ''
        }`}
      >
        {/* Container for all texts */}
        <div className="-mt-12 ml-8">
          <div
            className={`text-[24px] sm:text-[32px] text-center sm:text-left font-semibold leading-relaxed whitespace-nowrap mb-4 ${scrollAnimations['appear-opacity']}`}
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
          className={`gap-5 ml-24 col-span-7 mb-24 mt-4 scale-${
            sidebarContext.isOpen ? '75' : '100'
          } transition-all duration-300 hidden sm:flex`}
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
            <div className="transform translate-y-[15px] translate-x-[33px]">
              <SlantedContainer className="w-[120%] min-w-[60px] h-[362px]">
                <RotatingCoin images={[currencies[3], currencies[7]]} startDelay={300} />
              </SlantedContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 hidden xl:block">
        <AdvantagesSection />
      </div>
      <div className="col-span-12">
        <SubtleContainer className="flex flex-col mb-16">
          <h1
            className={`text-center mb-8 translate-y-8 ${scrollAnimations['appear-opacity']}`}
            style={{
              fontFamily: "'Lily Script One', cursive",
              fontSize: '65px',
            }}
          >
            Any other questions?
          </h1>
          <div className="flex w-full justify-between flex-col md:flex-row md:gap-0">
            <div className="flex pt-16 w-full md:w-full lg:w-2/3">
              <QuestionsSection />
            </div>
            <div className="p-8 hidden lg:block">
              <img
                src="/images/intercom_widget.png"
                className={`
                  w-[262px]
                  drop-shadow-[0_0_1rem_#50A7F21f]
                  -rotate-3
                  cursor-pointer
                  hover:scale-[102%]
                  transition-all
                  duration-200
                  ${scrollAnimations['appear-opacity']}
                `}
              />
            </div>
          </div>
        </SubtleContainer>
      </div>
      <div className="col-span-12 mt-12">
  <BetDisplay />
</div>
    </GridLayout>
  )
}
