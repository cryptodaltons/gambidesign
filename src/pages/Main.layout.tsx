import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { PostRegisterHeader } from '../components/HeaderPostLogin/HeaderPostLogin';
import { useSidebarContext } from '../context/SidebarContext/useSidebarContext';
import { Footer } from '../components/Footer/Footer';
import { ChatSidebar } from '../components/ChatSidebar/ChatSidebar';
import { useEffect, useRef, useState } from 'react';
import { Modal } from '../components/Modal/Modal';

export const MainLayout = () => {
  const sidebarContext = useSidebarContext();
  const backgroundRef = useRef<HTMLImageElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  // State to control the wallet modal
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

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
    setIsChatOpen(!isChatOpen);
  };

  // Handler to open the wallet modal (to be triggered from the Wallet button)
  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  // Handler to close the wallet modal
  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <>
      <Sidebar />
      {/* Pass openWalletModal as onWalletClick */}
      <PostRegisterHeader
        toggleChat={toggleChat}
        isChatOpen={isChatOpen}
        onWalletClick={openWalletModal}
      />
      <ChatSidebar isOpen={isChatOpen} toggleChat={toggleChat} />

      {/* Main Content Wrapper */}
      <div
        className={`relative flex-1 flex flex-col pt-[70px] transition-all duration-300 ${
          sidebarContext.isOpen ? 'ml-[150px]' : 'ml-[60px]'
        } ${isChatOpen ? 'mr-[225px]' : ''}`}
      >
        {/* Background Image */}
        <div className="absolute z-[-1] top-0 left-0 w-full h-full overflow-hidden">
          <img
            src="website_background.png"
            className="absolute z-[-1] top-0 left-0 h-full w-full object-cover object-top"
            ref={backgroundRef}
            alt="Background"
          />
        </div>

        {/* Page Content */}
        <div>
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Wallet Modal rendered at the layout level */}
      <Modal isOpen={isWalletModalOpen} onClose={closeWalletModal}>
        <div>
          <h2>Wallet Modal</h2>
          <p>This is the wallet modal content.</p>
          {/* You can add more wallet-related content here if needed */}
        </div>
      </Modal>
    </>
  );
};
