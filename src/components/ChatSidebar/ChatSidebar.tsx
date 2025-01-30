// ChatSidebar.tsx

import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatSidebar.module.css';

/** Mock languages for demonstration. */
const languages = [
  { name: 'English', flagUrl: 'https://flagcdn.com/gb.svg' },
  { name: 'Español', flagUrl: 'https://flagcdn.com/es.svg' },
  { name: 'Deutsch', flagUrl: 'https://flagcdn.com/de.svg' },
  { name: 'Français', flagUrl: 'https://flagcdn.com/fr.svg' },
];

interface Message {
  username: string;
  text: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  toggleChat: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState<Message[]>([
    { username: 'Alice', text: "Hey, how's it going?" },
    { username: 'Bob', text: 'Not bad! Just checking this chat.' },
    { username: 'Charlie', text: 'Looks nice!' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever 'messages' changes
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        { username: 'You', text: newMessage.trim() }
      ]);
      setNewMessage('');
    }
  };

  // Toggle the language dropdown
  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Select a language from dropdown
  const handleSelectLanguage = (lang: typeof languages[number]) => {
    setCurrentLanguage(lang);
    setDropdownOpen(false);
  };

  // Example “username clicked” handler
  const handleUsernameClick = (username: string) => {
    alert(`Clicked on username: ${username}`);
  };

  return (
    <aside className={`${styles.chatSidebar} ${isOpen ? styles.open : styles.closed}`}>
      {/* ---------- TOP BAR ---------- */}
      <div className={styles.topBar}>
        {/* Language selector */}
        <div className={styles.languageContainer} onClick={handleToggleDropdown}>
          <div
            className={styles.flagIcon}
            style={{ backgroundImage: `url(${currentLanguage.flagUrl})` }}
          />
          <span className={styles.languageLabel}>
            Chat: {currentLanguage.name}
          </span>
          <button className={styles.expandIcon}>▾</button>
        </div>
        {/* Popout Icon (just a placeholder) */}
        <button className={styles.popoutIcon} title="Pop out chat">
          ↗
        </button>
        {/* Close icon */}
        <button className={styles.closeIcon} onClick={toggleChat}>
          ✖
        </button>
        {/* Dropdown */}
        <div className={`${styles.dropdown} ${dropdownOpen ? styles.active : ''}`}>
          {languages.map((lang) => (
            <div
              key={lang.name}
              className={styles.dropdownItem}
              onClick={() => handleSelectLanguage(lang)}
            >
              <div
                className={styles.dropdownFlag}
                style={{ backgroundImage: `url(${lang.flagUrl})` }}
              />
              <span>{lang.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- MESSAGES AREA ---------- */}
      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.chatMessage} ${msg.username === 'You' ? styles.self : ''}`}
          >
            {/* A header row for rank icon & username */}
            <div className={styles.messageHeader}>
              <span className={styles.rankIcon} />
              <span
                className={styles.username}
                onClick={() => handleUsernameClick(msg.username)}
              >
                {msg.username}:
              </span>
            </div>
            {/* The text below, which wraps onto new lines if it's long */}
            <div className={styles.messageText}>{msg.text}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* ---------- BOTTOM BOX (two rows) ---------- */}
      <div className={styles.bottomBox}>
        {/* Top row: input & emoji */}
        <div className={styles.topRow}>
          <button className={styles.emojiButton} title="Open emojis">
            😊
          </button>
          <input
            type="text"
            className={styles.chatInput}
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
        </div>
        {/* Bottom row: smaller "Online" count, rules icon, send button */}
        <div className={styles.bottomRow}>
          <span className={styles.onlineCount}>Online: 48,983</span>
          <button className={styles.rulesButton}>
            <span className={styles.rulesIcon} />
          </button>
          <button className={styles.sendButton} onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </aside>
  );
};
