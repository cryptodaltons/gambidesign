import React from 'react';
import { Logo } from '../Logo/Logo';
import { Wallet } from './Wallet';
import { useSidebarContext } from '../../context/SidebarContext/useSidebarContext';
import headerStyles from './HeaderPostLogin.module.css';

interface PostRegisterHeaderProps {
  toggleChat: () => void;
  isChatOpen: boolean;
  onWalletClick: () => void; // New prop to handle wallet button clicks
}

export const PostRegisterHeader: React.FC<PostRegisterHeaderProps> = ({
  toggleChat,
  isChatOpen,
  onWalletClick,
}) => {
  const { isOpen } = useSidebarContext();

  return (
    <header
      className={`${headerStyles.header} ${
        isOpen ? headerStyles.sidebarOpen : headerStyles.sidebarClosed
      } ${isChatOpen ? 'mr-[250px]' : ''}`}
    >
      <div className={headerStyles.headerContainer}>
        <div className={headerStyles.leftSection} />
        <div className={headerStyles.midSection}>
          <div className={headerStyles.logoLeft}>
            <Logo />
          </div>
          <div className={headerStyles.walletCenter}>
            {/* Pass the onWalletClick handler to Wallet */}
            <Wallet onWalletButtonClick={onWalletClick} />
          </div>
          <div className={headerStyles.iconsContainer}>
            {/* Notification Icon */}
            <button
              className={headerStyles.iconButton}
              onClick={() => console.log('Notifications clicked')}
              aria-label="Notifications"
            >
              <img
                src="/images/bellVector.svg"
                alt="Notifications"
                className={headerStyles.icon}
              />
            </button>

            {/* Profile Icon */}
            <button
              className={headerStyles.iconButton}
              onClick={() => console.log('Account clicked')}
              aria-label="Account"
            >
              <img
                src="/images/userVector.svg"
                alt="Account"
                className={headerStyles.icon}
              />
            </button>

            {/* Chat Toggle Button */}
            <button
              className={headerStyles.iconButton}
              onClick={toggleChat}
              aria-label="Chat"
            >
              <img
                src="/images/chatVector.svg"
                alt="Chat"
                className={headerStyles.icon}
              />
            </button>
          </div>
        </div>
        <div className={headerStyles.rightSection} />
      </div>
    </header>
  );
};
