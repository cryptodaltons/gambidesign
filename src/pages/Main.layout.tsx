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
        setIsChatOpen(!isChatOpen);
    };

    return (
        <>
            <Sidebar />
            <PostRegisterHeader toggleChat={toggleChat} isChatOpen={isChatOpen} />
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
        </>
    );
};
