import React from 'react';
import { Logo } from '../Logo/Logo';
import { Wallet } from './Wallet';
import { useSidebarContext } from '../../context/SidebarContext/useSidebarContext';
import headerStyles from './HeaderPostLogin.module.css';

interface PostRegisterHeaderProps {
  toggleChat: () => void;
}

export const PostRegisterHeader: React.FC<PostRegisterHeaderProps> = ({ toggleChat }) => {
  const { isOpen } = useSidebarContext();

  return (
    <header
      className={`${headerStyles.header} ${
        isOpen ? headerStyles.sidebarOpen : headerStyles.sidebarClosed
      }`}
    >
      <div className={headerStyles.headerContainer}>
        <div className={headerStyles.leftSection} />
        <div className={headerStyles.midSection}>
          <div className={headerStyles.logoLeft}>
            <Logo />
          </div>
          <div className={headerStyles.walletCenter}>
            <Wallet />
          </div>
          <div className={headerStyles.iconsContainer}>
            <button
              className={headerStyles.iconButton}
              onClick={() => console.log('Notifications clicked')}
              aria-label="Notifications"
            >
              <img src="/images/bellVector.svg" alt="Notifications" className={headerStyles.icon} />
            </button>

            <button
              className={headerStyles.iconButton}
              onClick={() => console.log('Account clicked')}
              aria-label="Account"
            >
              <img src="/images/userVector.svg" alt="Account" className={headerStyles.icon} />
            </button>

            <button
              className={headerStyles.iconButton}
              onClick={toggleChat} // Toggle Chat Sidebar
              aria-label="Chat"
            >
              <img src="/images/chatVector.svg" alt="Chat" className={headerStyles.icon} />
            </button>
          </div>
        </div>
        <div className={headerStyles.rightSection} />
      </div>
    </header>
  );
};
