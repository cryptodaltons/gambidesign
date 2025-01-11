import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { useSidebarContext } from '../context/SidebarContext/useSidebarContext'
import { Footer } from '../components/Footer/Footer'

import parallaxStyles from '../styles/Parallax.module.css'

export const MainLayout = () => {
  const sidebarContext = useSidebarContext()

  return (
    <>
      <Sidebar />
      <Header />
      <div className={parallaxStyles['parallax-wrapper']}>
        <div className={`${parallaxStyles['parallax-container']}`}>
          <div className={parallaxStyles['foreground']}>
            <div
              className={`${parallaxStyles['parallax-container']} flex-1 flex flex-col pt-[60px] ${
                sidebarContext.isOpen ? 'ml-[240px]' : 'ml-[60px]'
              } transition-all duration-300`}
            >
              <div className={parallaxStyles['background']}>
                <img src="website_background.png" className="h-full w-full" alt="Background" />
              </div>
              <Outlet />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
