import { FC, useState, useEffect } from 'react';
import styles from './WalletModal.module.css';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CurrencyData {
  code: string;
  icon: string;
  balance: number;
  isCrypto: boolean;
}

const walletData: CurrencyData[] = [
  { code: 'USD', icon: '/images/usd-icon.png', balance: 0.0, isCrypto: false },
  { code: 'BTC', icon: '/images/btc-icon.png', balance: 0.0, isCrypto: true },
  { code: 'ETH', icon: '/images/eth-icon.png', balance: 0.0, isCrypto: true },
  { code: 'LTC', icon: '/images/ltc-icon.png', balance: 0.01, isCrypto: true },
  { code: 'TRX', icon: '/images/trx-icon.png', balance: 0.01, isCrypto: true },
  { code: 'XRP', icon: '/images/xrp-icon.png', balance: 0.0, isCrypto: true },
  { code: 'DOGE', icon: '/images/doge-icon.png', balance: 0.0, isCrypto: true },
];

const currencyNames: Record<string, string> = {
  USD: 'US Dollar',
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  LTC: 'Litecoin',
  TRX: 'Tron',
  XRP: 'Ripple',
  DOGE: 'Dogecoin',
  SOL: 'Solana',
};

// Data for deposit-specific cryptocurrencies (only 4 are shown per your descriptor)
interface DepositCurrency {
  code: string;
  name: string;
  icon: string;
  color: string;
}
const depositCurrencies: DepositCurrency[] = [
  { code: 'BTC', name: 'Bitcoin', icon: '/images/btc-icon.png', color: '#F7931A' },
  { code: 'ETH', name: 'Ethereum', icon: '/images/eth-icon.png', color: '#627EEA' },
  { code: 'LTC', name: 'Litecoin', icon: '/images/ltc-icon.png', color: 'silver' },
];

export const WalletModal: FC<WalletModalProps> = ({ isOpen, onClose }) => {
  // Local state to switch between wallet view and deposit view.
  const [isDepositView, setDepositView] = useState(false);

  // State for the deposit view’s cryptocurrency selector
  const [selectedCrypto, setSelectedCrypto] = useState<DepositCurrency>(depositCurrencies[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy deposit address (could be generated dynamically)
  const depositAddress = "1A2b3C4d5E6f7G8H9I0";

  // Reset deposit view state when the modal is closed/opened
  useEffect(() => {
    if (!isOpen) {
      setDepositView(false);
      setShowDropdown(false);
      setSearchQuery('');
    }
  }, [isOpen]);

  // Filter available deposit currencies based on search input.
  const filteredCurrencies = depositCurrencies.filter(currency =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Copy deposit address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className={styles.modalHeader}>
          <div className={styles.titleContainer}>
            {isDepositView && (
              <button
                className={styles.goBackButton}
                onClick={() => setDepositView(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={styles.goBackIcon}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              
              viewBox="0 0 969.486 969.486"
              fill="currentColor"
              className={styles.walletIcon}
            >
              <path
                fillRule="evenodd"
                d="M806.582,235.309L766.137,87.125l-137.434,37.51L571.451,9.072L114.798,235.309H0v725.105h907.137V764.973h62.35v-337.53    h-62.352V235.309H806.582z M718.441,170.63l17.654,64.68h-52.561h-75.887h-126.19l111.159-30.339l66.848-18.245L718.441,170.63z     M839.135,892.414H68V522.062v-129.13v-10.233v-69.787v-9.602h35.181h27.538h101.592h409.025h75.889h37.43h35.242h35.244h13.994    v51.272v72.86h-15.357h-35.244h-87.85H547.508h-55.217v27.356v75.888v8.758v35.244v35.244v155.039h346.846v127.441H839.135z     M901.486,696.973h-28.352h-34H560.291V591.375v-35.244v-35.244v-23.889v-1.555h3.139h90.086h129.129h56.492h34h4.445h23.904    V696.973z M540.707,100.191l21.15,42.688l-238.955,65.218L540.707,100.191z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className={styles.title}>
              {isDepositView ? 'Wallet / Deposit' : 'Wallet'}
            </h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </header>

        {isDepositView ? (
          // =========================
          // Deposit Modal Content
          // =========================
          <div className={styles.depositContent}>
            {/* Cryptocurrency Selection */}
            <section className={styles.cryptoSelectionSection}>
              <div 
                className={styles.cryptoSelector} 
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src={selectedCrypto.icon}
                  alt={`${selectedCrypto.name} icon`}
                  className={styles.currencyIcon}
                  style={{ backgroundColor: selectedCrypto.color }}
                />
                <span className={styles.currencyCode}>
                  {selectedCrypto.code} ({selectedCrypto.name})
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={styles.dropdownArrow}
                  style={{ width: 20, height: 20 }}
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </div>

              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <input
                    type="text"
                    placeholder="Search cryptocurrency"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                  <div className={styles.dropdownList}>
                    {filteredCurrencies.map((currency) => (
                      <div
                        key={currency.code}
                        className={styles.dropdownItem}
                        onClick={() => {
                          setSelectedCrypto(currency);
                          setShowDropdown(false);
                        }}
                      >
                        <img
                          src={currency.icon}
                          alt={`${currency.name} icon`}
                          className={styles.currencyIcon}
                          style={{ backgroundColor: currency.color }}
                        />
                        <span>
                          {currency.code} - {currency.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Deposit Address Section */}
            <section className={styles.depositAddressSection}>
              <p className={styles.depositAddressLabel}>
                Your {selectedCrypto.code} deposit address
              </p>
              <div className={styles.depositAddressContainer}>
                <input
                  type="text"
                  value={depositAddress}
                  readOnly
                  className={styles.depositAddressInput}
                />
                <button className={styles.copyButton} onClick={copyAddress}>
                  Copy
                </button>
              </div>
              
              <div className={styles.qrContainer}>
                {/* Replace the src with a real QR code image when available */}
                <img src="/images/mock-qr.png" alt="QR Code" className={styles.qrImage} />
              </div>
              
              <p className={styles.qrInfo}>
                Only send {selectedCrypto.code} to this address, 3 confirmations required.
              </p>
            </section>

            {/* Security & 2FA Section */}
            <section className={styles.depositSecuritySection}>
              <p className={styles.securityNotice}>
                Improve your account security with Two-Factor Authentication
              </p>
              <button className={styles.enable2FAButton}>Enable 2FA</button>
            </section>
          </div>
        ) : (
          // =========================
          // Original Wallet Modal Content
          // =========================
          <>
            {/* Currency List */}
            <section className={styles.currencySection}>
              <h3 className={styles.sectionTitle}>Your Currencies</h3>
              <div className={styles.currencyContainer}>
                <div className={styles.currencyList}>
                  {walletData.map((currency, index) => (
                    <div key={index} className={styles.currencyRow}>
                      <div className={styles.currencyInfo}>
                        <img
                          src={currency.icon}
                          alt={`${currency.code} icon`}
                          className={styles.currencyIcon}
                        />
                        <div className={styles.currencyText}>
                          <span className={styles.currencyCode}>
                            {currency.code}
                          </span>
                          <span className={styles.currencyLabel}>
                            {currencyNames[currency.code]}
                          </span>
                        </div>
                      </div>
                      <div className={styles.balanceInfo}>
                        <span className={styles.balanceValue}>
                          {currency.isCrypto
                            ? currency.balance.toFixed(8)
                            : currency.balance.toFixed(2)}{' '}
                          {currency.code}
                        </span>
                        {currency.isCrypto && (
                          <span className={styles.usdValue}>$0.00 USD</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <section className={styles.actionsSection}>
              <button
                className={`${styles.actionButton} ${styles.primary}`}
                onClick={() => setDepositView(true)}
              >
                Deposit
              </button>
              <button className={`${styles.actionButton} ${styles.primary}`}>
                Withdraw
              </button>
              <button className={`${styles.actionButton} ${styles.secondary}`}>
                Buy Crypto
              </button>
              <button className={`${styles.actionButton} ${styles.secondary}`}>
                Tip
              </button>
            </section>

            {/* Security Notice */}
            <section className={styles.securitySection}>
              <p className={styles.securityNotice}>
                For enhanced security, please enable Two-Factor Authentication (2FA).
              </p>
              <button className={styles.enable2FAButton}>Enable 2FA</button>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
