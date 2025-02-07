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

// Example wallet data
const walletData: CurrencyData[] = [
  { code: 'USD', icon: '/images/usd-icon.png', balance: 0.0, isCrypto: false },
  { code: 'BTC', icon: '/images/btc-icon.png', balance: 0.0, isCrypto: true },
  { code: 'ETH', icon: '/images/eth-icon.png', balance: 0.0, isCrypto: true },
  { code: 'LTC', icon: '/images/ltc-icon.png', balance: 0.01, isCrypto: true },
  { code: 'TRX', icon: '/images/trx-icon.png', balance: 0.01, isCrypto: true },
  { code: 'XRP', icon: '/images/xrp-icon.png', balance: 0.0, isCrypto: true },
  { code: 'DOGE', icon: '/images/doge-icon.png', balance: 0.0, isCrypto: true },
];

// Currency name map
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

// Deposit currency data
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

// Fiat deposit currencies (example)
const fiatCurrencies: DepositCurrency[] = [
  { code: 'TRY', name: 'Turkish Lira', icon: '/images/try-icon.png', color: '#E6C100' },
];

// Network type for crypto
interface CryptoNetwork {
  code: string;
  name: string;
}

// Mapping from crypto code to networks
const networkMapping: Record<string, CryptoNetwork[]> = {
  BTC: [
    { code: 'BTC', name: 'Bitcoin Network' },
    { code: 'LN', name: 'Lightning Network' },
  ],
  ETH: [
    { code: 'ERC20', name: 'Ethereum (ERC20)' },
    { code: 'BSC', name: 'Binance Smart Chain (BEP20)' },
  ],
  LTC: [{ code: 'LTC', name: 'Litecoin Network' }],
  TRY: [{ code: 'BANK', name: 'Bank Transfer' }],
};

// Some arrays for Day/Month/Year
const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const currentYear = new Date().getFullYear();
const years: string[] = [];
for (let y = 1940; y <= currentYear; y++) {
  years.push(y.toString());
}

// Phone region codes
const phoneRegions = [
  { code: '+90', label: 'Turkey (+90)' },
  { code: '+1', label: 'USA (+1)' },
  { code: '+44', label: 'UK (+44)' },
];

// Payment methods for fiat deposit/withdraw
const paymentMethods: Record<string, string[]> = {
  havale: ['Hizli Havale', 'Aninda Banka'],
  sanal: ['Pay CO', 'PayFix', 'Hizli PAPARA', 'Aninda MFT'],
  kredi: ['Hizli Kredi Karti', 'Aninda Kredi Karti'],
  qr: ['Aninda QR'],
};

export const WalletModal: FC<WalletModalProps> = ({ isOpen, onClose }) => {
  // Overall modal view states
  const [isDepositView, setDepositView] = useState(false);
  const [isWithdrawView, setWithdrawView] = useState(false);

  // ---------------- DEPOSIT STATES ----------------
  // --- Deposit (Crypto) States ---
  const [selectedCrypto, setSelectedCrypto] = useState<DepositCurrency>(depositCurrencies[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const initialDepositNetworks = networkMapping[depositCurrencies[0].code] || [];
  const [selectedDepositNetwork, setSelectedDepositNetwork] = useState<CryptoNetwork>(
    initialDepositNetworks[0]
  );
  const [showDepositNetworkDropdown, setShowDepositNetworkDropdown] = useState(false);
  const [depositNetworkSearchQuery, setDepositNetworkSearchQuery] = useState('');

   // ---------------- TIP STATES ----------------
  const [isTipView, setTipView] = useState(false);
  const [selectedTipCurrency, setSelectedTipCurrency] = useState<DepositCurrency>(depositCurrencies[0]);
  const [tipDropdownVisible, setTipDropdownVisible] = useState(false);
  const [tipSearchQuery, setTipSearchQuery] = useState('');
  const [tipUsername, setTipUsername] = useState('');
  const [tipAmount, setTipAmount] = useState('');


  // --- Deposit (Fiat) States ---
  // Tab system for deposit: "crypto" vs. "fiat"
  const [selectedDepositSection, setSelectedDepositSection] = useState<'crypto' | 'fiat'>('crypto');
  // depositFiat steps: 0 = Activation Prompt, 1 = Activation Form, 2 = Select Fiat Currency, 3 = Payment Method
  const [fiatStep, setFiatStep] = useState(0);

  // Activation form state (for depositing fiat)
  const [activateTL, setActivateTL] = useState(false);
  const [nationalId, setNationalId] = useState('');
  // ID Expiration
  const [idExpDay, setIdExpDay] = useState('');
  const [idExpMonth, setIdExpMonth] = useState('');
  const [idExpYear, setIdExpYear] = useState('');
  // Phone
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPhoneRegion, setSelectedPhoneRegion] = useState(phoneRegions[0].code);

  // Day/Month/Year dropdown toggles
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  // Phone region dropdown
  const [showPhoneRegionDropdown, setShowPhoneRegionDropdown] = useState(false);

  // Fiat currency selection (fiatStep 2)
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState<DepositCurrency | null>(null);
  const [showFiatCurrencyDropdown, setShowFiatCurrencyDropdown] = useState(false);
  const [fiatSearchQuery, setFiatSearchQuery] = useState('');

  // Fiat payment method & amount (fiatStep 3)
  const [fiatPaymentOption, setFiatPaymentOption] = useState('');
  const [fiatDepositAmount, setFiatDepositAmount] = useState('');

  // ---------------- WITHDRAW STATES ----------------
  // Tab system for withdraw: "crypto" vs. "fiat"
  const [selectedWithdrawSection, setSelectedWithdrawSection] = useState<'crypto' | 'fiat'>('crypto');

  // Step system for fiat withdraw (similar to deposit):
  // 0 = Activation Prompt, 1 = Activation Form, 2 = Select Fiat Currency, 3 = Payment Method
  const [fiatWithdrawStep, setFiatWithdrawStep] = useState(0);

  // Activation form state (for withdrawing fiat)
  const [activateTLWithdraw, setActivateTLWithdraw] = useState(false);
  const [withdrawNationalId, setWithdrawNationalId] = useState('');
  // ID Expiration (withdraw)
  const [wIdExpDay, setWIdExpDay] = useState('');
  const [wIdExpMonth, setWIdExpMonth] = useState('');
  const [wIdExpYear, setWIdExpYear] = useState('');
  // Phone (withdraw)
  const [withdrawPhoneNumber, setWithdrawPhoneNumber] = useState('');
  const [selectedWithdrawPhoneRegion, setSelectedWithdrawPhoneRegion] = useState(phoneRegions[0].code);

  // Day/Month/Year dropdown toggles for withdraw
  const [showWithdrawDayDropdown, setShowWithdrawDayDropdown] = useState(false);
  const [showWithdrawMonthDropdown, setShowWithdrawMonthDropdown] = useState(false);
  const [showWithdrawYearDropdown, setShowWithdrawYearDropdown] = useState(false);
  // Phone region dropdown for withdraw
  const [showWithdrawPhoneRegionDropdown, setShowWithdrawPhoneRegionDropdown] = useState(false);

  // Fiat currency selection (withdraw)
  const [selectedFiatWithdrawCurrency, setSelectedFiatWithdrawCurrency] =
    useState<DepositCurrency | null>(null);
  const [showFiatWithdrawCurrencyDropdown, setShowFiatWithdrawCurrencyDropdown] = useState(false);
  const [fiatWithdrawSearchQuery, setFiatWithdrawSearchQuery] = useState('');

  // Payment method & amount for fiat withdraw
  const [fiatWithdrawPaymentOption, setFiatWithdrawPaymentOption] = useState('');
  const [fiatWithdrawAmount, setFiatWithdrawAmount] = useState('');

  // --- Crypto Withdraw states ---
  const initialWithdrawCrypto =
    depositCurrencies.find((c) => c.code === 'LTC') || depositCurrencies[0];
  const [withdrawSelectedCrypto, setWithdrawSelectedCrypto] =
    useState<DepositCurrency>(initialWithdrawCrypto);
  const [withdrawShowDropdown, setWithdrawShowDropdown] = useState(false);
  const [withdrawSearchQuery, setWithdrawSearchQuery] = useState('');
  const initialWithdrawNetworks = networkMapping[initialWithdrawCrypto.code] || [];
  const [selectedWithdrawNetwork, setSelectedWithdrawNetwork] =
    useState<CryptoNetwork>(initialWithdrawNetworks[0]);
  const [showWithdrawNetworkDropdown, setShowWithdrawNetworkDropdown] = useState(false);
  const [withdrawNetworkSearchQuery, setWithdrawNetworkSearchQuery] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const withdrawBalance = 0; // for demonstration

  // Dummy crypto deposit address
  const depositAddress = '1A2b3C4d5E6f7G8H9I0';

  // Validation for Fiat Activation Form (Deposit)
  const isFiatFormValid =
    activateTL &&
    nationalId.trim() !== '' &&
    idExpDay !== '' &&
    idExpMonth !== '' &&
    idExpYear !== '' &&
    phoneNumber.trim() !== '';

  // Validation for Fiat Activation Form (Withdraw)
  const isFiatWithdrawFormValid =
    activateTLWithdraw &&
    withdrawNationalId.trim() !== '' &&
    wIdExpDay !== '' &&
    wIdExpMonth !== '' &&
    wIdExpYear !== '' &&
    withdrawPhoneNumber.trim() !== '';

  // If modal closed, reset states
  useEffect(() => {
    if (!isOpen) {
      // Reset all states on close
      setDepositView(false);
      setWithdrawView(false);

      // Deposit states
      setShowDropdown(false);
      setSearchQuery('');
      setShowDepositNetworkDropdown(false);
      setDepositNetworkSearchQuery('');
      setSelectedDepositSection('crypto');
      setFiatStep(0);
      setActivateTL(false);
      setNationalId('');
      setIdExpDay('');
      setIdExpMonth('');
      setIdExpYear('');
      setPhoneNumber('');
      setShowDayDropdown(false);
      setShowMonthDropdown(false);
      setShowYearDropdown(false);
      setSelectedPhoneRegion(phoneRegions[0].code);
      setShowPhoneRegionDropdown(false);
      setFiatPaymentOption('');
      setFiatDepositAmount('');
      setSelectedFiatCurrency(null);
      setShowFiatCurrencyDropdown(false);
      setFiatSearchQuery('');

      // Withdraw states
      setWithdrawShowDropdown(false);
      setWithdrawSearchQuery('');
      setShowWithdrawNetworkDropdown(false);
      setWithdrawNetworkSearchQuery('');
      setWithdrawAmount('');
      setWithdrawAddress('');
      setSelectedWithdrawSection('crypto');
      setFiatWithdrawStep(0);
      setActivateTLWithdraw(false);
      setWithdrawNationalId('');
      setWIdExpDay('');
      setWIdExpMonth('');
      setWIdExpYear('');
      setWithdrawPhoneNumber('');
      setShowWithdrawDayDropdown(false);
      setShowWithdrawMonthDropdown(false);
      setShowWithdrawYearDropdown(false);
      setSelectedWithdrawPhoneRegion(phoneRegions[0].code);
      setShowWithdrawPhoneRegionDropdown(false);
      setFiatWithdrawPaymentOption('');
      setFiatWithdrawAmount('');
      setSelectedFiatWithdrawCurrency(null);
      setShowFiatWithdrawCurrencyDropdown(false);
      setFiatWithdrawSearchQuery('');

          // Reset tip states
      setTipView(false);
      setSelectedTipCurrency(depositCurrencies[0]);
      setTipDropdownVisible(false);
      setTipSearchQuery('');
      setTipUsername('');
      setTipAmount('');
    }
  }, [isOpen]);

  // --- Filtering Functions ---
  // Crypto deposit
  const filteredCurrencies = depositCurrencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const availableDepositNetworks = networkMapping[selectedCrypto.code] || [];
  const filteredDepositNetworks = availableDepositNetworks.filter((network) =>
    network.name.toLowerCase().includes(depositNetworkSearchQuery.toLowerCase()) ||
    network.code.toLowerCase().includes(depositNetworkSearchQuery.toLowerCase())
  );

  // Crypto withdraw
  const filteredWithdrawCurrencies = depositCurrencies.filter((currency) =>
    currency.name.toLowerCase().includes(withdrawSearchQuery.toLowerCase()) ||
    currency.code.toLowerCase().includes(withdrawSearchQuery.toLowerCase())
  );
  const availableWithdrawNetworks = networkMapping[withdrawSelectedCrypto.code] || [];
  const filteredWithdrawNetworks = availableWithdrawNetworks.filter((network) =>
    network.name.toLowerCase().includes(withdrawNetworkSearchQuery.toLowerCase()) ||
    network.code.toLowerCase().includes(withdrawNetworkSearchQuery.toLowerCase())
  );

  // Fiat (Deposit & Withdraw) 
  const filteredFiatCurrencies = fiatCurrencies.filter((fc) =>
    fc.name.toLowerCase().includes(fiatSearchQuery.toLowerCase()) ||
    fc.code.toLowerCase().includes(fiatSearchQuery.toLowerCase())
  );
  const filteredFiatWithdrawCurrencies = fiatCurrencies.filter((fc) =>
    fc.name.toLowerCase().includes(fiatWithdrawSearchQuery.toLowerCase()) ||
    fc.code.toLowerCase().includes(fiatWithdrawSearchQuery.toLowerCase())
  );

  // --- Clipboard Functions ---
  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
  };

  const pasteAddress = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setWithdrawAddress(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const isWithdrawDisabled =
    selectedWithdrawSection === 'crypto'
      ? !withdrawAmount ||
        parseFloat(withdrawAmount) <= 0 ||
        withdrawAddress.trim() === ''
      : // For fiat withdraw, disabled if no amount or out of range
        !fiatWithdrawAmount ||
        parseFloat(fiatWithdrawAmount) < 1000 ||
        parseFloat(fiatWithdrawAmount) > 30000 ||
        !fiatWithdrawPaymentOption;

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* We stop propagation on .modalContent so it does not close when clicked inside */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className={styles.modalHeader}>
          {(isDepositView || isWithdrawView || isTipView) && (
            <button
              className={styles.goBackButton}
              onClick={() => {
                setDepositView(false);
                setWithdrawView(false);
                setTipView(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={styles.goBackIcon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
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
              d="M806.582,235.309L766.137,87.125l-137.434,37.51L571.451,9.072L114.798,235.309H0v725.105h907.137V764.973h62.35v-337.53h-62.352V235.309H806.582z M718.441,170.63l17.654,64.68h-52.561h-75.887h-126.19l111.159-30.339l66.848-18.245L718.441,170.63z M839.135,892.414H68V522.062v-129.13v-10.233v-69.787v-9.602h35.181h27.538h101.592h409.025h75.889h37.43h35.242h35.244h13.994v51.272v72.86h-15.357h-35.244h-87.85H547.508h-55.217v27.356v75.888v8.758v35.244v35.244v155.039h346.846v127.441H839.135z M901.486,696.973h-28.352h-34H560.291V591.375v-35.244v-35.244v-23.889v-1.555h3.139h90.086h129.129h56.492h34h4.445h23.904V696.973z M540.707,100.191l21.15,42.688l-238.955,65.218L540.707,100.191z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className={styles.title}>
            {isDepositView
              ? 'Wallet / Deposit'
              : isWithdrawView
              ? 'Wallet / Withdraw'
              : isTipView
              ? 'Wallet / Tip'
              : 'Wallet'}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </header>

        {/* ---------------- Wallet Content ---------------- */}
        {isDepositView ? (
          <div className={styles.depositContent}>
            {/* Tabs: Crypto vs. Fiat (Deposit) */}
            <div className={styles.depositTabContainer}>
              <button
                className={`${styles.depositTabButton} ${
                  selectedDepositSection === 'crypto' ? styles.activeTab : ''
                }`}
                onClick={() => setSelectedDepositSection('crypto')}
              >
                Crypto
              </button>
              <button
                className={`${styles.depositTabButton} ${
                  selectedDepositSection === 'fiat' ? styles.activeTab : ''
                }`}
                onClick={() => setSelectedDepositSection('fiat')}
              >
                Fiat
              </button>
            </div>

            {selectedDepositSection === 'crypto' ? (
              <>
                {/* --- Crypto Deposit Section --- */}
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
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {showDropdown && (
                      <div
                        className={styles.dropdownMenu}
                        onClick={(e) => e.stopPropagation()}
                      >
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
                                const networks = networkMapping[currency.code] || [];
                                setSelectedDepositNetwork(networks[0]);
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
                  </div>
                </section>

                <p className={styles.dropdownTitle}>Network</p>
                <section className={styles.networkSelectionSection}>
                  <div
                    className={styles.networkSelector}
                    onClick={() =>
                      setShowDepositNetworkDropdown(!showDepositNetworkDropdown)
                    }
                  >
                    <span className={styles.networkName}>
                      {selectedDepositNetwork.code} ({selectedDepositNetwork.name})
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={styles.dropdownArrow}
                      style={{ width: 20, height: 20 }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {showDepositNetworkDropdown && (
                      <div
                        className={styles.dropdownMenu}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          placeholder="Search network"
                          value={depositNetworkSearchQuery}
                          onChange={(e) => setDepositNetworkSearchQuery(e.target.value)}
                          className={styles.searchInput}
                        />
                        <div className={styles.dropdownList}>
                          {filteredDepositNetworks.map((network) => (
                            <div
                              key={network.code}
                              className={styles.dropdownItem}
                              onClick={() => {
                                setSelectedDepositNetwork(network);
                                setShowDepositNetworkDropdown(false);
                              }}
                            >
                              <span>
                                {network.code} - {network.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

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
                    <img src="/images/mock-qr.png" alt="QR Code" className={styles.qrImage} />
                  </div>
                  <p className={styles.qrInfo}>
                    Only send {selectedCrypto.code} to this address. 3 confirmations required.
                  </p>
                </section>
                <section className={styles.depositSecuritySection}>
                  <p className={styles.securityNotice}>
                    Improve your account security with Two-Factor Authentication
                  </p>
                  <button className={styles.enable2FAButton}>Enable 2FA</button>
                </section>
              </>
            ) : (
              <>
                {/* --- Fiat Deposit Section --- */}
                {fiatStep === 0 && (
                  <div className={styles.fiatActivationPrompt}>
                    <h3>Activate Fiat Transactions</h3>
                    <p>Please complete your wallet setup to be able to make fiat transactions.</p>
                    <button
                      className={styles.activateFiatButton}
                      onClick={() => setFiatStep(1)}
                    >
                      Activate Fiat
                    </button>
                  </div>
                )}
                {fiatStep === 1 && (
                  <div className={styles.fiatActivationForm}>
                    <h3 className={styles.fiatTitle}>
                      You can use Turkish Lira to make transactions
                    </h3>
                    <p>
                      To use Fiat in addition to crypto, you need to provide extra information.
                      This is optional and you can activate it anytime.
                    </p>
                    <div className={styles.fiatFormContainer}>
                      <div className={styles.switchContainer}>
                        <span>Activate Turkish Lira</span>
                        <label className={styles.switch}>
                          <input
                            type="checkbox"
                            checked={activateTL}
                            onChange={(e) => setActivateTL(e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>
                      <label>
                        National Identification Number
                        <input
                          type="number"
                          value={nationalId}
                          onChange={(e) => setNationalId(e.target.value)}
                          placeholder="Enter your National ID"
                        />
                      </label>
                      <label>Expiration Date of your National ID card</label>
                      {/* Day / Month / Year in one row */}
                      <div className={styles.dayMonthYearRow}>
                        {/* Day Picker */}
                        <div
                          className={styles.dayMonthYearDropdown}
                          onClick={() => setShowDayDropdown(!showDayDropdown)}
                        >
                          <span className={styles.currencyCode}>
                            {idExpDay || 'Day'}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={styles.dropdownArrow}
                            style={{ width: 20, height: 20 }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {showDayDropdown && (
                            <div
                              className={styles.dropdownMenu}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className={styles.dropdownList}>
                                {days.map((dayValue) => (
                                  <div
                                    key={dayValue}
                                    className={styles.dropdownItem}
                                    onClick={() => {
                                      setIdExpDay(dayValue);
                                      setShowDayDropdown(false);
                                    }}
                                  >
                                    {dayValue}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Month Picker */}
                        <div
                          className={styles.dayMonthYearDropdown}
                          onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                        >
                          <span className={styles.currencyCode}>
                            {idExpMonth || 'Month'}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={styles.dropdownArrow}
                            style={{ width: 20, height: 20 }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {showMonthDropdown && (
                            <div
                              className={styles.dropdownMenu}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className={styles.dropdownList}>
                                {months.map((monthValue) => (
                                  <div
                                    key={monthValue}
                                    className={styles.dropdownItem}
                                    onClick={() => {
                                      setIdExpMonth(monthValue);
                                      setShowMonthDropdown(false);
                                    }}
                                  >
                                    {monthValue}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Year Picker */}
                        <div
                          className={styles.dayMonthYearDropdown}
                          onClick={() => setShowYearDropdown(!showYearDropdown)}
                        >
                          <span className={styles.currencyCode}>
                            {idExpYear || 'Year'}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={styles.dropdownArrow}
                            style={{ width: 20, height: 20 }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {showYearDropdown && (
                            <div
                              className={styles.dropdownMenu}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className={styles.dropdownList}>
                                {years.map((yearValue) => (
                                  <div
                                    key={yearValue}
                                    className={styles.dropdownItem}
                                    onClick={() => {
                                      setIdExpYear(yearValue);
                                      setShowYearDropdown(false);
                                    }}
                                  >
                                    {yearValue}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Phone Number + Region */}
                      <label style={{ marginTop: '10px' }}>Phone Number</label>
                      <div className={styles.phoneRegionRow}>
                        {/* Phone region dropdown */}
                        <div
                          className={styles.phoneRegionDropdown}
                          onClick={() =>
                            setShowPhoneRegionDropdown(!showPhoneRegionDropdown)
                          }
                        >
                          <span className={styles.currencyCode}>
                            {selectedPhoneRegion}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={styles.dropdownArrow}
                            style={{ width: 20, height: 20 }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {showPhoneRegionDropdown && (
                            <div
                              className={styles.dropdownMenu}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className={styles.dropdownList}>
                                {phoneRegions.map((region) => (
                                  <div
                                    key={region.code}
                                    className={styles.dropdownItem}
                                    onClick={() => {
                                      setSelectedPhoneRegion(region.code);
                                      setShowPhoneRegionDropdown(false);
                                    }}
                                  >
                                    {region.label}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <input
                          type="number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter your phone number"
                          className={styles.phoneNumberInput}
                        />
                      </div>
                    </div>
                    <button
                      className={styles.saveAndContinueButton}
                      onClick={() => setFiatStep(2)}
                      disabled={!isFiatFormValid}
                    >
                      Save and Continue
                    </button>
                  </div>
                )}
                {fiatStep === 2 && (
                  <div className={styles.fiatDepositOptionScreen}>
                    <h3>Select Fiat Currency</h3>
                    <div
                      className={styles.cryptoSelectionSection}
                      style={{ marginBottom: '15px' }}
                    >
                      <div
                        className={styles.cryptoSelector}
                        onClick={() => setShowFiatCurrencyDropdown(!showFiatCurrencyDropdown)}
                      >
                        {selectedFiatCurrency ? (
                          <>
                            <img
                              src={selectedFiatCurrency.icon}
                              alt={`${selectedFiatCurrency.name} icon`}
                              className={styles.currencyIcon}
                              style={{ backgroundColor: selectedFiatCurrency.color }}
                            />
                            <span className={styles.currencyCode}>
                              {selectedFiatCurrency.code} ({selectedFiatCurrency.name})
                            </span>
                          </>
                        ) : (
                          <span className={styles.currencyCode}>Select a currency</span>
                        )}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={styles.dropdownArrow}
                          style={{ width: 20, height: 20 }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {showFiatCurrencyDropdown && (
                          <div
                            className={styles.dropdownMenu}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="text"
                              placeholder="Search fiat currency"
                              value={fiatSearchQuery}
                              onChange={(e) => setFiatSearchQuery(e.target.value)}
                              className={styles.searchInput}
                            />
                            <div className={styles.dropdownList}>
                              {filteredFiatCurrencies.map((fc) => (
                                <div
                                  key={fc.code}
                                  className={styles.dropdownItem}
                                  onClick={() => {
                                    setSelectedFiatCurrency(fc);
                                    setShowFiatCurrencyDropdown(false);
                                  }}
                                >
                                  <img
                                    src={fc.icon}
                                    alt={`${fc.name} icon`}
                                    className={styles.currencyIcon}
                                    style={{ backgroundColor: fc.color }}
                                  />
                                  <span>
                                    {fc.code} - {fc.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      className={styles.depositFiatButton}
                      onClick={() => selectedFiatCurrency && setFiatStep(3)}
                      disabled={!selectedFiatCurrency}
                    >
                      Deposit
                    </button>
                  </div>
                )}
                {fiatStep === 3 && (
                  <div className={styles.fiatPaymentSelection}>
                    <h3 className={styles.fiatPaymentTitle}>
                      Deposit {selectedFiatCurrency?.code || 'Fiat'}
                    </h3>
                    {/* Payment method groups, with some design improvements */}
                    <div className={styles.paymentMethodGroup}>
                      <div className={styles.paymentMethodGroupHeader}>
                        <div className={styles.paymentMethodGroupTitle}>
                          <span className={styles.paymentMethodIcon}>💸</span> Havale
                        </div>
                      </div>
                      <div className={styles.fiatPaymentOptions}>
                        {paymentMethods.havale.map((option) => (
                          <button
                            key={option}
                            className={`${styles.paymentOptionButton} ${
                              fiatPaymentOption === option ? styles.selectedPaymentOption : ''
                            }`}
                            onClick={() => setFiatPaymentOption(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.paymentMethodGroup}>
                      <div className={styles.paymentMethodGroupHeader}>
                        <div className={styles.paymentMethodGroupTitle}>
                          <span className={styles.paymentMethodIcon}>💳</span> Sanal Cüzdan
                        </div>
                      </div>
                      <div className={styles.fiatPaymentOptions}>
                        {paymentMethods.sanal.map((option) => (
                          <button
                            key={option}
                            className={`${styles.paymentOptionButton} ${
                              fiatPaymentOption === option ? styles.selectedPaymentOption : ''
                            }`}
                            onClick={() => setFiatPaymentOption(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.paymentMethodGroup}>
                      <div className={styles.paymentMethodGroupHeader}>
                        <div className={styles.paymentMethodGroupTitle}>
                          <span className={styles.paymentMethodIcon}>🏦</span> Kredi Kartı
                        </div>
                      </div>
                      <div className={styles.fiatPaymentOptions}>
                        {paymentMethods.kredi.map((option) => (
                          <button
                            key={option}
                            className={`${styles.paymentOptionButton} ${
                              fiatPaymentOption === option ? styles.selectedPaymentOption : ''
                            }`}
                            onClick={() => setFiatPaymentOption(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.paymentMethodGroup}>
                      <div className={styles.paymentMethodGroupHeader}>
                        <div className={styles.paymentMethodGroupTitle}>
                          <span className={styles.paymentMethodIcon}>📱</span> QR
                        </div>
                      </div>
                      <div className={styles.fiatPaymentOptions}>
                        {paymentMethods.qr.map((option) => (
                          <button
                            key={option}
                            className={`${styles.paymentOptionButton} ${
                              fiatPaymentOption === option ? styles.selectedPaymentOption : ''
                            }`}
                            onClick={() => setFiatPaymentOption(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* After picking a payment method, show amount input */}
                    {fiatPaymentOption && (
                      <div className={styles.fiatAmountSelection}>
                        <h4>Deposit Amount</h4>
                        <div className={styles.presetAmounts}>
                          <button onClick={() => setFiatDepositAmount('1000')}>1,000</button>
                          <button onClick={() => setFiatDepositAmount('5000')}>5,000</button>
                          <button onClick={() => setFiatDepositAmount('30000')}>30,000</button>
                        </div>
                        <label>
                          Deposit Amount
                          <input
                            type="number"
                            value={fiatDepositAmount}
                            onChange={(e) => setFiatDepositAmount(e.target.value)}
                            placeholder="Enter amount"
                          />
                        </label>
                        <p>Minimum: TRY 1,000 &nbsp;&nbsp; Maximum: TRY 30,000</p>
                        <button
                          className={styles.finalFiatDepositButton}
                          onClick={() => {
                            alert(
                              `Depositing ${fiatDepositAmount} ${selectedFiatCurrency?.code} via ${fiatPaymentOption}`
                            );
                          }}
                          disabled={
                            !fiatDepositAmount ||
                            parseFloat(fiatDepositAmount) < 1000 ||
                            parseFloat(fiatDepositAmount) > 30000
                          }
                        >
                          Deposit
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ) : isWithdrawView ? (
          <div className={styles.withdrawContent}>
            {/* ---------------- Withdraw Tab System (Crypto / Fiat) ---------------- */}
            <div className={styles.depositTabContainer} style={{ marginBottom: '20px' }}>
              <button
                className={`${styles.depositTabButton} ${
                  selectedWithdrawSection === 'crypto' ? styles.activeTab : ''
                }`}
                onClick={() => setSelectedWithdrawSection('crypto')}
              >
                Crypto
              </button>
              <button
                className={`${styles.depositTabButton} ${
                  selectedWithdrawSection === 'fiat' ? styles.activeTab : ''
                }`}
                onClick={() => setSelectedWithdrawSection('fiat')}
              >
                Fiat
              </button>
            </div>

            {selectedWithdrawSection === 'crypto' ? (
              <>
                {/* ---------------- Crypto Withdraw Section ---------------- */}
                <section className={styles.cryptoSelectionSection}>
                  <div
                    className={styles.cryptoSelector}
                    onClick={() => setWithdrawShowDropdown(!withdrawShowDropdown)}
                  >
                    <div className={styles.cryptoSelectorContent}>
                      <div className={styles.cryptoLeft}>
                        <img
                          src={withdrawSelectedCrypto.icon}
                          alt={`${withdrawSelectedCrypto.name} icon`}
                          className={styles.currencyIcon}
                          style={{ backgroundColor: withdrawSelectedCrypto.color }}
                        />
                        <span className={styles.currencyCode}>
                          {withdrawSelectedCrypto.code} ({withdrawSelectedCrypto.name})
                        </span>
                      </div>
                      <div className={styles.cryptoBalance}>
                        <span className={styles.withdrawBalanceValue}>
                          {withdrawBalance.toFixed(8)} {withdrawSelectedCrypto.code}
                        </span>
                        <br />
                        <span className={styles.withdrawUsdValue}>$0.00 USD</span>
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={styles.dropdownArrow}
                      style={{ width: 20, height: 20 }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {withdrawShowDropdown && (
                      <div
                        className={styles.dropdownMenu}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          placeholder="Search cryptocurrency"
                          value={withdrawSearchQuery}
                          onChange={(e) => setWithdrawSearchQuery(e.target.value)}
                          className={styles.searchInput}
                        />
                        <div className={styles.dropdownList}>
                          {filteredWithdrawCurrencies.map((currency) => (
                            <div
                              key={currency.code}
                              className={styles.dropdownItem}
                              onClick={() => {
                                setWithdrawSelectedCrypto(currency);
                                const networks = networkMapping[currency.code] || [];
                                setSelectedWithdrawNetwork(networks[0]);
                                setWithdrawShowDropdown(false);
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
                  </div>
                </section>

                <p className={styles.dropdownTitle}>Network</p>
                <section className={styles.networkSelectionSection}>
                  <div
                    className={styles.networkSelector}
                    onClick={() =>
                      setShowWithdrawNetworkDropdown(!showWithdrawNetworkDropdown)
                    }
                  >
                    <span className={styles.networkName}>
                      {selectedWithdrawNetwork.code} ({selectedWithdrawNetwork.name})
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={styles.dropdownArrow}
                      style={{ width: 20, height: 20 }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {showWithdrawNetworkDropdown && (
                      <div
                        className={styles.dropdownMenu}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          placeholder="Search network"
                          value={withdrawNetworkSearchQuery}
                          onChange={(e) => setWithdrawNetworkSearchQuery(e.target.value)}
                          className={styles.searchInput}
                        />
                        <div className={styles.dropdownList}>
                          {filteredWithdrawNetworks.map((network) => (
                            <div
                              key={network.code}
                              className={styles.dropdownItem}
                              onClick={() => {
                                setSelectedWithdrawNetwork(network);
                                setShowWithdrawNetworkDropdown(false);
                              }}
                            >
                              <span>
                                {network.code} - {network.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <section className={styles.withdrawAmountSection}>
                  <label className={styles.withdrawAmountLabel}>Amount to withdraw *</label>
                  <div className={styles.withdrawAmountContainer}>
                    <input
                      type="number"
                      placeholder="0.00000000"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className={styles.withdrawAmountInput}
                    />
                    <button
                      className={styles.maxButton}
                      onClick={() => setWithdrawAmount(withdrawBalance.toString())}
                    >
                      Max
                    </button>
                  </div>
                  <div className={styles.balanceInfo}>
                    <span>
                      {withdrawBalance.toFixed(8)} {withdrawSelectedCrypto.code}
                    </span>
                  </div>
                </section>
                <section className={styles.withdrawAddressSection}>
                  <label className={styles.withdrawAddressLabel}>Withdraw to *</label>
                  <div className={styles.withdrawAddressContainer}>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      value={withdrawAddress}
                      onChange={(e) => setWithdrawAddress(e.target.value)}
                      className={styles.withdrawAddressInput}
                    />
                    <button className={styles.pasteButton} onClick={pasteAddress}>
                      Paste
                    </button>
                  </div>
                </section>
                <section className={styles.withdrawConditions}>
                  <p>Minimum withdrawal: $2.01</p>
                  <p>Transaction fee: $0.02 will be deducted</p>
                </section>
                <button
                  className={styles.withdrawActionButton}
                  disabled={isWithdrawDisabled}
                >
                  Withdraw
                </button>
                <section className={styles.securitySection}>
                  <p className={styles.securityNotice}>
                    Improve your account security with Two-Factor Authentication
                  </p>
                  <button className={styles.enable2FAButton}>Enable 2FA</button>
                </section>
              </>
            ) : (
              <>
                {/* ---------------- Fiat Withdraw Section ---------------- */}
                {fiatWithdrawStep === 0 && (
                  <div className={styles.fiatActivationPrompt}>
                    <h3>Activate Fiat Withdrawals</h3>
                    <p>Complete your wallet setup to enable fiat withdrawals.</p>
                    <button
                      className={styles.activateFiatButton}
                      onClick={() => setFiatWithdrawStep(1)}
                    >
                      Activate Fiat Withdraw
                    </button>
                  </div>
                )}
                {fiatWithdrawStep === 1 && (
                  <div className={styles.fiatActivationForm}>
                    <h3 className={styles.fiatTitle}>
                      Enable Turkish Lira Withdrawals
                    </h3>
                    <p>
                      Provide extra information to use fiat withdrawals.  
                      You can activate this at any time.
                    </p>
                    <div className={styles.fiatFormContainer}>
                      <div className={styles.switchContainer}>
                        <span>Activate Turkish Lira (Withdraw)</span>
                        <label className={styles.switch}>
                          <input
                            type="checkbox"
                            checked={activateTLWithdraw}
                            onChange={(e) => setActivateTLWithdraw(e.target.checked)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                      </div>
                      <label>
                        National Identification Number
                        <input
                          type="number"
                          value={withdrawNationalId}
                          onChange={(e) => setWithdrawNationalId(e.target.value)}
                          placeholder="Enter your National ID"
                        />
                      </label>
                      <label>Expiration Date of your National ID card</label>
                      {/* Day / Month / Year */}
                      <div className={styles.dayMonthYearRow}>
                        {/* Day Picker */}
                        <div
                          className={styles.dayMonthYearDropdown}
                          onClick={() => setShowWithdrawDayDropdown(!showWithdrawDayDropdown)}
                        >
                          <span className={styles.currencyCode}>
                            {wIdExpDay || 'Day'}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={styles.dropdownArrow}
                            style={{ width: 20, height: 20 }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {showWithdrawDayDropdown && (
                            <div
                              className={styles.dropdownMenu}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className={styles.dropdownList}>
                                {days.map((dayValue) => (
                                  <div
                                    key={dayValue}
                                    className={styles.dropdownItem}
                                    onClick={() => {
                                      setWIdExpDay(dayValue);
                                      setShowWithdrawDayDropdown(false);
                                    }}
                                  >
                                    {dayValue}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Month Picker */}
                        <div
                          className={styles.dayMonthYearDropdown}
                          onClick={() => setShowWithdrawMonthDropdown(!showWithdrawMonthDropdown)}
                        >
                          <span className={styles.currencyCode}>
                            {wIdExpMonth || 'Month'}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={styles.dropdownArrow}
                            style={{ width: 20, height: 20 }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {showWithdrawMonthDropdown && (
                            <div
                              className={styles.dropdownMenu}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className={styles.dropdownList}>
                                {months.map((monthValue) => (
                                  <div
                                    key={monthValue}
                                    className={styles.dropdownItem}
                                    onClick={() => {
                                      setWIdExpMonth(monthValue);
                                      setShowWithdrawMonthDropdown(false);
                                    }}
                                  >
                                    {monthValue}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Year Picker */}
                        <div
                          className={styles.dayMonthYearDropdown}
                          onClick={() => setShowWithdrawYearDropdown(!showWithdrawYearDropdown)}
                        >
                          <span className={styles.currencyCode}>
                            {wIdExpYear || 'Year'}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={styles.dropdownArrow}
                            style={{ width: 20, height: 20 }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {showWithdrawYearDropdown && (
                            <div
                              className={styles.dropdownMenu}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className={styles.dropdownList}>
                                {years.map((yearValue) => (
                                  <div
                                    key={yearValue}
                                    className={styles.dropdownItem}
                                    onClick={() => {
                                      setWIdExpYear(yearValue);
                                      setShowWithdrawYearDropdown(false);
                                    }}
                                  >
                                    {yearValue}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Phone Number + Region */}
                      <label style={{ marginTop: '10px' }}>Phone Number</label>
                      <div className={styles.phoneRegionRow}>
                        {/* Phone region dropdown */}
                        <div
                          className={styles.phoneRegionDropdown}
                          onClick={() =>
                            setShowWithdrawPhoneRegionDropdown(!showWithdrawPhoneRegionDropdown)
                          }
                        >
                          <span className={styles.currencyCode}>
                            {selectedWithdrawPhoneRegion}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={styles.dropdownArrow}
                            style={{ width: 20, height: 20 }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {showWithdrawPhoneRegionDropdown && (
                            <div
                              className={styles.dropdownMenu}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className={styles.dropdownList}>
                                {phoneRegions.map((region) => (
                                  <div
                                    key={region.code}
                                    className={styles.dropdownItem}
                                    onClick={() => {
                                      setSelectedWithdrawPhoneRegion(region.code);
                                      setShowWithdrawPhoneRegionDropdown(false);
                                    }}
                                  >
                                    {region.label}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <input
                          type="number"
                          value={withdrawPhoneNumber}
                          onChange={(e) => setWithdrawPhoneNumber(e.target.value)}
                          placeholder="Enter your phone number"
                          className={styles.phoneNumberInput}
                        />
                      </div>
                    </div>
                    <button
                      className={styles.saveAndContinueButton}
                      onClick={() => setFiatWithdrawStep(2)}
                      disabled={!isFiatWithdrawFormValid}
                    >
                      Save and Continue
                    </button>
                  </div>
                )}
                {fiatWithdrawStep === 2 && (
                  <div className={styles.fiatDepositOptionScreen}>
                    <h3>Select Fiat Currency</h3>
                    <div
                      className={styles.cryptoSelectionSection}
                      style={{ marginBottom: '15px' }}
                    >
                      <div
                        className={styles.cryptoSelector}
                        onClick={() =>
                          setShowFiatWithdrawCurrencyDropdown(!showFiatWithdrawCurrencyDropdown)
                        }
                      >
                        {selectedFiatWithdrawCurrency ? (
                          <>
                            <img
                              src={selectedFiatWithdrawCurrency.icon}
                              alt={`${selectedFiatWithdrawCurrency.name} icon`}
                              className={styles.currencyIcon}
                              style={{ backgroundColor: selectedFiatWithdrawCurrency.color }}
                            />
                            <span className={styles.currencyCode}>
                              {selectedFiatWithdrawCurrency.code} (
                              {selectedFiatWithdrawCurrency.name})
                            </span>
                          </>
                        ) : (
                          <span className={styles.currencyCode}>Select a currency</span>
                        )}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={styles.dropdownArrow}
                          style={{ width: 20, height: 20 }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {showFiatWithdrawCurrencyDropdown && (
                          <div
                            className={styles.dropdownMenu}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="text"
                              placeholder="Search fiat currency"
                              value={fiatWithdrawSearchQuery}
                              onChange={(e) => setFiatWithdrawSearchQuery(e.target.value)}
                              className={styles.searchInput}
                            />
                            <div className={styles.dropdownList}>
                              {filteredFiatWithdrawCurrencies.map((fc) => (
                                <div
                                  key={fc.code}
                                  className={styles.dropdownItem}
                                  onClick={() => {
                                    setSelectedFiatWithdrawCurrency(fc);
                                    setShowFiatWithdrawCurrencyDropdown(false);
                                  }}
                                >
                                  <img
                                    src={fc.icon}
                                    alt={`${fc.name} icon`}
                                    className={styles.currencyIcon}
                                    style={{ backgroundColor: fc.color }}
                                  />
                                  <span>
                                    {fc.code} - {fc.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      className={styles.depositFiatButton}
                      onClick={() => selectedFiatWithdrawCurrency && setFiatWithdrawStep(3)}
                      disabled={!selectedFiatWithdrawCurrency}
                    >
                      Withdraw
                    </button>
                  </div>
                )}
                {fiatWithdrawStep === 3 && (
                  <div className={styles.fiatPaymentSelection}>
                    <h3 className={styles.fiatPaymentTitle}>
                      Withdraw {selectedFiatWithdrawCurrency?.code || 'Fiat'}
                    </h3>
                    {/* Payment method groups (with some design improvements) */}
                    <div className={styles.paymentMethodGroup}>
                      <div className={styles.paymentMethodGroupHeader}>
                        <div className={styles.paymentMethodGroupTitle}>
                          <span className={styles.paymentMethodIcon}>💸</span> Havale
                        </div>
                      </div>
                      <div className={styles.fiatPaymentOptions}>
                        {paymentMethods.havale.map((option) => (
                          <button
                            key={option}
                            className={`${styles.paymentOptionButton} ${
                              fiatWithdrawPaymentOption === option
                                ? styles.selectedPaymentOption
                                : ''
                            }`}
                            onClick={() => setFiatWithdrawPaymentOption(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.paymentMethodGroup}>
                      <div className={styles.paymentMethodGroupHeader}>
                        <div className={styles.paymentMethodGroupTitle}>
                          <span className={styles.paymentMethodIcon}>💳</span> Sanal Cüzdan
                        </div>
                      </div>
                      <div className={styles.fiatPaymentOptions}>
                        {paymentMethods.sanal.map((option) => (
                          <button
                            key={option}
                            className={`${styles.paymentOptionButton} ${
                              fiatWithdrawPaymentOption === option
                                ? styles.selectedPaymentOption
                                : ''
                            }`}
                            onClick={() => setFiatWithdrawPaymentOption(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.paymentMethodGroup}>
                      <div className={styles.paymentMethodGroupHeader}>
                        <div className={styles.paymentMethodGroupTitle}>
                          <span className={styles.paymentMethodIcon}>🏦</span> Kredi Kartı
                        </div>
                      </div>
                      <div className={styles.fiatPaymentOptions}>
                        {paymentMethods.kredi.map((option) => (
                          <button
                            key={option}
                            className={`${styles.paymentOptionButton} ${
                              fiatWithdrawPaymentOption === option
                                ? styles.selectedPaymentOption
                                : ''
                            }`}
                            onClick={() => setFiatWithdrawPaymentOption(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={styles.paymentMethodGroup}>
                      <div className={styles.paymentMethodGroupHeader}>
                        <div className={styles.paymentMethodGroupTitle}>
                          <span className={styles.paymentMethodIcon}>📱</span> QR
                        </div>
                      </div>
                      <div className={styles.fiatPaymentOptions}>
                        {paymentMethods.qr.map((option) => (
                          <button
                            key={option}
                            className={`${styles.paymentOptionButton} ${
                              fiatWithdrawPaymentOption === option
                                ? styles.selectedPaymentOption
                                : ''
                            }`}
                            onClick={() => setFiatWithdrawPaymentOption(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* After picking a payment method, show amount input */}
                    {fiatWithdrawPaymentOption && (
                      <div className={styles.fiatAmountSelection}>
                        <h4>Withdraw Amount</h4>
                        <div className={styles.presetAmounts}>
                          <button onClick={() => setFiatWithdrawAmount('1000')}>1,000</button>
                          <button onClick={() => setFiatWithdrawAmount('5000')}>5,000</button>
                          <button onClick={() => setFiatWithdrawAmount('30000')}>30,000</button>
                        </div>
                        <label>
                          Withdraw Amount
                          <input
                            type="number"
                            value={fiatWithdrawAmount}
                            onChange={(e) => setFiatWithdrawAmount(e.target.value)}
                            placeholder="Enter amount"
                          />
                        </label>
                        <p>Minimum: TRY 1,000 &nbsp;&nbsp; Maximum: TRY 30,000</p>
                        <button
                          className={styles.finalFiatDepositButton}
                          onClick={() => {
                            alert(
                              `Withdrawing ${fiatWithdrawAmount} ${selectedFiatWithdrawCurrency?.code} via ${fiatWithdrawPaymentOption}`
                            );
                          }}
                          disabled={
                            !fiatWithdrawAmount ||
                            parseFloat(fiatWithdrawAmount) < 1000 ||
                            parseFloat(fiatWithdrawAmount) > 30000
                          }
                        >
                          Withdraw
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )  : isTipView ? (
          <div className={styles.tipContent}>
            {/* Crypto Currency Picker Dropdown */}
            <section className={styles.cryptoSelectionSection}>
              <div
                className={styles.cryptoSelector}
                onClick={() => setTipDropdownVisible(!tipDropdownVisible)}
              >
                <img
                  src={selectedTipCurrency.icon}
                  alt={`${selectedTipCurrency.name} icon`}
                  className={styles.currencyIcon}
                  style={{ backgroundColor: selectedTipCurrency.color }}
                />
                <span className={styles.currencyCode}>
                  {selectedTipCurrency.code} ({selectedTipCurrency.name})
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={styles.dropdownArrow}
                  style={{ width: 20, height: 20 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
                {tipDropdownVisible && (
                  <div
                    className={styles.dropdownMenu}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      placeholder="Search cryptocurrency"
                      value={tipSearchQuery}
                      onChange={(e) => setTipSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                    <div className={styles.dropdownList}>
                      {depositCurrencies
                        .filter((currency) =>
                          currency.name
                            .toLowerCase()
                            .includes(tipSearchQuery.toLowerCase()) ||
                          currency.code
                            .toLowerCase()
                            .includes(tipSearchQuery.toLowerCase())
                        )
                        .map((currency) => (
                          <div
                            key={currency.code}
                            className={styles.dropdownItem}
                            onClick={() => {
                              setSelectedTipCurrency(currency);
                              setTipDropdownVisible(false);
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
              </div>
            </section>
        
            {/* Who You're Tipping */}
            <div className={styles.tipSection}>
              <label className={styles.tipLabel}>Who you're tipping</label>
              <input
                type="text"
                placeholder="Enter username"
                value={tipUsername}
                onChange={(e) => setTipUsername(e.target.value)}
                className={styles.tipInput}
              />
            </div>
        
            {/* Amount to Tip */}
            <div className={styles.tipSection}>
              <label className={styles.tipLabel}>Amount to Tip</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                className={styles.tipInput}
              />
            </div>
        
            {/* Tip Now Button */}
            <button
              className={styles.tipNowButton}
              onClick={() =>
                alert(
                  `Tipping ${tipAmount} ${selectedTipCurrency.code} to ${tipUsername}`
                )
              }
              disabled={!tipAmount || !tipUsername}
            >
              Tip Now
            </button>
          </div>
        ) : (
          <>
            {/* ---------------- Default Wallet Overview ---------------- */}
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
                          <span className={styles.currencyCode}>{currency.code}</span>
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
            <section className={styles.actionsSection}>
              <button
                className={`${styles.actionButton} ${styles.primary}`}
                onClick={() => setDepositView(true)}
              >
                Deposit
              </button>
              <button
                className={`${styles.actionButton} ${styles.primary}`}
                onClick={() => setWithdrawView(true)}
              >
                Withdraw
              </button>
              <button
                 className={`${styles.actionButton} ${styles.secondary}`}
                 onClick={() => setTipView(true)}
      >
                 Tip
               </button>
            </section>
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
