import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { PostRegisterHeader } from '../components/HeaderPostLogin/HeaderPostLogin';
import { useSidebarContext } from '../context/SidebarContext/useSidebarContext';
import { Footer } from '../components/Footer/Footer';
import { ChatSidebar } from '../components/ChatSidebar/ChatSidebar';
import { useEffect, useRef, useState } from 'react';

export const MainLayout = () => {
  const sidebarContext = useSidebarContext();
  const backgroundRef = useRef<HTMLImageElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        backgroundRef.current.style.top = `${document.body.scrollTop * 0.5}px`;
      }
    };

    document.body.addEventListener('scroll', handleScroll);

    return () => {
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <>
      <Sidebar />
      <PostRegisterHeader toggleChat={toggleChat} />
      {isChatOpen && <ChatSidebar />} {/* Show chat sidebar when open */}
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
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
