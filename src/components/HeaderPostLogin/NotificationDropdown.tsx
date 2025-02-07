// NotificationDropdown.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './notificationDropdown.module.css';

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
}

interface NotificationDropdownProps {
  notifications: Notification[];
  anchorRect: DOMRect | null;
  onClearAll?: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  anchorRect,
  onClearAll,
}) => {
  if (!anchorRect) return null;

  // Use a smaller width and less vertical spacing.
  const DROPDOWN_WIDTH = 320;
  const verticalMargin = 8;

  // Compute the fixed position relative to the notifications button.
  const style: React.CSSProperties = {
    position: 'fixed',
    top: anchorRect.bottom + verticalMargin,
    left: anchorRect.right - DROPDOWN_WIDTH,
    width: DROPDOWN_WIDTH,
  };

  return ReactDOM.createPortal(
    <div className={styles.dropdownContainer} style={style}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Notifications</span>
        <button className={styles.clearAllButton} onClick={onClearAll}>
          Clear
        </button>
      </div>
      <div className={styles.divider} />
      <div className={styles.notificationsContent}>
        {notifications.length === 0 ? (
          <div className={styles.noNotifications}>
            <div className={styles.noNotificationsTitle}>
              No Notifications Available
            </div>
            <div className={styles.noNotificationsDescription}>
              Your interactions will be visible here
            </div>
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className={styles.notificationItem}>
              <div className={styles.textContent}>
                <div className={styles.notificationTitle}>
                  {notification.title}
                </div>
                <div className={styles.notificationMessage}>
                  {notification.message}
                </div>
              </div>
              <div className={styles.notificationTime}>
                {notification.time}
              </div>
            </div>
          ))
        )}
      </div>
    </div>,
    document.body
  );
};
