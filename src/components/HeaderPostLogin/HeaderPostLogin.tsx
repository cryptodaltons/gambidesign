// HeaderPostLogin.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Logo } from '../Logo/Logo';
import { Wallet } from './Wallet';
import { useSidebarContext } from '../../context/SidebarContext/useSidebarContext';
import headerStyles from './HeaderPostLogin.module.css';
import { NotificationDropdown, Notification } from './NotificationDropdown';

interface PostRegisterHeaderProps {
  toggleChat: () => void;
  isChatOpen: boolean;
  onWalletClick: () => void;
}

const notificationsSample: Notification[] = [
  {
    id: 1,
    title: 'Welcome',
    message: 'Thanks for joining us!',
    time: 'Just now',
    isRead: false,
  },
  {
    id: 2,
    title: 'Update',
    message: 'New features are available.',
    time: '5 mins ago',
    isRead: true,
  },
  {
    id: 3,
    title: 'Reminder',
    message: 'Your subscription renews soon.',
    time: '1 hr ago',
    isRead: false,
  },
];

export const PostRegisterHeader: React.FC<PostRegisterHeaderProps> = ({
  toggleChat,
  isChatOpen,
  onWalletClick,
}) => {
  const { isOpen } = useSidebarContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showNotifications && notificationButtonRef.current) {
      setAnchorRect(notificationButtonRef.current.getBoundingClientRect());
    }
  }, [showNotifications]);

  const handleClearAll = () => {
    console.log('Clear all notifications');
  };

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
            <Wallet onWalletButtonClick={onWalletClick} />
          </div>
          <div className={headerStyles.iconsContainer}>
            {/* Notifications Icon with Dropdown rendered via Portal */}
            <div>
              <button
                ref={notificationButtonRef}
                className={headerStyles.iconButton}
                onClick={() => setShowNotifications((prev) => !prev)}
                aria-label="Notifications"
              >
                <img
                  src="/images/bellVector.svg"
                  alt="Notifications"
                  className={headerStyles.icon}
                />
              </button>
              {showNotifications && (
                <NotificationDropdown
                  notifications={notificationsSample}
                  anchorRect={anchorRect}
                  onClearAll={handleClearAll}
                />
              )}
            </div>
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
