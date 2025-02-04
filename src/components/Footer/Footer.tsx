import { FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa";
import footerStyles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        {/* Casino Section */}
        <div className={footerStyles.column}>
          <h3 className={footerStyles.columnTitle}>Casino</h3>
          <ul className={footerStyles.list}>
            <li><a href="/slots">Slots</a></li>
            <li><a href="/live-casino">Live Casino</a></li>
            <li><a href="/exclusive-games">Exclusive Games</a></li>
            <li><a href="/virtual-sports">Virtual Sports</a></li>
          </ul>
        </div>

        {/* Sportsbook Section */}
        <div className={footerStyles.column}>
          <h3 className={footerStyles.columnTitle}>Sportsbook</h3>
          <ul className={footerStyles.list}>
            <li><a href="/sportsbook">Sportsbook</a></li>
            <li><a href="/football">Football</a></li>
            <li><a href="/basketball">Basketball</a></li>
            <li><a href="/tennis">Tennis</a></li>
          </ul>
        </div>

        {/* Policies Section */}
        <div className={footerStyles.column}>
          <h3 className={footerStyles.columnTitle}>Policies</h3>
          <ul className={footerStyles.list}>
            <li><a href="/aml-policy">Anti-Money Laundering</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/self-exclusion">Self Exclusion</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className={footerStyles.column}>
          <h3 className={footerStyles.columnTitle}>Support</h3>
          <ul className={footerStyles.list}>
            <li><a href="/live-support">Live Support</a></li>
            <li><a href="/help-center">Help Center</a></li>
            <li><a href="/license">License</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className={footerStyles.column}>
          <h3 className={footerStyles.columnTitle}>Follow Us</h3>
          <div className={footerStyles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Accepted Currencies Section */}
      <div className={footerStyles.currencies}>
        <h4>Accepted Currencies</h4>
        <div className={footerStyles.currencyIcons}>
          <span>BTC</span>
          <span>ETH</span>
          <span>USDT</span>
          <span>BNB</span>
          <span>TRX</span>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className={footerStyles.footerBottom}>
        <div className={footerStyles.legal}>
          <p>
            Gambi.com is operated by Kasego Global N.V. <br />
            Reg No: 165461. Address: Hanchi Snoa 19, Curaçao.
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
