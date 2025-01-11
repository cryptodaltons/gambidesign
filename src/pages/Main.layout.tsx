import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { useSidebarContext } from '../context/SidebarContext/useSidebarContext'
import { Footer } from '../components/Footer/Footer'
import { useEffect, useRef } from 'react'

export const MainLayout = () => {
  const sidebarContext = useSidebarContext()
  const backgroundRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    document.body.addEventListener('scroll', () => {
      if (!backgroundRef.current) {
        return
      }
      backgroundRef.current.style.top = `${document.body.scrollTop * 0.5}px`
    })
  }, [])

  return (
    <>
      <Sidebar />
      <Header />
      <div
        className={`relative flex-1 flex flex-col pt-[60px] ${
          sidebarContext.isOpen ? 'ml-[240px]' : 'ml-[60px]'
        } transition-all duration-300`}
      >
        <div className="absolute z-[-1] top-0 left-0 w-full h-full overflow-hidden">
          <img
            src="website_background.png"
            className="absolute z-[-1] top-0 left-0 h-full w-full object-cover object-top"
            ref={backgroundRef}
            alt="Background"
          />
        </div>
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
