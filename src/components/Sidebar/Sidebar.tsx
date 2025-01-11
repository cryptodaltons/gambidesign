import { useState } from 'react'
import { FiMenu, FiStar, FiBook, FiMonitor, FiGift, FiVideo, FiPlay, FiAward, FiLogOut } from 'react-icons/fi'
import { SidebarButton } from './SidebarButton/SidebarButton'
import { SidebarButtonGroup } from './SidebarButtonGroup/SidebarButtonGroup'
import { useSidebarContext } from '../../context/SidebarContext/useSidebarContext'
import { languages, LanguageCode } from '../../constants/Languages'
import { BNWImageButton } from '../BNWImageButton/BNWImageButton'

export const Sidebar = () => {
  const { isOpen: expanded, toggleSidebar } = useSidebarContext()
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en')

  const handleLanguageChange = (languageCode: LanguageCode) => {
    setSelectedLanguage(languageCode)
    console.log(`Language changed to: ${languageCode}`)
  }

  return (
    <aside
      className={`
        text-white
        h-screen
        transition-all
        duration-300
        ${expanded ? 'w-[240px]' : 'w-[60px]'}
        bg-gradient-to-b
        fixed top-0 left-0
        z-[1000]
      `}
      style={{
        backgroundImage: 'linear-gradient(to bottom, #121727 0%, #192132 100%)',
      }}
    >
      <div
        className={`
          ${expanded ? 'w-[240px]' : 'w-[60px]'}
          h-[60px]
          shadow-[0_0_8px_4px_rgba(0,0,0,0.15)]
          transition-all
          duration-300
          relative
        `}
      >
        <div
          className={`
            fixed
            top-0
            left-0
            w-[${expanded ? 240 : 60}px]
            h-[60px]
            transition-all
            duration-300
            flex
            justify-between
            items-center
          `}
        >
          <div className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] flex justify-center items-center">
            <button
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
              className="text-white hover:opacity-80 transition-opacity"
            >
              <FiMenu size={24} />
            </button>
          </div>

          <div className={`flex gap-2 mr-2`}>
            <BNWImageButton
              src="/images/casino_button.jpg"
              alt="Casino"
              label="Casino"
              className={`${
                expanded ? 'opacity-100' : 'opacity-0'
              } w-full h-[46px] min-w-[82px] min-h-[23px] transition-all duration-${expanded ? 300 : 25} delay-${
                expanded ? 100 : 0
              }`}
              imageStyle={{
                width: '100%',
                height: '46px',
              }}
              labelStyle={{
                fontWeight: 500,
                fontSize: 15,
              }}
            />
            <BNWImageButton
              src="/images/sports_button.jpg"
              alt="Sports"
              label="Sports"
              className={`${
                expanded ? 'opacity-100' : 'opacity-0'
              } w-full h-[46px] min-w-[82px] min-h-[23px] transition-all duration-${expanded ? 300 : 25} delay-${
                expanded ? 200 : 0
              }`}
              imageStyle={{
                width: '100%',
                height: '46px',
              }}
              labelStyle={{
                fontWeight: 400,
                fontSize: 15,
              }}
              bwLightness={50}
            />
          </div>
        </div>
      </div>

      {/* Navigation button groups */}
      <nav className="p-2 flex py-4 flex-col gap-4">
        {/* Language Group */}
        <SidebarButtonGroup
          isExpandable={true}
          icon={languages[selectedLanguage].icon}
          label={languages[selectedLanguage].label}
        >
          {Object.entries(languages).map(([code, { label, icon }]) => (
            <SidebarButton
              key={code}
              icon={icon}
              label={label}
              onClick={() => handleLanguageChange(code as LanguageCode)}
              isTextAnimated={false}
            />
          ))}
        </SidebarButtonGroup>

        {/* Group 1 */}
        <SidebarButtonGroup>
          <SidebarButton icon={FiStar} label="Vip Club" onClick={() => console.log('Vip Club clicked')} index={0} />
          <SidebarButton icon={FiBook} label="Blog" onClick={() => console.log('Blog clicked')} index={1} />
          <SidebarButton icon={FiMonitor} label="Casino" onClick={() => console.log('Casino clicked')} index={2} />
          <SidebarButton icon={FiGift} label="Slots" onClick={() => console.log('Slots clicked')} index={3} />
        </SidebarButtonGroup>

        {/* Group 2 */}
        <SidebarButtonGroup>
          <SidebarButton
            icon={FiVideo}
            label="Live Casino"
            onClick={() => console.log('Live Casino clicked')}
            index={4}
          />
          <SidebarButton icon={FiPlay} label="Sportsbook" onClick={() => console.log('Sportsbook clicked')} index={5} />
          <SidebarButton icon={FiStar} label="Exclusive" onClick={() => console.log('Exclusive clicked')} index={6} />
          <SidebarButton
            icon={FiMonitor}
            label="Virtual Sports"
            onClick={() => console.log('Virtual Sports clicked')}
            index={7}
          />
          <SidebarButton
            icon={FiAward}
            label="Tournaments"
            onClick={() => console.log('Tournaments clicked')}
            index={8}
          />
        </SidebarButtonGroup>

        {/* Logout */}
        <SidebarButtonGroup>
          <SidebarButton icon={FiLogOut} label="Logout" onClick={() => console.log('Logout clicked')} index={9} />
        </SidebarButtonGroup>
      </nav>
    </aside>
  )
}
