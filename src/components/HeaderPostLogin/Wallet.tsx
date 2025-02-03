import React, { useState } from 'react';
import styles from './wallet.module.css';

// Example interface for a currency
interface CurrencyInfo {
  code: string;
  icon: string; // Path or URL to the currency icon
  balance: number;
  isCrypto: boolean;
}

// Example interface for bet currency
interface BetCurrencyOption {
  code: string;
  label: string;
}

// Added interface for Wallet component props
interface WalletProps {
  onWalletButtonClick?: () => void;
}

export const Wallet: React.FC<WalletProps> = ({ onWalletButtonClick }) => {
  // Example balances (feel free to adjust, or fetch from an API)
  const [balances] = useState<CurrencyInfo[]>([
    { code: 'USD', icon: '/images/usd-icon.png', balance: 0.0, isCrypto: false },
    { code: 'BTC', icon: '/images/btc-icon.png', balance: 0.0, isCrypto: true },
    { code: 'ETH', icon: '/images/eth-icon.png', balance: 0.0, isCrypto: true },
    { code: 'LTC', icon: '/images/ltc-icon.png', balance: 0.01, isCrypto: true },
    { code: 'TRX', icon: '/images/trx-icon.png', balance: 0.01, isCrypto: true },
    { code: 'XRP', icon: '/images/xrp-icon.png', balance: 0.0, isCrypto: true },
    { code: 'DOGE', icon: '/images/doge-icon.png', balance: 0.0, isCrypto: true },
    { code: 'SOL', icon: '/images/sol-icon.png', balance: 0.0, isCrypto: true },
  ]);

  // Which currency is currently “selected” for the top display
  const [activeCurrency, setActiveCurrency] = useState<CurrencyInfo>(balances[0]);
  // Is dropdown open
  const [isOpen, setIsOpen] = useState(false);

  // Bet currency options (radio buttons)
  const betCurrencyOptions: BetCurrencyOption[] = [
    { code: 'USD', label: 'USD' },
    { code: 'JPY', label: 'JPY' },
    { code: 'PLN', label: 'PLN' },
    { code: 'EUR', label: 'EUR' },
    { code: 'CAD', label: 'CAD' },
    { code: 'CZK', label: 'CZK' },
    { code: 'RUB', label: 'RUB' },
    { code: 'KRW', label: 'KRW' },
    { code: 'NGN', label: 'NGN' },
    { code: 'NZD', label: 'NZD' },
    { code: 'INR', label: 'INR' },
    // ... add any others you want
  ];

  // Which bet currency is selected
  const [selectedBetCurrency, setSelectedBetCurrency] = useState('USD');

  // Toggles the dropdown open/closed
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Switch the “active” currency displayed in the header
  const handleSelectCurrency = (currency: CurrencyInfo) => {
    setActiveCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div className={styles.walletContainer}>
      {/* Left side: black background with icon, balance, caret */}
      <div className={styles.balanceSection} onClick={toggleDropdown}>
        <div className={styles.balanceIcon}>
          {/* Dynamically show the selected currency's icon */}
          <img
            src={activeCurrency.icon}
            alt={activeCurrency.code}
            className={styles.currencyIcon}
          />
        </div>
        <span className={styles.balanceAmount}>
          {activeCurrency ? activeCurrency.balance.toFixed(2) : '0.00'}
        </span>
        <span className={styles.caretDown}></span>
      </div>

      {/* Right side: the big green "Wallet" button */}
      <button className={styles.walletButton} onClick={onWalletButtonClick}>
        Wallet
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className={styles.dropdown}>
          {/* Current active currency shown at top of dropdown */}
          <div className={styles.dropdownActiveCurrency}>
            <img
              src={activeCurrency.icon}
              alt={activeCurrency.code}
              className={styles.currencyIcon}
            />
            <span className={styles.dropdownCurrencyCode}>
              {activeCurrency.code}
            </span>
            <span className={styles.dropdownCurrencyBalance}>
              {activeCurrency.balance.toFixed(5)}
            </span>
          </div>

          {/* List of all currencies */}
          <div className={styles.dropdownCurrencies}>
            {balances.map((currency) => (
              <div
                key={currency.code}
                className={styles.dropdownCurrencyItem}
                onClick={() => handleSelectCurrency(currency)}
              >
                <img
                  src={currency.icon}
                  alt={currency.code}
                  className={styles.currencyIcon}
                />
                <span>{currency.code}</span>
                <span className={styles.dropdownItemBalance}>
                  {currency.balance.toFixed(currency.isCrypto ? 4 : 2)}
                </span>
              </div>
            ))}
          </div>

          {/* Bet Currency Section */}
          <div className={styles.betCurrencySection}>
            <h4>Bet Currency</h4>
            <div className={styles.betCurrencyOptions}>
              {betCurrencyOptions.map((option) => (
                <label key={option.code} className={styles.betCurrencyOption}>
                  <input
                    type="radio"
                    name="betCurrency"
                    value={option.code}
                    checked={selectedBetCurrency === option.code}
                    onChange={(e) => setSelectedBetCurrency(e.target.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
