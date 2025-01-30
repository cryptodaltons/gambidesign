import React, { useState } from 'react';
import styles from './ChatSidebar.module.css';

export const ChatSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, newMessage.trim()]);
      setNewMessage('');
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.header}>
        <button onClick={toggleSidebar} className={styles.toggleButton}>
          {isOpen ? '>' : '<'}
        </button>
        <h2 className={styles.title}>Chat</h2>
      </div>
      <div className={styles.messages}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={styles.message}>
              {msg}
            </div>
          ))
        ) : (
          <div className={styles.noMessages}>No messages yet</div>
        )}
      </div>
      <div className={styles.inputSection}>
        <input
          type="text"
          className={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </aside>
  );
};
