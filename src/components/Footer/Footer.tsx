import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import footerStyles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        {/* Casino Column */}
        <div className={footerStyles.column}>
          <h3 className={footerStyles.columnTitle}>Casino</h3>
          <ul className={footerStyles.list}>
            <li><a href="/slots">Slots</a></li>
            <li><a href="/live-casino">Live Casino</a></li>
            <li><a href="/exclusive-games">Exclusive Games</a></li>
            <li><a href="/virtual-sports">Virtual Sports</a></li>
          </ul>
        </div>
        {/* Sportsbook Column */}
        <div className={footerStyles.column}>
          <h3 className={footerStyles.columnTitle}>Sportsbook</h3>
          <ul className={footerStyles.list}>
            <li><a href="/sportsbook">Sportsbook</a></li>
            <li><a href="/football">Football</a></li>
            <li><a href="/basketball">Basketball</a></li>
            <li><a href="/tennis">Tennis</a></li>
          </ul>
        </div>
        {/* Policies Column */}
        <div className={footerStyles.column}>
          <h3 className={footerStyles.columnTitle}>Policies</h3>
          <ul className={footerStyles.list}>
            <li><a href="/aml-policy">Anti-Money Laundering</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/self-exclusion">Self Exclusion</a></li>
          </ul>
        </div>
        {/* Support Column */}
        <div className={footerStyles.column}>
          <h3 className={footerStyles.columnTitle}>Support</h3>
          <ul className={footerStyles.list}>
            <li><a href="/live-support">Live Support</a></li>
            <li><a href="/help-center">Help Center</a></li>
            <li><a href="/license">License</a></li>
          </ul>
        </div>
        {/* Community Column */}
        <div className={footerStyles.column}>
          <h3 className={footerStyles.columnTitle}>Community</h3>
          <ul className={footerStyles.list}>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /> Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a></li>
            <li><a href="https://t.me" target="_blank" rel="noopener noreferrer"><FaTelegram /> Telegram</a></li>
          </ul>
        </div>
      </div>

      {/* Accepted Currencies Section */}
      <div className={footerStyles.currencies}>
        <h4>Accepted Currencies</h4>
        <ul className={footerStyles.currencyIcons}>
          <li>TRY</li>
          <li>BTC</li>
          <li>ETH</li>
          <li>USDT</li>
          <li>BNB</li>
          <li>TRX</li>
        </ul>
      </div>

      {/* Footer Bottom Section */}
      <div className={footerStyles.footerBottom}>
        <div className={footerStyles.legal}>
          <p>
            The owner and operator of the Gambi website is Kasego Global N.V. 
            Registration number - 165461. Address: Hanchi Snoa 19, Curaçao.
          </p>
          <p>Licensed by Anjouan eGaming. License No: ALSI-102404003-FI</p>
        </div>
        <div className={footerStyles.contact}>
          <p><strong>Support:</strong> <a href="mailto:support@gambi.com">support@gambi.com</a></p>
          <p><strong>Press:</strong> <a href="mailto:info@gambi.com">info@gambi.com</a></p>
          <p><strong>Partners:</strong> <a href="mailto:partnership@gambi.com">partnership@gambi.com</a></p>
        </div>
      </div>
    </footer>
  );
};
